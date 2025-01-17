export function log(...params: unknown[]) {
  // alert(text)
  console.log("🍉🍉🍉🍉", ...params)
  // debugger
}

export function error(...params: unknown[]) {
  // alert(text)
  console.error("🔴🔴 🍉🍉🍉🍉 🔴🔴", ...params)
  // debugger
}

export function warn(...params: unknown[]) {
  // alert(text)
  console.warn("⚠️⚠️⚠️ 🍉🍉🍉🍉 ⚠️⚠️⚠️", ...params)
  // debugger
}

export function getMainDomain(url: string) {
  try {
    const { hostname } = new URL(url) // Get the hostname from the URL

    // Regular expression to extract the main domain from the hostname
    const domainPattern = /([a-z0-9-]+\.[a-z]{2,})$/i

    // Match the pattern against the hostname
    const match = hostname.match(domainPattern)

    if (match) {
      return match[0] // Return the main domain (second-level + top-level domain)
    }
    return "" // If no match is found
  } catch (e) {
    error("Invalid URL:", e)
    return ""
  }
}
