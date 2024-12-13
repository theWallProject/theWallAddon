import { z } from "zod"

export const ReasonsSchema = z.array(z.enum(["h", "f", "u"]))
export type ReasonsSchemaType = z.infer<typeof ReasonsSchema>

export enum APIListOfReasons {
  HeadQuarterInIL = "h",
  FounderInIL = "f",
  Url = "u"
}

export enum DBFileNames {
  FLAGGED = "FLAGGED",
  FLAGGED_FACEBOOK = "FLAGGED_FACEBOOK",
  FLAGGED_LI_COMPANY = "FLAGGED_LI_COMPANY",
  FLAGGED_TWITTER = "FLAGGED_TWITTER"
}

export type DBFileNamesValues = `${DBFileNames}`
export type APIListOfReasonsValues = `${APIListOfReasons}`

type APIEndpointRule = {
  fileName: DBFileNamesValues
  domain: string
  regex: string
}

export type APIEndpointDomainsResult = {
  selector: string
  reasons: APIListOfReasonsValues[]
  name: string
  comment?: string
  link?: string
}

export type APIEndpointDomains = APIEndpointDomainsResult[]

export type APIEndpointConfig = {
  rules: APIEndpointRule[]
}

export const API_ENDPOINT_RULE_LINKEDIN = {
  fileName: DBFileNames.FLAGGED_LI_COMPANY,
  domain: "linkedin.com",
  regex: "linkedin.[^/]+/(?:company|showcase)/([^/?]+)"
} as const satisfies APIEndpointRule

export const API_ENDPOINT_RULE_FACEBOOK = {
  fileName: DBFileNames.FLAGGED_FACEBOOK,
  domain: "facebook.com",
  regex: "facebook.[^/]+/([^/?]+)"
} as const satisfies APIEndpointRule

export const API_ENDPOINT_RULE_TWITTER = {
  fileName: DBFileNames.FLAGGED_TWITTER,
  domain: "twitter.com",
  regex: "(?:twitter|x|t).[^/]+/([^/?]+)"
} as const satisfies APIEndpointRule

export const CONFIG: APIEndpointConfig = {
  rules: [
    API_ENDPOINT_RULE_LINKEDIN,
    API_ENDPOINT_RULE_FACEBOOK,
    API_ENDPOINT_RULE_TWITTER
  ]
}

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
      rule: { selector: string; db: DBFileNamesValues | "isr_url" }
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
      fileName: string
      selector: string
    }

export type MessageResponseMap = {
  [MessageTypes.TestUrl]: UrlTestResult
  [MessageTypes.DissmissUrl]: true
}

export type SendResponse<T extends keyof MessageResponseMap> = (
  response: MessageResponseMap[T]
) => void
