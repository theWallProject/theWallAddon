import { existsSync } from "fs"
import { mkdir, rm, writeFile } from "fs/promises"
import * as path from "path"

import { TRANSLATIONS } from "./DB.ts"

// Output directory relative to the script
const outputDir = "./locales"

// Ensure output directories exist
const ensureDirExists = async (dirPath: string) => {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true })
  }
}

// Delete the locales folder if it exists
const deleteFolderRecursive = async (folderPath: string) => {
  if (existsSync(folderPath)) {
    try {
      await rm(folderPath, { recursive: true, force: true })
      console.log(`Deleted folder: ${folderPath}`)
    } catch (err: unknown) {
      console.error(`Error deleting folder: ${err}`)
    }
  }
}

// Generate the locale files
const generateLocaleFiles = async (
  translations: Record<string, Record<string, string>>
) => {
  const languages = Object.keys(translations[Object.keys(translations)[0]])

  for (const lang of languages) {
    const messages: Record<string, { message: string }> = {}

    for (const [key, translationsForKey] of Object.entries(translations)) {
      messages[key] = { message: translationsForKey[lang] }
    }

    const langDir = path.join(outputDir, lang)
    await ensureDirExists(langDir)

    const filePath = path.join(langDir, "messages.json")
    await writeFile(filePath, JSON.stringify(messages, null, 2), "utf-8")
    console.log(`Generated: ${filePath}`)
  }
}

// Execute the generation
const main = async () => {
  await deleteFolderRecursive(outputDir)
  await generateLocaleFiles(TRANSLATIONS)
}

main().catch(console.error)
