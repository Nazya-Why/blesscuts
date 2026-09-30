const number = new Intl.NumberFormat("uk-UA");

/** "1200" → "1 200 ₴", "від 700" → "від 700 ₴", "3500–4000" → "3 500–4 000 ₴" (нерозривні пробіли) */
export function formatPrice(raw: string): string {
  return (
    raw
      .replace(/\d+/g, (n) => number.format(Number(n)))
      .replace(/\s+/g, " ") + " ₴"
  );
}
