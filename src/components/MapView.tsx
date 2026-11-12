import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { ARCHIPELAGOS, ISLAND_DOTS, ISLAND_POLYS, MAP_PINS, TRUONG_SON_PATH, VN_OUTLINE } from "../lib/mapData";
import { AppButton } from "./ui/app-button";

const covers = import.meta.glob<string>("../assets/cover-*.jpg", { query: "?url", import: "default", eager: true });

const S = 40;
const W = 14 * S;
const H = (23.6 - 7.2) * S;
const px = (lon: number) => (lon - 102) * S;
const py = (lat: number) => (23.6 - lat) * S;
const toPath = (pts: [number, number][]) => pts.map(([lo, la], i) => `${i ? "L" : "M"}${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join(" ");

/** Bản đồ cách điệu các địa danh gắn với mốc lịch sử; có thuyết minh bằng giọng đọc của trình duyệt. */
export default function MapView() {
  const [selId, setSelId] = useState(MAP_PINS[0].id);
  const [speaking, setSpeaking] = useState(false);
  const pin = MAP_PINS.find((p) => p.id === selId) ?? MAP_PINS[0];
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  const select = (id: string) => {
    if (canSpeak) window.speechSynthesis.cancel();
    setSpeaking(false);
    setSelId(id);
  };

  const speak = () => {
    if (!canSpeak) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(pin.narration);
    u.lang = "vi-VN";
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const img = covers[`../assets/cover-${pin.cover}.jpg`];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      <header className="border-b border-border pb-6 space-y-2">
        <span className="box lbl text-primary border-primary">TRA CỨU</span>
        <h1 className="font-display text-4xl font-semibold text-primary">Bản đồ địa danh lịch sử</h1>
        <p className="text-sm text-muted-foreground">Bản đồ cách điệu, không dùng để đo đạc. Bấm vào một điểm ghim để xem tư liệu.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-[minmax(300px,520px)_1fr]">
        <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Bản đồ Việt Nam cách điệu" className="w-full h-auto max-h-[78vh] justify-self-center">
          <path d={`${toPath(VN_OUTLINE)} Z`} fill="var(--muted)" stroke="var(--border)" strokeWidth="1.5" strokeLinejoin="round" />
          {ISLAND_POLYS.map((poly, i) => (
            <path key={i} d={`${toPath(poly)} Z`} fill="var(--muted)" stroke="var(--border)" strokeWidth="1.2" strokeLinejoin="round" />
          ))}
          {ISLAND_DOTS.map((d) => (
            <circle key={d.name} cx={px(d.lon)} cy={py(d.lat)} r="2" fill="var(--muted-foreground)">
              <title>{d.name}</title>
            </circle>
          ))}
          {ARCHIPELAGOS.map((a) => (
            <g key={a.name}>
              {a.islets.map(([lo, la], i) => (
                <circle key={i} cx={px(lo)} cy={py(la)} r="2" fill="var(--primary)" opacity="0.75" />
              ))}
              <text x={px(a.labelAt[0])} y={py(a.labelAt[1])} textAnchor="middle" fontSize="9.5" fill="var(--primary)" fontWeight="600">
                {a.name}
              </text>
            </g>
          ))}
          <text x={px(112.8)} y={py(13.6)} textAnchor="middle" fontSize="11" letterSpacing="3" fill="var(--muted-foreground)" opacity="0.7">BIỂN ĐÔNG</text>
          <text x={px(103.2)} y={py(18.2)} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" opacity="0.7">LÀO</text>
          <text x={px(105.2)} y={py(12.3)} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" opacity="0.7">CAMPUCHIA</text>
          <text x={px(104.7)} y={py(23.5)} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" opacity="0.7">TRUNG QUỐC</text>
          <path d={toPath(TRUONG_SON_PATH)} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
          {MAP_PINS.map((p, i) => {
            const on = p.id === selId;
            return (
              <g
                key={p.id}
                role="button"
                tabIndex={0}
                aria-label={`${p.name}, ${p.year}`}
                className="map-pin"
                onClick={() => select(p.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && select(p.id)}
              >
                <circle cx={px(p.lon)} cy={py(p.lat)} r={on ? 11 : 9} fill={on ? "var(--primary)" : "var(--card)"} stroke="var(--primary)" strokeWidth="1.5" />
                <text x={px(p.lon)} y={py(p.lat) + 3.5} textAnchor="middle" fontSize="10" fontWeight="600" fill={on ? "var(--primary-foreground)" : "var(--primary)"}>
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <article key={pin.id} className="view-enter space-y-5">
          <div className="flex items-baseline gap-3">
            <span className="lbl text-primary">{pin.year}</span>
            <h2 className="font-display text-3xl font-semibold text-foreground">{pin.name}</h2>
          </div>
          {img && <img src={img} alt={`Minh họa: ${pin.name}`} className="w-full max-w-sm aspect-square object-cover border border-border" />}
          <p className="font-body text-[16px] leading-[1.8] text-foreground">{pin.summary}</p>
          <p className="font-body text-[15.5px] leading-[1.75] text-foreground">
            <span className="lbl text-primary mr-2">Ý NGHĨA CHIẾN LƯỢC</span>
            {pin.strategic}
          </p>
          {canSpeak && (
            <AppButton variant={speaking ? "primary" : "outline"} size="sm" onClick={speak} icon={speaking ? <VolumeX className="size-3.5" strokeWidth={1.5} /> : <Volume2 className="size-3.5" strokeWidth={1.5} />}>
              {speaking ? "DỪNG THUYẾT MINH" : "NGHE THUYẾT MINH"}
            </AppButton>
          )}
          <p className="text-xs text-muted-foreground">Ảnh là minh họa tạo bằng AI, không phải tư liệu gốc.</p>
          <ol className="flex flex-wrap gap-2 pt-2">
            {MAP_PINS.map((p, i) => (
              <li key={p.id}>
                <button onClick={() => select(p.id)} className={`box lbl ${p.id === selId ? "text-primary border-primary" : "text-muted-foreground"}`}>
                  {i + 1} · {p.year}
                </button>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </div>
  );
}
