import { error, log } from "../helpers"

import image from "./template.jpg"

// Function to generate image with text overlay
async function generateImageWithText(
  text: string,
  templateImageUrl: string
): Promise<HTMLCanvasElement> {
  const img = new Image()

  // Make sure CORS issues are handled if using cross-origin images
  img.crossOrigin = "Anonymous" // If using images from other domains

  return new Promise<HTMLCanvasElement>((resolve, reject) => {
    log("templateImageUrl")
    img.src = templateImageUrl

    img.onload = () => {
      // Create canvas after image is loaded
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        error("Canvas context not supported")
        return
      }
      // Set canvas size based on image size
      canvas.width = img.width
      canvas.height = img.height

      // Draw the template image onto the canvas
      ctx.drawImage(img, 0, 0)

      // Set text properties
      ctx.font = "bold 40px Arial"
      ctx.fillStyle = "blue"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Add text overlay to the image
      const x = canvas.width / 2
      const y = canvas.height / 2
      ctx.fillText(text, x, y)

      resolve(canvas)
    }

    img.onerror = (error) => {
      reject("Image loading failed: " + error)
    }
  })
}

// Convert canvas to a Data URL
function getImageDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png")
}

// Function to share the image
async function shareImage(imageDataUrl: string, title: string, text: string) {
  try {
    // Create a Blob object from the Data URL
    const blob = await fetch(imageDataUrl).then((res) => res.blob())

    // Create a file object for sharing
    const file = new File([blob], "generated-image.png", { type: "image/png" })

    // Use the Web Share API to share the image
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title,
        text
      })
      log("Image shared successfully!")
    } else {
      error("Sharing is not supported on this browser.")
    }
  } catch (err) {
    error("Error sharing the image:", err)
  }
}

export const share = async (
  textToOverlay: string,
  title: string,
  text: string
) => {
  try {
    // Wait for the image to be generated with text overlay
    const canvas = await generateImageWithText(textToOverlay, image)

    // Convert the generated canvas to a data URL
    const imageDataUrl = getImageDataUrl(canvas)

    // Trigger sharing functionality
    await shareImage(imageDataUrl, title, text)
  } catch (err) {
    error("Error generating or sharing the image:", err)
  }
}
