import type { PlasmoMessaging } from "@plasmohq/messaging"

let isEnabled = false

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (req.body?.action === "get") {
    res.send({ isEnabled })
  } else if (
    req.body?.action === "set" &&
    typeof req.body.isEnabled === "boolean"
  ) {
    isEnabled = req.body.isEnabled
    const tabs = await chrome.tabs.query({})
    tabs.forEach((tab) => {
      if (
        tab.id &&
        tab.url &&
        !/^chrome:|edge:|chrome-extension:/.test(tab.url)
      ) {
        try {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (state) => {
              window.postMessage(
                {
                  type: "TOGGLE_HIGHLIGHTS",
                  isEnabled: state
                },
                "*"
              )
            },
            args: [isEnabled]
          })
        } catch (error) {
          console.error("Error sending to tab:", tab.id, error)
        }
      }
    })
    res.send({ success: true })
  } else {
    res.send({ success: false, error: "Invalid request" })
  }
}

export default handler
