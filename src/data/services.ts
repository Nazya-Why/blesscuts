// Рівні (порядок табів) і хто на якому рівні
export const levels = [
  { id: "art",    label: "Арт-директор",     barbers: "Денис" },
  { id: "amb",    label: "Амбасадор",        barbers: "Михайло" },
  { id: "prime",  label: "Прайм-майстер",    barbers: "Андрій" },
  { id: "senior", label: "Старший майстер",  barbers: "Інна, Мар’ян" },
  { id: "master", label: "Майстер",          barbers: "Вадим" },
  { id: "junior", label: "Молодший майстер", barbers: "Вікторія, Павло" },
] as const;

export type LevelId = (typeof levels)[number]["id"];

export type Service = {
  name: string;
  note: string;
  /** Ціни в гривнях у порядку `levels`; `null` — послуги на цьому рівні немає */
  prices: (string | null)[];
};

// Порядок цін: [art, amb, prime, senior, master, junior]
// Примітка для власника: у старому прайсі були дублі «Камуфлювання бороди»
// в Амбасадора (600/500) і Майстра (400/500) — взято перше значення. Перевірити перед запуском.
export const services: Service[] = [
  { name: "Стрижка голови",             note: "",                prices: ["1200","1000","900","800","600","500"] },
  { name: "Стрижка бороди та вус",      note: "",                prices: ["800","800","600","600","500","400"] },
  { name: "Стрижка голови + борода",    note: "Комплекс",        prices: ["1800","1600","1500","1300","1050","800"] },
  { name: "Стрижка ножицями",           note: "Подовжена форма", prices: ["1500","1300","1100","1000","700","650"] },
  { name: "Стрижка машинкою",           note: "",                prices: ["800","800","700","600","450","400"] },
  { name: "Стрижка машинкою + борода",  note: "Комплекс",        prices: ["1600",null,"1200","1000","750","650"] },
  { name: "Камуфлювання сивини",        note: "Голова",          prices: ["від 700","від 700","від 600","від 500","від 450","від 450"] },
  { name: "Камуфлювання бороди",        note: "",                prices: ["від 600","від 600","від 500","від 450","від 400","від 400"] },
  { name: "Воскове видалення волосся",  note: "",                prices: ["від 200","від 200","від 200","200","від 150","200"] },
  { name: "Миття голови + укладка",     note: "",                prices: ["250","250","200","200","200","150"] },
  { name: "Дитяча стрижка",             note: "",                prices: ["800","1000","800","800","500","500"] },
  { name: "Хімічна завивка",            note: "",                prices: ["3500–4000","3500–4000","3000–4000","3000–4000",null,"2500–3500"] },
  { name: "Висвітлення (мелірування)",  note: "",                prices: ["3000–4000","3000–4000","3000–4000","3000–4000",null,null] },
];

/** Усі числа з рядка ціни: "від 700" → [700], "3500–4000" → [3500, 4000] */
const amounts = (price: string) => (price.match(/\d+/g) ?? []).map(Number);

/** Найнижча ціна послуги серед усіх рівнів */
export function minPrice(serviceName: string): number {
  const service = services.find((s) => s.name === serviceName);
  if (!service) throw new Error(`Немає послуги «${serviceName}» у services.ts`);
  return Math.min(...service.prices.flatMap((p) => (p ? amounts(p) : [])));
}

/** Діапазон цін усього прайсу — для structured data */
export function priceSpan(): [number, number] {
  const all = services.flatMap((s) => s.prices.flatMap((p) => (p ? amounts(p) : [])));
  return [Math.min(...all), Math.max(...all)];
}
