import { useEffect, useState, useMemo, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Shield,
  Swords,
  Star,
  Truck,
  Navigation,
  Calendar,
  User,
  Landmark,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Route,
  ChevronRight,
  Compass,
  CheckCircle2
} from "lucide-react";
import {
  ARCHIPELAGOS,
  ISLAND_DOTS,
  ISLAND_POLYS,
  MAP_CATEGORIES,
  MAP_PERIODS,
  MAP_PINS,
  PARALLEL_17_LINE,
  SAIGON_ATTACK_VECTORS,
  SEA_TRAIL_PATH,
  TRUONG_SON_PATH,
  VN_OUTLINE,
  type MapCategory,
  type MapPeriod,
  type MapPin
} from "../lib/mapData";
import { AppButton } from "./ui/app-button";

const historyImages = import.meta.glob<string>("../assets/history/*.jpg", {
  query: "?url",
  import: "default",
  eager: true
});

const S = 40;
const W = 14 * S;
const H = (23.6 - 7.2) * S;
const px = (lon: number) => (lon - 102) * S;
const py = (lat: number) => (23.6 - lat) * S;

const toPath = (pts: [number, number][]) =>
  pts.map(([lo, la], i) => `${i ? "L" : "M"}${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join(" ");

const CATEGORY_ICONS: Record<MapCategory, typeof Star> = {
  political: Star,
  campaign: Swords,
  base: Shield,
  logistics: Truck
};

/** Tạo đường cong mũi tên có hướng nối giữa 2 điểm tọa độ màn hình */
function getArrowD(x1: number, y1: number, x2: number, y2: number, curveDir = 1): string | null {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  if (dist < 26) return null;

  // Lùi đầu và đuôi mũi tên cách viền nút tròn 12px để không bị đè
  const sx = x1 + (dx / dist) * 12;
  const sy = y1 + (dy / dist) * 12;
  const ex = x2 - (dx / dist) * 14;
  const ey = y2 - (dy / dist) * 14;

  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const nx = -dy / dist;
  const ny = dx / dist;
  const intensity = Math.min(26, dist * 0.16) * curveDir;
  const cx = mx + nx * intensity;
  const cy = my + ny * intensity;

  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

export default function MapView() {
  const [selectedPeriod, setSelectedPeriod] = useState<MapPeriod>("all");
  const [showTruongSon, setShowTruongSon] = useState(true);
  const [showSeaTrail, setShowSeaTrail] = useState(true);
  const [showParallel17, setShowParallel17] = useState(true);
  const [showSaigonArrows, setShowSaigonArrows] = useState(true);
  const [showAllFlow, setShowAllFlow] = useState(false); // Mặc định chỉ hiện mũi tên mốc đang chọn để bản đồ thoáng đãng
  const [isPlaying, setIsPlaying] = useState(false);

  // Danh sách mốc lịch sử theo giai đoạn
  const visiblePins = useMemo(() => {
    if (selectedPeriod === "all") return MAP_PINS;
    return MAP_PINS.filter((p) => p.period === selectedPeriod);
  }, [selectedPeriod]);

  // Thuật toán chống đè nút (Anti-collision relaxation): Đảm bảo khoảng cách tối thiểu giữa 2 tâm nút >= 28px
  const layoutPins = useMemo(() => {
    const pts = visiblePins.map((p) => ({
      pin: p,
      x: px(p.lon),
      y: py(p.lat)
    }));

    const minDistance = 28;
    for (let iter = 0; iter < 16; iter++) {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - pts[i].x;
          const dy = pts[j].y - pts[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < minDistance && dist > 0.01) {
            const overlap = (minDistance - dist) / 2;
            const shiftX = (dx / dist) * overlap;
            const shiftY = (dy / dist) * overlap;
            pts[i].x -= shiftX;
            pts[i].y -= shiftY;
            pts[j].x += shiftX;
            pts[j].y += shiftY;
          }
        }
      }
    }
    return pts;
  }, [visiblePins]);

  const [selId, setSelId] = useState<string>(visiblePins[0]?.id || MAP_PINS[0].id);
  const [speaking, setSpeaking] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Đảm bảo mốc được chọn luôn thuộc danh sách hợp lệ
  useEffect(() => {
    if (!visiblePins.some((p) => p.id === selId)) {
      if (visiblePins.length > 0) {
        setSelId(visiblePins[0].id);
      }
    }
  }, [visiblePins, selId]);

  const currentIndex = visiblePins.findIndex((p) => p.id === selId);
  const currentLayoutPin = layoutPins[currentIndex >= 0 ? currentIndex : 0] || layoutPins[0];
  const pin: MapPin = currentLayoutPin?.pin || MAP_PINS[0];
  const ActiveCategoryIcon = CATEGORY_ICONS[pin.category];

  const prevPin: MapPin | null = currentIndex > 0 ? visiblePins[currentIndex - 1] : null;
  const nextPin: MapPin | null = currentIndex < visiblePins.length - 1 ? visiblePins[currentIndex + 1] : null;

  // Cuộn thanh tiến trình tới mốc đang chọn
  useEffect(() => {
    if (timelineRef.current) {
      const activeEl = timelineRef.current.querySelector<HTMLElement>(`[data-pin-id="${pin.id}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [pin.id]);

  // Tự động chạy tiến trình lịch sử (Auto-play tour)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSelId((curr) => {
        const idx = visiblePins.findIndex((p) => p.id === curr);
        if (idx === -1 || idx >= visiblePins.length - 1) {
          setIsPlaying(false);
          return visiblePins[0]?.id || curr;
        }
        return visiblePins[idx + 1].id;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, visiblePins]);

  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

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
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const currentImg = historyImages[`../assets/history/${pin.image}.jpg`];

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-16">
      {/* Tiêu đề & Giới thiệu học thuật */}
      <header className="border-b border-border pb-4 space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="box lbl text-primary border-primary">BẢN ĐỒ CHIẾN LƯỢC TOÀN CẢNH</span>
          <span className="w-8 h-px bg-primary" />
          <span className="lbl text-muted-foreground font-semibold">TIẾN TRÌNH THỐNG NHẤT 1930 – 1975</span>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-semibold text-primary">
          Bản Đồ Chiến Dịch & Dòng Chảy Tiến Trình Lịch Sử
        </h1>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Hệ thống mốc lịch sử được bố trí khoa học, chống đè nút với các mũi tên liên kết dòng sự kiện
          đưa 2 miền Nam - Bắc đến thắng lợi trọn vẹn.
        </p>
      </header>

      {/* BIỂU ĐỒ DÒNG SỰ KIỆN LIÊN KẾT (TIMELINE FLOWCHART BAR) */}
      <div className="p-3.5 rounded-xl border border-primary/25 bg-card/90 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              Dòng sự kiện ({currentIndex + 1} / {visiblePins.length}):
            </span>
            <span className="text-xs text-primary font-bold hidden sm:inline">
              {pin.name} ({pin.year})
            </span>
          </div>

          {/* Cụm nút điều khiển tiến trình: Lùi, Tự động chạy, Tiến */}
          <div className="flex items-center gap-2">
            <AppButton
              variant="outline"
              size="xs"
              onClick={() => prevPin && select(prevPin.id)}
              disabled={!prevPin}
              icon={<ArrowLeft className="size-3.5" />}
            >
              Mốc trước
            </AppButton>
            <AppButton
              variant={isPlaying ? "primary" : "outline"}
              size="xs"
              onClick={() => setIsPlaying(!isPlaying)}
              icon={isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            >
              {isPlaying ? "Tạm dừng" : "Tự động chạy"}
            </AppButton>
            <AppButton
              variant="outline"
              size="xs"
              onClick={() => nextPin && select(nextPin.id)}
              disabled={!nextPin}
              icon={<ArrowRight className="size-3.5" />}
            >
              Mốc tiếp theo
            </AppButton>
          </div>
        </div>

        {/* Thanh cuộn ngang các nút sự kiện có đường mũi tên kết nối liên tục */}
        <div
          ref={timelineRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin select-none"
        >
          {visiblePins.map((p, idx) => {
            const isCurrent = p.id === pin.id;
            const isPast = idx < currentIndex;
            const cat = MAP_CATEGORIES[p.category];

            return (
              <div key={p.id} className="flex items-center gap-2 shrink-0">
                <button
                  data-pin-id={p.id}
                  onClick={() => select(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-left border transition-all flex flex-col gap-0.5 ${
                    isCurrent
                      ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30 font-bold"
                      : isPast
                      ? "border-border bg-muted/60 text-foreground hover:bg-muted"
                      : "border-border/60 bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5 text-[11px]">
                    <span className="font-mono font-bold">{idx + 1}. {p.year}</span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isCurrent ? "#ffffff" : cat.color }}
                    />
                  </div>
                  <div className="text-xs font-medium max-w-[140px] truncate">
                    {p.name.split("(")[0].trim()}
                  </div>
                </button>

                {idx < visiblePins.length - 1 && (
                  <ChevronRight
                    className={`size-4 shrink-0 transition-colors ${
                      idx < currentIndex ? "text-primary stroke-[2.5]" : "text-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Thanh công cụ lọc giai đoạn & bật/tắt tuyến chiến lược */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
            Giai đoạn:
          </span>
          {MAP_PERIODS.map((period) => {
            const active = selectedPeriod === period.id;
            return (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-1 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {period.label}
              </button>
            );
          })}
        </div>

        {/* Các tùy chọn hiển thị trên bản đồ */}
        <div className="flex flex-wrap items-center gap-3.5 text-xs text-muted-foreground pt-2 lg:pt-0 border-t lg:border-t-0 border-border w-full lg:w-auto">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none font-semibold text-foreground">
            <input
              type="checkbox"
              checked={showAllFlow}
              onChange={(e) => setShowAllFlow(e.target.checked)}
              className="accent-primary rounded"
            />
            <Route className="size-3.5 text-primary" /> Hiện toàn bộ mũi tên
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
            <input
              type="checkbox"
              checked={showTruongSon}
              onChange={(e) => setShowTruongSon(e.target.checked)}
              className="accent-primary rounded"
            />
            Đường 559
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
            <input
              type="checkbox"
              checked={showSeaTrail}
              onChange={(e) => setShowSeaTrail(e.target.checked)}
              className="accent-primary rounded"
            />
            Đường biển
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
            <input
              type="checkbox"
              checked={showParallel17}
              onChange={(e) => setShowParallel17(e.target.checked)}
              className="accent-primary rounded"
            />
            Vĩ tuyến 17
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-foreground select-none">
            <input
              type="checkbox"
              checked={showSaigonArrows}
              onChange={(e) => setShowSaigonArrows(e.target.checked)}
              className="accent-primary rounded"
            />
            5 cánh quân 1975
          </label>
        </div>
      </div>

      {/* Khung nội dung chính: Bản đồ SVG (trái) và Chi tiết Tư liệu (phải) */}
      <div className="grid gap-7 lg:grid-cols-[minmax(360px,580px)_1fr] items-start">
        {/* Cột Bản đồ SVG tương tác (ĐÃ CỐ ĐỊNH TỌA ĐỘ - KHÔNG GIẬT) */}
        <div className="p-4 md:p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm relative overflow-hidden shadow-inner">
          <div className="absolute top-4 right-4 z-10 text-[11px] text-muted-foreground bg-background/85 px-2.5 py-1 rounded-md border border-border flex items-center gap-1.5 pointer-events-none">
            <Compass className="size-3 text-primary" /> Mốc {currentIndex + 1} / {visiblePins.length}
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="group"
            aria-label="Bản đồ Địa danh Chiến dịch Lịch sử Việt Nam"
            className="w-full h-auto max-h-[76vh] select-none mx-auto block"
          >
            <defs>
              <linearGradient id="vn-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--muted)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--card)" stopOpacity="0.95" />
              </linearGradient>
              {/* Đầu mũi tên tiến trình lịch sử (đang hoạt động) */}
              <marker
                id="flow-arrow-active"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#dc2626" />
              </marker>
              {/* Đầu mũi tên tiến trình lịch sử (toàn cảnh) */}
              <marker
                id="flow-arrow-dim"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" opacity="0.65" />
              </marker>
              <marker
                id="arrow-red"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* Vùng lãnh thổ đất liền Việt Nam */}
            <path
              d={`${toPath(VN_OUTLINE)} Z`}
              fill="url(#vn-fill)"
              stroke="var(--border)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Các đảo lớn */}
            {ISLAND_POLYS.map((poly, i) => (
              <path
                key={i}
                d={`${toPath(poly)} Z`}
                fill="url(#vn-fill)"
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            ))}

            {/* Các đảo nhỏ danh tiếng */}
            {ISLAND_DOTS.map((d) => (
              <g key={d.name} pointerEvents="none">
                <circle cx={px(d.lon)} cy={py(d.lat)} r="2.5" fill="var(--primary)" opacity="0.85" />
                <text
                  x={px(d.lon) + 5}
                  y={py(d.lat) + 3}
                  fontSize="8"
                  fill="var(--foreground)"
                  fontWeight="500"
                  opacity="0.8"
                >
                  {d.name}
                </text>
              </g>
            ))}

            {/* Quần đảo Hoàng Sa và Trường Sa thiêng liêng */}
            {ARCHIPELAGOS.map((a) => (
              <g key={a.name} pointerEvents="none">
                {a.islets.map(([lo, la], i) => (
                  <circle
                    key={i}
                    cx={px(lo)}
                    cy={py(la)}
                    r="2.6"
                    fill="#e11d48"
                    opacity="0.85"
                  />
                ))}
                <text
                  x={px(a.labelAt[0])}
                  y={py(a.labelAt[1])}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#e11d48"
                  fontWeight="700"
                >
                  {a.name}
                </text>
              </g>
            ))}

            {/* Nhãn địa lý lân cận */}
            <text x={px(112.8)} y={py(13.6)} textAnchor="middle" fontSize="12" letterSpacing="4" fill="var(--muted-foreground)" opacity="0.6" fontWeight="600" pointerEvents="none">
              BIỂN ĐÔNG
            </text>
            <text x={px(103.2)} y={py(18.2)} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" opacity="0.6" pointerEvents="none">
              LÀO
            </text>
            <text x={px(105.2)} y={py(12.3)} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" opacity="0.6" pointerEvents="none">
              CAMPUCHIA
            </text>
            <text x={px(104.7)} y={py(23.5)} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" opacity="0.6" pointerEvents="none">
              TRUNG QUỐC
            </text>

            {/* Tuyến đường bộ Hồ Chí Minh (Trường Sơn 559) */}
            {showTruongSon && (
              <g pointerEvents="none">
                <path
                  d={toPath(TRUONG_SON_PATH)}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.2"
                  strokeDasharray="5 4"
                  opacity="0.85"
                />
                <text x={px(105.8)} y={py(17.8)} fontSize="8" fill="#d97706" fontWeight="600" opacity="0.9">
                  Đoàn 559 Trường Sơn
                </text>
              </g>
            )}

            {/* Tuyến đường Hồ Chí Minh trên biển (Tàu không số) */}
            {showSeaTrail && (
              <g pointerEvents="none">
                <path
                  d={toPath(SEA_TRAIL_PATH)}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.75"
                />
                <text x={px(110.6)} y={py(14.8)} fontSize="8" fill="#2563eb" fontWeight="600" opacity="0.9">
                  Đường biển Tàu Không Số
                </text>
              </g>
            )}

            {/* Giới tuyến Vĩ tuyến 17 (Cầu Hiền Lương - Sông Bến Hải) */}
            {showParallel17 && (
              <g pointerEvents="none">
                <path
                  d={toPath(PARALLEL_17_LINE)}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeDasharray="3 3"
                />
                <circle cx={px(107.03)} cy={py(17.01)} r="3" fill="#dc2626" />
                <text x={px(107.35)} y={py(17.01) + 3} fontSize="8" fill="#dc2626" fontWeight="700">
                  Vĩ tuyến 17 (Cầu Hiền Lương)
                </text>
              </g>
            )}

            {/* 5 Cánh quân giải phóng Sài Gòn 1975 */}
            {showSaigonArrows && (selectedPeriod === "all" || selectedPeriod === "1954-1975" || pin.id === "dinhdoclap") && (
              <g opacity="0.9" pointerEvents="none">
                {SAIGON_ATTACK_VECTORS.map((vec, idx) => (
                  <line
                    key={idx}
                    x1={px(vec.from[0])}
                    y1={py(vec.from[1])}
                    x2={px(vec.to[0])}
                    y2={py(vec.to[1])}
                    stroke="#dc2626"
                    strokeWidth="2.2"
                    markerEnd="url(#arrow-red)"
                  />
                ))}
              </g>
            )}

            {/* HỆ THỐNG MŨI TÊN TIẾN TRÌNH LỊCH SỬ NỐI TIẾP NHAU TRỰC TIẾP TRÊN BẢN ĐỒ */}
            <g pointerEvents="none">
              {layoutPins.slice(0, -1).map((ptFrom, idx) => {
                const ptTo = layoutPins[idx + 1];
                const curveDir = idx % 2 === 0 ? 1 : -1;
                const arrowD = getArrowD(ptFrom.x, ptFrom.y, ptTo.x, ptTo.y, curveDir);
                if (!arrowD) return null;

                const isIncomingToCurrent = ptTo.pin.id === pin.id;
                const isOutgoingFromCurrent = ptFrom.pin.id === pin.id;
                const isHighlight = isIncomingToCurrent || isOutgoingFromCurrent;

                // Nếu không bật showAllFlow thì chỉ hiện mũi tên liên quan mốc hiện tại
                if (!showAllFlow && !isHighlight) return null;

                return (
                  <path
                    key={`flow-${ptFrom.pin.id}-${ptTo.pin.id}`}
                    d={arrowD}
                    fill="none"
                    stroke={isHighlight ? "#dc2626" : "#d97706"}
                    strokeWidth={isHighlight ? "2.6" : "1.4"}
                    strokeDasharray={isHighlight ? "4 3" : "3 3"}
                    opacity={isHighlight ? 1 : 0.4}
                    markerEnd={isHighlight ? "url(#flow-arrow-active)" : "url(#flow-arrow-dim)"}
                  />
                );
              })}
            </g>

            {/* CÁC ĐIỂM GHIM SỰ KIỆN LỊCH SỬ ĐÃ ĐƯỢC CHỐNG ĐÈ NÚT BẰNG THUẬT TOÁN RELAXATION */}
            {layoutPins.map((item, i) => {
              const p = item.pin;
              const on = p.id === selId;
              const cat = MAP_CATEGORIES[p.category];

              return (
                <g
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.name}, ${p.year}`}
                  className="cursor-pointer focus:outline-none"
                  onClick={() => select(p.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && select(p.id)}
                >
                  {/* Quầng sáng tĩnh nhẹ khi được chọn */}
                  {on && (
                    <circle
                      cx={item.x}
                      cy={item.y}
                      r="16"
                      fill={cat.color}
                      opacity="0.25"
                      pointerEvents="none"
                    />
                  )}
                  {/* Vòng tròn điểm ghim chính */}
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={on ? 12 : 9.5}
                    fill={on ? cat.color : "var(--card)"}
                    stroke={cat.color}
                    strokeWidth={on ? 2.5 : 1.8}
                  />
                  {/* Nhãn số thứ tự */}
                  <text
                    x={item.x}
                    y={item.y + 3.5}
                    textAnchor="middle"
                    fontSize={on ? "10" : "8.5"}
                    fontWeight="700"
                    fill={on ? "#ffffff" : cat.color}
                    pointerEvents="none"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Cột Chi tiết Sự kiện & Ảnh tư liệu lịch sử xác thực */}
        <article
          key={pin.id}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm"
        >
          {/* Header thông tin mốc & Bước tiến trình */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: MAP_CATEGORIES[pin.category].bg,
                  color: MAP_CATEGORIES[pin.category].color
                }}
              >
                <ActiveCategoryIcon className="size-3" />
                {pin.categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <Calendar className="size-3.5 text-primary" /> {pin.date}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary">
                Mốc {currentIndex + 1} / {visiblePins.length}
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              {pin.name}
            </h2>

            {pin.defeatedStrategy && (
              <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <Swords className="size-3.5" /> {pin.defeatedStrategy}
              </div>
            )}
          </div>

          {/* Vị trí mắt xích trong tiến trình lịch sử (Mốc trước -> Mốc này -> Mốc sau) */}
          <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Route className="size-3.5 text-primary" /> Mắt xích dòng thời gian:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-card border border-border/80">
                <span className="text-muted-foreground text-[10px] block">Mốc trước đó:</span>
                {prevPin ? (
                  <button
                    onClick={() => select(prevPin.id)}
                    className="font-semibold text-foreground hover:text-primary transition-colors text-left truncate block w-full"
                  >
                    ← {prevPin.year}: {prevPin.name.split("(")[0].trim()}
                  </button>
                ) : (
                  <span className="text-muted-foreground italic">Khởi đầu tiến trình</span>
                )}
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/80">
                <span className="text-muted-foreground text-[10px] block">Mốc kế tiếp:</span>
                {nextPin ? (
                  <button
                    onClick={() => select(nextPin.id)}
                    className="font-semibold text-foreground hover:text-primary transition-colors text-left truncate block w-full"
                  >
                    → {nextPin.year}: {nextPin.name.split("(")[0].trim()}
                  </button>
                ) : (
                  <span className="text-primary font-bold inline-flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> Toàn thắng thống nhất non sông
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Khung ảnh tư liệu lịch sử thật */}
          {currentImg ? (
            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
                <img
                  src={currentImg}
                  alt={`Tư liệu lịch sử: ${pin.name}`}
                  className="w-full max-h-[340px] object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide uppercase flex items-center gap-1.5 shadow">
                  <Star className="size-3 fill-amber-300" /> Ảnh tư liệu lịch sử
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed px-1">
                {pin.imageCaption}
              </p>
            </div>
          ) : (
            <div className="h-40 rounded-xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
              Đang đồng bộ ảnh tư liệu...
            </div>
          )}

          {/* Khối Lãnh đạo & Di tích ngày nay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-border/80 bg-muted/40 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <User className="size-3.5 text-primary" /> Chỉ huy / Lãnh đạo
              </div>
              <div className="text-sm font-semibold text-foreground">{pin.leader}</div>
            </div>

            <div className="p-3 rounded-lg border border-border/80 bg-muted/40 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Landmark className="size-3.5 text-primary" /> Di tích hiện nay
              </div>
              <div className="text-sm text-foreground/90 font-medium line-clamp-2">{pin.monument}</div>
            </div>
          </div>

          {/* Diễn biến tóm lược */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Diễn biến lịch sử
            </h3>
            <p className="font-body text-[15px] leading-[1.75] text-foreground text-justify">
              {pin.summary}
            </p>
          </div>

          {/* Ý nghĩa chiến lược */}
          <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Swords className="size-3.5" /> Ý nghĩa chiến lược cốt lõi
            </div>
            <p className="text-[14px] leading-relaxed text-foreground font-medium">
              {pin.strategic}
            </p>
          </div>

          {/* Nút nghe thuyết minh Audio */}
          {canSpeak && (
            <div className="pt-1">
              <AppButton
                variant={speaking ? "primary" : "outline"}
                size="sm"
                onClick={speak}
                icon={
                  speaking ? (
                    <VolumeX className="size-3.5" strokeWidth={1.5} />
                  ) : (
                    <Volume2 className="size-3.5" strokeWidth={1.5} />
                  )
                }
              >
                {speaking ? "DỪNG THUYẾT MINH" : "NGHE THUYẾT MINH LỊCH SỬ"}
              </AppButton>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
