import * as fs from "fs"
import * as path from "path"

import { TRANSLATIONS } from "./DB.ts"

// Output directory relative to the script
const outputDir = "./locales"

// Ensure output directories exist
const ensureDirExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Delete the locales folder if it exists
const deleteFolderRecursive = (folderPath: string) => {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true })
    console.log(`Deleted folder: ${folderPath}`)
  }
}

// Generate the locale files
const generateLocaleFiles = (
  translations: Record<string, Record<string, string>>
) => {
  const languages = Object.keys(translations[Object.keys(translations)[0]])

  languages.forEach((lang) => {
    const messages: Record<string, { message: string }> = {}

    for (const [key, translationsForKey] of Object.entries(translations)) {
      messages[key] = { message: translationsForKey[lang] }
    }

    const langDir = path.join(outputDir, lang)
    ensureDirExists(langDir)

    const filePath = path.join(langDir, "messages.json")
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf-8")
    console.log(`Generated: ${filePath}`)
  })
}

// Execute the generation
deleteFolderRecursive(outputDir)
generateLocaleFiles(TRANSLATIONS)
