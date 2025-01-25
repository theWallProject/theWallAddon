import shareButtonstyleText from "data-text:src/share_button/ShareButton.module.css"
import styleText from "data-text:src/ui/style.module.css"
import type { PlasmoCSConfig } from "plasmo"
import { Banner } from "src/ui/Banner"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
  // css: ["font.css"]
  // all_frames: true
  // run_at: "document_start"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = [styleText, shareButtonstyleText].join("\n")
  return style
}

export default Banner
