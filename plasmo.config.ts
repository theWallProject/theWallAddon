import { defineConfig } from "vite"
// @ts-expect-error
import gltf from "vite-plugin-gltf"

throw new Error("This is a test error")
export default defineConfig({
  plugins: [gltf()], // Add the GLTF plugin
  assetsInclude: ["**/*.gltf", "**/*.glb"] // Ensure Vite handles .gltf and .glb as assets
})
