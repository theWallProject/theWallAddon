import {
  APIListOfReasons,
  CONFIG,
  getMainDomain,
  type FinalDBFileType,
  type SpecialDomains
} from "@theWallProject/addonCommon"

import ALL from "./db/ALL.json"
import { error, log } from "./helpers"
import { getStorageItem } from "./storageHelpers"
import { type UrlTestResult } from "./types"

const ONE_MIN = 60 * 1000
const ONE_MONTH = 30 * 24 * 60 * ONE_MIN

const checkIsDissmissed = async (testKey: string) => {
  let isDismissed: boolean

  try {
    const dismissedTS = await getStorageItem<number>(testKey)

    if (dismissedTS) {
      //compare dismissedTS which is a timestamp to see if it is older than 1 month
      const now = new Date()
      const difference = new Date(now.getTime() - dismissedTS)

      if (difference.getTime() < ONE_MONTH) {
        log(`${testKey} was dismissed less than 1 month ago, keep dissmissed`)
        isDismissed = true
      } else {
        log(
          `${testKey} was dismissed longer than a month ago, not dismissing anymore`
        )
        isDismissed = false
      }
    } else {
      isDismissed = false
    }
  } catch {
    error(`isUrlFlagged getStorageItem failed for key ${testKey}`)
    isDismissed = false
  }

  return isDismissed
}

export const isUrlFlagged = async (url: string): Promise<UrlTestResult> => {
  log(`storage: isUrlFlagged ${url}`)

  const domain = getMainDomain(url)

  if (domain.endsWith(".il")) {
    const localTestKey = `il_${domain}`
    const isDismissed = await checkIsDissmissed(localTestKey)

    return new Promise((resolve) => {
      resolve({
        isDismissed,
        name: domain,
        reasons: [APIListOfReasons.Url],
        rule: {
          selector: domain,
          key: "il" as const
        }
      })
    })
  }

  return new Promise((resolve) => {
    const executeAsync = async () => {
      // Normalize URL by removing www. prefix for regex matching
      const normalizedUrl = url.replace(/^(https?:\/\/)www\./i, "$1")

      const ruleForDomain = CONFIG.rules.find((rule) => {
        const ruleRegex = new RegExp(rule.regex)
        const regexResult = ruleRegex.test(normalizedUrl)

        if (regexResult) {
          log({ url, normalizedUrl, rule, regexResult })
        }
        return regexResult
      })

      if (ruleForDomain) {
        log("storage: isUrlFlagged [rule]", { ruleForDomain })

        const regex = new RegExp(ruleForDomain.regex)
        const results = regex.exec(normalizedUrl)
        const selector = results && results[1]

        if (selector) {
          const selectorKey = getSelectorKey(
            ruleForDomain.domain,
            normalizedUrl
          )
          const localTestKey = `${selectorKey}_${selector}`

          const isDismissed = await checkIsDissmissed(localTestKey)

          if (isDismissed) {
            resolve({
              isDismissed: true,
              // reasons and name dont matter here
              reasons: [],
              name: domain,
              rule: {
                selector,
                key: getSelectorKey(ruleForDomain.domain, normalizedUrl)
              }
            })
          }

          log(`storage: isUrlFlagged testing for id ${selector}`)

          const findResult = (ALL as FinalDBFileType[]).find(
            (row) => row[selectorKey] === selector
          )

          log("isUrlFlagged findResult:", findResult)

          if (findResult) {
            resolve({
              reasons: findResult.r,
              name: findResult.n,
              alt: findResult.alt,
              stockSymbol: findResult.s,
              rule: {
                selector,
                key: getSelectorKey(ruleForDomain.domain, normalizedUrl)
              }
            })
          } else {
            resolve(undefined)
          }
        } else {
          log("storage: isUrlFlagged [rule] no result!!", {
            ruleForDomain,
            regex
          })

          resolve(undefined)
        }
      } else {
        const findResult = (ALL as FinalDBFileType[]).find(
          (row) => row.ws === domain
        )

        log("storage: isUrlFlagged onsuccess", findResult)

        if (findResult) {
          const localTestKey = `ws_${domain}`

          const isDismissed = await checkIsDissmissed(localTestKey)

          resolve({
            isDismissed,
            reasons: findResult.r,
            name: findResult.n,
            alt: findResult.alt,
            stockSymbol: findResult.s,
            rule: {
              selector: domain,
              key: "ws" as const
            }
          })
        }
      }
    }
    executeAsync()
  })
}

function getSelectorKey(domain: SpecialDomains, url?: string) {
  switch (domain) {
    case "facebook.com":
      return "fb" as const
    case "twitter.com":
    case "x.com":
      return "tw" as const
    case "linkedin.com":
      return "li" as const
    case "instagram.com":
      return "ig" as const
    case "github.com":
      return "gh" as const
    case "youtube.com": {
      // Determine if it's a Profile (@) or Channel (/channel/) URL
      // Check the URL directly - Profile URLs have /@, Channel URLs have /channel/
      if (!url) {
        throw new Error(
          `getSelectorKey: url is required for youtube.com domain`
        )
      }
      if (url.includes("/channel/")) {
        return "ytc" as const
      }
      if (url.includes("/@")) {
        return "ytp" as const
      }
      // Default to ytp for other YouTube URLs (shouldn't happen with proper rules)
      return "ytp" as const
    }
    case "tiktok.com":
      return "tt" as const
    case "threads.com":
      return "th" as const

    default: {
      throw new Error(`getSelectorKey: unexpected domain ${domain}`)
    }
  }
}
