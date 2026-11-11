import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  BookOpen,
  ExternalLink,
  X,
  Compass,
  Clock,
  FileCheck2
} from "lucide-react";
import { AppButton, AppLink } from "./ui/app-button";

export type CoverMotif =
  | "method"
  | "founding"
  | "compare"
  | "movement"
  | "vietminh"
  | "august1945"
  | "dienbien"
  | "tworegions"
  | "spring1975"
  | "doimoi"
  | "timeline"
  | "exam";

export type BookEra = "colonial1930" | "warzone1945" | "socialist1960" | "modern2026";

export interface BookItem {
  id: string;
  chapterId: string;
  volNum: string;
  code: string;
  title: string;
  spineTitleMain: string;
  spineTitleSub: string;
  coverMainTitle: [string, string, string];
  subtitle: string;
  docCode: string;
  year: number;
  period: string;
  genre: string;
  category: "chapter" | "timeline" | "compare" | "quiz";
  pageCount: string;
  summary: string;
  themeBg: string;
  themeBgDark: string;
  themeAccent: string;
  themePaper: string;
  era: BookEra;
  motif: CoverMotif;
}
const INK_BLOBS: Array<[number, number, number]> = [
  [150, 330, 0],
  [340, 600, 120],
  [250, 120, 220],
  [90, 760, 300],
  [400, 250, 360],
  [260, 860, 420],
  [230, 470, 180]
];

export const BOOKS_COLLECTION: BookItem[] = [
  {
    id: "intro",
    chapterId: "intro",
    volNum: "TẬP 01",
    code: "CHƯƠNG MỞ ĐẦU",
    title: "Nhập Môn Lịch Sử Đảng",
    spineTitleMain: "NHẬP MÔN",
    spineTitleSub: "LỊCH SỬ ĐẢNG",
    coverMainTitle: ["NHẬP MÔN", "LỊCH SỬ", "ĐẢNG CSVN"],
    subtitle: "ĐỐI TƯỢNG • CHỨC NĂNG • PHƯƠNG PHÁP LUẬN",
    docCode: "HỒ SƠ LƯU TRỮ SỐ 01 • NỀN TẢNG KHOA HỌC",
    year: 1925,
    period: "1925 - 1930",
    genre: "CƠ SỞ PHƯƠNG PHÁP LUẬN",
    category: "chapter",
    pageCount: "28 TRANG",
    summary:
      "Xác định đối tượng nghiên cứu, ba chức năng cốt lõi (Nhận thức, Giáo dục, Dự báo - Phê phán) và sự kết hợp chặt chẽ giữa phương pháp lịch sử với phương pháp logic.",
    themeBg: "#5C4033",
    themeBgDark: "#3A261C",
    themeAccent: "#D4AF37",
    themePaper: "#F5EFE6",
    era: "colonial1930",
    motif: "method"
  },
  {
    id: "ch1-founding",
    chapterId: "ch1",
    volNum: "TẬP 02",
    code: "CHƯƠNG 1 • PHẦN I",
    title: "Đảng Cộng Sản Việt Nam Ra Đời",
    spineTitleMain: "ĐẢNG CSVN",
    spineTitleSub: "RA ĐỜI 1930",
    coverMainTitle: ["ĐẢNG CỘNG SẢN", "VIỆT NAM", "RA ĐỜI 1930"],
    subtitle: "HỘI NGHỊ THÀNH LẬP ĐẢNG MÙA XUÂN 1930",
    docCode: "VĂN KIỆN LỊCH SỬ • 03/02/1930",
    year: 1930,
    period: "03/02/1930",
    genre: "CHƯƠNG 1 • BƯỚC NGOẶT LỊCH SỬ",
    category: "chapter",
    pageCount: "42 TRANG",
    summary:
      "Nguyễn Ái Quốc chuẩn bị về tư tưởng, chính trị, tổ chức và chủ trì Hội nghị hợp nhất các tổ chức cộng sản đầu năm 1930 tại Cửu Long (Hương Cảng), chấm dứt khủng hoảng đường lối cứu nước.",
    themeBg: "#7A1F1F",
    themeBgDark: "#4D1111",
    themeAccent: "#D4AF37",
    themePaper: "#F7F1E6",
    era: "colonial1930",
    motif: "founding"
  },
  {
    id: "compare",
    chapterId: "ch1",
    volNum: "TẬP 03",
    code: "CHUYÊN ĐỀ VĂN KIỆN",
    title: "Cương Lĩnh 2/1930 & Luận Cương 10/1930",
    spineTitleMain: "CƯƠNG LĨNH",
    spineTitleSub: "LUẬN CƯƠNG 1930",
    coverMainTitle: ["CƯƠNG LĨNH", "& LUẬN CƯƠNG", "NĂM 1930"],
    subtitle: "ĐỐI CHIẾU HAI VĂN KIỆN NỀN TẢNG CỦA ĐẢNG",
    docCode: "CHUYÊN ĐỀ SO SÁNH • THÁNG 2 & 10/1930",
    year: 1931,
    period: "THÁNG 2 & 10/1930",
    genre: "PHÂN TÍCH VĂN KIỆN",
    category: "compare",
    pageCount: "18 TRANG",
    summary:
      "Đối chiếu khoa học giữa Cương lĩnh chính trị đầu tiên của Nguyễn Ái Quốc và Luận cương chính trị của Trần Phú về mục tiêu chiến lược, nhiệm vụ dân tộc - giai cấp và lực lượng cách mạng.",
    themeBg: "#3E3B32",
    themeBgDark: "#26241E",
    themeAccent: "#D4AF37",
    themePaper: "#F5EFE6",
    era: "colonial1930",
    motif: "compare"
  },
  {
    id: "ch1-democracy",
    chapterId: "ch1",
    volNum: "TẬP 04",
    code: "CHƯƠNG 1 • CAO TRÀO",
    title: "Cao Trào Dân Sinh Dân Chủ",
    spineTitleMain: "CAO TRÀO",
    spineTitleSub: "DÂN SINH DÂN CHỦ",
    coverMainTitle: ["CAO TRÀO", "DÂN SINH", "DÂN CHỦ"],
    subtitle: "MẶT TRẬN DÂN CHỦ ĐÔNG DƯƠNG 1936 - 1939",
    docCode: "HỒ SƠ PHONG TRÀO • 1936 - 1939",
    year: 1936,
    period: "1936 - 1939",
    genre: "CHƯƠNG 1 • ĐẤU TRANH CHÍNH TRỊ",
    category: "chapter",
    pageCount: "36 TRANG",
    summary:
      "Đảng nhận định tình hình mới, thành lập Mặt trận Dân chủ Đông Dương, kết hợp đấu tranh công khai, hợp pháp và nửa hợp pháp đòi tự do, dân sinh, dân chủ, cơm áo, hòa bình.",
    themeBg: "#6B4423",
    themeBgDark: "#422812",
    themeAccent: "#E5C26D",
    themePaper: "#F6F0E6",
    era: "colonial1930",
    motif: "movement"
  },
  {
    id: "ch1-vietminh",
    chapterId: "ch1",
    volNum: "TẬP 05",
    code: "CHƯƠNG 1 • HỘI NGHỊ TW 8",
    title: "Chuyển Hướng Chiến Lược & Việt Minh",
    spineTitleMain: "CHIẾN LƯỢC",
    spineTitleSub: "VIỆT MINH 1941",
    coverMainTitle: ["CHUYỂN HƯỚNG", "CHIẾN LƯỢC", "& VIỆT MINH"],
    subtitle: "HỘI NGHỊ TRUNG ƯƠNG 8 • PÁC BÓ CAO BẰNG",
    docCode: "NGHỊ QUYẾT TRUNG ƯƠNG • 05/1941",
    year: 1941,
    period: "1939 - 1944",
    genre: "CHƯƠNG 1 • GIẢI PHÓNG DÂN TỘC",
    category: "chapter",
    pageCount: "44 TRANG",
    summary:
      "Hội nghị Trung ương 8 (5/1941) do Nguyễn Ái Quốc chủ trì tại Pác Bó đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, thành lập Mặt trận Việt Minh và chuẩn bị khởi nghĩa vũ trang.",
    themeBg: "#2F4F2F",
    themeBgDark: "#1A2E1A",
    themeAccent: "#D4AF37",
    themePaper: "#F4EFE6",
    era: "warzone1945",
    motif: "vietminh"
  },
  {
    id: "ch1",
    chapterId: "ch1",
    volNum: "TẬP 06",
    code: "CHƯƠNG 1 • ĐỈNH CAO",
    title: "Cách Mạng Tháng Tám 1945",
    spineTitleMain: "CÁCH MẠNG",
    spineTitleSub: "THÁNG TÁM 1945",
    coverMainTitle: ["CÁCH MẠNG", "THÁNG TÁM", "NĂM 1945"],
    subtitle: "TUYÊN NGÔN ĐỘC LẬP • QUẢNG TRƯỜNG BA ĐÌNH",
    docCode: "VĂN KIỆN QUỐC GIA • 02/09/1945",
    year: 1945,
    period: "THÁNG 8/1945",
    genre: "KHAI SINH NƯỚC VIỆT NAM DCCH",
    category: "chapter",
    pageCount: "52 TRANG",
    summary:
      "Chớp thời cơ ngàn năm có một khi phát xít Nhật đầu hàng Đồng minh, Đảng phát động Tổng khởi nghĩa giành chính quyền trên toàn quốc và khai sinh nước Việt Nam Dân chủ Cộng hòa (2/9/1945).",
    themeBg: "#8B2626",
    themeBgDark: "#591515",
    themeAccent: "#E5C26D",
    themePaper: "#FAF4E8",
    era: "warzone1945",
    motif: "august1945"
  },
  {
    id: "ch2",
    chapterId: "ch2",
    volNum: "TẬP 07",
    code: "CHƯƠNG 2 • PHẦN I",
    title: "Kháng Chiến Chống Pháp & Điện Biên Phủ",
    spineTitleMain: "ĐIỆN BIÊN",
    spineTitleSub: "KHÁNG CHIẾN PHÁP",
    coverMainTitle: ["KHÁNG CHIẾN", "CHỐNG PHÁP &", "ĐIỆN BIÊN PHỦ"],
    subtitle: "TOÀN DÂN • TOÀN DIỆN • TRƯỜNG KỲ TỰ LỰC",
    docCode: "CHIẾN DỊCH LỊCH SỬ • 07/05/1954",
    year: 1954,
    period: "1945 - 1954",
    genre: "CHƯƠNG 2 • KHÁNG CHIẾN CỨU QUỐC",
    category: "chapter",
    pageCount: "58 TRANG",
    summary:
      "Từ Chỉ thị Kháng chiến kiến quốc (11/1945), Lời kêu gọi Toàn quốc kháng chiến (12/1946) và Đại hội II (1951) đến đỉnh cao Chiến dịch Điện Biên Phủ lừng lẫy năm châu, chấn động địa cầu.",
    themeBg: "#3B4D3C",
    themeBgDark: "#222E23",
    themeAccent: "#D4AF37",
    themePaper: "#F5EFE6",
    era: "warzone1945",
    motif: "dienbien"
  },
  {
    id: "ch2-tworegions",
    chapterId: "ch2",
    volNum: "TẬP 08",
    code: "CHƯƠNG 2 • ĐẠI HỘI III",
    title: "Chiến Lược Cách Mạng Hai Miền",
    spineTitleMain: "HAI MIỀN",
    spineTitleSub: "CHIẾN LƯỢC 1960",
    coverMainTitle: ["CHIẾN LƯỢC", "CÁCH MẠNG", "HAI MIỀN"],
    subtitle: "XÂY DỰNG MIỀN BẮC & GIẢI PHÓNG MIỀN NAM",
    docCode: "VĂN KIỆN ĐẠI HỘI III • 09/1960",
    year: 1960,
    period: "1954 - 1965",
    genre: "CHƯƠNG 2 • ĐƯỜNG LỐI CHIẾN LƯỢC",
    category: "chapter",
    pageCount: "54 TRANG",
    summary:
      "Nghị quyết Trung ương 15 (1959) mở đường cho phong trào Đồng khởi và Đại hội III (9/1960) hoạch định hai chiến lược cách mạng: CNXH ở miền Bắc (hậu phương lớn) và DTDCND ở miền Nam (tiền tuyến lớn).",
    themeBg: "#1B2A4A",
    themeBgDark: "#0F1A30",
    themeAccent: "#D4AF37",
    themePaper: "#F4EFE6",
    era: "socialist1960",
    motif: "tworegions"
  },
  {
    id: "ch2-1975",
    chapterId: "ch2",
    volNum: "TẬP 09",
    code: "CHƯƠNG 2 • ĐẠI THẮNG",
    title: "Đại Thắng Mùa Xuân 1975",
    spineTitleMain: "ĐẠI THẮNG",
    spineTitleSub: "MÙA XUÂN 1975",
    coverMainTitle: ["ĐẠI THẮNG", "MÙA XUÂN", "NĂM 1975"],
    subtitle: "CHIẾN DỊCH HỒ CHÍ MINH • THỐNG NHẤT ĐẤT NƯỚC",
    docCode: "BIÊN BẢN LỊCH SỬ • 30/04/1975",
    year: 1975,
    period: "1965 - 1975",
    genre: "CHƯƠNG 2 • NON SÔNG THU VỀ MỘT MỐI",
    category: "chapter",
    pageCount: "62 TRANG",
    summary:
      "Đánh bại các chiến lược chiến tranh của đế quốc Mỹ, buộc Mỹ ký Hiệp định Paris (1973) và tiến hành Tổng tiến công mùa Xuân 1975 với đỉnh cao là Chiến dịch Hồ Chí Minh giải phóng hoàn toàn miền Nam.",
    themeBg: "#7A1F1F",
    themeBgDark: "#4A1010",
    themeAccent: "#E5C26D",
    themePaper: "#F7F2E8",
    era: "socialist1960",
    motif: "spring1975"
  },
  {
    id: "ch3",
    chapterId: "ch3",
    volNum: "TẬP 10",
    code: "CHƯƠNG 3 • ĐẠI HỘI VI",
    title: "Khởi Xướng Công Cuộc Đổi Mới",
    spineTitleMain: "ĐỔI MỚI",
    spineTitleSub: "ĐẠI HỘI VI 1986",
    coverMainTitle: ["KHỞI XƯỚNG", "CÔNG CUỘC", "ĐỔI MỚI 1986"],
    subtitle: "NHÌN THẲNG VÀO SỰ THẬT • ĐỔI MỚI TOÀN DIỆN",
    docCode: "NGHỊ QUYẾT ĐẠI HỘI VI • 12/1986",
    year: 1986,
    period: "1975 - 1995",
    genre: "CHƯƠNG 3 • ĐỔI MỚI ĐẤT NƯỚC",
    category: "chapter",
    pageCount: "84 TRANG",
    summary:
      "Đại hội VI (12/1986) khởi xướng đường lối Đổi mới toàn diện, xóa bỏ cơ chế tập trung quan liêu bao cấp, phát triển kinh tế nhiều thành phần và ban hành Cương lĩnh năm 1991.",
    themeBg: "#223042",
    themeBgDark: "#141E2B",
    themeAccent: "#D4AF37",
    themePaper: "#F5EFE6",
    era: "modern2026",
    motif: "doimoi"
  },
  {
    id: "timeline",
    chapterId: "ch3",
    volNum: "TẬP 11",
    code: "BIÊN NIÊN SỬ",
    title: "Biên Niên Mốc Son & Hội Nhập",
    spineTitleMain: "BIÊN NIÊN",
    spineTitleSub: "MỐC SON 1930-2026",
    coverMainTitle: ["BIÊN NIÊN", "MỐC SON &", "HỘI NHẬP"],
    subtitle: "CƯƠNG LĨNH 2011 VÀ HỘI NHẬP QUỐC TẾ SÂU RỘNG",
    docCode: "BIÊN NIÊN SỬ TOÀN TẬP • 1930 - 2026",
    year: 1991,
    period: "1930 - 2026",
    genre: "BIÊN NIÊN SỬ • TOÀN CẢNH LỊCH SỬ",
    category: "timeline",
    pageCount: "88 TRANG",
    summary:
      "Hệ thống hóa toàn bộ dòng thời gian các mốc sự kiện trọng đại từ ngày thành lập Đảng (1930), các kỳ Đại hội toàn quốc đến công cuộc đẩy mạnh CNH - HĐH và hội nhập quốc tế sâu rộng.",
    themeBg: "#25443B",
    themeBgDark: "#152A24",
    themeAccent: "#D4AF37",
    themePaper: "#F5EFE6",
    era: "modern2026",
    motif: "timeline"
  },
  {
    id: "quiz",
    chapterId: "ch3",
    volNum: "TẬP 12",
    code: "NGÂN HÀNG ĐỀ THI",
    title: "Luyện Thi Trắc Nghiệm 2026",
    spineTitleMain: "NGÂN HÀNG",
    spineTitleSub: "TRẮC NGHIỆM 2026",
    coverMainTitle: ["TỔNG KẾT &", "NGÂN HÀNG", "ĐỀ THI 2026"],
    subtitle: "5 BÀI HỌC LỚN & HỆ THỐNG CÂU HỎI ÔN TẬP",
    docCode: "CHUẨN BỘ GD&ĐT • 221 TRANG",
    year: 1996,
    period: "CHUẨN BỘ GD&ĐT",
    genre: "TRẮC NGHIỆM • ĐÁP ÁN CHI TIẾT",
    category: "quiz",
    pageCount: "221 TRANG",
    summary:
      "Tổng kết 5 bài học kinh nghiệm lớn của Đảng và ngân hàng câu hỏi trắc nghiệm bao quát toàn bộ giáo trình Lịch sử Đảng Cộng sản Việt Nam 2026 kèm giải thích chi tiết.",
    themeBg: "#362F2D",
    themeBgDark: "#201B1A",
    themeAccent: "#D4AF37",
    themePaper: "#F6F2EA",
    era: "modern2026",
    motif: "exam"
  }
];

function renderMotifIllustration(motif: CoverMotif, accent: string, paper: string): string {
  switch (motif) {
    case "method":
      return `
        <circle cx="237" cy="435" r="95" fill="none" stroke="${accent}" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.65"/>
        <circle cx="237" cy="435" r="68" fill="none" stroke="${paper}" stroke-width="1.2" opacity="0.4"/>
        <path d="M165 455 C190 420, 225 425, 237 450 C249 425, 284 420, 309 455 L309 390 C284 360, 249 365, 237 390 C225 365, 190 360, 165 390 Z" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <line x1="237" y1="320" x2="237" y2="545" stroke="${accent}" stroke-width="1.5" opacity="0.7"/>
        <polygon points="237,330 245,352 268,352 250,365 257,387 237,373 217,387 224,365 206,352 229,352" fill="${accent}"/>
      `;
    case "founding":
      return `
        <g opacity="0.22" stroke="${accent}" stroke-width="1.4">
          <line x1="237" y1="435" x2="237" y2="305"/>
          <line x1="237" y1="435" x2="355" y2="355"/>
          <line x1="237" y1="435" x2="365" y2="485"/>
          <line x1="237" y1="435" x2="119" y2="355"/>
          <line x1="237" y1="435" x2="109" y2="485"/>
        </g>
        <circle cx="237" cy="435" r="96" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <circle cx="237" cy="435" r="84" fill="none" stroke="${paper}" stroke-width="0.9" opacity="0.45"/>
        <polygon points="237,352 257,410 318,410 269,445 287,503 237,468 187,503 205,445 156,410 217,410" fill="${accent}"/>
      `;
    case "compare":
      return `
        <rect x="128" y="345" width="96" height="175" rx="3" fill="none" stroke="${accent}" stroke-width="2"/>
        <rect x="250" y="345" width="96" height="175" rx="3" fill="none" stroke="${paper}" stroke-width="2" opacity="0.85"/>
        <line x1="146" y1="380" x2="206" y2="380" stroke="${accent}" stroke-width="2"/>
        <line x1="146" y1="402" x2="206" y2="402" stroke="${accent}" stroke-width="1.4" opacity="0.7"/>
        <line x1="146" y1="422" x2="195" y2="422" stroke="${accent}" stroke-width="1.4" opacity="0.7"/>
        <line x1="268" y1="380" x2="328" y2="380" stroke="${paper}" stroke-width="2"/>
        <line x1="268" y1="402" x2="328" y2="402" stroke="${paper}" stroke-width="1.4" opacity="0.7"/>
        <line x1="268" y1="422" x2="317" y2="422" stroke="${paper}" stroke-width="1.4" opacity="0.7"/>
        <text x="176" y="485" text-anchor="middle" fill="${accent}" font-family="Inter Tight, sans-serif" font-size="16" font-weight="800">02/1930</text>
        <text x="298" y="485" text-anchor="middle" fill="${paper}" font-family="Inter Tight, sans-serif" font-size="16" font-weight="800">10/1930</text>
      `;
    case "movement":
      return `
        <circle cx="237" cy="435" r="94" fill="none" stroke="${accent}" stroke-width="1.8"/>
        <path d="M135 495 L195 385 L245 450 L295 365 L345 495 Z" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <polygon points="237,335 247,364 277,364 253,381 262,410 237,392 212,410 221,381 197,364 227,364" fill="${accent}"/>
        <line x1="125" y1="510" x2="349" y2="510" stroke="${paper}" stroke-width="1.5" opacity="0.55"/>
      `;
    case "vietminh":
      return `
        <path d="M105 510 L178 380 L232 455 L288 355 L369 510 Z" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <path d="M142 510 L205 415 L258 475 L312 395 L350 510" fill="none" stroke="${paper}" stroke-width="1.2" opacity="0.45"/>
        <polygon points="237,328 249,363 286,363 256,384 267,419 237,397 207,419 218,384 188,363 225,363" fill="${accent}"/>
      `;
    case "august1945":
      return `
        <circle cx="237" cy="428" r="102" fill="none" stroke="${accent}" stroke-width="2.4"/>
        <circle cx="237" cy="428" r="90" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="4 4"/>
        <polygon points="237,336 259,402 329,402 273,442 294,508 237,467 180,508 201,442 145,402 215,402" fill="${accent}"/>
        <rect x="157" y="542" width="160" height="24" rx="2" fill="${accent}"/>
        <text x="237" y="558" text-anchor="middle" fill="#4E110E" font-family="Inter Tight, sans-serif" font-size="12.5" font-weight="800" letter-spacing="2">02 • 09 • 1945</text>
      `;
    case "dienbien":
      return `
        <path d="M98 515 Q237 365 376 515" fill="none" stroke="${accent}" stroke-width="2.4"/>
        <path d="M122 515 Q237 395 352 515" fill="none" stroke="${paper}" stroke-width="1.2" opacity="0.5"/>
        <line x1="237" y1="322" x2="237" y2="442" stroke="${accent}" stroke-width="2.5"/>
        <path d="M237 324 L315 348 L237 376 Z" fill="${accent}"/>
        <polygon points="237,406 246,431 273,431 251,447 259,472 237,456 215,472 223,447 201,431 228,431" fill="${paper}"/>
      `;
    case "tworegions":
      return `
        <circle cx="237" cy="435" r="94" fill="none" stroke="${accent}" stroke-width="2"/>
        <line x1="125" y1="435" x2="349" y2="435" stroke="${paper}" stroke-width="1.6" stroke-dasharray="6 4"/>
        <polygon points="237,350 248,382 282,382 255,401 265,433 237,414 209,433 219,401 192,382 226,382" fill="${accent}"/>
        <text x="237" y="472" text-anchor="middle" fill="${paper}" font-family="Inter Tight, sans-serif" font-size="13" font-weight="700" letter-spacing="2.5">HẬU PHƯƠNG &amp; TIỀN TUYẾN</text>
        <text x="237" y="495" text-anchor="middle" fill="${accent}" font-family="Inter Tight, sans-serif" font-size="12" font-weight="700" letter-spacing="2">1954 — 1965</text>
      `;
    case "spring1975":
      return `
        <circle cx="237" cy="430" r="98" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <path d="M145 380 L220 422 M329 380 L254 422 M165 505 L224 448 M309 505 L250 448" stroke="${paper}" stroke-width="2" opacity="0.75"/>
        <polygon points="237,345 258,406 323,406 271,444 290,506 237,468 184,506 203,444 151,406 216,406" fill="${accent}"/>
        <rect x="155" y="542" width="164" height="24" rx="2" fill="${accent}"/>
        <text x="237" y="558" text-anchor="middle" fill="#4B110F" font-family="Inter Tight, sans-serif" font-size="12.5" font-weight="800" letter-spacing="2">30 • 04 • 1975</text>
      `;
    case "doimoi":
      return `
        <circle cx="237" cy="435" r="96" fill="none" stroke="${accent}" stroke-width="2"/>
        <circle cx="237" cy="435" r="66" fill="none" stroke="${paper}" stroke-width="1.4" stroke-dasharray="8 5" opacity="0.7"/>
        <path d="M165 468 L212 422 L248 446 L305 382" fill="none" stroke="${accent}" stroke-width="3"/>
        <polygon points="309,378 307,402 286,383" fill="${accent}"/>
        <text x="237" y="502" text-anchor="middle" fill="${paper}" font-family="Inter Tight, sans-serif" font-size="15" font-weight="800" letter-spacing="3">ĐỔI MỚI 1986</text>
      `;
    case "timeline":
      return `
        <line x1="120" y1="435" x2="354" y2="435" stroke="${accent}" stroke-width="2.2"/>
        <circle cx="150" cy="435" r="8" fill="${accent}"/>
        <circle cx="208" cy="435" r="8" fill="${paper}"/>
        <circle cx="266" cy="435" r="8" fill="${accent}"/>
        <circle cx="324" cy="435" r="10" fill="${accent}"/>
        <text x="150" y="412" text-anchor="middle" fill="${paper}" font-family="Inter Tight, sans-serif" font-size="12" font-weight="700">1930</text>
        <text x="208" y="468" text-anchor="middle" fill="${paper}" font-family="Inter Tight, sans-serif" font-size="12" font-weight="700">1945</text>
        <text x="266" y="412" text-anchor="middle" fill="${paper}" font-family="Inter Tight, sans-serif" font-size="12" font-weight="700">1975</text>
        <text x="324" y="468" text-anchor="middle" fill="${accent}" font-family="Inter Tight, sans-serif" font-size="12" font-weight="800">2026</text>
      `;
    case "exam":
      return `
        <rect x="152" y="342" width="170" height="190" rx="4" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <line x1="180" y1="385" x2="294" y2="385" stroke="${paper}" stroke-width="2"/>
        <line x1="180" y1="418" x2="294" y2="418" stroke="${paper}" stroke-width="1.6" opacity="0.75"/>
        <line x1="180" y1="451" x2="264" y2="451" stroke="${paper}" stroke-width="1.6" opacity="0.75"/>
        <polyline points="180,492 198,508 234,474" fill="none" stroke="${accent}" stroke-width="3.2"/>
      `;
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getEraSvgDefs(_era: BookEra, id: string): string {
  return `
    <!-- Cylindrical Spine Curvature Gradient (Bóng cong trụ tròn tả thực gáy sách) -->
    <linearGradient id="spineCylinder_${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.48"/>
      <stop offset="6%" stop-color="#000000" stop-opacity="0.22"/>
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.12"/>
      <stop offset="48%" stop-color="#FFFFFF" stop-opacity="0.18"/>
      <stop offset="78%" stop-color="#000000" stop-opacity="0.08"/>
      <stop offset="94%" stop-color="#000000" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
    </linearGradient>

    <!-- Vintage Bookbinding Linen Cloth Weave Pattern (Vân vải bọc sách cổ) -->
    <pattern id="linenWeave_${id}" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="none"/>
      <path d="M0 3 L6 3 M3 0 L3 6" stroke="#000000" stroke-width="0.75" opacity="0.12"/>
      <circle cx="1.5" cy="1.5" r="0.6" fill="#FFFFFF" opacity="0.09"/>
      <circle cx="4.5" cy="4.5" r="0.6" fill="#FFFFFF" opacity="0.09"/>
    </pattern>

    <!-- Gold Foil Metallic Stamp Filter (Hiệu ứng nhũ vàng ép kim) -->
    <filter id="goldFoil_${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="foilNoise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0.83  0 1 0 0 0.68  0 0 1 0 0.22  0 0 0 1 0" in="foilNoise" result="goldTint"/>
      <feComposite in="SourceGraphic" in2="goldTint" operator="in"/>
    </filter>

    <!-- Spine End Groove Shadow (Rãnh may gáy chỉ mép trên/dưới) -->
    <linearGradient id="headbandShadow_${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  `;
}

function buildCoverSvgDataUri(book: BookItem): string {
  const motifMarkup = renderMotifIllustration(
    book.motif,
    book.themeAccent,
    book.themePaper
  );

  const volNum = escapeXml(book.volNum);
  const code = escapeXml(book.code);
  const period = escapeXml(book.period);
  const line0 = escapeXml(book.coverMainTitle[0]);
  const line1 = escapeXml(book.coverMainTitle[1]);
  const line2 = escapeXml(book.coverMainTitle[2]);
  const subtitle = escapeXml(book.subtitle);
  const genre = escapeXml(book.genre);
  const pageCount = escapeXml(book.pageCount);
  const docCode = escapeXml(book.docCode);

  const isOldColonial = book.era === "colonial1930";
  const isWarzone = book.era === "warzone1945";
  const isSocialist = book.era === "socialist1960";
  const isModern = book.era === "modern2026";

  const eraDefs = getEraSvgDefs(book.era, `cv_${book.id}`);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 474 900" width="474" height="900">
    <defs>
      <linearGradient id="bgGrad_cv_${book.id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${book.themeBg}"/>
        <stop offset="100%" stop-color="${book.themeBgDark}"/>
      </linearGradient>
      ${eraDefs}
    </defs>

    <!-- Base Cloth / Textured Cover -->
    <rect width="474" height="900" fill="url(#bgGrad_cv_${book.id})"/>
    <rect width="474" height="900" fill="url(#pat_cv_${book.id})"/>

    <!-- Ageing Vignette & Distress for Older Eras -->
    ${
      isOldColonial || isWarzone || isSocialist
        ? `<rect width="474" height="900" fill="url(#vignette_cv_${book.id})" pointer-events="none"/>`
        : ""
    }

    <!-- Book Left Hinge & Spine Shadow -->
    <rect x="0" y="0" width="${isOldColonial ? 24 : 18}" height="900" fill="#000000" opacity="${isOldColonial ? 0.38 : 0.22}"/>
    <line x1="${isOldColonial ? 24 : 18}" y1="0" x2="${isOldColonial ? 24 : 18}" y2="900" stroke="${book.themeAccent}" stroke-width="${isOldColonial ? 1.5 : 0.9}" opacity="${isOldColonial ? 0.45 : 0.25}"/>

    <!-- Sờn rách mép gáy và cạnh sách cổ (Foxing / Edge Wear) -->
    ${
      isOldColonial
        ? `
        <rect x="0" y="0" width="474" height="14" fill="#1A1108" opacity="0.32"/>
        <rect x="0" y="886" width="474" height="14" fill="#1A1108" opacity="0.45"/>
        <rect x="462" y="0" width="12" height="900" fill="#1A1108" opacity="0.35"/>
        <!-- Mộc đỏ cổ điển Đông Dương 1930 -->
        <g transform="translate(365, 715) rotate(-8)">
          <rect x="-42" y="-22" width="84" height="44" rx="3" fill="none" stroke="#A82820" stroke-width="2.2" opacity="0.85"/>
          <rect x="-38" y="-18" width="76" height="36" rx="2" fill="none" stroke="#A82820" stroke-width="1" opacity="0.6"/>
          <text x="0" y="-3" text-anchor="middle" fill="#A82820" font-family="Inter Tight, sans-serif" font-size="9" font-weight="800" letter-spacing="1.5">LƯU TRỮ</text>
          <text x="0" y="11" text-anchor="middle" fill="#A82820" font-family="Inter Tight, sans-serif" font-size="8.5" font-weight="700">1930-1945</text>
        </g>
      `
        : isWarzone
        ? `
        <rect x="0" y="0" width="474" height="10" fill="#10140E" opacity="0.25"/>
        <rect x="0" y="890" width="474" height="10" fill="#10140E" opacity="0.35"/>
        <rect x="466" y="0" width="8" height="900" fill="#10140E" opacity="0.25"/>
        <!-- Mộc Quân sự / Chiến khu Việt Bắc -->
        <g transform="translate(370, 718) rotate(4)">
          <circle cx="0" cy="0" r="24" fill="none" stroke="#A82820" stroke-width="1.8" opacity="0.8"/>
          <polygon points="0,-16 4,-5 15,-5 6,2 9,13 0,7 -9,13 -6,2 -15,-5 -4,-5" fill="#A82820" opacity="0.75"/>
          <text x="0" y="18" text-anchor="middle" fill="#A82820" font-family="Inter Tight, sans-serif" font-size="7.5" font-weight="800">QUÂN PHÁP</text>
        </g>
      `
        : isSocialist
        ? `
        <rect x="0" y="0" width="474" height="6" fill="#0A1018" opacity="0.18"/>
        <rect x="0" y="894" width="474" height="6" fill="#0A1018" opacity="0.22"/>
        <!-- Mộc Thư viện Sự Thật 1960-1975 -->
        <g transform="translate(372, 722)">
          <rect x="-38" y="-18" width="76" height="36" rx="2" fill="none" stroke="#1F3FB0" stroke-width="1.5" opacity="0.75"/>
          <text x="0" y="-1" text-anchor="middle" fill="#1F3FB0" font-family="Inter Tight, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1">SỰ THẬT</text>
          <text x="0" y="12" text-anchor="middle" fill="#1F3FB0" font-family="Inter Tight, sans-serif" font-size="8" font-weight="700">XUẤT BẢN</text>
        </g>
      `
        : ""
    }

    <!-- Double Archival Border -->
    <rect x="${isOldColonial ? 34 : 30}" y="28" width="${isOldColonial ? 408 : 416}" height="844" fill="none" stroke="${book.themeAccent}" stroke-width="${isOldColonial ? 2.4 : isModern ? 1.4 : 1.8}" opacity="${isOldColonial ? 0.9 : 0.78}"/>
    <rect x="${isOldColonial ? 42 : 38}" y="36" width="${isOldColonial ? 392 : 400}" height="828" fill="none" stroke="${book.themePaper}" stroke-width="0.8" opacity="0.32"/>

    <!-- Top Header Band -->
    <text x="58" y="70" fill="${book.themeAccent}" font-family="${isOldColonial ? "Newsreader, Georgia, serif" : "Inter Tight, system-ui, sans-serif"}" font-size="${isOldColonial ? 12.5 : 11.5}" font-weight="700" letter-spacing="${isOldColonial ? 1.8 : 2.4}">${isOldColonial ? "HỒ SƠ LỊCH SỬ ĐẢNG CSVN" : "GIÁO TRÌNH LỊCH SỬ ĐẢNG CSVN"}</text>
    <rect x="342" y="52" width="78" height="24" rx="2" fill="${book.themeAccent}"/>
    <text x="381" y="68" text-anchor="middle" fill="${book.themeBgDark}" font-family="Inter Tight, system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">${volNum}</text>
    <line x1="58" y1="90" x2="420" y2="90" stroke="${book.themeAccent}" stroke-width="1" opacity="0.45"/>

    <!-- Period & Category Sub-header -->
    <text x="58" y="118" fill="${book.themePaper}" font-family="Inter Tight, system-ui, sans-serif" font-size="12" font-weight="600" letter-spacing="2.2" opacity="0.88">${code}</text>
    <text x="420" y="118" text-anchor="end" fill="${book.themeAccent}" font-family="Inter Tight, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">${period}</text>

    <!-- Main Archival Cover Title (3 Lines) -->
    <text x="58" y="184" fill="${book.themePaper}" font-family="${isOldColonial ? "Newsreader, Georgia, serif" : "Inter Tight, system-ui, sans-serif"}" font-size="${isOldColonial ? 42 : 39}" font-weight="800" letter-spacing="${isOldColonial ? "-0.2px" : "-0.6px"}">${line0}</text>
    <text x="58" y="234" fill="${book.themePaper}" font-family="${isOldColonial ? "Newsreader, Georgia, serif" : "Inter Tight, system-ui, sans-serif"}" font-size="${isOldColonial ? 42 : 39}" font-weight="800" letter-spacing="${isOldColonial ? "-0.2px" : "-0.6px"}">${line1}</text>
    <text x="58" y="284" fill="${book.themeAccent}" font-family="${isOldColonial ? "Newsreader, Georgia, serif" : "Inter Tight, system-ui, sans-serif"}" font-size="${isOldColonial ? 42 : 39}" font-weight="800" letter-spacing="${isOldColonial ? "-0.2px" : "-0.6px"}">${line2}</text>

    <line x1="58" y1="310" x2="175" y2="310" stroke="${book.themeAccent}" stroke-width="${isOldColonial ? 3.5 : 2.5}"/>

    <!-- Center Emblem & Historical Motif Box -->
    <rect x="58" y="324" width="362" height="252" fill="#000000" opacity="${isOldColonial ? 0.22 : 0.15}" rx="2"/>
    <rect x="58" y="324" width="362" height="252" fill="none" stroke="${book.themeAccent}" stroke-width="1" opacity="0.4" rx="2"/>
    ${motifMarkup}

    <!-- Vietnamese Subtitle & Archival Description -->
    <text x="239" y="620" text-anchor="middle" fill="${book.themeAccent}" font-family="Inter Tight, system-ui, sans-serif" font-size="11.5" font-weight="700" letter-spacing="1.5px">${subtitle}</text>
    <line x1="140" y1="638" x2="338" y2="638" stroke="${book.themePaper}" stroke-width="0.8" opacity="0.4"/>
    <text x="239" y="664" text-anchor="middle" fill="${book.themePaper}" font-family="Newsreader, Georgia, serif" font-size="14.5" font-style="italic" opacity="0.9">${genre}</text>
    <!-- Large Watermark Year -->
    <text x="239" y="760" text-anchor="middle" fill="${book.themePaper}" font-family="Inter Tight, system-ui, sans-serif" font-size="70" font-weight="800" letter-spacing="4" opacity="${isOldColonial ? 0.18 : 0.12}">${book.year}</text>

    <!-- Bottom Official Archival Stamp -->
    <line x1="58" y1="792" x2="420" y2="792" stroke="${book.themeAccent}" stroke-width="1" opacity="0.5"/>
    <text x="58" y="818" fill="${book.themePaper}" font-family="Inter Tight, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="1.8" opacity="0.9">BỘ GIÁO DỤC VÀ ĐÀO TẠO • 2026</text>
    <rect x="312" y="802" width="108" height="24" rx="2" fill="none" stroke="${book.themeAccent}" stroke-width="1.2"/>
    <text x="366" y="818" text-anchor="middle" fill="${book.themeAccent}" font-family="Inter Tight, system-ui, sans-serif" font-size="10.5" font-weight="800" letter-spacing="1.5">${pageCount}</text>
    <text x="58" y="842" fill="${book.themeAccent}" font-family="Inter Tight, system-ui, sans-serif" font-size="10" font-weight="600" letter-spacing="1.6" opacity="0.8">${docCode}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildSpineSvgDataUri(book: BookItem): string {
  const volNum = escapeXml(book.volNum);
  const mainTitle = escapeXml(book.spineTitleMain.toUpperCase());
  const subTitle = escapeXml(book.spineTitleSub.toUpperCase());

  const isOldColonial = book.era === "colonial1930";

  const eraDefs = getEraSvgDefs(book.era, `sp_${book.id}`);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 1089" width="188" height="1089">
    <defs>
      <linearGradient id="spGrad_sp_${book.id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${book.themeBgDark}"/>
        <stop offset="18%" stop-color="${book.themeBg}"/>
        <stop offset="50%" stop-color="${book.themeBg}"/>
        <stop offset="82%" stop-color="${book.themeBg}"/>
        <stop offset="100%" stop-color="${book.themeBgDark}"/>
      </linearGradient>
      ${eraDefs}
    </defs>

    <!-- 1. Spine Base Leather / Cloth Tone -->
    <rect width="188" height="1089" fill="url(#spGrad_sp_${book.id})"/>

    <!-- 2. Vintage Linen Weave Texture Overlay -->
    <rect width="188" height="1089" fill="url(#linenWeave_sp_${book.id})" mix-blend-mode="multiply"/>

    <!-- 3. Cylindrical 3D Curvature Highlight & Shading (Gáy cong đa chiều tả thực) -->
    <rect width="188" height="1089" fill="url(#spineCylinder_sp_${book.id})" pointer-events="none"/>

    <!-- 4. Top & Bottom Headband Groove Shadows (Rãnh mép khâu đầu sách) -->
    <rect x="0" y="0" width="188" height="28" fill="url(#headbandShadow_sp_${book.id})" pointer-events="none"/>
    <rect x="0" y="1061" width="188" height="28" fill="url(#headbandShadow_sp_${book.id})" transform="rotate(180 94 1075)" pointer-events="none"/>

    <!-- 5. Gold Foil Blind Stamp Archival Frame (Viền chỉ vàng dập chìm) -->
    <rect x="10" y="16" width="168" height="1057" fill="none" stroke="${book.themeAccent}" stroke-width="1.8" opacity="0.85"/>
    <rect x="14" y="20" width="160" height="1049" fill="none" stroke="#F5EFE6" stroke-width="0.6" opacity="0.3"/>
    <line x1="10" y1="184" x2="178" y2="184" stroke="${book.themeAccent}" stroke-width="1.6" opacity="0.75"/>
    <line x1="10" y1="906" x2="178" y2="906" stroke="${book.themeAccent}" stroke-width="1.6" opacity="0.75"/>

    <!-- 6. Top Volume Badge: ÉP KIM VÀNG ĐỒNG TRANG TRỌNG -->
    <rect x="20" y="38" width="148" height="48" rx="2" fill="${book.themeAccent}"/>
    <rect x="22" y="40" width="144" height="44" rx="1.5" fill="none" stroke="${book.themeBgDark}" stroke-width="0.8" opacity="0.4"/>
    <text x="94" y="71" text-anchor="middle" fill="${book.themeBgDark}" font-family="Inter Tight, system-ui, sans-serif" font-size="24" font-weight="900" letter-spacing="2.5">${volNum}</text>

    <!-- 7. Star Emblem: BIỂU TƯỢNG NGÔI SAO DẬP VÀNG -->
    <polygon points="94,106 102,128 124,128 106,141 113,163 94,149 75,163 82,141 64,128 86,128" fill="${book.themeAccent}"/>
    <circle cx="94" cy="135" r="2.5" fill="${book.themeBgDark}" opacity="0.7"/>

    <!-- 8. VERTICAL GOLD FOIL TITLE (2 DÒNG SONG SONG, VÀNG ĐỒNG & KEM NGÀ ÉP KIM) -->
    <g transform="translate(94, 545) rotate(-90)">
      <!-- Dòng 1: Tiêu đề chính dập nhũ vàng ngà cao cấp (#F5EFE6) -->
      <text x="0" y="-13" text-anchor="middle" fill="#FAF4EA" font-family="${isOldColonial ? "Newsreader, Georgia, serif" : "Inter Tight, system-ui, sans-serif"}" font-size="${isOldColonial ? 42 : 39}" font-weight="900" letter-spacing="${isOldColonial ? "2.5px" : "1.8px"}">${mainTitle}</text>
      
      <!-- Dòng 2: Tiêu đề phụ dập vàng đồng sáng (#D4AF37) -->
      <text x="0" y="33" text-anchor="middle" fill="${book.themeAccent}" font-family="Inter Tight, system-ui, sans-serif" font-size="31" font-weight="800" letter-spacing="2.2px">${subTitle}</text>
    </g>

    <!-- 9. Bottom Seal & Year: KHẮC NĂM VÀ DẤU ẤN LƯU TRỮ VÀNG ÉP KIM -->
    <text x="94" y="952" text-anchor="middle" fill="${book.themeAccent}" font-family="Inter Tight, system-ui, sans-serif" font-size="36" font-weight="900" letter-spacing="2.5">${book.year}</text>
    <rect x="24" y="976" width="140" height="40" rx="2" fill="none" stroke="#FAF4EA" stroke-width="1.4" opacity="0.85"/>
    <text x="94" y="1002" text-anchor="middle" fill="#FAF4EA" font-family="Inter Tight, system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="3.5">LSĐ • 2026</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const COVER_URI_CACHE: Record<string, string> = {};
const SPINE_URI_CACHE: Record<string, string> = {};

BOOKS_COLLECTION.forEach((book) => {
  COVER_URI_CACHE[book.id] = buildCoverSvgDataUri(book);
  SPINE_URI_CACHE[book.id] = buildSpineSvgDataUri(book);
});

function getCoverFaceStyle(book: BookItem): React.CSSProperties {
  return {
    backgroundImage: `url("${COVER_URI_CACHE[book.id]}")`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center"
  };
}

function getSpineFaceStyle(book: BookItem): React.CSSProperties {
  return {
    backgroundImage: `url("${SPINE_URI_CACHE[book.id]}")`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center"
  };
}

function smoothstep(x: number): number {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

interface BookShelf3DProps {
  onOpenBook: (book: BookItem) => void;
  onQuickNavigateCategory?: (category: "chapter" | "timeline" | "compare" | "quiz") => void;
}

export default function BookShelf3D({ onOpenBook }: BookShelf3DProps) {
  const probeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tapeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const spineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const coverRefs = useRef<Array<HTMLDivElement | null>>([]);
  const playRingRef = useRef<HTMLButtonElement>(null);
  const timelineDotRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const bgSpotlightRef = useRef<HTMLDivElement>(null);
  const bgSunRef = useRef<SVGGElement>(null);
  const bgLandmarksRef = useRef<SVGGElement>(null);
  const bgGridRef = useRef<SVGSVGElement>(null);
  const watermarkLeftRef = useRef<HTMLDivElement>(null);
  const watermarkRightRef = useRef<HTMLDivElement>(null);

  // Caption mask refs
  const capTitleRef = useRef<HTMLDivElement>(null);
  const capSubRef = useRef<HTMLDivElement>(null);
  const capYearRef = useRef<HTMLDivElement>(null);

  // Detail sheet & ink blot refs
  const detailRef = useRef<HTMLDivElement>(null);
  const detailLineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const blobRefs = useRef<Array<SVGCircleElement | null>>([]);
  const detailAnimRef = useRef<Animation | null>(null);
  const inkRafRef = useRef<number | null>(null);

  // Detail state
  const [detailBook, setDetailBook] = useState<BookItem>(BOOKS_COLLECTION[5]);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const isDetailOpenRef = useRef<boolean>(false);

  // Motion engine mutable state (driven by 1 rAF loop)
  const motionRef = useRef({
    s: 5 + 12,
    T: 5 + 12,
    activeIdx: 5,
    hoverVirtual: -1,
    lifts: new Float32Array(36),
    mx: typeof window !== "undefined" ? window.innerWidth / 2 : 720,
    my: typeof window !== "undefined" ? window.innerHeight / 2 : 450,
    cx: typeof window !== "undefined" ? window.innerWidth / 2 : 720,
    cy: typeof window !== "undefined" ? window.innerHeight / 2 : 450,
    parallaxSunX: 0,
    parallaxSunY: 0,
    parallaxLandmarkX: 0,
    parallaxLandmarkY: 0,
    parallaxScrollOffset: 0,
    tiltX: 0,
    tiltY: 0,
    onCover: false,
    overBtn: false,
    isDragging: false,
    dragMoved: false,
    dragStartX: 0,
    dragStartT: 17,
    dotYear: 1945,
    H: 380,
    ws: 64,
    d: 200,
    gap: 13,
    U: 494,
    XS: [] as number[],
    reducedMotion: false
  });

  // Measure --H and precompute XS integral table
  const measureGeometry = useCallback(() => {
    const m = motionRef.current;
    m.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const probeH =
      probeRef.current?.getBoundingClientRect().height ||
      Math.min(window.innerHeight * 0.47, window.innerWidth * 0.33);
    const H = Math.max(180, probeH);
    const ws = (H * 142) / 840;
    const d = (H * 474) / 900;
    const gap = H * 0.035;
    const U = H * (window.innerWidth < 768 ? 1.05 : 1.3);

    const XS: number[] = [];
    let acc = 0;
    const maxU = Math.ceil(3 * U);
    for (let u = 0; u <= maxU; u += 2) {
      XS.push(acc);
      acc += 2 / (1 + Math.pow(u / U, 1.6));
    }

    m.H = H;
    m.ws = ws;
    m.d = d;
    m.gap = gap;
    m.U = U;
    m.XS = XS;

    if (stageRef.current) {
      stageRef.current.style.setProperty("--ws", `${ws.toFixed(2)}px`);
      stageRef.current.style.setProperty("--d", `${d.toFixed(2)}px`);
    }

    if (playRingRef.current) {
      const W = window.innerWidth;
      const cyRatio = window.innerWidth <= 767 ? 0.43 : 0.41;
      const shelfCentre = window.innerHeight * cyRatio;
      playRingRef.current.style.left = `${(W / 2 - d / 2 - 27).toFixed(1)}px`;
      playRingRef.current.style.top = `${(shelfCentre + H * 0.36 - 21).toFixed(1)}px`;
    }
  }, []);

  // Mask slide swap for caption lines using Web Animations API
  const swapMaskLine = useCallback(
    (container: HTMLDivElement | null, newText: string, dir: number) => {
      if (!container) return;
      const reduced = motionRef.current.reducedMotion;
      if (reduced) {
        container.innerHTML = "";
        const span = document.createElement("span");
        span.textContent = newText;
        container.appendChild(span);
        return;
      }

      const oldSpans = Array.from(container.querySelectorAll("span"));
      const nextSpan = document.createElement("span");
      nextSpan.textContent = newText;
      container.appendChild(nextSpan);

      const travelDir = dir >= 0 ? 1 : -1;

      oldSpans.forEach((old) => {
        if (old.dataset.leaving === "1") return;
        old.dataset.leaving = "1";
        const anim = old.animate(
          [
            {
              transform:
                getComputedStyle(old).transform === "none"
                  ? "translateY(0%)"
                  : getComputedStyle(old).transform
            },
            { transform: `translateY(${-travelDir * 105}%)` }
          ],
          {
            duration: 650,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            fill: "both"
          }
        );
        anim.onfinish = () => {
          old.remove();
        };
      });

      nextSpan.animate(
        [
          { transform: `translateY(${travelDir * 105}%)` },
          { transform: "translateY(0%)" }
        ],
        {
          duration: 650,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "both"
        }
      );
    },
    []
  );

  // Open Detail Sheet (Paper clip-path growth out of cover + SVG Ink-Blot reveal)
  const openDetailSheet = useCallback((bookToOpen?: BookItem) => {
    const m = motionRef.current;
    if (isDetailOpenRef.current) return;

    m.T = Math.round(m.T);
    const activeIdx = ((Math.round(m.T) % 12) + 12) % 12;
    const targetBook = bookToOpen || BOOKS_COLLECTION[activeIdx];
    setDetailBook(targetBook);
    setIsDetailOpen(true);
    isDetailOpenRef.current = true;

    let bestV = activeIdx + 12;
    let bestDist = Infinity;
    for (let v = 0; v < 36; v++) {
      if (v % 12 === activeIdx) {
        const dist = Math.abs(v - m.s);
        if (dist < bestDist) {
          bestDist = dist;
          bestV = v;
        }
      }
    }

    blobRefs.current.forEach((circle) => {
      if (circle) circle.setAttribute("r", "0");
    });

    requestAnimationFrame(() => {
      const dialog = detailRef.current;
      if (!dialog) return;

      const coverEl = coverRefs.current[bestV];
      const W = window.innerWidth;
      const H = window.innerHeight;
      const rect = coverEl?.getBoundingClientRect() || {
        top: H * 0.2,
        left: W * 0.4,
        right: W * 0.6,
        bottom: H * 0.7
      };

      const topInset = Math.max(0, Math.round(rect.top));
      const rightInset = Math.max(0, Math.round(W - rect.right));
      const bottomInset = Math.max(0, Math.round(H - rect.bottom));
      const leftInset = Math.max(0, Math.round(rect.left));

      dialog.style.visibility = "visible";
      const dur = m.reducedMotion ? 1 : 1050;

      detailAnimRef.current?.cancel();
      detailAnimRef.current = dialog.animate(
        [
          {
            clipPath: `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round 3px)`
          },
          { clipPath: "inset(0px 0px 0px 0px round 0px)" }
        ],
        {
          duration: dur,
          easing: "cubic-bezier(0.76, 0, 0.18, 1)",
          fill: "both"
        }
      );

      detailLineRefs.current.forEach((lineEl, idx) => {
        if (!lineEl) return;
        lineEl.animate(
          [{ transform: "translateY(110%)" }, { transform: "translateY(0%)" }],
          {
            duration: m.reducedMotion ? 1 : 900,
            delay: m.reducedMotion ? 0 : 620 + idx * 75,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            fill: "both"
          }
        );
      });

      if (inkRafRef.current) cancelAnimationFrame(inkRafRef.current);
      const startInk = performance.now() - (m.reducedMotion ? 5000 : 0);

      const stepInk = (now: number) => {
        const elapsed = now - startInk - 520;
        INK_BLOBS.forEach(([, , delay], idx) => {
          const circle = blobRefs.current[idx];
          if (!circle) return;
          const t = elapsed - delay;
          if (t <= 0) {
            circle.setAttribute("r", "0");
          } else {
            const p = Math.min(1, t / 1250);
            const eased = 1 - Math.pow(1 - p, 3);
            circle.setAttribute("r", (eased * 720).toFixed(1));
          }
        });

        if (now - startInk < 2400 && isDetailOpenRef.current) {
          inkRafRef.current = requestAnimationFrame(stepInk);
        }
      };

      inkRafRef.current = requestAnimationFrame(stepInk);
    });
  }, []);

  // Close Detail Sheet
  const closeDetailSheet = useCallback(() => {
    const m = motionRef.current;
    if (!isDetailOpenRef.current) return;
    isDetailOpenRef.current = false;

    const dialog = detailRef.current;
    if (!dialog) {
      setIsDetailOpen(false);
      return;
    }

    const activeIdx = ((Math.round(m.s) % 12) + 12) % 12;
    let bestV = activeIdx + 12;
    let bestDist = Infinity;
    for (let v = 0; v < 36; v++) {
      if (v % 12 === activeIdx) {
        const dist = Math.abs(v - m.s);
        if (dist < bestDist) {
          bestDist = dist;
          bestV = v;
        }
      }
    }

    const coverEl = coverRefs.current[bestV];
    const W = window.innerWidth;
    const H = window.innerHeight;
    const rect = coverEl?.getBoundingClientRect() || {
      top: H * 0.2,
      left: W * 0.4,
      right: W * 0.6,
      bottom: H * 0.7
    };

    const topInset = Math.max(0, Math.round(rect.top));
    const rightInset = Math.max(0, Math.round(W - rect.right));
    const bottomInset = Math.max(0, Math.round(H - rect.bottom));
    const leftInset = Math.max(0, Math.round(rect.left));

    detailAnimRef.current?.cancel();
    const anim = dialog.animate(
      [
        { clipPath: "inset(0px 0px 0px 0px round 0px)" },
        {
          clipPath: `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round 3px)`
        }
      ],
      {
        duration: m.reducedMotion ? 1 : 850,
        easing: "cubic-bezier(0.76, 0, 0.18, 1)",
        fill: "both"
      }
    );

    anim.onfinish = () => {
      if (!isDetailOpenRef.current && dialog) {
        dialog.style.visibility = "hidden";
        setIsDetailOpen(false);
      }
    };
  }, []);

  // Main single requestAnimationFrame loop for Curved Arc Geometry, Timeline Dot & Cursor
  useEffect(() => {
    measureGeometry();
    window.addEventListener("resize", measureGeometry);

    let rafId: number;
    let lastTime = performance.now();
    const P = 1400;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const m = motionRef.current;

      // 1. Scroll spring physics
      if (m.reducedMotion) {
        m.s = m.T;
      } else {
        const k = m.isDragging ? 18 : 5.2;
        m.s += (m.T - m.s) * (1 - Math.exp(-k * dt));
        if (Math.abs(m.T - m.s) < 1e-4) m.s = m.T;
      }

      // Normalize loop drift beyond ±4 full loops
      if (Math.abs(m.s) > 36 * 4) {
        const loops = Math.trunc(m.s / 36) * 36;
        m.s -= loops;
        m.T -= loops;
      }

      // 2. Check active volume change & trigger caption mask swap
      const currentActive = ((Math.round(m.s) % 12) + 12) % 12;
      if (currentActive !== m.activeIdx) {
        const dir = Math.sign(m.T - m.s) || 1;
        m.activeIdx = currentActive;
        const book = BOOKS_COLLECTION[currentActive];
        swapMaskLine(capTitleRef.current, book.title, dir);
        swapMaskLine(capSubRef.current, `${book.volNum} • ${book.subtitle}`, dir);
        swapMaskLine(capYearRef.current, `${book.period} — ${book.genre}`, dir);
      }

      // 3. Interpolate Timeline dot year
      const i0 = ((Math.floor(m.s) % 12) + 12) % 12;
      const i1 = (i0 + 1) % 12;
      const frac = m.s - Math.floor(m.s);
      const y0 = BOOKS_COLLECTION[i0].year;
      const y1 = BOOKS_COLLECTION[i1].year;
      let targetYear: number;
      if (i0 === 11 && i1 === 0) {
        targetYear = frac < 0.5 ? y0 : y1;
      } else {
        targetYear = y0 + (y1 - y0) * frac;
      }

      if (Math.abs(targetYear - m.dotYear) > 10 || m.reducedMotion) {
        m.dotYear = targetYear;
      } else {
        m.dotYear += (targetYear - m.dotYear) * (1 - Math.exp(-14 * dt));
      }

      if (timelineDotRef.current) {
        const pct = Math.max(0, Math.min(1, (m.dotYear - 1925) / 75));
        timelineDotRef.current.style.left = `${(pct * 100).toFixed(2)}%`;
      }

      // 4. Cover tilt towards pointer
      const W = window.innerWidth;
      const HScreen = window.innerHeight;
      const shelfCy = HScreen * (W <= 767 ? 0.43 : 0.41);
      const settled = Math.abs(m.T - m.s) < 0.3;
      const onCover =
        !isDetailOpenRef.current &&
        settled &&
        Math.abs(m.mx - W / 2) < 0.55 * m.d &&
        Math.abs(m.my - shelfCy) < 0.55 * m.H;
      m.onCover = onCover;

      const targetTiltY = onCover
        ? ((m.mx - W / 2) / (0.55 * m.d)) * 8
        : ((m.mx - W / 2) / W) * 4;
      const targetTiltX = onCover ? -((m.my - shelfCy) / (m.H / 2)) * 5 : 0;

      const tiltEase = m.reducedMotion ? 1 : 1 - Math.exp(-7 * dt);
      m.tiltY += (targetTiltY - m.tiltY) * tiltEase;
      m.tiltX += (targetTiltX - m.tiltX) * tiltEase;
      // 4b. Dynamic Multi-layer Parallax calculations for Background Layers
      const mouseNormalizedX = (m.mx - W / 2) / (W / 2);
      const mouseNormalizedY = (m.my - HScreen / 2) / (HScreen / 2);

      // Smooth parallax interpolation
      const targetSunX = -mouseNormalizedX * 18;
      const targetSunY = -mouseNormalizedY * 12;
      const targetLandmarkX = -mouseNormalizedX * 32;
      const targetLandmarkY = -mouseNormalizedY * 16;

      m.parallaxSunX += (targetSunX - m.parallaxSunX) * (1 - Math.exp(-8 * dt));
      m.parallaxSunY += (targetSunY - m.parallaxSunY) * (1 - Math.exp(-8 * dt));
      m.parallaxLandmarkX += (targetLandmarkX - m.parallaxLandmarkX) * (1 - Math.exp(-6 * dt));
      m.parallaxLandmarkY += (targetLandmarkY - m.parallaxLandmarkY) * (1 - Math.exp(-6 * dt));

      // Dynamic spotlight position tracking pointer smoothly
      if (bgSpotlightRef.current) {
        const spotPctX = 50 + mouseNormalizedX * 12;
        const spotPctY = 42 + mouseNormalizedY * 8;
        bgSpotlightRef.current.style.setProperty("--spot-x", `${spotPctX.toFixed(2)}%`);
        bgSpotlightRef.current.style.setProperty("--spot-y", `${spotPctY.toFixed(2)}%`);
      }

      // Apply parallax translation to background SVG layers
      if (bgSunRef.current) {
        bgSunRef.current.style.transform = `translate3d(${m.parallaxSunX.toFixed(2)}px, ${m.parallaxSunY.toFixed(2)}px, 0)`;
      }
      if (bgLandmarksRef.current) {
        bgLandmarksRef.current.style.transform = `translate3d(${m.parallaxLandmarkX.toFixed(2)}px, ${m.parallaxLandmarkY.toFixed(2)}px, 0)`;
      }
      if (bgGridRef.current) {
        const gridX = -mouseNormalizedX * 8;
        const gridY = -mouseNormalizedY * 6;
        bgGridRef.current.style.transform = `translate3d(${gridX.toFixed(2)}px, ${gridY.toFixed(2)}px, 0)`;
      }

      // Watermark Parallax: drift subtly with book carousel rotation
      const scrollDrift = (m.s - 17) * 4.5;
      if (watermarkLeftRef.current) {
        const wlY = -mouseNormalizedY * 10 - scrollDrift;
        watermarkLeftRef.current.style.transform = `translate3d(${-mouseNormalizedX * 12}px, ${wlY.toFixed(2)}px, 0)`;
      }
      if (watermarkRightRef.current) {
        const wrY = -mouseNormalizedY * 10 + scrollDrift;
        watermarkRightRef.current.style.transform = `translate3d(${-mouseNormalizedX * 12}px, ${wrY.toFixed(2)}px, 0)`;
      }

      // 5. Curved Arc 3D Geometry per book volume (36 virtual volumes)
      const { H, ws, d, gap, U, XS } = m;
      const liftEase = m.reducedMotion ? 1 : 1 - Math.exp(-12 * dt);

      const xsc = (u: number): number => {
        if (XS.length === 0) return u;
        const idx = Math.min(XS.length - 1, Math.round(Math.abs(u) / 2));
        return Math.sign(u) * XS[idx];
      };

      for (let v = 0; v < 36; v++) {
        const el = tapeRefs.current[v];
        if (!el) continue;

        let r = (v - m.s) % 36;
        if (r < -18) r += 36;
        if (r >= 18) r -= 36;

        const B =
          Math.abs(r) < 1
            ? (r + Math.sin(Math.PI * r) / Math.PI) / 2
            : r > 0
              ? 0.5
              : -0.5;

        const u = r * (ws + gap) + (d - ws + 1.4 * gap) * B;

        if (Math.abs(u) > U * 1.95) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";

        const liftTarget = m.hoverVirtual === v && Math.abs(r) > 0.5 ? 1 : 0;
        m.lifts[v] += (liftTarget - m.lifts[v]) * liftEase;
        const lift = m.lifts[v];

        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));

        const sc = 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
        const kInv = 1 / sc;

        const z = P * (1 - kInv) + o * H * 0.1;
        const x = xsc(u) * kInv;
        const y =
          (H * 0.5 * (1 - sc) * 0.42 + o * H * 0.012 - lift * H * 0.05) * kInv;

        const rotY =
          Math.sign(u) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) -
          90 * o +
          m.tiltY * o;
        const rotX = m.tiltX * o;

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        el.style.zIndex = String(Math.round(3000 + z));

        const spEl = spineRefs.current[v];
        const cvEl = coverRefs.current[v];
        if (spEl) {
          const spShade = Math.min(0.6, o * 0.55 + (1 - sc) * 0.32);
          spEl.style.setProperty("--shade", spShade.toFixed(3));
        }
        if (cvEl) {
          const cvShade = (1 - o) * 0.82;
          cvEl.style.setProperty("--shade", cvShade.toFixed(3));
        }
      }

      // 6. Play ring scale
      if (playRingRef.current) {
        const ringScale = isDetailOpenRef.current
          ? 0
          : smoothstep(Math.max(0, 1 - Math.abs(m.T - m.s) * 3));
        playRingRef.current.style.transform = `scale(${ringScale.toFixed(3)})`;
      }

      // 7. Custom cursor smoothing & state classes
      const curEase = 1 - Math.exp(-16 * dt);
      m.cx += (m.mx - m.cx) * curEase;
      m.cy += (m.my - m.cy) * curEase;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${m.cx.toFixed(1)}px, ${m.cy.toFixed(1)}px, 0)`;
        cursorRef.current.classList.toggle(
          "open",
          m.onCover && !isDetailOpenRef.current
        );
        cursorRef.current.classList.toggle(
          "spine",
          !m.onCover && m.hoverVirtual !== -1 && !isDetailOpenRef.current
        );
        cursorRef.current.classList.toggle("btn", m.overBtn && !m.onCover);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measureGeometry);
    };
  }, [measureGeometry, swapMaskLine]);

  // Global pointer, wheel and keyboard handlers
  // Global pointer, wheel and keyboard handlers (thêm hiệu ứng dập triện son khi click)
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const m = motionRef.current;
      m.mx = e.clientX;
      m.my = e.clientY;

      const target = e.target as HTMLElement | null;
      m.overBtn = Boolean(target?.closest("button, a, [data-timeline]"));

      if (m.isDragging) {
        const dx = e.clientX - m.dragStartX;
        if (Math.abs(dx) > 5) m.dragMoved = true;
        if (m.dragMoved) {
          m.T = m.dragStartT - dx / (m.ws + m.gap);
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("stamping");
      }

      // Tạo vết mực triện son đỏ in trực tiếp lên trang giấy (Bằng SVG vector cố định tỷ lệ, không bao giờ tràn viền)
      const stamp = document.createElement("div");
      stamp.className = "stamp-mark-print";
      const rot = (Math.random() * 14 - 7).toFixed(1);
      stamp.style.left = `${e.clientX}px`;
      stamp.style.top = `${e.clientY}px`;
      stamp.style.transform = `scale(1) rotate(${rot}deg)`;
      stamp.innerHTML = `
        <svg viewBox="0 0 120 80" width="72" height="48" style="overflow:visible;display:block;">
          <!-- Khung triện son chữ nhật cổ điển viền đơn dày 3px -->
          <rect x="4" y="4" width="112" height="72" rx="6" fill="rgba(184, 41, 30, 0.12)" stroke="#A82015" stroke-width="3"/>
          <!-- Chữ LƯU TRỮ (cách mép viền an toàn 19px) -->
          <text x="60" y="29" text-anchor="middle" fill="#A82015" font-family="'Inter Tight', sans-serif" font-size="13" font-weight="900" letter-spacing="2">LƯU TRỮ</text>
          <!-- Ngôi sao son đỏ tâm triện -->
          <polygon points="60,35 62.4,40 68,40 63.5,43.5 65.2,49 60,46 54.8,49 56.5,43.5 52,40 57.6,40" fill="#A82015"/>
          <!-- Chữ LSĐ • 2026 (cách mép viền an toàn 14px) -->
          <text x="60" y="65" text-anchor="middle" fill="#A82015" font-family="'Inter Tight', sans-serif" font-size="12" font-weight="900" letter-spacing="1.5">LSĐ • 2026</text>
        </svg>
      `;
      document.body.appendChild(stamp);
      window.setTimeout(() => {
        stamp.remove();
      }, 3200);
    };

    const onPointerUp = () => {
      const m = motionRef.current;
      if (cursorRef.current) {
        cursorRef.current.classList.remove("stamping");
      }
      if (!m.isDragging) return;
      m.isDragging = false;
      m.T = Math.round(m.T);
    };
    let wheelTimeout: number | undefined;
    const onWheel = (e: WheelEvent) => {
      if (isDetailOpenRef.current) return;
      const m = motionRef.current;
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      m.T += (delta / (m.ws + m.gap)) * 0.5;
      window.clearTimeout(wheelTimeout);
      wheelTimeout = window.setTimeout(() => {
        m.T = Math.round(m.T);
      }, 160);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const m = motionRef.current;
      if (e.key === "Escape" && isDetailOpenRef.current) {
        closeDetailSheet();
        return;
      }
      if (isDetailOpenRef.current) return;

      if (e.key === "ArrowLeft") {
        m.T = Math.round(m.T) - 1;
      } else if (e.key === "ArrowRight") {
        m.T = Math.round(m.T) + 1;
      } else if (e.key === "Enter") {
        openDetailSheet();
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeDetailSheet, openDetailSheet]);

  // Jump to nearest copy of book index
  const jumpToBookIndex = (targetBookIdx: number) => {
    const m = motionRef.current;
    const currentMod = ((Math.round(m.T) % 12) + 12) % 12;
    let diff = targetBookIdx - currentMod;
    if (diff > 6) diff -= 12;
    if (diff < -6) diff += 12;
    m.T = Math.round(m.T) + diff;
  };

  // Timeline click handler
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    const clickedYear = 1925 + ratio * 75;

    let nearestIdx = 0;
    let bestDiff = Infinity;
    BOOKS_COLLECTION.forEach((b, i) => {
      const d = Math.abs(b.year - clickedYear);
      if (d < bestDiff) {
        bestDiff = d;
        nearestIdx = i;
      }
    });
    jumpToBookIndex(nearestIdx);
  };

  const initialBook = BOOKS_COLLECTION[5];
  const detailPosterHref = COVER_URI_CACHE[detailBook.id];

  // Generate 36 virtual books (3 copies of 12 volumes)
  const virtualTapes = Array.from({ length: 36 }, (_, v) => {
    const book = BOOKS_COLLECTION[v % 12];
    return { v, book };
  });

  // Generate timeline ticks 1925..2000 (36 ticks, major every 5 units, labeled with historical milestones 1930..2026)
  const timelineYears = Array.from({ length: 36 }, (_, idx) => 1925 + idx * 2.15);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none cursor-custom-active">
      {/* Off-screen probe element to measure --H */}
      <div
        ref={probeRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: "var(--H)",
          visibility: "hidden",
          pointerEvents: "none"
        }}
      />

      {/* Paper Grain Overlay */}
      <svg
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
        style={{ mixBlendMode: "multiply", opacity: 0.58 }}
      >
        <filter id="paper-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.22 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain-filter)" />
      </svg>
      {/* Vintage Parchment Atmosphere Background (Layer 0, pointer-events none) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/vintage-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center 42%",
          opacity: 0.26,
          filter: "blur(2.5px) saturate(0.85) contrast(1.08)",
          mixBlendMode: "multiply",
          maskImage: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.95) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.95) 100%)"
        }}
      />


      {/* 1. Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-[60px] md:h-[76px] px-4 md:px-9 flex items-center justify-between text-primary z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => jumpToBookIndex(5)}
            className="lbl text-primary hover:opacity-80 transition-opacity"
          >
            LỊCH SỬ ĐẢNG CSVN
          </button>
          <span className="w-[22px] md:w-[40px] h-px bg-primary inline-block" />
          <span className="lbl text-primary">GIÁO TRÌNH LƯU TRỮ 2026</span>
        </div>

        <nav
          aria-label="Chuyên mục lưu trữ"
          className="flex items-center gap-6 md:gap-8"
        >
          <button
            onClick={() =>
              openDetailSheet(BOOKS_COLLECTION[motionRef.current.activeIdx])
            }
            className="hidden md:inline-flex items-center gap-1.5 lbl text-primary hover:opacity-75 transition-opacity"
          >
            <Compass className="size-3.5" strokeWidth={1.5} />
            <span>CHƯƠNG HỌC</span>
          </button>
          <button
            onClick={() => onOpenBook(BOOKS_COLLECTION[10])}
            className="hidden md:inline-flex items-center gap-1.5 lbl text-primary hover:opacity-75 transition-opacity"
          >
            <Clock className="size-3.5" strokeWidth={1.5} />
            <span>BIÊN NIÊN SỬ</span>
          </button>
          <button
            onClick={() => onOpenBook(BOOKS_COLLECTION[11])}
            className="hidden md:inline-flex items-center gap-1.5 lbl text-primary hover:opacity-75 transition-opacity"
          >
            <FileCheck2 className="size-3.5" strokeWidth={1.5} />
            <span>TRẮC NGHIỆM</span>
          </button>

          <a
            href="/LỊCH SỬ ĐẢNG 221TR - 2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-md h-[26px] px-3.5 border border-primary/80 text-primary bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all lbl inline-flex items-center gap-1.5 shadow-2xs select-none"
          >
            <span>PDF 221 TRANG</span>
            <ExternalLink className="size-3" strokeWidth={1.5} />
          </a>
        </nav>
      </header>

      {/* 2. Spotlight Dome Glow from Exhibition Arch */}
      <div ref={bgSpotlightRef} aria-hidden="true" className="museum-spotlight" />

      {/* 2b. Cinematic Vignette Overlay (Viền tối 4 góc điện ảnh) */}
      <div aria-hidden="true" className="cinematic-vignette" />

      {/* 3. Epic Historical Monument Panorama & Dong Son Heritage Sun */}
      <svg
        ref={bgGridRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-1 will-change-transform"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Fine Archival Grid */}
          <pattern id="heritage-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(20, 20, 20, 0.05)" strokeWidth="0.8" />
            <circle cx="80" cy="80" r="1.5" fill="rgba(20, 20, 20, 0.16)" />
          </pattern>
          <linearGradient id="monument-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.14" />
            <stop offset="65%" stopColor="var(--ink)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="flag-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8291E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Architecture Grid Pattern */}
        <rect width="100%" height="100%" fill="url(#heritage-grid)" />

        {/* Prominent Dong Son Bronze Drum & Radiant Sun */}
        {/* Prominent Dong Son Bronze Drum & Radiant Sun */}
        <g ref={bgSunRef} transform="translate(960, 435)" opacity="0.18" className="will-change-transform">
          <circle cx="0" cy="0" r="430" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeDasharray="4 6" />
          <circle cx="0" cy="0" r="390" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="330" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeDasharray="10 8" />
          <circle cx="0" cy="0" r="290" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="210" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="130" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="50" fill="none" stroke="var(--ink)" strokeWidth="2.2" />

          {/* 14 Radiant Sun Rays */}
          {Array.from({ length: 14 }).map((_, rIdx) => {
            const angle = (rIdx * 360) / 14;
            return (
              <g key={rIdx} transform={`rotate(${angle})`}>
                <polygon points="0,-208 -16,-75 16,-75" fill="var(--ink)" />
                <line x1="0" y1="-210" x2="0" y2="-328" stroke="var(--ink)" strokeWidth="1.6" strokeDasharray="3 4" />
              </g>
            );
          })}

          {/* Dong Son Crane Birds */}
          {[30, 90, 150, 210, 270, 330].map((deg, bIdx) => (
            <g key={bIdx} transform={`rotate(${deg}) translate(0, -360)`}>
              <path
                d="M-28,0 Q0,-16 28,0 Q10,12 -28,0 Z"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.8"
              />
              <line x1="-16" y1="0" x2="-36" y2="-10" stroke="var(--ink)" strokeWidth="1.6" />
            </g>
          ))}
        </g>

        {/* Panoramic Landmark Silhouettes behind the books (Left: Pác Bó / Ba Đình | Right: Cột Cờ / Dinh Thống Nhất) */}
        {/* Panoramic Landmark Silhouettes behind the books (Left: Pác Bó / Ba Đình | Right: Cột Cờ / Dinh Thống Nhất) */}
        <g ref={bgLandmarksRef} opacity="0.88" className="will-change-transform">
          {/* Pác Bó Mountain Silhouette (Far Left) */}
          <path
            d="M 60 480 Q 180 340 320 420 T 560 440 L 560 520 L 60 520 Z"
            fill="url(#monument-grad)"
          />
          <text x="200" y="360" fill="var(--muted-ink)" fontFamily="Inter Tight, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2.5" opacity="0.6">DÃY NÚI PÁC BÓ • KHỞI NGUỒN CÁCH MẠNG</text>
          <line x1="200" y1="372" x2="330" y2="372" stroke="var(--muted-ink)" strokeWidth="0.8" opacity="0.4" />

          {/* Hanoi Flag Tower Silhouette (Left-Center) */}
          <g transform="translate(480, 270)" fill="url(#monument-grad)">
            {/* Tower Base Tier 1 */}
            <rect x="-45" y="150" width="90" height="30" rx="2" />
            {/* Tower Base Tier 2 */}
            <rect x="-32" y="115" width="64" height="35" rx="1.5" />
            {/* Octagonal Body */}
            <polygon points="-18,115 -14,25 14,25 18,115" />
            {/* Observatory Dome */}
            <rect x="-16" y="10" width="32" height="15" rx="2" />
            {/* Flagpole */}
            <line x1="0" y1="10" x2="0" y2="-45" stroke="var(--ink)" strokeWidth="2" opacity="0.4" />
            {/* Flowing Flag */}
            <path d="M 0 -45 Q 16 -38 32 -45 Q 16 -52 0 -45 Z" fill="url(#flag-glow)" stroke="var(--vermilion)" strokeWidth="0.8" opacity="0.75" />
            <text x="0" y="200" textAnchor="middle" fill="var(--muted-ink)" fontFamily="Inter Tight, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="1.8" opacity="0.65">CỘT CỜ HÀ NỘI</text>
          </g>

          {/* Ba Dinh Hall Landmark Outline (Center-Right) */}
          <g transform="translate(1420, 280)" fill="url(#monument-grad)">
            {/* Portico Base */}
            <rect x="-70" y="140" width="140" height="25" rx="2" />
            {/* Grand Columns */}
            <rect x="-60" y="60" width="8" height="80" />
            <rect x="-40" y="60" width="8" height="80" />
            <rect x="-20" y="60" width="8" height="80" />
            <rect x="0" y="60" width="8" height="80" />
            <rect x="20" y="60" width="8" height="80" />
            <rect x="40" y="60" width="8" height="80" />
            <rect x="52" y="60" width="8" height="80" />
            {/* Roof Architrave */}
            <rect x="-75" y="45" width="150" height="15" rx="2" />
            <polygon points="-80,45 0,15 80,45" />
            <text x="0" y="185" textAnchor="middle" fill="var(--muted-ink)" fontFamily="Inter Tight, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="1.8" opacity="0.65">HỘI TRƯỜNG BA ĐÌNH • LĂNG CHỦ TỊCH HỒ CHÍ MINH</text>
          </g>

          {/* Ben Nha Rong / Sai Gon Silhouette (Far Right) */}
          <path
            d="M 1360 490 Q 1520 400 1700 450 T 1880 430 L 1880 520 L 1360 520 Z"
            fill="url(#monument-grad)"
          />
          <text x="1720" y="390" textAnchor="middle" fill="var(--muted-ink)" fontFamily="Inter Tight, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2.2" opacity="0.6">BẾN NHÀ RỒNG • TP HỒ CHÍ MINH</text>
          <line x1="1600" y1="402" x2="1840" y2="402" stroke="var(--muted-ink)" strokeWidth="0.8" opacity="0.4" />
        </g>

      </svg>

      {/* 4. Giant Halftone Vietnamese Historical Watermark Columns (Parallax Interactive) */}
      <div
        ref={watermarkLeftRef}
        aria-hidden="true"
        className="halftone-watermark will-change-transform"
        style={{ left: "1.4vw", top: "13vh" }}
      >
        LỊCH SỬ
      </div>
      <div
        ref={watermarkRightRef}
        aria-hidden="true"
        className="halftone-watermark halftone-watermark-years will-change-transform"
        style={{ right: "1.6vw", top: "13vh" }}
      >
        1930•2026
      </div>

      {/* 5. Floor Shadow under the Curved Bowl Shelf */}
      <div aria-hidden="true" className="floor-shadow" />
      <div aria-hidden="true" className="museum-ground-line" />

      {/* 6. Curved 3D Historical Archive Book Shelf */}
      <section
        aria-label="Kệ sách lưu trữ Lịch sử Đảng 3D"
        className="shelf-section"
        onPointerDown={(e) => {
          const m = motionRef.current;
          m.isDragging = true;
          m.dragMoved = false;
          m.dragStartX = e.clientX;
          m.dragStartT = m.T;
        }}
      >
        <div ref={stageRef} className="shelf-stage">
          {virtualTapes.map(({ v, book }) => (
            <div
              key={v}
              ref={(el) => {
                tapeRefs.current[v] = el;
              }}
              className="tape-box"
              onPointerEnter={() => {
                motionRef.current.hoverVirtual = v;
              }}
              onPointerLeave={() => {
                if (motionRef.current.hoverVirtual === v) {
                  motionRef.current.hoverVirtual = -1;
                }
              }}
              onClick={() => {
                const m = motionRef.current;
                if (m.dragMoved) return;
                let r = (v - m.s) % 36;
                if (r < -18) r += 36;
                if (r >= 18) r -= 36;

                if (Math.abs(r) < 0.5) {
                  openDetailSheet(book);
                } else {
                  m.T = Math.round(m.T + r);
                }
              }}
            >
              {/* Spine face (.sp) */}
              <div
                ref={(el) => {
                  spineRefs.current[v] = el;
                }}
                className="tape-face tape-sp"
                style={getSpineFaceStyle(book)}
              />

              {/* Cover face (.cv) */}
              <div
                ref={(el) => {
                  coverRefs.current[v] = el;
                }}
                className="tape-face tape-cv"
                style={getCoverFaceStyle(book)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Play Ring on the Active Cover's lower-left corner */}
      <button
        ref={playRingRef}
        onClick={() => openDetailSheet()}
        aria-label="Mở chi tiết chương học"
        className="fixed z-20 w-[42px] h-[42px] rounded-full border border-primary text-primary flex items-center justify-center transition-colors"
        style={{ backgroundColor: "rgba(236, 232, 224, 0.85)" }}
      >
        <Play
          className="size-3.5 translate-x-[1px] fill-current"
          strokeWidth={1.5}
        />
      </button>

      {/* 6. Caption (Masked sliding lines under the cover) */}
      <div
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 pointer-events-none"
        style={{ top: "calc(var(--cy) + var(--H) / 2 + 4.2vh)" }}
      >
        {/* Title in Inter Tight 600, cobalt */}
        <div
          ref={capTitleRef}
          className="caption-mask font-semibold text-primary tracking-[-0.015em] leading-[1.12]"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
        >
          <span>{initialBook.title}</span>
        </div>

        {/* Subtitle in cobalt .lbl (100% Vietnamese) */}
        <div
          ref={capSubRef}
          className="caption-mask lbl text-primary"
          style={{ fontSize: "9.5px", letterSpacing: "0.22em" }}
        >
          <span>{`${initialBook.volNum} • ${initialBook.subtitle}`}</span>
        </div>

        {/* Short 18x1px cobalt rule */}
        <div className="w-[18px] h-px bg-primary my-0.5" />

        {/* Year — Genre line */}
        <div
          ref={capYearRef}
          className="caption-mask font-medium text-foreground"
          style={{ fontSize: "10.5px", letterSpacing: "0.08em" }}
        >
          <span>{`${initialBook.period} — ${initialBook.genre}`}</span>
        </div>
      </div>

      {/* 7. Left & Right Cobalt Arrow Buttons on the Title's Line */}
      <button
        onClick={() => {
          motionRef.current.T = Math.round(motionRef.current.T) - 1;
        }}
        aria-label="Tập trước"
        className="fixed z-20 w-[44px] h-[44px] flex items-center justify-center text-primary hover:opacity-70 transition-opacity"
        style={{
          top: "calc(var(--cy) + var(--H) / 2 + 4.2vh)",
          left: "calc(50% - min(28vw, 370px) - 22px)"
        }}
      >
        <ArrowLeft className="size-5" strokeWidth={1.5} />
      </button>

      <button
        onClick={() => {
          motionRef.current.T = Math.round(motionRef.current.T) + 1;
        }}
        aria-label="Tập tiếp theo"
        className="fixed z-20 w-[44px] h-[44px] flex items-center justify-center text-primary hover:opacity-70 transition-opacity"
        style={{
          top: "calc(var(--cy) + var(--H) / 2 + 4.2vh)",
          left: "calc(50% + min(28vw, 370px) - 22px)"
        }}
      >
        <ArrowRight className="size-5" strokeWidth={1.5} />
      </button>

      {/* 8. Bottom Historical Timeline Ruler (1930 — 2026) */}
      <div
        data-timeline="true"
        onClick={handleTimelineClick}
        className="fixed left-4 right-4 md:left-9 md:right-9 bottom-[54px] md:bottom-[64px] h-[40px] z-20 cursor-pointer"
      >
        {/* 1px Cobalt Horizontal Ruler Line at 12px */}
        <div
          className="absolute left-0 right-0 top-[12px] h-px bg-primary"
          style={{ opacity: 0.75 }}
        />

        {/* Ticks & Milestone Year Labels */}
        <div className="relative w-full h-full flex justify-between items-start">
          {timelineYears.map((_, i) => {
            const isMajor = i % 5 === 0;
            const milestoneLabels: Record<number, string> = {
              0: "1930",
              5: "1941",
              10: "1945",
              15: "1954",
              20: "1965",
              25: "1975",
              30: "1986",
              35: "2026"
            };
            const label = milestoneLabels[i];

            return (
              <div key={i} className="relative flex flex-col items-center">
                <div
                  className="w-px bg-primary"
                  style={{
                    height: isMajor ? "13px" : "7px",
                    marginTop: isMajor ? "5.5px" : "8.5px",
                    opacity: isMajor ? 0.75 : 0.4
                  }}
                />
                {label && (
                  <span
                    className={`mt-1.5 font-medium text-primary text-[9.5px] leading-none ${
                      i === 0
                        ? "self-start"
                        : i === 35
                          ? "self-end"
                          : ""
                    }`}
                  >
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 9px Cobalt Gliding Dot */}
        <div
          ref={timelineDotRef}
          className="absolute top-[7.5px] -ml-[4.5px] w-[9px] h-[9px] rounded-full bg-primary pointer-events-none"
          style={{ left: "28%" }}
        />
      </div>

      {/* 9. Footer */}
      <footer className="fixed left-4 right-4 md:left-9 md:right-9 bottom-[18px] md:bottom-[24px] flex items-center justify-between z-20">
        <span className="lbl text-primary text-[9px] md:text-[10.5px]">
          © GIÁO TRÌNH LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM • BỘ GD&ĐT (2026)
        </span>
        <div className="flex items-center gap-3 lbl text-primary text-[9px] md:text-[10.5px]">
          <button onClick={() => openDetailSheet()} className="hover:underline">
            MỞ TẬP ĐANG CHỌN
          </button>
          <span>/</span>
          <button
            onClick={() =>
              onOpenBook(BOOKS_COLLECTION[motionRef.current.activeIdx])
            }
            className="hover:underline"
          >
            ĐỌC TOÀN VĂN
          </button>
        </div>
      </footer>

      {/* 10. Detail Sheet Dialog (Paper clip-path growth + SVG Ink-Blot Poster Reveal) */}
      <div
        ref={detailRef}
        role="dialog"
        aria-modal="true"
        aria-label={detailBook.title}
        className="fixed inset-0 z-50 bg-background overflow-y-auto md:overflow-hidden"
        style={{ visibility: isDetailOpen ? "visible" : "hidden" }}
      >
        {/* Detail Sheet Heritage Background & Grid Pattern */}
        <div aria-hidden="true" className="screen-archive-grid-bg" />
        <div aria-hidden="true" className="screen-archive-vintage-tint" />
        <div aria-hidden="true" className="screen-archive-radial-glow" />
        <div aria-hidden="true" className="cinematic-vignette opacity-60 pointer-events-none" />
        {/* Top Bar inside Detail Sheet */}
        <AppButton
          onClick={closeDetailSheet}
          variant="outline"
          size="xs"
          icon={<X className="size-3" strokeWidth={1.5} />}
          className="fixed top-[21px] left-[16px] md:top-[28px] md:left-[36px] z-20"
        >
          ĐÓNG LẠI (ESC)
        </AppButton>

        <div className="hidden md:flex fixed top-[28px] right-[36px] z-20 items-center gap-4 text-primary">
          <span className="lbl">LỊCH SỬ ĐẢNG CSVN</span>
          <span className="w-[40px] h-px bg-primary" />
          <span className="lbl">{detailBook.volNum}</span>
        </div>

        {/* Two-column Detail Grid */}
        <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[4vw] pt-[84px] px-[22px] pb-[40px] md:pt-[110px] md:pr-[6vw] md:pb-[56px] md:pl-[7vw] items-center">
          {/* Left Column: Masked rising editorial lines */}
          <div className="order-2 md:order-1 max-w-[540px] flex flex-col gap-[18px]">
            {/* Line 0: Cobalt subtitle .lbl */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[0] = el;
                }}
                className="lbl text-primary"
              >
                {`${detailBook.volNum} • ${detailBook.subtitle}`}
              </div>
            </div>

            {/* Line 1: Big cobalt title */}
            <div className="overflow-hidden py-1">
              <h2
                ref={(el) => {
                  detailLineRefs.current[1] = el;
                }}
                className="font-semibold text-primary tracking-[-0.03em] leading-[1.04]"
                style={{ fontSize: "clamp(36px, 4.6vw, 68px)" }}
              >
                {detailBook.title}
              </h2>
            </div>

            {/* Line 2: Muted meta line */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailLineRefs.current[2] = el;
                }}
                className="lbl text-muted-foreground"
              >
                {`${detailBook.period} / ${detailBook.genre} / ${detailBook.pageCount}`}
              </div>
            </div>

            {/* Line 3: Synopsis in Newsreader serif */}
            <div className="overflow-hidden">
              <p
                ref={(el) => {
                  detailLineRefs.current[3] = el;
                }}
                className="font-serif text-[17px] leading-[1.58] text-foreground max-w-[46ch]"
              >
                {detailBook.summary}
              </p>
            </div>

            {/* Line 4: Italic credit in Newsreader italic */}
            <div className="overflow-hidden">
              <p
                ref={(el) => {
                  detailLineRefs.current[4] = el;
                }}
                className="font-serif italic text-[15px] text-muted-foreground"
              >
                Biên soạn chuẩn Giáo trình Bộ Giáo dục và Đào tạo (2026) • Ấn phẩm Lưu trữ Quốc gia
              </p>
            </div>

            {/* Line 5: Action buttons */}
            <div className="overflow-hidden pt-2">
              <div
                ref={(el) => {
                  detailLineRefs.current[5] = el;
                }}
                className="flex flex-wrap items-center gap-3"
              >
                <AppButton
                  onClick={() => {
                    isDetailOpenRef.current = false;
                    setIsDetailOpen(false);
                    onOpenBook(detailBook);
                  }}
                  variant="primary"
                  size="lg"
                  icon={<BookOpen className="size-4" strokeWidth={1.5} />}
                >
                  ĐỌC TOÀN VĂN CHƯƠNG NÀY
                </AppButton>

                <AppLink
                  href="/LỊCH SỬ ĐẢNG 221TR - 2026.pdf"
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  size="lg"
                  iconRight={<ExternalLink className="size-3.5" strokeWidth={1.5} />}
                >
                  PDF GỐC
                </AppLink>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Hardcover Book Poster Presentation */}
          <div className="order-1 md:order-2 flex items-center justify-center h-[52svh] md:h-[76vh] py-2">
            <div
              className="relative h-full flex items-center justify-center transition-transform duration-700 ease-out hover:scale-[1.02]"
              style={{
                aspectRatio: "474 / 900",
                filter: "drop-shadow(0 24px 48px rgba(28, 16, 8, 0.45)) drop-shadow(0 4px 12px rgba(28, 16, 8, 0.25))"
              }}
            >
              <img
                src={detailPosterHref}
                alt={`Bìa sách ${detailBook.title}`}
                className="h-full w-auto max-w-full rounded-[4px] object-contain select-none"
                style={{
                  aspectRatio: "474 / 900",
                  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.15)"
                }}
              />
              {/* Book Spine 3D Lighting Highlight on Left */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[24px] pointer-events-none rounded-l-[4px]"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.12) 35%, rgba(0,0,0,0.2) 75%, transparent 100%)"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 11. Custom Red Seal Stamp Cursor (Con trỏ Triện son đỏ cổ điển) */}
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <div className="seal-cursor-outer">
          <div className="seal-cursor-inner" />
          {/* Biểu tượng mộc triện son: Ngôi sao cách điệu */}
          <svg viewBox="0 0 24 24" className="seal-cursor-emblem" fill="currentColor">
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
          <div className="seal-cursor-label">
            ĐÃ DUYỆT
            <br />
            MỞ TẬP
          </div>
        </div>
      </div>
    </div>
  );
}
