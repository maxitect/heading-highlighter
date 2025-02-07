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
      heading.style.backgroundColor = "blue"
    } else {
      heading.style.removeProperty("background-color")
    }
  })
}

updateHighlights(false)

window.addEventListener("message", (event) => {
  if (event.data.type === "TOGGLE_HIGHLIGHTS") {
    console.log("Received new state:", event.data.isEnabled)
    updateHighlights(event.data.isEnabled)
  }
})
