import "~style.css"

import { useState } from "react"

import Toggle from "~features/toggle"

function IndexPopup() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const handleEnabledClick = async () => {
    const newState = !isEnabled
    console.log("Toggle clicked, new state:", newState)
    setIsEnabled(newState)

    const tabs = await chrome.tabs.query({})
    tabs.forEach((tab) => {
      if (tab.id) {
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
            args: [newState]
          })
          console.log("Sent new state to tab:", tab.id)
        } catch (error) {
          console.error("Error sending to tab:", tab.id, error)
        }
      }
    })
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

export default IndexPopup
