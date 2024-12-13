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
  console.error("⚠️⚠️⚠️ 🍉🍉🍉🍉 ⚠️⚠️⚠️", ...params)
  // debugger
}
