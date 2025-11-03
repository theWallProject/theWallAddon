// import { sendToContentScript } from "@plasmohq/messaging"

import { error, log, warn } from "./helpers"
import { isUrlFlagged } from "./storage"
import { setStorageItem } from "./storageHelpers"
import {
  MessageTypes,
  type Message,
  type MessageResponseMap,
  type SendResponse
} from "./types"

chrome.runtime.onInstalled.addListener(() => {
  log("background:runtime.onInstalled")
  chrome.storage.session.clear(() => {
    log("cleared session [onInstalled]...")
  })
  // const manifest = chrome.runtime.getManifest()
  // const contentScriptFile = manifest.content_scripts?.[0]?.js?.[0] // Get the first declared content script

  // log("Content script file:", contentScriptFile)

  // if (contentScriptFile) {
  // const scriptPath = chrome.runtime.getURL(contentScriptFile) // Get the full URL to the content script
  // log("Content script full URL:", scriptPath)

  // Use this path to dynamically inject the script
  // chrome.tabs.query({}, (tabs) => {
  //   tabs.forEach((tab) => {
  //     if (tab.url && tab.id && !isSpecialUrl(tab.url)) {
  //       chrome.scripting
  //         .executeScript({
  //           target: { tabId: tab.id },
  //           files: [contentScriptFile]
  //         })
  //         .then(() => {
  //           log(`Injected content script into tab: ${tab.url}`)
  //         })
  //         .catch((e) => {
  //           error(`Error injecting content script into tab ${tab.url}:`, e)
  //         })
  //     }
  //   })
  // })
  // }
})

chrome.runtime.onStartup.addListener(() => {
  log("background:runtime.onStartup")
  chrome.storage.session.clear(() => {
    log("cleared session...")
  })
})

function isSpecialUrl(url: string) {
  try {
    const parsedUrl = new URL(url) // Parse the URL to extract its protocol
    // Return true if the protocol is not http or https
    return parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:"
  } catch {
    // If the URL is invalid (e.g., null, undefined), treat it as special
    return true
  }
}

const testTabUrl = async (tabId: number, url: string) => {
  if (isSpecialUrl(url)) {
    log(`testTabUrl ignoring special url [${url}]`)

    return
  }

  log(`testTabUrl ${tabId} [${url}]`)

  const result = await isUrlFlagged(url)
  // .then((result) => {
  log("testTabUrl isUrlFlagged result:", result)

  // todo: avoid using setTimeout
  setTimeout(async () => {
    const msgResult = await chrome.tabs.sendMessage<Message>(tabId, {
      action: MessageTypes.GetTestResult,
      result
    })
    // .then((result) => {
    log("chrome.tabs.sendMessage promise success", msgResult)
  }, 2000)

  // }, 10000)

  // })
  // .catch((e) => {
  //   error(`chrome.tabs.sendMessage promise error [${url}]`, e)
  // })
  // }

  // }, 1000)
  // })
  // .catch((e) => {
  //   error(`testTabUrl isUrlFlagged promise error [${url}]`, e)
  // })
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const url = tab.url
  log(`chrome.tabs.onUpdated [${tabId}]`, { url, changeInfo, tab })

  if (changeInfo.status === "loading") {
    return
  }

  if (
    // tab.active &&
    url &&
    (changeInfo.url || changeInfo.status === "complete")
  ) {
    // setTimeout(() => {
    await testTabUrl(tabId, url)
    // }, 3000)
  } else {
    warn(`chrome.tabs.onUpdated [${tabId}] was ignored`)
  }
  return true
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  log("chrome.tabs.onActivated", activeInfo)

  // Check the active tab's loading status and proceed
  chrome.tabs.get(activeInfo.tabId, async (tab) => {
    if (chrome.runtime.lastError) {
      error("chrome.tabs.onActivated had lastError:", chrome.runtime.lastError)
      return
    }

    const url = tab.url

    if (!url) {
      return
    }

    // If the tab is already loaded, test the URL immediately
    if (tab.status === "complete") {
      log("chrome.tabs.onActivated tab was already completed, testing")

      await testTabUrl(activeInfo.tabId, url)
    } else {
      log("chrome.tabs.onActivated tab wasnt completed, setting handler")

      // Otherwise, wait for it to finish loading
      const onUpdatedListener = async (
        tabId: number,
        changeInfo: chrome.tabs.OnUpdatedInfo,
        tab: chrome.tabs.Tab
      ) => {
        log(`chrome.tabs.onActivated onUpdatedListener`, {
          tabId,
          changeInfo,
          tab
        })

        if (
          tabId === activeInfo.tabId &&
          changeInfo.status === "complete" &&
          tab.url
        ) {
          await testTabUrl(tabId, tab.url)

          // Remove the listener to prevent duplicate calls
          chrome.tabs.onUpdated.removeListener(onUpdatedListener)
        } else {
          warn("chrome.tabs.onActivated onUpdatedListener didnt check!")
        }
      }

      chrome.tabs.onUpdated.addListener(onUpdatedListener)
    }
  })

  return true
})

chrome.runtime.onMessage.addListener(
  (
    message: Message,
    sender,
    sendResponse: SendResponse<keyof MessageResponseMap>
  ) => {
    log("chrome.runtime.onMessage", message, sender)
    const action = message.action

    if (action === MessageTypes.TestUrl) {
      isUrlFlagged(message.url).then((result) => {
        log("chrome.runtime.onMessage isUrlFlagged result", { result })

        sendResponse(result)
      })
    } else if (action === MessageTypes.DissmissUrl) {
      const key = `${message.key}_${message.selector}`
      const now = Date.now()
      setStorageItem(key, now).then(() => {
        log(`chrome.runtime.onMessage setStorageItem succes of key ${key}`)

        sendResponse(true)
      })
    } else {
      throw new Error(`unexpected message [${message.action}]`)
    }

    // Keeps the message channel open for async response
    return true
  }
)
