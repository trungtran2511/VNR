import { useState } from "react";
import { ChevronsDownUp, ChevronsUpDown, Minus, Plus, Layers } from "lucide-react";
import { MINDMAPS, type MindNode, type MindmapItem } from "../lib/mindmapData";
import { SegmentedControl } from "./ui/segmented-control";
import { AppButton } from "./ui/app-button";

function collectIds(n: MindNode): string[] {
  return [n.id, ...(n.children ?? []).flatMap(collectIds)];
}

function Branch({ node, closed, toggle, depth }: { node: MindNode; closed: Set<string>; toggle: (id: string) => void; depth: number }) {
  const kids = node.children ?? [];
  const isClosed = closed.has(node.id);
  return (
    <div className="mm-branch">
      <div className="mm-node-wrap">
        <button
          className={`mm-node mm-depth-${Math.min(depth, 3)}`}
          onClick={() => kids.length && toggle(node.id)}
          aria-expanded={kids.length ? !isClosed : undefined}
        >
          <span className="font-medium">{node.label}</span>
          {node.note && <span className="mm-note">{node.note}</span>}
          {kids.length > 0 && <span className="mm-count">{isClosed ? `+${kids.length}` : "−"}</span>}
        </button>
      </div>
      {kids.length > 0 && !isClosed && (
        <div className="mm-children">
          {kids.map((k) => (
            <Branch key={k.id} node={k} closed={closed} toggle={toggle} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const CHAPTER_FILTERS = ["Tất cả", "Nhập môn", "Chương 1", "Chương 2", "Chương 3"] as const;
type ChapterFilter = (typeof CHAPTER_FILTERS)[number];

/** Sơ đồ tư duy thu gọn/mở rộng từng nhánh, có zoom và phân loại theo chương giáo trình. */
export default function MindmapView() {
  const [selectedChapter, setSelectedChapter] = useState<ChapterFilter>("Tất cả");
  const [mapId, setMapId] = useState(MINDMAPS[0].id);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);

  const filteredMaps = selectedChapter === "Tất cả"
    ? MINDMAPS
    : MINDMAPS.filter((m) => m.chapter === selectedChapter);

  const map = MINDMAPS.find((m) => m.id === mapId) ?? filteredMaps[0] ?? MINDMAPS[0];

  const handleSelectMap = (id: string) => {
    setMapId(id);
    setClosed(new Set());
  };

  const handleFilterChapter = (chap: ChapterFilter) => {
    setSelectedChapter(chap);
    if (chap !== "Tất cả") {
      const matchInChapter = MINDMAPS.find((m) => m.chapter === chap);
      if (matchInChapter && map.chapter !== chap) {
        handleSelectMap(matchInChapter.id);
      }
    }
  };

  const toggle = (id: string) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      <header className="border-b border-border pb-6 space-y-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="box lbl text-primary border-primary">SƠ ĐỒ TƯ DUY</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium">
              {map.chapter}
            </span>
            {map.period && (
              <span className="text-xs px-2 py-0.5 rounded border border-border bg-muted/40 text-muted-foreground font-mono">
                {map.period}
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-auto hidden sm:inline-block">
              {MINDMAPS.length} sơ đồ chuẩn giáo trình
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-primary">{map.title}</h1>
          <p className="text-sm text-muted-foreground">
            Bấm vào từng nút để thu gọn/mở rộng nhánh chi tiết. Dùng bộ điều khiển bên dưới để phóng to, thu nhỏ hoặc lọc theo chương.
          </p>
        </div>

        {/* Lọc theo chương giáo trình */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Layers className="size-3.5" /> Lọc theo chương:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CHAPTER_FILTERS.map((chap) => {
                const count = chap === "Tất cả" ? MINDMAPS.length : MINDMAPS.filter((m) => m.chapter === chap).length;
                const isActive = selectedChapter === chap;
                return (
                  <button
                    key={chap}
                    onClick={() => handleFilterChapter(chap)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-medium shadow-sm"
                        : "bg-muted/40 hover:bg-muted text-foreground/80 border border-border/60"
                    }`}
                  >
                    {chap} <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Danh sách sơ đồ trong chương */}
          <div className="flex flex-wrap items-center gap-2">
            <SegmentedControl
              ariaLabel="Chọn sơ đồ tư duy"
              items={filteredMaps.map((m: MindmapItem) => ({
                key: m.id,
                label: m.shortLabel,
                active: map.id === m.id,
                onSelect: () => handleSelectMap(m.id)
              }))}
            />
          </div>
        </div>

        {/* Thanh công cụ phóng to / thu nhỏ / mở rộng */}
        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-border/40">
          <span className="text-xs text-muted-foreground mr-1">Điều khiển:</span>
          <AppButton
            variant="outline"
            size="xs"
            aria-label="Thu nhỏ"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))}
            icon={<Minus className="size-3" strokeWidth={1.5} />}
          />
          <span className="lbl text-muted-foreground tabular-nums w-10 text-center">{Math.round(zoom * 100)}%</span>
          <AppButton
            variant="outline"
            size="xs"
            aria-label="Phóng to"
            onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))}
            icon={<Plus className="size-3" strokeWidth={1.5} />}
          />
          <AppButton
            variant="outline"
            size="xs"
            onClick={() => setClosed(new Set(collectIds(map.root).slice(1)))}
            icon={<ChevronsDownUp className="size-3" strokeWidth={1.5} />}
          >
            THU GỌN
          </AppButton>
          <AppButton
            variant="outline"
            size="xs"
            onClick={() => setClosed(new Set())}
            icon={<ChevronsUpDown className="size-3" strokeWidth={1.5} />}
          >
            MỞ HẾT
          </AppButton>
        </div>
      </header>

      {/* Vùng hiển thị sơ đồ nhánh */}
      <div className="mm-scroll">
        <div className="mm-canvas" style={{ transform: `scale(${zoom})` }}>
          <Branch node={map.root} closed={closed} toggle={toggle} depth={0} />
        </div>
      </div>
    </div>
  );
}
