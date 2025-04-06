import React, { useEffect, useState } from "react"
import { set } from "zod"

import { track } from "~helpers"

// @ts-expect-error
import backgroundImage from "../../assets/images/flag-bg.jpg"
// @ts-expect-error
import theWallWhite from "../../assets/images/the-wall-white.png"
// import { log, warn } from "../helpers"
// import { share } from "../image_sharing/image"
import { ShareButton } from "../share_button/ShareButton"
import { MessageTypes, type Message, type MessageResponseMap } from "../types"
import { Scene } from "./3d/scene"
import { Button } from "./Button"
// import { GraffitiEffect } from "./GraffitiEffect"

import style from "./style.module.css"
import { TextScramble } from "./TextScramble"

const messages = [
  "Psst...",
  "Please share the addon",
  "Help us reach 5000 users 🚀",
  ""
]

export const Banner = () => {
  const [isSharing, setIsSharing] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)

  const [testResult, setTestResult] =
    useState<MessageResponseMap[MessageTypes.TestUrl]>()

  const onDismissSessionClick = (fileName: string, selector: string) => {
    chrome.runtime.sendMessage<Message>(
      {
        action: MessageTypes.DissmissUrl,
        fileName,
        selector
      },
      (response: unknown) => {
        // log("onDismissSessionClick: Response from background:", response)
        setTimeout(() => {
          setTestResult(undefined)
        }, 1000)
      }
    )
  }

  const handleReportMistakeClick = () => {
    track("Button", "Click", "report_mistake")

    const currentUrl = window.location.href
    const mailtoLink = `mailto:the.wall.addon@proton.me?subject=Error Report&body=${encodeURIComponent(currentUrl)}`

    window.open(mailtoLink, "_blank")
  }

  useEffect(() => {
    const listener = (message: Message) => {
      if (message.action === MessageTypes.GetTestResult) {
        setTestResult(message.result)
      }
    }
    // log("inside use effect before adding listener")
    chrome.runtime.onMessage.addListener(listener)

    return () => {
      // warn("removing use effect. removing listener")

      chrome.runtime.onMessage.removeListener(listener)
    }
  }, [])

  return testResult && !testResult.isDismissed ? (
    <div
      className={`${style.container} ${chrome.i18n.getMessage("@@ui_locale").includes("ar") ? style.ar : ""}`}
      dir={chrome.i18n.getMessage("@@bidi_dir")}>
      <img src="https://the-wall.win/bg.gif?rec=1&action_name=wall" alt="" />
      <div
        className={style.bgLayer}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh"
        }}>
        <Scene isSharing={isSharing} isSkipping={isSkipping} />
      </div>
      <img
        src={theWallWhite}
        className={style.theWallLogo}
        alt="The Wall Logo"
      />
      <div className={style.modalContainer}>
        <div className={style.modalMargin}>
          <div className={style.modalContentWrapper}>
            {testResult.reasons.map((reason) => {
              switch (reason) {
                case "u":
                  return (
                    <div key={reason}>
                      {chrome.i18n.getMessage("reasonUrlIL", [testResult.name])}
                    </div>
                  )
                case "f":
                  return (
                    <div key={reason}>
                      {chrome.i18n.getMessage("reasonFounder", [
                        testResult.name
                      ])}
                    </div>
                  )
                case "h":
                  return (
                    <div key={reason}>
                      {chrome.i18n.getMessage("reasonHeadquarter", [
                        testResult.name
                      ])}
                    </div>
                  )
                case "b":
                  return (
                    <div key={reason}>
                      {chrome.i18n.getMessage("reasonBDS", [testResult.name])}
                    </div>
                  )

                default:
                  reason satisfies never
                  throw new Error(`unknown reason [${reason}]`)
              }
            })}
            {/* // todo: use or delete */}
            {testResult.comment ? <div>{testResult.comment}</div> : ""}
            {testResult.link ? <a href={testResult.link}>Link</a> : ""}
          </div>

          <div className={style.buttonsWrapper}>
            <ShareButton
              text={chrome.i18n.getMessage("sharingMessageText")}
              url={"https://the-wall.win"}
              onMouseEnter={() => setIsSharing(true)}
              onMouseLeave={() => setIsSharing(false)}
            />

            <Button
              title={chrome.i18n.getMessage("modalDismissSession")}
              onClick={() => {
                track("Button", "Click", "allow_month")

                onDismissSessionClick(
                  testResult.rule.db,
                  testResult.rule.selector
                )
              }}
              onMouseEnter={() => setIsSkipping(true)}
              onMouseLeave={() => setIsSkipping(false)}
              btnStyle={{
                boxShadow: "3px 2px 7px #c72222"
              }}
            />

            <Button
              title={chrome.i18n.getMessage("modalSupportPalestine")}
              onClick={() => {
                track("Button", "Click", "support_pal")

                setTimeout(() => {
                  window.location.href = "https://techforpalestine.org"
                }, 500)
              }}
              onMouseEnter={() => setIsSharing(true)}
              onMouseLeave={() => setIsSharing(false)}
              btnStyle={{
                boxShadow: "3px 2px 7px #74d136"
              }}
            />
          </div>
        </div>
      </div>

      <div className={style.bottomBar}>
        <Button
          title={chrome.i18n.getMessage("buttomBarButtonReport")}
          onClick={handleReportMistakeClick}
        />
      </div>

      <TextScramble
        texts={messages}
        interval={3000}
        speed={1}
        className="scramble-text"
      />
    </div>
  ) : (
    <></>
  )
}
