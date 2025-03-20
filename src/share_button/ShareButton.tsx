import React, { useState } from "react"
import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp
} from "react-icons/fa"

// import { share } from "../image_sharing/image"
import { Button } from "../ui/Button"
import styles from "./ShareButton.module.css"

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
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook">
            <FaFacebook size={30} color="#3b5998" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter">
            <FaTwitter size={30} color="#00acee" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn">
            <FaLinkedin size={30} color="#0e76a8" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            href={`https://wa.me/?text=${encodedText} ${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp">
            <FaWhatsapp size={30} color="#25D366" />
          </a>
        </div>
        <div className={styles.shareOption}>
          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Telegram">
            <FaTelegram size={30} color="#0088cc" />
          </a>
        </div>
      </div>
    </div>
  )
}
