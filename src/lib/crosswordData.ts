export interface CrosswordRow {
  /** Đáp án viết hoa, không dấu, không khoảng trắng. */
  answer: string;
  /** Vị trí chữ cái nằm trên cột từ khóa. */
  keyIndex: number;
  clue: string;
}

export interface Crossword {
  id: string;
  title: string;
  keyword: string;
  keywordClue: string;
  rows: CrosswordRow[];
}

export const CROSSWORDS: Crossword[] = [
  {
    id: "cw1",
    title: "Chương 1: Đảng ra đời và giành chính quyền",
    keyword: "VIETMINH",
    keywordClue: "Mặt trận do Hội nghị Trung ương 8 (5/1941) quyết định thành lập.",
    rows: [
      { answer: "VIETBAC", keyIndex: 0, clue: "Chiến dịch Thu - Đông 1947 đánh bại kế hoạch đánh nhanh thắng nhanh của Pháp (tên căn cứ địa)." },
      { answer: "THANHNIEN", keyIndex: 6, clue: "Hội Việt Nam Cách mạng ___ (1925)." },
      { answer: "NGHETINH", keyIndex: 3, clue: "Xô viết ___ - Tĩnh, đỉnh cao cao trào cách mạng 1930 - 1931." },
      { answer: "TANTRAO", keyIndex: 0, clue: "Địa danh ở Tuyên Quang, nơi họp Quốc dân Đại hội tháng 8/1945." },
      { answer: "MATTRAN", keyIndex: 0, clue: "Việt Minh là một ___ dân tộc thống nhất." },
      { answer: "CUONGLINH", keyIndex: 6, clue: "Chánh cương vắn tắt là ___ chính trị đầu tiên của Đảng." },
      { answer: "NGUYENAIQUOC", keyIndex: 0, clue: "Người chủ trì Hội nghị thành lập Đảng (viết liền, không dấu)." },
      { answer: "HUONGCANG", keyIndex: 0, clue: "Nơi họp Hội nghị thành lập Đảng đầu năm 1930 (Trung Quốc)." }
    ]
  },
  {
    id: "cw2",
    title: "Chương 2: Hai cuộc kháng chiến",
    keyword: "THONGNHAT",
    keywordClue: "Mục tiêu của cuộc kháng chiến chống Mỹ, cứu nước: giải phóng miền Nam, ___ đất nước.",
    rows: [
      { answer: "TONGTIENCONG", keyIndex: 0, clue: "Cuộc ___ và nổi dậy mùa Xuân 1975 (viết liền)." },
      { answer: "HIEPDINH", keyIndex: 0, clue: "Văn bản ký kết ở Giơnevơ năm 1954." },
      { answer: "DONGKHOI", keyIndex: 1, clue: "Phong trào nổi dậy ở miền Nam những năm 1959 - 1960." },
      { answer: "NAVA", keyIndex: 0, clue: "Kế hoạch của Pháp bị đập tan ở Điện Biên Phủ." },
      { answer: "TRUONGKY", keyIndex: 5, clue: "Kháng chiến toàn dân, toàn diện, ___, tự lực cánh sinh." },
      { answer: "DIENBIENPHU", keyIndex: 3, clue: "Chiến thắng ngày 7/5/1954 'lừng lẫy năm châu' (viết liền)." },
      { answer: "HOCHIMINH", keyIndex: 0, clue: "Chiến dịch lịch sử kết thúc ngày 30/4/1975 (viết liền)." },
      { answer: "PARIS", keyIndex: 1, clue: "Hiệp định năm 1973 buộc Mỹ rút quân về nước." },
      { answer: "TAYNGUYEN", keyIndex: 0, clue: "Chiến dịch mở màn bằng trận Buôn Ma Thuột (3/1975), viết liền." }
    ]
  },
  {
    id: "cw3",
    title: "Chương 3: Đổi mới",
    keyword: "DAIHOIVI",
    keywordClue: "Sự kiện tháng 12/1986 khởi xướng công cuộc Đổi mới (viết liền, không dấu).",
    rows: [
      { answer: "DOIMOI", keyIndex: 0, clue: "Công cuộc khởi xướng tại Đại hội VI (1986)." },
      { answer: "ASEAN", keyIndex: 0, clue: "Tổ chức khu vực Việt Nam gia nhập năm 1995." },
      { answer: "HOINHAP", keyIndex: 2, clue: "Chủ động và tích cực ___ quốc tế toàn diện." },
      { answer: "CHINHTRI", keyIndex: 1, clue: "Đổi mới kinh tế đi đôi với đổi mới hệ thống ___." },
      { answer: "BAOCAP", keyIndex: 2, clue: "Cơ chế kế hoạch hóa tập trung quan liêu, ___ gây khủng hoảng." },
      { answer: "THITRUONG", keyIndex: 2, clue: "Kinh tế ___ định hướng xã hội chủ nghĩa." },
      { answer: "NGUYENVANLINH", keyIndex: 6, clue: "Tổng Bí thư tại Đại hội VI (viết liền, không dấu)." },
      { answer: "GIA", keyIndex: 1, clue: "Hội nghị Trung ương 8 khóa V (1985) về ___ - lương - tiền." }
    ]
  }
];
