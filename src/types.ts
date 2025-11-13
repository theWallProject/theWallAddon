import type { APIListOfReasonsValues } from "@theWallProject/addonCommon"

export enum MessageTypes {
  TestUrl = "TestUrl",
  GetTestResult = "GetTestResult",
  DissmissUrl = "DissmissUrl"
}

export type UrlTestResult =
  | {
      reasons: APIListOfReasonsValues[]
      name: string
      comment?: string
      link?: string
      isDismissed?: boolean
      rule: {
        selector: string
        key: "li" | "il" | "fb" | "ws" | "tw" | "ig" | "gh" | "ytp" | "ytc" | "tt" | "th"
      }
      alt?: { n: string; ws: string }[]
      stockSymbol?: string
    }
  | undefined

export type Message =
  | {
      action: MessageTypes.TestUrl
      url: string
    }
  | {
      action: MessageTypes.GetTestResult
      result: UrlTestResult
    }
  | {
      action: MessageTypes.DissmissUrl
      key: string
      selector: string
    }

export type MessageResponseMap = {
  [MessageTypes.TestUrl]: UrlTestResult
  [MessageTypes.DissmissUrl]: true
}

export type SendResponse<T extends keyof MessageResponseMap> = (
  response: MessageResponseMap[T]
) => void
