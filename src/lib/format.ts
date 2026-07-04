/** Format a USD amount the way the storefront displays prices: "$2,480". */
export function money(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US')
}
