import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State bền vững qua localStorage. Đọc 1 lần khi mount, ghi mỗi khi giá trị đổi.
 * Lỗi đọc/ghi (chế độ riêng tư, dữ liệu hỏng) → dùng giá trị khởi tạo, không làm sập UI.
 */
export function usePersistentState<T>(
  key: string,
  initial: T
): [T, (next: T | ((prev: T) => T)) => void, () => void] {
  const initialRef = useRef(initial);

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialRef.current : (JSON.parse(raw) as T);
    } catch {
      return initialRef.current;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* bỏ qua: hết dung lượng hoặc bị chặn */
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initialRef.current), []);

  return [value, setValue, reset];
}
