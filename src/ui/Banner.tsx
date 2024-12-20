import React, { useEffect, useState } from "react"

// @ts-expect-error
import backgroundImage from "../../assets/wall.jpg"
// import { log, warn } from "../helpers"
// import { share } from "../image_sharing/image"
import { ShareButton } from "../share_button/ShareButton"
import { MessageTypes, type Message, type MessageResponseMap } from "../types"
import { Button } from "./Button"
import style from "./style.module.css"

export const Banner = () => {
  const [testResult, setTestResult] =
    useState<MessageResponseMap[MessageTypes.TestUrl]>()

  const onDismissSessionClick = (fileName: string, selector: string) => {
    chrome.runtime.sendMessage<Message>(
      {
        action: MessageTypes.DissmissUrl,
        fileName,
        selector
      },
      (response) => {
        // log("onDismissSessionClick: Response from background:", response)
        setTestResult(undefined)
      }
    )
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
    <div className={style.container} dir={chrome.i18n.getMessage("@@bidi_dir")}>
      <div
        className={style.bgLayer}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />

      <div className={style.modalContainer}>
        <div className={style.modalMargin}>
          <h3 className={style.headerTitle}>
            {chrome.i18n.getMessage("headerTitle")}
          </h3>

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
              url={"https://thewallproject.github.io"}
            />

            <Button
              title={chrome.i18n.getMessage("modalDismissSession")}
              onClick={() =>
                onDismissSessionClick(
                  testResult.rule.db,
                  testResult.rule.selector
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
