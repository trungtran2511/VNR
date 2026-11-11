import { useMemo, useState } from "react";
import { Award, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { Milestone } from "../lib/types";
import {
  INITIAL_TIMELINE_STATS,
  sortMilestonesChronologically,
  type TimelineGameStats
} from "../lib/timelineGame";
import { shuffle } from "../lib/shuffle";
import { usePersistentState } from "../lib/usePersistentState";
import { AppButton } from "./ui/app-button";

interface TimelineGameViewProps {
  milestones: Milestone[];
}

const CARD =
  "w-full text-left rounded-[var(--radius-surface)] border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const ROUND_SIZE = 10;

export default function TimelineGameView({ milestones }: TimelineGameViewProps) {
  const roundSize = Math.min(ROUND_SIZE, milestones.length);
  const byId = useMemo(() => new Map(milestones.map((m) => [m.id, m])), [milestones]);

  const [stats, setStats] = usePersistentState<TimelineGameStats>(
    "lsd.timelineGame.v1",
    INITIAL_TIMELINE_STATS
  );

  const newRound = () => {
    const ids = shuffle(milestones.map((m) => m.id)).slice(0, roundSize);
    return {
      ids,
      pool: shuffle(ids),
      slots: Array<string | null>(ids.length).fill(null)
    };
  };

  const [round, setRound] = useState(newRound);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const truth = useMemo(
    () => sortMilestonesChronologically(round.ids.map((id) => byId.get(id)!)),
    [round.ids, byId]
  );

  const { pool, slots } = round;
  const allPlaced = slots.every((s) => s !== null);
  const correctFlags = slots.map((id, i) => id !== null && id === truth[i].id);
  const score = correctFlags.filter(Boolean).length;
  const perfect = checked && score === truth.length;

  const place = (slotIdx: number, id: string) => {
    if (checked) return;
    setRound((prev) => {
      const nextSlots = prev.slots.slice();
      let nextPool = prev.pool.filter((p) => p !== id);
      const fromSlot = nextSlots.indexOf(id);
      if (fromSlot >= 0) nextSlots[fromSlot] = null;
      const displaced = nextSlots[slotIdx];
      if (displaced) nextPool = [...nextPool, displaced];
      nextSlots[slotIdx] = id;
      return { ...prev, pool: nextPool, slots: nextSlots };
    });
    setSelected(null);
  };

  const unplace = (slotIdx: number) => {
    if (checked) return;
    setRound((prev) => {
      const id = prev.slots[slotIdx];
      if (!id) return prev;
      const nextSlots = prev.slots.slice();
      nextSlots[slotIdx] = null;
      return { ...prev, pool: [...prev.pool, id], slots: nextSlots };
    });
  };

  const onSlotActivate = (slotIdx: number) => {
    if (selected) place(slotIdx, selected);
    else unplace(slotIdx);
  };

  const submit = () => {
    setChecked(true);
    setSelected(null);
    setStats((prev) => ({
      best: Math.max(prev.best, score),
      rounds: prev.rounds + 1,
      perfect: prev.perfect + (score === truth.length ? 1 : 0)
    }));
  };

  const retryWrong = () => {
    setRound((prev) => {
      const nextSlots = prev.slots.slice();
      const back: string[] = [];
      nextSlots.forEach((id, i) => {
        if (id && !correctFlags[i]) {
          back.push(id);
          nextSlots[i] = null;
        }
      });
      return { ...prev, pool: shuffle([...prev.pool, ...back]), slots: nextSlots };
    });
    setChecked(false);
  };

  const restart = () => {
    setRound(newRound());
    setChecked(false);
    setSelected(null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <header className="border-b border-foreground/80 pb-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className="box lbl text-primary border-primary">TRÒ CHƠI</span>
          <span className="w-8 h-px bg-primary" />
          <span className="lbl text-primary">XẾP MỐC SỬ</span>
        </div>
        <h1
          className="font-semibold text-primary tracking-[-0.025em] leading-[1.08]"
          style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
        >
          Sắp Xếp Dòng Thời Gian
        </h1>
        <p className="font-serif italic text-base text-muted-foreground">
          Kéo thả, hoặc chọn một thẻ rồi chọn ô trống, để xếp {truth.length} sự kiện (bốc ngẫu
          nhiên từ kho {milestones.length} mốc) theo đúng thứ tự thời gian.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="box lbl text-foreground">ĐIỂM CAO NHẤT {stats.best}/{truth.length}</span>
          <span className="box lbl text-muted-foreground">SỐ VÁN {stats.rounds}</span>
          {stats.perfect > 0 && (
            <span className="box lbl border-[var(--gold-bronze)] text-[var(--gold-bronze)] gap-1.5">
              <Award className="size-3" strokeWidth={1.5} />
              SỬ GIA LƯU TRỮ ×{stats.perfect}
            </span>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-label="Thẻ sự kiện chưa xếp" className="space-y-3">
          <h2 className="lbl text-muted-foreground">
            SỰ KIỆN CHƯA XẾP ({pool.length})
          </h2>
          <div
            className="space-y-2 min-h-[120px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("text/plain");
              const slotIdx = slots.indexOf(id);
              if (slotIdx >= 0) unplace(slotIdx);
            }}
          >
            {pool.map((id) => (
              <button
                key={id}
                type="button"
                draggable={!checked}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
                onClick={() => setSelected((cur) => (cur === id ? null : id))}
                aria-pressed={selected === id}
                disabled={checked}
                className={`${CARD} cursor-grab ${
                  selected === id
                    ? "border-primary bg-primary/10"
                    : "border-[var(--border-control)] hover:border-[var(--border-control-strong)]"
                }`}
              >
                {byId.get(id)?.title}
              </button>
            ))}
            {pool.length === 0 && (
              <p className="font-serif text-sm text-muted-foreground">
                Đã xếp hết. Bấm “Kiểm tra” để chấm điểm.
              </p>
            )}
          </div>
        </section>

        <section aria-label="Trục thời gian" className="space-y-3">
          <h2 className="lbl text-muted-foreground">THỨ TỰ THỜI GIAN (SỚM → MUỘN)</h2>
          <ol className="space-y-2">
            {slots.map((id, i) => {
              const m = id ? byId.get(id) : undefined;
              const state = !checked || !id ? "idle" : correctFlags[i] ? "ok" : "bad";
              return (
                <li key={i} className="flex items-stretch gap-3">
                  <span className="box lbl text-muted-foreground w-9 !h-auto justify-center">
                    {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSlotActivate(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const dropped = e.dataTransfer.getData("text/plain");
                      if (dropped) place(i, dropped);
                    }}
                    draggable={!!id && !checked}
                    onDragStart={(e) => id && e.dataTransfer.setData("text/plain", id)}
                    disabled={checked}
                    aria-label={
                      m ? `Vị trí ${i + 1}: ${m.title}. Bấm để gỡ.` : `Vị trí ${i + 1} đang trống`
                    }
                    className={`${CARD} flex items-center justify-between gap-3 min-h-[48px] ${
                      state === "ok"
                        ? "border-success bg-success/10"
                        : state === "bad"
                          ? "border-destructive bg-destructive/10"
                          : m
                            ? "border-[var(--border-control)] hover:border-[var(--border-control-strong)]"
                            : "border-dashed border-[var(--border-control)] text-muted-foreground"
                    }`}
                  >
                    <span>
                      {m ? m.title : selected ? "Đặt thẻ đã chọn vào đây" : "Ô trống"}
                      {checked && m && (
                        <span className="block lbl text-muted-foreground mt-1.5">
                          {m.dateStr}
                        </span>
                      )}
                    </span>
                    {state === "ok" && (
                      <CheckCircle2 className="size-4 text-success flex-shrink-0" strokeWidth={1.5} aria-label="Đúng" />
                    )}
                    {state === "bad" && (
                      <XCircle className="size-4 text-destructive flex-shrink-0" strokeWidth={1.5} aria-label="Sai" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6" aria-live="polite">
        {!checked ? (
          <AppButton variant="primary" size="md" disabled={!allPlaced} onClick={submit}>
            KIỂM TRA THỨ TỰ
          </AppButton>
        ) : (
          <>
            <span className="box lbl text-foreground">
              ĐÚNG {score}/{truth.length}
            </span>
            {perfect ? (
              <span className="font-serif text-success">Chính xác tuyệt đối. Bạn nhận huy hiệu Sử gia lưu trữ.</span>
            ) : (
              <AppButton variant="primary" size="md" onClick={retryWrong}>
                XẾP LẠI CÁC THẺ SAI
              </AppButton>
            )}
          </>
        )}
        <AppButton
          variant="outline"
          size="md"
          icon={<RotateCcw className="size-3" strokeWidth={1.5} />}
          onClick={restart}
        >
          VÁN MỚI
        </AppButton>
      </div>
    </div>
  );
}
