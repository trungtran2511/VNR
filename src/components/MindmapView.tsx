import { useState } from "react";
import { ChevronsDownUp, ChevronsUpDown, Minus, Plus } from "lucide-react";
import { MINDMAPS, type MindNode } from "../lib/mindmapData";
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

/** Sơ đồ tư duy thu gọn/mở rộng từng nhánh, có zoom. */
export default function MindmapView() {
  const [mapId, setMapId] = useState(MINDMAPS[0].id);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const map = MINDMAPS.find((m) => m.id === mapId) ?? MINDMAPS[0];

  const toggle = (id: string) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      <header className="border-b border-border pb-6 space-y-4">
        <div className="space-y-2">
          <span className="box lbl text-primary border-primary">SƠ ĐỒ TƯ DUY</span>
          <h1 className="font-display text-4xl font-semibold text-primary">{map.title}</h1>
          <p className="text-sm text-muted-foreground">Bấm vào một nút để thu gọn hoặc mở rộng nhánh. Dùng nút +/− để phóng to, thu nhỏ.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedControl
            ariaLabel="Chọn sơ đồ"
            items={MINDMAPS.map((m) => ({
              key: m.id,
              label: m.id === "turn" ? "1939 - 1941" : "1979 - 1986",
              active: mapId === m.id,
              onSelect: () => {
                setMapId(m.id);
                setClosed(new Set());
              }
            }))}
          />
          <AppButton variant="outline" size="xs" aria-label="Thu nhỏ" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.15).toFixed(2)))} icon={<Minus className="size-3" strokeWidth={1.5} />} />
          <span className="lbl text-muted-foreground tabular-nums w-10 text-center">{Math.round(zoom * 100)}%</span>
          <AppButton variant="outline" size="xs" aria-label="Phóng to" onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))} icon={<Plus className="size-3" strokeWidth={1.5} />} />
          <AppButton variant="outline" size="xs" onClick={() => setClosed(new Set(collectIds(map.root).slice(1)))} icon={<ChevronsDownUp className="size-3" strokeWidth={1.5} />}>THU GỌN</AppButton>
          <AppButton variant="outline" size="xs" onClick={() => setClosed(new Set())} icon={<ChevronsUpDown className="size-3" strokeWidth={1.5} />}>MỞ HẾT</AppButton>
        </div>
      </header>

      <div className="mm-scroll">
        <div className="mm-canvas" style={{ transform: `scale(${zoom})` }}>
          <Branch node={map.root} closed={closed} toggle={toggle} depth={0} />
        </div>
      </div>
    </div>
  );
}
