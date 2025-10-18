import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin"
import { FaTelegram } from "@react-icons/all-files/fa/FaTelegram"
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp"
import React from "react"

import styles from "./ShareButton.module.css"

import { track } from "~helpers"

// import { share } from "../image_sharing/image"
// import { Button } from "../ui/Button"

interface ShareButtonProps {
  text: string
  url?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  text,
  url,
  onMouseEnter,
  onMouseLeave
}) => {
  // const [isOpen, setIsOpen] = useState(false)

  const encodedText = encodeURIComponent(text)
  const encodedUrl = url ? encodeURIComponent(url) : ""

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen)
  // }

  return (
    <div className={styles.shareButtonContainer}>
      {/* <Button
        onClick={() => {}}
        title={chrome.i18n.getMessage("modalShareButton")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}></Button> */}

      <div
        className={styles.dropdown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={
          chrome.i18n.getMessage("@@bidi_dir") === "ltr"
            ? { left: 0 }
            : { right: 0 }
        }>
        {/* //todo: enable image sharing */}
        {/* {navigator.canShare && (
            <div className={styles.shareOption}>
              <Button
                title={chrome.i18n.getMessage("modalShareMobileImage")}
                onClick={async () => {
                  await share(
                    "nicee",
                    "I found this using The wall",
                    "https://chromewebstore.google.com/detail/palestinepact/gengdkfcffpnjfolbcbhfiocemfinkem"
                  )
                }}
              />
            </div>
          )} */}
        <div className={styles.shareOption}>
          <a
            onClick={() => {
              track("Button", "Click", "share_fb")

              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
                "_blank"
              )
            }}
            aria-label="Share on Facebook">
            <FaFacebook size={30} color="#3b5998" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            onClick={() => {
              track("Button", "Click", "share_tw")

              window.open(
                `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`,
                "_blank"
              )
            }}
            aria-label="Share on X (Twitter)">
            <svg width={30} height={30} viewBox="0 0 24 24" fill="#8899ac">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            onClick={() => {
              track("Button", "Click", "share_li")

              window.open(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
                "_blank"
              )
            }}
            aria-label="Share on LinkedIn">
            <FaLinkedin size={30} color="#0e76a8" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            onClick={() => {
              track("Button", "Click", "share_wa")

              window.open(
                `https://wa.me/?text=${encodedText} ${encodedUrl}`,
                "_blank"
              )
            }}
            aria-label="Share on WhatsApp">
            <FaWhatsapp size={30} color="#25D366" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            onClick={() => {
              track("Button", "Click", "share_tg")

              window.open(
                `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
                "_blank"
              )
            }}
            aria-label="Share on Telegram">
            <FaTelegram size={30} color="#0088cc" />
          </a>
        </div>
      </div>
    </div>
  )
}
