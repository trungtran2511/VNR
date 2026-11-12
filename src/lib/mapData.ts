/** Bản đồ cách điệu (không dùng để đo đạc): tọa độ [kinh độ, vĩ độ] xấp xỉ. */
export const VN_OUTLINE: [number, number][] = [
  [102.15, 22.4], [102.4, 22.7], [102.9, 22.6], [103.1, 22.45], [103.5, 22.7], [103.95, 22.5],
  [104.3, 22.8], [104.65, 23.1], [105.0, 23.25], [105.45, 23.3], [105.85, 23.1], [106.3, 23.0],
  [106.7, 22.85], [106.7, 22.0], [107.0, 21.9], [107.3, 21.6], [107.9, 21.55], [108.05, 21.5],
  [107.65, 21.4], [107.35, 21.3], [107.1, 21.05], [106.8, 20.85], [106.7, 20.7], [106.55, 20.45],
  [106.3, 20.2], [106.1, 20.0], [105.95, 19.75], [105.85, 19.4], [105.7, 19.0], [105.8, 18.7],
  [106.0, 18.4], [106.3, 18.0], [106.5, 17.6], [106.9, 17.2], [107.2, 16.95], [107.55, 16.6],
  [108.0, 16.2], [108.2, 16.05], [108.4, 15.85], [108.75, 15.5], [108.95, 15.25], [109.1, 14.8],
  [109.2, 14.4], [109.3, 13.9], [109.3, 13.4], [109.25, 12.9], [109.3, 12.45], [109.2, 12.0],
  [109.15, 11.6], [108.9, 11.25], [108.5, 11.0], [108.0, 10.85], [107.6, 10.55], [107.1, 10.4],
  [106.8, 10.3], [106.7, 10.0], [106.4, 9.7], [106.1, 9.45], [105.8, 9.3], [105.4, 9.0],
  [105.05, 8.7], [104.85, 8.6], [104.8, 8.9], [104.95, 9.4], [105.1, 9.95], [104.85, 10.2],
  [104.48, 10.4], [104.85, 10.5], [105.0, 10.9], [105.4, 11.1], [105.85, 11.55], [106.2, 11.8],
  [106.55, 11.65], [106.9, 11.95], [107.3, 12.2], [107.55, 12.45], [107.55, 12.95], [107.45, 13.4],
  [107.35, 13.9], [107.5, 14.35], [107.55, 14.7], [107.35, 15.1], [107.2, 15.6], [106.8, 16.0],
  [106.6, 16.3], [106.55, 16.6], [106.2, 17.0], [105.8, 17.5], [105.5, 17.9], [105.15, 18.25],
  [104.7, 18.9], [104.4, 19.05], [104.1, 19.4], [104.0, 19.9], [104.2, 20.3], [104.4, 20.6],
  [104.0, 20.85], [103.6, 20.8], [103.2, 20.9], [103.0, 21.3], [102.9, 21.6], [102.4, 21.9]
];

/** Đảo lớn (đa giác) và đảo nhỏ (chấm). */
export const ISLAND_POLYS: [number, number][][] = [
  [[103.85, 10.4], [104.05, 10.35], [104.05, 10.0], [103.95, 9.85], [103.85, 10.1]],
  [[106.95, 20.85], [107.1, 20.85], [107.1, 20.7], [106.95, 20.7]]
];
export const ISLAND_DOTS: { name: string; lon: number; lat: number }[] = [
  { name: "Lý Sơn", lon: 109.1, lat: 15.38 },
  { name: "Côn Đảo", lon: 106.6, lat: 8.7 }
];

export interface Archipelago {
  name: string;
  labelAt: [number, number];
  islets: [number, number][];
}

/** Hoàng Sa và Trường Sa (vị trí xấp xỉ, mang tính minh họa). */
export const ARCHIPELAGOS: Archipelago[] = [
  {
    name: "Quần đảo Hoàng Sa (Việt Nam)",
    labelAt: [111.9, 17.25],
    islets: [[111.2, 16.5], [111.6, 16.6], [111.9, 16.55], [112.3, 16.45], [112.6, 16.3], [112.0, 15.8], [111.4, 16.0], [112.5, 16.7]]
  },
  {
    name: "Quần đảo Trường Sa (Việt Nam)",
    labelAt: [113.4, 12.2],
    islets: [[114.33, 11.43], [114.37, 10.18], [114.48, 10.38], [114.33, 9.88], [113.9, 9.7], [113.6, 8.9], [112.9, 7.9], [111.92, 8.64], [112.2, 9.5], [113.1, 10.4], [114.0, 10.8], [115.0, 9.9], [114.7, 8.7], [113.8, 8.1]]
  }
];

export type MapPeriod = "all" | "1930-1945" | "1945-1954" | "1954-1975";
export type MapCategory = "political" | "campaign" | "base" | "logistics";

export interface MapPin {
  id: string;
  name: string;
  year: string;
  date: string;
  period: "1930-1945" | "1945-1954" | "1954-1975";
  category: MapCategory;
  categoryLabel: string;
  lon: number;
  lat: number;
  image: string;
  imageCaption: string;
  leader: string;
  summary: string;
  strategic: string;
  monument: string;
  narration: string;
  reunificationStep?: number;
  defeatedStrategy?: string;
}

export const MAP_PERIODS = [
  { id: "all" as const, label: "Tất cả giai đoạn (1930 - 1975)" },
  { id: "1930-1945" as const, label: "1930 - 1945: Giành chính quyền" },
  { id: "1945-1954" as const, label: "1945 - 1954: Kháng chiến chống Pháp" },
  { id: "1954-1975" as const, label: "1954 - 1975: Kháng chiến chống Mỹ" }
];

export const MAP_CATEGORIES: Record<MapCategory, { label: string; color: string; bg: string }> = {
  political: { label: "Mốc chính trị & Văn kiện", color: "#e11d48", bg: "rgba(225, 29, 72, 0.12)" },
  campaign: { label: "Chiến dịch quân sự", color: "#d97706", bg: "rgba(217, 119, 6, 0.12)" },
  base: { label: "Căn cứ địa cách mạng", color: "#16a34a", bg: "rgba(22, 163, 74, 0.12)" },
  logistics: { label: "Tuyến chi viện chiến lược", color: "#2563eb", bg: "rgba(37, 99, 235, 0.12)" }
};

/**
 * 15 Mốc lịch sử với tọa độ hiển thị được phân bổ giãn cách thông minh (Anti-collision display layout)
 * để tránh việc các sự kiện cùng khu vực (Hà Nội, Sài Gòn, Cao Bằng) đè lấp lên nhau trên bản đồ.
 */
export const MAP_PINS: MapPin[] = [
  {
    id: "xoviet",
    name: "Ngã ba Bến Thủy - Hưng Nguyên (Nghệ An)",
    year: "1930",
    date: "12/09/1930",
    period: "1930-1945",
    category: "political",
    categoryLabel: "Chính quyền sơ khai công nông",
    lon: 105.68,
    lat: 18.66,
    image: "xoviet",
    imageCaption: "Ảnh tư liệu: Bảo tàng Xô Viết Nghệ Tĩnh và tượng đài tưởng niệm cao trào 1930-1931 tại Hưng Nguyên, Nghệ An.",
    leader: "Xứ ủy Trung Kỳ & Ban Chấp hành Đảng bộ Nghệ - Tĩnh",
    summary: "Đỉnh cao của cao trào cách mạng 1930 - 1931 dưới sự lãnh đạo của Đảng Cộng sản Việt Nam. Hàng vạn nông dân Hưng Nguyên biểu tình thị uy, đập tan chính quyền thực dân phong kiến ở nhiều thôn xã, thành lập chính quyền Xô Viết công nông đầu tiên.",
    strategic: "Cuộc tập dượt đầu tiên của Đảng và quần chúng nhân dân chuẩn bị trực tiếp cho Tổng khởi nghĩa Tháng Tám 1945.",
    monument: "Di tích Lịch sử Quốc gia Đặc biệt Xô Viết Nghệ Tĩnh (TP. Vinh & huyện Hưng Nguyên, Nghệ An).",
    narration: "Bến Thủy, Hưng Nguyên, Nghệ An, năm 1930. Đỉnh cao của cao trào cách mạng 1930 - 1931, khai sinh chính quyền Xô Viết công nông đầu tiên."
  },
  {
    id: "pacbo",
    name: "Khu di tích Pác Bó (Cao Bằng)",
    year: "1941",
    date: "28/01/1941 - 19/05/1941",
    period: "1930-1945",
    category: "base",
    categoryLabel: "Căn cứ địa cách mạng đầu tiên",
    lon: 105.85,
    lat: 22.98,
    image: "pacbo",
    imageCaption: "Ảnh tư liệu: Khu di tích lịch sử Pác Bó (suối Lê Nin, hang Cốc Bó), nơi Bác Hồ về nước đầu năm 1941.",
    leader: "Lãnh tụ Nguyễn Ái Quốc (Hồ Chí Minh)",
    summary: "Sau 30 năm bôn ba tìm đường cứu nước, ngày 28/1/1941 lãnh tụ Nguyễn Ái Quốc trở về Tổ quốc trực tiếp chỉ đạo cách mạng. Tháng 5/1941, Người triệu tập và chủ trì Hội nghị Trung ương 8 tại lán Khuổi Nặm, hoàn chỉnh đường lối chuyển hướng chỉ đạo chiến lược: đặt nhiệm vụ giải phóng dân tộc lên hàng trước tiên và thành lập Mặt trận Việt Minh.",
    strategic: "Xây dựng căn cứ địa địa đầu Tổ quốc, chuyển hướng chỉ đạo chiến lược quyết định sự thành bại của Cách mạng Tháng Tám.",
    monument: "Khu Di tích Quốc gia Đặc biệt Pác Bó (xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng).",
    narration: "Pác Bó, Cao Bằng, năm 1941. Nguyễn Ái Quốc về nước sau ba mươi năm, chủ trì Hội nghị Trung ương 8 và sáng lập Mặt trận Việt Minh."
  },
  {
    id: "tantrao",
    name: "Khu di tích Tân Trào (Tuyên Quang)",
    year: "1945",
    date: "13/08/1945 - 16/08/1945",
    period: "1930-1945",
    category: "political",
    categoryLabel: "Thủ đô Khu Giải Phóng",
    lon: 105.35,
    lat: 21.82,
    image: "tantrao",
    imageCaption: "Ảnh tư liệu: Đình Tân Trào - nơi họp Quốc dân Đại hội ngày 16/8/1945 thông qua Lệnh Tổng khởi nghĩa và bầu Ủy ban Dân tộc Giải phóng.",
    leader: "Chủ tịch Hồ Chí Minh & Ủy ban Dân tộc Giải phóng Việt Nam",
    summary: "Tháng 8/1945, Hội nghị cán bộ toàn quốc của Đảng họp tại Tân Trào quyết định phát động Tổng khởi nghĩa giành chính quyền. Ngày 16/8/1945, Quốc dân Đại hội họp tại Đình Tân Trào thông qua 10 chính sách lớn của Việt Minh, bầu Ủy ban Dân tộc Giải phóng (Chính phủ lâm thời) do Hồ Chí Minh làm Chủ tịch.",
    strategic: "Trung tâm đầu não chỉ đạo Tổng khởi nghĩa Tháng Tám 1945 thắng lợi rực rỡ trên phạm vi cả nước.",
    monument: "Khu Di tích Quốc gia Đặc biệt Tân Trào (huyện Sơn Dương, tỉnh Tuyên Quang).",
    narration: "Tân Trào, Tuyên Quang, tháng Tám năm 1945. Nơi họp Quốc dân Đại hội, phát lệnh Tổng khởi nghĩa giành chính quyền về tay nhân dân."
  },
  {
    id: "badinh",
    name: "Quảng trường Ba Đình (Hà Nội)",
    year: "1945",
    date: "02/09/1945",
    period: "1930-1945",
    category: "political",
    categoryLabel: "Khai sinh nước VNDCCH",
    lon: 105.80,
    lat: 21.30,
    image: "badinh",
    imageCaption: "Ảnh tư liệu: Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội ngày 2/9/1945.",
    leader: "Chủ tịch Hồ Chí Minh & Chính phủ Lâm thời",
    summary: "Ngày 2/9/1945, trước hơn 50 vạn đồng bào tập hợp tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh thay mặt Chính phủ Lâm thời long trọng đọc bản Tuyên ngôn Độc lập, tuyên bố với quốc dân và toàn thế giới sự ra đời của nước Việt Nam Dân chủ Cộng hòa.",
    strategic: "Xóa bỏ ách thống trị hơn 80 năm của thực dân Pháp và hàng nghìn năm phong kiến, mở ra kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    monument: "Quảng trường Ba Đình & Lăng Chủ tịch Hồ Chí Minh (Thủ đô Hà Nội).",
    narration: "Quảng trường Ba Đình, Hà Nội, ngày 2 tháng 9 năm 1945. Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa."
  },
  {
    id: "biengioi",
    name: "Chiến dịch Biên Giới Thu - Đông 1950",
    year: "1950",
    date: "16/09/1950 - 14/10/1950",
    period: "1945-1954",
    category: "campaign",
    categoryLabel: "Chiến dịch tiến công lớn",
    lon: 106.65,
    lat: 22.42,
    image: "biengioi",
    imageCaption: "Ảnh tư liệu: Chủ tịch Hồ Chí Minh quan sát trận đánh Đông Khê trên đỉnh núi Báo Đông trong Chiến dịch Biên Giới 1950 (Ảnh: Vũ Năng An).",
    leader: "Chủ tịch Hồ Chí Minh & Đại tướng Võ Nguyên Giáp",
    summary: "Chiến dịch tiến công quy mô lớn đầu tiên của Quân đội nhân dân Việt Nam dọc tuyến đường số 4. Sau khi tiêu diệt cứ điểm Đông Khê, quân ta đập tan hệ thống phòng thủ Bo-gác của quân Pháp, giải phóng toàn bộ 750 km biên giới phía Bắc với 35 vạn dân.",
    strategic: "Phá tan thế bao vây cô lập căn cứ địa Việt Bắc, khai thông đường tiếp viện với các nước XHCN, giành thế chủ động chiến lược trên chiến trường chính Bắc Bộ.",
    monument: "Khu Di tích Chiến thắng Chiến dịch Biên giới 1950 (huyện Thạch An, tỉnh Cao Bằng).",
    narration: "Đông Khê, Cao Bằng, mùa thu năm 1950. Chiến dịch Biên Giới thắng lợi giòn giã, quân ta chính thức giành quyền chủ động chiến lược trên chiến trường chính."
  },
  {
    id: "dienbien",
    name: "Chiến dịch Điện Biên Phủ (Điện Biên)",
    year: "1954",
    date: "13/03/1954 - 07/05/1954",
    period: "1945-1954",
    category: "campaign",
    categoryLabel: "Chiến thắng quyết chiến chiến lược",
    lon: 103.02,
    lat: 21.38,
    image: "dienbienphu",
    imageCaption: "Ảnh tư liệu: Lá cờ 'Quyết chiến Quyết thắng' tung bay trên nóc hầm chỉ huy tướng Đờ Cát chiều 7/5/1954 (Ảnh: Triệu Đại).",
    leader: "Đại tướng Võ Nguyên Giáp (Tổng Tư lệnh kiêm Bí thư Đảng ủy Chiến dịch)",
    summary: "Trải qua 56 ngày đêm chiến đấu ngoan cường, quân và dân ta dưới sự chỉ đạo của Đại tướng Võ Nguyên Giáp đã chuyển đổi phương châm từ 'đánh nhanh, thắng nhanh' sang 'đánh chắc, tiến chắc', đập tan tập đoàn cứ điểm mạnh nhất Đông Dương của thực dân Pháp.",
    strategic: "Đập tan hoàn toàn Kế hoạch Nava, giáng đòn quyết định buộc thực dân Pháp phải ký Hiệp định Giơnevơ (1954), chấm dứt chiến tranh xâm lược.",
    monument: "Quần thể Di tích Quốc gia Đặc biệt Chiến trường Điện Biên Phủ (tỉnh Điện Biên).",
    narration: "Điện Biên Phủ, ngày 7 tháng 5 năm 1954. Chiến thắng lừng lẫy năm châu, chấn động địa cầu, đập tan tập đoàn cứ điểm bất khả xâm phạm của thực dân Pháp."
  },
  {
    id: "hienluong",
    name: "Cầu Hiền Lương - Sông Bến Hải (Vĩ tuyến 17)",
    year: "1954",
    date: "21/07/1954 - 1975",
    period: "1954-1975",
    category: "political",
    categoryLabel: "Giới tuyến chia cắt hai miền",
    lon: 107.03,
    lat: 17.01,
    image: "hienluong",
    imageCaption: "Ảnh tư liệu: Cầu Hiền Lương bắc qua sông Bến Hải (Quảng Trị) - giới tuyến quân sự tạm thời chia cắt đất nước sau Hiệp định Giơnevơ 1954.",
    leader: "Đảng bộ và quân dân đôi bờ Bến Hải - Đặc khu Vĩnh Linh",
    summary: "Theo Hiệp định Giơnevơ năm 1954, sông Bến Hải ở vĩ tuyến 17 được quy định là giới tuyến quân sự tạm thời chờ hiệp thương tổng tuyển cử. Đế quốc Mỹ đã dựng lên chính quyền bù nhìn tay sai, phá vỡ hiệp định, biến con sông Hiền Lương thành nỗi đau chia cắt đất nước suốt 21 năm.",
    strategic: "Khởi đầu tiến trình 21 năm kháng chiến chống Mỹ: Miền Bắc xây dựng CNXH làm hậu phương lớn, miền Nam kiên cường giữ vững ngọn cờ giải phóng.",
    monument: "Di tích Quốc gia Đặc biệt Đôi bờ Hiền Lương - Bến Hải (Vĩnh Linh & Gio Linh, Quảng Trị).",
    narration: "Cầu Hiền Lương, sông Bến Hải, vĩ tuyến 17. Nơi ghi dấu nỗi đau chia cắt hơn hai mươi năm và biểu tượng bất diệt cho ý chí thống nhất non sông.",
    reunificationStep: 1,
    defeatedStrategy: "Âm mưu chia cắt lâu dài đất nước của đế quốc Mỹ"
  },
  {
    id: "truongson",
    name: "Tuyến đường Hồ Chí Minh (Đoàn 559)",
    year: "1959",
    date: "19/05/1959 - 1975",
    period: "1954-1975",
    category: "logistics",
    categoryLabel: "Tuyến chi viện chiến lược Bắc - Nam",
    lon: 106.50,
    lat: 16.35,
    image: "truongson",
    imageCaption: "Ảnh tư liệu: Đoàn xe vận tải của bộ đội Trường Sơn vượt đèo bom đạn chi viện cho chiến trường miền Nam (Đoàn 559).",
    leader: "Trung tướng Đồng Sỹ Nguyên (Tư lệnh Bộ đội Trường Sơn)",
    summary: "Ngày 19/5/1959, Tổng Quân ủy quyết định thành lập Đoàn 559 mở tuyến vận tải chiến lược trên dãy Trường Sơn chi viện sức người, sức của cho tiền tuyến lớn miền Nam. Cùng với đường biển Tàu Không Số, tuyến đường đã phát triển thành mạng lưới giao thông liên hoàn gần 20.000 km.",
    strategic: "Huyết mạch giao thông quyết định thắng lợi, nối hậu phương lớn miền Bắc xã hội chủ nghĩa với tiền tuyến lớn miền Nam đánh Mỹ.",
    monument: "Hệ thống Di tích Lịch sử Quốc gia Đặc biệt Đường Trường Sơn - Đường Hồ Chí Minh.",
    narration: "Đường Trường Sơn, đường Hồ Chí Minh, mở ngày 19 tháng 5 năm 1959. Con đường huyền thoại xẻ dọc Trường Sơn đi cứu nước của quân và dân ta.",
    reunificationStep: 1,
    defeatedStrategy: "Bẻ gãy âm mưu phong tỏa cô lập cách mạng miền Nam"
  },
  {
    id: "dongkhoi",
    name: "Phong trào Đồng Khởi (Định Thủy, Bến Tre)",
    year: "1960",
    date: "17/01/1960",
    period: "1954-1975",
    category: "political",
    categoryLabel: "Cao trào nổi dậy miền Nam",
    lon: 106.45,
    lat: 9.88,
    image: "dongkhoi",
    imageCaption: "Ảnh tư liệu: Nhà truyền thống Đồng Khởi tại Định Thủy (Mỏ Cày, Bến Tre), cái nôi phong trào Đồng Khởi năm 1960.",
    leader: "Nữ tướng Nguyễn Thị Định & Tỉnh ủy Bến Tre",
    summary: "Thực hiện Nghị quyết Hội nghị TW 15 của Đảng, ngày 17/1/1960, nhân dân 3 xã Định Thủy, Phước Hiệp, Bình Khánh (Mỏ Cày, Bến Tre) đồng loạt nổi dậy với vũ khí thô sơ kết hợp 'Đội quân tóc dài', đập tan ách kìm kẹp tàn bạo của chính quyền Ngô Đình Diệm, lan rộng khắp miền Nam.",
    strategic: "Bước ngoặt chiến lược căn bản: Đánh bại 'Chiến tranh đơn phương', chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.",
    monument: "Di tích Quốc gia Đặc biệt Đồng Khởi Bến Tre (xã Định Thủy, huyện Mỏ Cày Nam, tỉnh Bến Tre).",
    narration: "Định Thủy, Mỏ Cày, Bến Tre, ngày 17 tháng 1 năm 1960. Ngọn lửa Đồng Khởi bùng cháy, chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.",
    reunificationStep: 1,
    defeatedStrategy: "Đánh bại chiến lược 'Chiến tranh đơn phương' (1954 - 1960)"
  },
  {
    id: "apbac",
    name: "Chiến thắng Ấp Bắc (Tiền Giang)",
    year: "1963",
    date: "02/01/1963",
    period: "1954-1975",
    category: "campaign",
    categoryLabel: "Đánh bại chiến thuật tối tân Mỹ",
    lon: 105.85,
    lat: 10.40,
    image: "apbac",
    imageCaption: "Ảnh tư liệu: Trực thăng quân sự Mỹ bị bắn rơi tại trận Ấp Bắc ngày 2/1/1963.",
    leader: "Tỉnh ủy Mỹ Tho & Bộ Chỉ huy Quân sự Quân khu 8",
    summary: "Trận đánh diễn ra tại xã Tân Phú, Cai Lậy, Mỹ Tho (nay là Tiền Giang). Lực lượng vũ trang giải phóng với quân số ít hơn gấp nhiều lần đã dũng cảm bẻ gãy cuộc càn quét quy mô lớn của 2.000 quân Sài Gòn có cố vấn Mỹ chỉ huy, bắn rơi và bắn hỏng 16 máy bay trực thăng, bắn cháy 3 xe bọc thép M113.",
    strategic: "Khẳng định quân và dân miền Nam hoàn toàn có khả năng đánh bại chiến thuật 'trực thăng vận' và 'thiết xa vận', mở đầu cho cao trào đánh bại hoàn toàn 'Chiến tranh đặc biệt' của Mỹ.",
    monument: "Khu Di tích Lịch sử Chiến thắng Ấp Bắc (xã Tân Phú, thị xã Cai Lậy, tỉnh Tiền Giang).",
    narration: "Ấp Bắc, Tiền Giang, ngày 2 tháng 1 năm 1963. Chiến thắng Ấp Bắc bẻ gãy chiến thuật trực thăng vận, dấy lên phong trào thi đua Ấp Bắc giết giặc lập công.",
    reunificationStep: 2,
    defeatedStrategy: "Đánh bại chiến lược 'Chiến tranh đặc biệt' (1961 - 1965)"
  },
  {
    id: "mauthan",
    name: "Tổng tiến công Tết Mậu Thân 1968 (Sài Gòn)",
    year: "1968",
    date: "30/01/1968 - 31/03/1968",
    period: "1954-1975",
    category: "campaign",
    categoryLabel: "Đột phá chiến lược đô thị",
    lon: 107.15,
    lat: 11.20,
    image: "mauthan",
    imageCaption: "Ảnh tư liệu: Quân Giải phóng tấn công vào Tòa Đại sứ Mỹ tại trung tâm Sài Gòn rạng sáng mùng 2 Tết Mậu Thân 1968.",
    leader: "Đồng chí Nguyễn Văn Linh (Bí thư Khu ủy Sài Gòn - Gia Định) & Bộ Tư lệnh Miền",
    summary: "Đêm giao thừa Tết Mậu Thân 1968, quân và dân miền Nam đồng loạt tiến công và nổi dậy tại 4/6 thành phố lớn, 37 thị xã và hàng trăm thị trấn trên toàn miền Nam. Các mục tiêu đầu não tại Sài Gòn như Tòa Đại sứ Mỹ, Dinh Độc Lập, Bộ Tổng tham mưu ngụy bị đánh chiếm bất ngờ.",
    strategic: "Giáng đòn sấm sét làm lung lay ý chí xâm lược của chính giới Mỹ, buộc Tổng thống Johnson phải tuyên bố ngừng ném bom miền Bắc, phi Mỹ hóa chiến tranh và chấp nhận ngồi vào bàn đàm phán Paris.",
    monument: "Di tích Lịch sử Các điểm Di tích Biệt động Sài Gòn tấn công Tết Mậu Thân 1968 (TP. Hồ Chí Minh).",
    narration: "Sài Gòn, Tết Mậu Thân 1968. Cuộc Tổng tiến công và nổi dậy đồng loạt giáng đòn quyết định làm phá sản chiến lược Chiến tranh cục bộ của đế quốc Mỹ.",
    reunificationStep: 3,
    defeatedStrategy: "Đánh bại chiến lược 'Chiến tranh cục bộ' (1965 - 1968)"
  },
  {
    id: "b52_hanoi",
    name: "Hà Nội - Chiến thắng 'Điện Biên Phủ trên không'",
    year: "1972",
    date: "18/12/1972 - 30/12/1972",
    period: "1954-1975",
    category: "campaign",
    categoryLabel: "Trận quyết chiến phòng không",
    lon: 105.18,
    lat: 21.05,
    image: "b52_hanoi",
    imageCaption: "Ảnh tư liệu: Xác máy bay B-52 rơi tại hồ Hữu Tiệp (làng hoa Ngọc Hà, Hà Nội) trong chiến dịch 12 ngày đêm cuối năm 1972.",
    leader: "Quân chủng Phòng không - Không quân & Lực lượng vũ trang Thủ đô",
    summary: "Cuộc tập kích đường không chiến lược quy mô lớn nhất của không quân Mỹ bằng máy bay ném bom B-52 vào Hà Nội và Hải Phòng. Trong 12 ngày đêm khốc liệt, quân dân miền Bắc kiên cường bắn rơi 81 máy bay (trong đó có 34 chiếc B-52), đập tan sức mạnh không quân chiến lược Mỹ.",
    strategic: "Giáng đòn chí mạng buộc Mỹ phải ký Hiệp định Paris (27/1/1973), rút toàn bộ quân viễn chinh Mỹ về nước, hoàn thành mục tiêu 'Đánh cho Mỹ cút'.",
    monument: "Khu Di tích B-52 hồ Hữu Tiệp và Bảo tàng Chiến thắng B-52 (Thủ đô Hà Nội).",
    narration: "Hà Nội, 12 ngày đêm tháng 12 năm 1972. Chiến thắng Điện Biên Phủ trên không đánh bại hoàn toàn cuộc tập kích chiến lược B-52, buộc Mỹ phải ký Hiệp định Paris rút quân.",
    reunificationStep: 4,
    defeatedStrategy: "Đánh bại âm mưu thương lượng trên thế mạnh trong 'Việt Nam hóa chiến tranh'"
  },
  {
    id: "paris1973",
    name: "Ký kết Hiệp định Paris 1973 (Hà Nội / Paris)",
    year: "1973",
    date: "27/01/1973",
    period: "1954-1975",
    category: "political",
    categoryLabel: "Thắng lợi ngoại giao lịch sử",
    lon: 106.35,
    lat: 20.78,
    image: "paris1973",
    imageCaption: "Ảnh tư liệu: Bộ trưởng Ngoại giao Nguyễn Thị Bình cùng đại diện các bên ký kết Hiệp định Paris ngày 27/1/1973 tại Pháp.",
    leader: "Đồng chí Lê Đức Thọ, Bộ trưởng Nguyễn Duy Trinh, Bộ trưởng Nguyễn Thị Bình",
    summary: "Sau gần 5 năm đàm phán cam go (1968 - 1973), Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam chính thức được ký kết. Hoa Kỳ cam kết tôn trọng độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, rút hết toàn bộ quân đội Mỹ và đồng minh về nước trong vòng 60 ngày.",
    strategic: "Hiện thực hóa lời dặn thiêng liêng của Chủ tịch Hồ Chí Minh: 'Đánh cho Mỹ cút'. Tạo bước ngoặt căn bản làm thay đổi tương quan lực lượng hoàn toàn có lợi cho cách mạng Việt Nam để tiến lên 'Đánh cho ngụy nhào'.",
    monument: "Nhà lưu niệm đàm phán Hiệp định Paris (Bảo tàng Lịch sử Quốc gia, Hà Nội).",
    narration: "Paris, ngày 27 tháng 1 năm 1973. Hiệp định Paris được ký kết, buộc quân đội viễn chinh Mỹ phải rút khỏi Việt Nam, tạo thời cơ lịch sử để giải phóng miền Nam.",
    reunificationStep: 4,
    defeatedStrategy: "Đánh bại chiến lược 'Việt Nam hóa chiến tranh' (1969 - 1973)"
  },
  {
    id: "buonmathuot",
    name: "Chiến dịch Tây Nguyên - Buôn Ma Thuột",
    year: "1975",
    date: "10/03/1975 - 24/03/1975",
    period: "1954-1975",
    category: "campaign",
    categoryLabel: "Đột phá điểm huyệt chiến lược",
    lon: 108.05,
    lat: 12.67,
    image: "buonmathuot",
    imageCaption: "Ảnh tư liệu: Xe tăng và bộ đội Quân Giải phóng tiến vào trung tâm thị xã Buôn Ma Thuột ngày 10/3/1975.",
    leader: "Trung tướng Hoàng Minh Thảo (Tư lệnh) & Đại tướng Văn Tiến Dũng",
    summary: "Bằng nghệ thuật nghi binh lừa địch tài tình ở bắc Tây Nguyên, rạng sáng 10/3/1975 quân ta bất ngờ giáng đòn sấm sét đánh chiếm thị xã Buôn Ma Thuột - vị trí hiểm yếu nhất của địch. Trận đánh khiến toàn bộ tuyến phòng thủ quân đoàn 2 đối phương tan rã.",
    strategic: "Đòn đột phá mở màn cuộc Tổng tiến công và nổi dậy mùa Xuân 1975, làm rung chuyển toàn bộ thế trận phòng thủ của địch, tạo bước ngoặt chiến lược tiến tới giải phóng Sài Gòn.",
    monument: "Tượng đài Chiến thắng Buôn Ma Thuột và Di tích Lịch sử Ngã sáu Buôn Ma Thuột (Đắk Lắk).",
    narration: "Buôn Ma Thuột, ngày 10 tháng 3 năm 1975. Đòn điểm huyệt chiến lược mở màn cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975 đại thắng.",
    reunificationStep: 5,
    defeatedStrategy: "Đòn mở màn làm sụp đổ hoàn toàn thế trận phòng thủ của địch"
  },
  {
    id: "dinhdoclap",
    name: "Dinh Độc Lập - Chiến dịch Hồ Chí Minh (TP. HCM)",
    year: "1975",
    date: "26/04/1975 - 30/04/1975",
    period: "1954-1975",
    category: "campaign",
    categoryLabel: "Toàn thắng - Thống nhất non sông",
    lon: 106.69,
    lat: 10.72,
    image: "dinhdoclap",
    imageCaption: "Ảnh tư liệu: Xe tăng 390 của Quân Giải phóng húc đổ cổng chính Dinh Độc Lập trưa 30/4/1975 (Ảnh: Francoise De Mulder).",
    leader: "Đại tướng Văn Tiến Dũng (Tư lệnh) & Đồng chí Phạm Hùng (Chính ủy)",
    summary: "Chiến dịch mang tên Chủ tịch Hồ Chí Minh vĩ đại với sức mạnh áp đảo của 5 cánh quân đồng loạt tổng công kích vào sào huyệt cuối cùng của chính quyền Sài Gòn. Đúng 11 giờ 30 phút ngày 30/4/1975, lá cờ cách mạng tung bay trên nóc Dinh Độc Lập, miền Nam hoàn toàn giải phóng.",
    strategic: "Đỉnh cao chói lọi của cuộc kháng chiến chống Mỹ cứu nước, kết thúc vẻ vang 30 năm chiến tranh giải phóng dân tộc (1945 - 1975), giang sơn thu về một mối, đất nước hoàn toàn độc lập, thống nhất.",
    monument: "Di tích Lịch sử Quốc gia Đặc biệt Dinh Độc Lập (Hội trường Thống Nhất, Quận 1, TP. Hồ Chí Minh).",
    narration: "Dinh Độc Lập, ngày 30 tháng 4 năm 1975. Chiến dịch Hồ Chí Minh toàn thắng, cờ giải phóng tung bay trên nóc Dinh Độc Lập, đất nước trọn niềm vui thống nhất.",
    reunificationStep: 5,
    defeatedStrategy: "Đánh cho ngụy nhào - Giải phóng hoàn toàn miền Nam, thống nhất non sông"
  }
];

/** Tuyến chi viện đường mòn Hồ Chí Minh (đường bộ qua dãy Trường Sơn). */
export const TRUONG_SON_PATH: [number, number][] = [
  [105.1, 19.9], [105.7, 18.4], [106.5, 16.9], [107.0, 15.5], [107.4, 13.9], [107.0, 12.2], [106.6, 11.3]
];

/** Tuyến đường Hồ Chí Minh trên biển (đoàn tàu Không số xuất phát từ bến K15 Đồ Sơn vào Nam). */
export const SEA_TRAIL_PATH: [number, number][] = [
  [106.8, 20.7], [107.6, 19.8], [108.5, 18.0], [109.8, 16.2], [110.5, 14.0], [110.3, 11.8], [108.8, 9.8], [106.8, 9.2], [105.2, 8.6]
];

/** Vĩ tuyến 17 (Cầu Hiền Lương - Sông Bến Hải chia cắt hai miền 1954-1975). */
export const PARALLEL_17_LINE: [number, number][] = [
  [106.6, 17.01], [107.3, 17.01]
];

/** 5 cánh quân tiến công Sài Gòn trong Chiến dịch Hồ Chí Minh (tọa độ hướng tiến về trung tâm). */
export const SAIGON_ATTACK_VECTORS: { name: string; unit: string; from: [number, number]; to: [number, number] }[] = [
  { name: "Hướng Bắc", unit: "Quân đoàn 1", from: [106.7, 11.45], to: [106.7, 10.95] },
  { name: "Hướng Tây Bắc", unit: "Quân đoàn 3", from: [106.35, 11.2], to: [106.6, 10.88] },
  { name: "Hướng Đông", unit: "Quân đoàn 4", from: [107.15, 10.95], to: [106.78, 10.82] },
  { name: "Hướng Đông Nam", unit: "Quân đoàn 2", from: [107.1, 10.55], to: [106.75, 10.75] },
  { name: "Hướng Tây Nam", unit: "Đoàn 232", from: [106.35, 10.55], to: [106.62, 10.72] }
];
