import "~style.css"

import { useState } from "react"

import Toggle from "~features/toggle"
import getCurrentTabId from "~utils/getCurrentTabId"

export default function IndexPopup() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  async function handleEnabledClick() {
    const newState = !isEnabled
    setIsEnabled(newState)

    const tabId = await getCurrentTabId()
    try {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (state) => {
          window.postMessage(
            {
              type: "TOGGLE_HIGHLIGHTS",
              isEnabled: state
            },
            "*"
          )
        },
        args: [newState]
      })
    } catch (error) {
      console.error("Error sending to tab:", tabId, error)
    }
  }

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-64 plasmo-w-56 plasmo-flex-col plasmo-bg-slate-200">
      <h1 className="plasmo-text-lg plasmo-mb-10 plasmo-text-center">
        Heading
        <br />
        Highlighter
      </h1>
      <Toggle checked={isEnabled} onChange={handleEnabledClick} />
      <h2>{isEnabled ? "ON" : "OFF"}</h2>
    </div>
  )
}
