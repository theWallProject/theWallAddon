import FLAGGED_FB from "./db/FLAGGED_FACEBOOK.json"
import FLAGGED_LI_COMPANY from "./db/FLAGGED_LI_COMPANY.json"
import FLAGGED_TWITTER from "./db/FLAGGED_TWITTER.json"
import FLAGGED from "./db/FLAGGED.json"
import { error, getMainDomain, log } from "./helpers"
import { getStorageItem } from "./storageHelpers"
import {
  APIListOfReasons,
  CONFIG,
  DBFileNames,
  type APIEndpointDomains,
  type APIEndpointDomainsResult,
  type UrlTestResult
} from "./types"

export const isUrlFlagged = async (url: string): Promise<UrlTestResult> => {
  log(`storage: isUrlFlagged ${url}`)

  const domain = getMainDomain(url)

  if (domain.endsWith(".il")) {
    const localTestKey = `isr_url_${domain}`

    let isDismissed: boolean

    try {
      isDismissed = !!(await getStorageItem<boolean>(localTestKey))
    } catch (e) {
      error(`isUrlFlagged getStorageItem failed for key ${localTestKey}`)
      isDismissed = false
    }

    return new Promise((resolve) => {
      resolve({
        isDismissed,
        name: domain,
        reasons: [APIListOfReasons.Url],
        rule: {
          db: "isr_url",
          selector: domain
        }
      })
    })
  }

  return new Promise(async (resolve, reject) => {
    const ruleForDomain = CONFIG.rules.find((rule) => rule.domain === domain)

    if (ruleForDomain) {
      log("storage: isUrlFlagged [rule]", { ruleForDomain })

      const regex = new RegExp(ruleForDomain.regex)
      const results = regex.exec(url)
      const selector = results && results[1]

      if (selector) {
        const localTestKey = `${ruleForDomain.fileName}_${selector}`
        log(`checking ${localTestKey} for dismissal`)

        let isDismissed: boolean

        try {
          isDismissed = !!(await getStorageItem<boolean>(localTestKey))
          log(
            `isUrlFlagged getStorageItem for key ${localTestKey} result:${isDismissed}`
          )
        } catch (e) {
          error(`isUrlFlagged getStorageItem failed for key ${localTestKey}`)
          isDismissed = false
        }

        if (isDismissed) {
          log(`${localTestKey} was dismissed before!`)
          resolve({
            isDismissed: true,
            // reasons and name dont matter here
            reasons: [],
            name: domain,
            rule: {
              db: ruleForDomain.fileName,
              selector
            }
          })
        }

        log(`storage: isUrlFlagged testing for id ${selector}`)
        let findResult: APIEndpointDomainsResult | undefined

        let DB: APIEndpointDomains
        switch (ruleForDomain.fileName) {
          case "FLAGGED_FACEBOOK":
            DB = FLAGGED_FB as APIEndpointDomains
            break

          case "FLAGGED_LI_COMPANY":
            DB = FLAGGED_LI_COMPANY as APIEndpointDomains
            break

          case "FLAGGED_TWITTER":
            DB = FLAGGED_TWITTER as APIEndpointDomains

            break

          default:
            throw new Error(`unsupported rule ${ruleForDomain.fileName}`)
        }

        findResult = DB.find((row) => row.selector === selector)
        log("isUrlFlagged findResult:", findResult)
        if (findResult) {
          resolve({
            ...findResult,
            rule: {
              db: ruleForDomain.fileName,
              selector
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
      const findResult = FLAGGED.find(
        (row) => row.selector === domain
      ) as APIEndpointDomainsResult

      log("storage: isUrlFlagged onsuccess", findResult)

      if (findResult) {
        const localTestKey = `${DBFileNames.FLAGGED}_${domain}`

        let isDismissed: boolean

        try {
          isDismissed = !!(await getStorageItem<boolean>(localTestKey))
        } catch (e) {
          error(`isUrlFlagged getStorageItem failed for key ${localTestKey}`)
          isDismissed = false
        }
        resolve({
          isDismissed,
          ...findResult,
          rule: {
            db: "FLAGGED",
            selector: domain
          }
        })
      }
    }
  })
}
