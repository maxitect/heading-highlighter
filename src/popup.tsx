import "~style.css"

import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import Toggle from "~features/toggle"

export default function IndexPopup() {
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchStoredState = async () => {
      const response = await sendToBackground({
        name: "toggleState",
        body: { action: "get" }
      })
      setIsEnabled(response.isEnabled ?? false)
    }

    fetchStoredState()
  }, [])

  async function handleEnabledClick() {
    if (isEnabled === null) return

    const newState = !isEnabled
    setIsEnabled(newState)

    await sendToBackground({
      name: "toggleState",
      body: { action: "set", isEnabled: newState }
    })

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
        } catch (error) {
          console.error("Error sending to tab:", tab.id, error)
        }
      }
    })
  }

  if (isEnabled === null) return null

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
