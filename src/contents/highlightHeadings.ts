import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN"
}

function updateHighlights(isEnabled: boolean) {
  console.log("Updating highlights:", isEnabled)

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

// Ensure highlights start off
updateHighlights(false)

window.addEventListener("message", (event) => {
  if (event.data.type === "TOGGLE_HIGHLIGHTS") {
    console.log("Received new state:", event.data.isEnabled)
    updateHighlights(event.data.isEnabled)
  }
})
