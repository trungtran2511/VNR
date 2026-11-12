export interface CrosswordRow {
  /** Đáp án viết hoa, không dấu, không khoảng trắng. */
  answer: string;
  /** Vị trí chữ cái nằm trên cột từ khóa. */
  keyIndex: number;
  clue: string;
}

export interface Crossword {
  id: string;
  chapterCode: "Chương 1" | "Chương 2" | "Chương 3";
  title: string;
  subTitle?: string;
  keyword: string;
  keywordClue: string;
  rows: CrosswordRow[];
}

export const CROSSWORDS: Crossword[] = [
  // --- CHƯƠNG 1 ---
  {
    id: "cw1-1",
    chapterCode: "Chương 1",
    title: "Chương 1: Đảng ra đời và giành chính quyền (Bộ đề 1)",
    subTitle: "Bộ đề 1 · Từ khóa 8 chữ cái",
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
    id: "cw1-2",
    chapterCode: "Chương 1",
    title: "Chương 1: Đảng ra đời và giành chính quyền (Bộ đề 2)",
    subTitle: "Bộ đề 2 · Từ khóa 6 chữ cái",
    keyword: "BACTHO",
    keywordClue: "Người cha già kính yêu của dân tộc, danh nhân văn hóa thế giới kiệt xuất.",
    rows: [
      { answer: "BASON", keyIndex: 0, clue: "Cuộc bãi công của công nhân xưởng ___ (8/1925) do Tôn Đức Thắng lãnh đạo." },
      { answer: "PACBO", keyIndex: 1, clue: "Hang đá ở Cao Bằng nơi lãnh tụ Nguyễn Ái Quốc về nước trực tiếp lãnh đạo năm 1941." },
      { answer: "CHINHTRI", keyIndex: 0, clue: "Cương lĩnh ___ đầu tiên xác định đúng đắn đường lối chiến lược của cách mạng." },
      { answer: "TRANPHU", keyIndex: 0, clue: "Tổng Bí thư đầu tiên của Đảng (tháng 10/1930), viết liền." },
      { answer: "HANOI", keyIndex: 0, clue: "Thủ đô ngàn năm văn hiến, nơi thành lập chi bộ cộng sản đầu tiên tại số 5D Hàm Long." },
      { answer: "CONGNONG", keyIndex: 1, clue: "Liên minh ___ là lực lượng nòng cốt và gốc rễ của cách mạng Việt Nam." }
    ]
  },
  {
    id: "cw1-3",
    chapterCode: "Chương 1",
    title: "Chương 1: Đảng ra đời và giành chính quyền (Bộ đề 3)",
    subTitle: "Bộ đề 3 · Từ khóa 7 chữ cái",
    keyword: "TANTRAO",
    keywordClue: "Thủ đô Khu giải phóng, nơi diễn ra Quốc dân Đại hội và Hội nghị toàn quốc của Đảng tháng 8/1945.",
    rows: [
      { answer: "TUYENNGON", keyIndex: 0, clue: "Bản ___ Độc lập ngày 2/9/1945 khai sinh nước Việt Nam Dân chủ Cộng hòa." },
      { answer: "ANNAM", keyIndex: 0, clue: "Tổ chức cộng sản ra đời ở Nam Kỳ tháng 7/1929: ___ Cộng sản Đảng." },
      { answer: "NAMKY", keyIndex: 0, clue: "Khởi nghĩa ___ tháng 11/1940, lần đầu tiên lá cờ đỏ sao vàng xuất hiện." },
      { answer: "THOICO", keyIndex: 0, clue: "Chớp ___ ngàn năm có một để phát động Tổng khởi nghĩa giành chính quyền." },
      { answer: "TRUONGCHINH", keyIndex: 1, clue: "Người khởi thảo bản Đề cương về văn hóa Việt Nam năm 1943 (viết liền)." },
      { answer: "BACSON", keyIndex: 1, clue: "Nơi nổ ra cuộc khởi nghĩa vũ trang tháng 9/1940 và thành lập Đội du kích đầu tiên." },
      { answer: "DONGDUONG", keyIndex: 1, clue: "Đảng đổi tên thành Đảng Cộng sản ___ tại Hội nghị Trung ương tháng 10/1930." }
    ]
  },

  // --- CHƯƠNG 2 ---
  {
    id: "cw2-1",
    chapterCode: "Chương 2",
    title: "Chương 2: Hai cuộc kháng chiến (Bộ đề 1)",
    subTitle: "Bộ đề 1 · Từ khóa 9 chữ cái",
    keyword: "THONGNHAT",
    keywordClue: "Mục tiêu tối thượng của cuộc kháng chiến chống Mỹ, cứu nước: giải phóng miền Nam, ___ đất nước.",
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
    id: "cw2-2",
    chapterCode: "Chương 2",
    title: "Chương 2: Hai cuộc kháng chiến (Bộ đề 2)",
    subTitle: "Bộ đề 2 · Từ khóa 8 chữ cái",
    keyword: "DIENBIEN",
    keywordClue: "Chiến thắng 'lừng lẫy năm châu, chấn động địa cầu' ngày 07/05/1954.",
    rows: [
      { answer: "DOCLAP", keyIndex: 0, clue: "Mục tiêu thiêng liêng: 'Không có gì quý hơn ___ tự do'." },
      { answer: "GIAP", keyIndex: 1, clue: "Đại tướng Tổng tư lệnh trực tiếp chỉ huy Chiến dịch Điện Biên Phủ." },
      { answer: "BEVANDAN", keyIndex: 1, clue: "Anh hùng lấy thân mình làm giá súng trong Chiến dịch Điện Biên Phủ (viết liền)." },
      { answer: "NAVA", keyIndex: 0, clue: "Tên vị tướng Pháp đề ra kế hoạch quân sự hòng xoay chuyển cục diện trong 18 tháng." },
      { answer: "BENTRE", keyIndex: 0, clue: "Tỉnh quê hương nổ ra phong trào Đồng Khởi đầu năm 1960." },
      { answer: "HIEPDINH", keyIndex: 1, clue: "Văn bản quốc tế Giơnevơ năm 1954 công nhận độc lập, chủ quyền của 3 nước Đông Dương." },
      { answer: "TOANDIEN", keyIndex: 6, clue: "Đường lối kháng chiến: Toàn dân, ___, trường kỳ, tự lực cánh sinh." },
      { answer: "NAMBO", keyIndex: 0, clue: "Chiến trường đi trước về sau được Bác Hồ phong tặng danh hiệu 'Thành đồng Tổ quốc'." }
    ]
  },
  {
    id: "cw2-3",
    chapterCode: "Chương 2",
    title: "Chương 2: Hai cuộc kháng chiến (Bộ đề 3)",
    subTitle: "Bộ đề 3 · Từ khóa 9 chữ cái",
    keyword: "TRUONGSON",
    keywordClue: "Con đường vận tải quân sự chiến lược huyền thoại chi viện sức người, sức của cho chiến trường miền Nam.",
    rows: [
      { answer: "TETMAUTHAN", keyIndex: 0, clue: "Cuộc Tổng tiến công và nổi dậy Tết ___ năm 1968 làm phá sản Chiến tranh cục bộ." },
      { answer: "TRUONGKY", keyIndex: 1, clue: "Kháng chiến lâu dài, bền bỉ để chuyển hóa tương quan lực lượng." },
      { answer: "QUANCHUNG", keyIndex: 1, clue: "Nghị quyết Trung ương 15 (1959) khẳng định con đường khởi nghĩa bạo lực của ___." },
      { answer: "CONSON", keyIndex: 1, clue: "Địa ngục trần gian nơi giam giữ đày đọa hàng vạn chiến sĩ cách mạng (Côn Đảo)." },
      { answer: "NGUYENVANCHOI", keyIndex: 0, clue: "Người anh hùng với 9 phút bất tử trước họng súng kẻ thù tại pháp trường (viết liền)." },
      { answer: "GIAPHONG", keyIndex: 0, clue: "Mặt trận Dân tộc ___ miền Nam Việt Nam thành lập ngày 20/12/1960." },
      { answer: "SAIGON", keyIndex: 0, clue: "Thành phố sào huyệt cuối cùng của chính quyền ngụy, giải phóng ngày 30/4/1975." },
      { answer: "DONGNAI", keyIndex: 1, clue: "Tỉnh có căn cứ 'cánh cửa thép' Xuân Lộc bảo vệ Sài Gòn bị đập tan tháng 4/1975." },
      { answer: "NHANDAN", keyIndex: 0, clue: "Lực lượng tạo nên sức mạnh vô địch của chiến tranh nhân dân Việt Nam." }
    ]
  },

  // --- CHƯƠNG 3 ---
  {
    id: "cw3-1",
    chapterCode: "Chương 3",
    title: "Chương 3: Đổi mới (Bộ đề 1)",
    subTitle: "Bộ đề 1 · Từ khóa 8 chữ cái",
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
  },
  {
    id: "cw3-2",
    chapterCode: "Chương 3",
    title: "Chương 3: Đổi mới (Bộ đề 2)",
    subTitle: "Bộ đề 2 · Từ khóa 7 chữ cái",
    keyword: "HOINHAP",
    keywordClue: "Chủ trương đối ngoại rộng mở, đa phương hóa, đa dạng hóa của Đảng trong thời kỳ đổi mới.",
    rows: [
      { answer: "HIENPHAP", keyIndex: 0, clue: "Đạo luật cơ bản cao nhất của Nhà nước sửa đổi, bổ sung năm 1992 và 2013." },
      { answer: "KHOANMUOI", keyIndex: 2, clue: "Nghị quyết 10 của Bộ Chính trị (1988) giao quyền tự chủ cho hộ nông dân gọi tắt là ___." },
      { answer: "KINHTE", keyIndex: 1, clue: "Đại hội VI xác định trọng tâm hàng đầu là đổi mới về ___." },
      { answer: "NONGNGHIEP", keyIndex: 0, clue: "Mặt trận hàng đầu trong 3 chương trình kinh tế lớn tại Đại hội VI." },
      { answer: "HOCHIMINH", keyIndex: 0, clue: "Tư tưởng ___ cùng với chủ nghĩa Mác - Lênin là nền tảng kim chỉ nam của Đảng." },
      { answer: "APEC", keyIndex: 0, clue: "Diễn đàn hợp tác kinh tế châu Á - Thái Bình Dương mà Việt Nam gia nhập năm 1998." },
      { answer: "PHATTRIEN", keyIndex: 0, clue: "Mục tiêu tổng quát: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh." }
    ]
  },
  {
    id: "cw3-3",
    chapterCode: "Chương 3",
    title: "Chương 3: Đổi mới (Bộ đề 3)",
    subTitle: "Bộ đề 3 · Từ khóa 9 chữ cái",
    keyword: "PHATTRIEN",
    keywordClue: "Mục tiêu bao trùm của công cuộc Đổi mới đưa đất nước thoát nghèo nàn và phát triển bền vững.",
    rows: [
      { answer: "PHAPQUYEN", keyIndex: 0, clue: "Xây dựng Nhà nước ___ xã hội chủ nghĩa của nhân dân, do nhân dân, vì nhân dân." },
      { answer: "HOCHIMINH", keyIndex: 0, clue: "Đại hội VII khẳng định lấy Chủ nghĩa Mác - Lênin và Tư tưởng ___ làm nền tảng tư tưởng." },
      { answer: "ASEAN", keyIndex: 0, clue: "Tổ chức khu vực Việt Nam trở thành thành viên thứ 7 vào ngày 28/7/1995." },
      { answer: "THITRUONG", keyIndex: 0, clue: "Mô hình kinh tế tổng quát trong thời kỳ quá độ: Kinh tế ___ định hướng XHCN." },
      { answer: "TAMNONG", keyIndex: 0, clue: "Nghị quyết TW7 khóa X về Nông nghiệp, nông dân, nông thôn thường gọi là vấn đề ___." },
      { answer: "TRUNGHOA", keyIndex: 1, clue: "Bình thường hóa quan hệ với nước láng giềng Cộng hòa Nhân dân ___ năm 1991." },
      { answer: "CUONGLINH", keyIndex: 6, clue: "Văn kiện định hướng xây dựng đất nước trong thời kỳ quá độ được thông qua năm 1991." },
      { answer: "CONGNGHE", keyIndex: 7, clue: "Khoa học và ___ cùng với giáo dục đào tạo là quốc sách hàng đầu." },
      { answer: "NGUYENVANLINH", keyIndex: 0, clue: "Tổng Bí thư khởi xướng chuyên mục 'Những việc cần làm ngay' chống tiêu cực (viết liền)." }
    ]
  }
];
