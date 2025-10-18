export function log(...params: unknown[]) {
  // alert(text)
  console.log("🍉", ...params)
  // debugger
}

export function error(...params: unknown[]) {
  // alert(text)
  console.error("🔴🍉🔴", ...params)
  // debugger
}

export function warn(...params: unknown[]) {
  // alert(text)
  console.warn("⚠️🍉⚠️", ...params)
  // debugger
}

export type TR_CAT = "Button"

export type TR_ACTION = "Click"

export type TR_NAME =
  | "allow_month"
  | "support_pal"
  | "support_ko_fi"
  | "show_alternatives"
  | "report_mistake"
  | "share_fb"
  | "share_tw"
  | "share_li"
  | "share_wa"
  | "share_tg"

export function track(category: TR_CAT, action: TR_ACTION, name: TR_NAME) {
  try {
    const img = document.createElement("img")
    // imageUrl += "&e_v=" + encodeURIComponent(value) // Optional numeric value
    img.src = `https://the-wall.win/bg.gif?rec=1&e_c=${encodeURIComponent(category)}&e_a=${encodeURIComponent(action)}&e_n=${encodeURIComponent(name)}`

    document.body.appendChild(img)
  } catch (e) {
    error(e)
  }
}
