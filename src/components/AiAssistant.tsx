import { useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { CHAPTERS_DATA, MILESTONES_DATA } from "../lib/lichSuDangData";
import { AppButton } from "./ui/app-button";

interface Msg {
  role: "user" | "model";
  text: string;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) ?? "gemini-2.5-flash";

const SYSTEM = [
  "Bạn là trợ lý học môn Lịch sử Đảng Cộng sản Việt Nam cho sinh viên.",
  "Chỉ trả lời về nội dung môn học, bằng tiếng Việt, ngắn gọn, đúng sự thật lịch sử, giọng trang trọng.",
  "Ưu tiên dựa vào tư liệu dưới đây. Nếu không chắc chắn hoặc ngoài phạm vi, hãy nói rõ là không chắc và khuyên đối chiếu giáo trình; tuyệt đối không bịa ngày tháng, số liệu hay trích dẫn.",
  "TƯ LIỆU:",
  ...CHAPTERS_DATA.map((c) => `- ${c.code} (${c.period}): ${c.summary}`),
  ...MILESTONES_DATA.map((m) => `- ${m.dateStr}: ${m.title}. ${m.significance}`)
].join("\n");

/** Trợ lý hỏi đáp dùng Gemini. Cần VITE_GEMINI_API_KEY trong .env.local. */
export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    const q = text.trim();
    if (!q || busy || !API_KEY) return;
    const next: Msg[] = [...msgs, { role: "user", text: q }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const res = await ai.models.generateContent({
        model: MODEL,
        contents: next.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
        config: { systemInstruction: SYSTEM }
      });
      setMsgs([...next, { role: "model", text: res.text ?? "Không có phản hồi." }]);
    } catch {
      setMsgs([...next, { role: "model", text: "Không gọi được trợ lý. Kiểm tra khóa API hoặc kết nối mạng rồi thử lại." }]);
    } finally {
      setBusy(false);
      window.setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Mở trợ lý hỏi đáp"
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-colors duration-150 hover:bg-card hover:text-primary"
        >
          <MessageCircle className="size-4" strokeWidth={1.5} />
          HỎI TRỢ LÝ
        </button>
      )}

      {open && (
        <aside
          aria-label="Trợ lý hỏi đáp lịch sử"
          className="view-enter fixed bottom-4 right-4 z-50 flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col border border-border bg-card"
        >
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="lbl text-primary">TRỢ LÝ LỊCH SỬ ĐẢNG</span>
            <button onClick={() => setOpen(false)} aria-label="Đóng" className="text-muted-foreground hover:text-foreground">
              <X className="size-4" strokeWidth={1.5} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {!API_KEY && (
              <p className="font-body leading-relaxed text-muted-foreground">
                Chưa cấu hình khóa API. Tạo file <code>.env.local</code> với dòng <code>VITE_GEMINI_API_KEY=...</code> rồi chạy lại dự án. Lưu ý khóa đặt ở phía trình duyệt sẽ lộ ra khi đưa lên mạng công khai.
              </p>
            )}
            {API_KEY && msgs.length === 0 && (
              <p className="font-body leading-relaxed text-muted-foreground">
                Hỏi về sự kiện, ý nghĩa, mốc thời gian. Ví dụ: “Vì sao Hội nghị Trung ương 8 quan trọng?”
              </p>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <span className={`inline-block max-w-[90%] whitespace-pre-wrap px-3 py-2 text-left font-body leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {m.text}
                </span>
              </div>
            ))}
            {busy && <p className="lbl text-muted-foreground">Đang soạn câu trả lời…</p>}
            <div ref={endRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!API_KEY}
              placeholder="Nhập câu hỏi…"
              className="h-9 min-w-0 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-primary"
            />
            <AppButton type="submit" variant="primary" size="sm" disabled={!API_KEY || busy || !text.trim()} aria-label="Gửi" icon={<Send className="size-3.5" strokeWidth={1.5} />} />
          </form>
        </aside>
      )}
    </>
  );
}
