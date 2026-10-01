// «Зараз відкрито · до 20:00» / «Зараз зачинено · відкриємося о 10:00» за часом Львова.
// Працює для всіх елементів [data-open-status data-opens="10:00" data-closes="20:00"]
// з дочірнім [data-status-text]; стан пише в data-state="open|closed".
const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function kyivClock(): Intl.DateTimeFormat {
  const options = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" } as const;
  try {
    return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "Europe/Kyiv" });
  } catch {
    return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "Europe/Kiev" });
  }
}

const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-open-status]"));

if (elements.length) {
  const clock = kyivClock();
  const update = () => {
    const parts = clock.formatToParts(new Date());
    const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
    const now = part("hour") * 60 + part("minute");
    for (const el of elements) {
      const { opens = "", closes = "" } = el.dataset;
      const open = now >= minutes(opens) && now < minutes(closes);
      el.dataset.state = open ? "open" : "closed";
      const text = el.querySelector<HTMLElement>("[data-status-text]");
      if (text) text.textContent = open ? `Зараз відкрито · до ${closes}` : `Зараз зачинено · відкриємося о ${opens}`;
    }
  };
  update();
  setInterval(update, 60_000);
}
