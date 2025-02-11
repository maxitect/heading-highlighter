import type { PlasmoMessaging } from "@plasmohq/messaging"

const storageKey = "isEnabled"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (req.body?.action === "get") {
    const storedState = await chrome.storage.sync.get(storageKey)
    res.send({ isEnabled: storedState[storageKey] ?? false })
  } else if (
    req.body?.action === "set" &&
    typeof req.body.isEnabled === "boolean"
  ) {
    await chrome.storage.sync.set({ [storageKey]: req.body.isEnabled })
    res.send({ success: true })
  } else {
    res.send({ success: false, error: "Invalid request" })
  }
}

export default handler
