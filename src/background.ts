// import { sendToContentScript } from "@plasmohq/messaging"

import { error, log } from "./helpers"
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
  } catch (error) {
    // If the URL is invalid (e.g., null, undefined), treat it as special
    return true
  }
}

const testTabUrl = (tabId: number, url: string) => {
  if (isSpecialUrl(url)) {
    log(`testTabUrl ignoring special url [${url}]`)

    return
  }
  log(`testTabUrl ${tabId} [${url}]`)

  isUrlFlagged(url)
    .then((result) => {
      log("testTabUrl isUrlFlagged result", result)

      chrome.tabs
        .sendMessage<Message>(tabId, {
          action: MessageTypes.GetTestResult,
          result
        })
        .then((result) => {
          log("chrome.tabs.sendMessage promise success", result)
        })
        .catch((e) => {
          error(`chrome.tabs.sendMessage promise error [${url}]`, e)
        })
    })
    .catch((e) => {
      error(`testTabUrl isUrlFlagged promise error [${url}]`, e)
    })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = tab.url
  if (
    tab.active &&
    url &&
    (changeInfo.url || changeInfo.status === "loading")
  ) {
    log("chrome.tabs.onUpdated", tabId, changeInfo, tab)
    setTimeout(() => {
      testTabUrl(tabId, url)
    }, 3000)
  }
  return true
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  log("chrome.tabs.onActivated", activeInfo)
  // Get the details of the newly active tab
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const url = tab.url

    if (!url) {
      return
    }

    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
      return
    }
    testTabUrl(activeInfo.tabId, url)
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
      const key = `${message.fileName}_${message.selector}`
      setStorageItem(key, true).then(() => {
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
