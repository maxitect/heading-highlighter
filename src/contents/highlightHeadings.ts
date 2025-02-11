import { sendToBackground } from "@plasmohq/messaging"

function updateHighlights(isEnabled: boolean) {
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
    const heading = el as HTMLElement

    if (isEnabled) {
      heading.style.setProperty("background-color", "blue", "important")
      heading.style.setProperty("color", "white", "important")

      if (!heading.dataset.originalText) {
        heading.dataset.originalText = heading.textContent || ""
      }

      heading.textContent = `<${heading.tagName}> ${heading.dataset.originalText}`
    } else {
      heading.style.removeProperty("background-color")
      heading.style.removeProperty("color")

      if (heading.dataset.originalText) {
        heading.textContent = heading.dataset.originalText
      }
    }
  })
}

window.addEventListener("load", async () => {
  const response = await sendToBackground({
    name: "toggleState",
    body: { action: "get" }
  })
  updateHighlights(response.isEnabled ?? false)
})

window.addEventListener("message", (event) => {
  if (event.data.type === "TOGGLE_HIGHLIGHTS") {
    updateHighlights(event.data.isEnabled)
  }
})
