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

export interface MapPin {
  id: string;
  name: string;
  year: string;
  lon: number;
  lat: number;
  cover: string;
  summary: string;
  strategic: string;
  narration: string;
}

export const MAP_PINS: MapPin[] = [
  {
    id: "pacbo", name: "Pác Bó (Cao Bằng)", year: "1941", lon: 106.05, lat: 22.97, cover: "vietminh",
    summary: "Ngày 28/1/1941 Nguyễn Ái Quốc về nước, chọn Pác Bó làm nơi hoạt động. Tháng 5/1941, Hội nghị Trung ương 8 họp tại đây, hoàn chỉnh chuyển hướng chiến lược và thành lập Mặt trận Việt Minh.",
    strategic: "Xây dựng căn cứ địa cách mạng đầu tiên, đặt nền móng chuẩn bị cho Tổng khởi nghĩa.",
    narration: "Pác Bó, Cao Bằng, năm 1941. Nguyễn Ái Quốc về nước, chủ trì Hội nghị Trung ương 8 và lãnh đạo thành lập Mặt trận Việt Minh."
  },
  {
    id: "tantrao", name: "Tân Trào (Tuyên Quang)", year: "1945", lon: 105.4, lat: 21.77, cover: "august1945",
    summary: "Tháng 8/1945, Hội nghị toàn quốc của Đảng và Quốc dân Đại hội họp tại Tân Trào, quyết định Tổng khởi nghĩa giành chính quyền và thành lập Ủy ban Dân tộc giải phóng.",
    strategic: "Trở thành trung tâm chỉ đạo Tổng khởi nghĩa Tháng Tám thắng lợi trong cả nước.",
    narration: "Tân Trào, Tuyên Quang, tháng Tám năm 1945. Nơi Đảng quyết định Tổng khởi nghĩa giành chính quyền trong cả nước."
  },
  {
    id: "badinh", name: "Quảng trường Ba Đình (Hà Nội)", year: "1945", lon: 105.84, lat: 21.03, cover: "founding",
    summary: "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
    strategic: "Khẳng định quyền độc lập dân tộc trước thế giới, đánh dấu sự ra đời của nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.",
    narration: "Quảng trường Ba Đình, Hà Nội, ngày 2 tháng 9 năm 1945. Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập."
  },
  {
    id: "dienbien", name: "Điện Biên Phủ", year: "1954", lon: 103.02, lat: 21.38, cover: "dienbien",
    summary: "Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954 theo phương châm đánh chắc, tiến chắc dưới sự chỉ huy của Võ Nguyên Giáp, kết thúc bằng việc bắt sống tướng Đờ Cát.",
    strategic: "Đập tan kế hoạch Nava, buộc Pháp ký Hiệp định Giơnevơ, kết thúc cuộc kháng chiến chống Pháp.",
    narration: "Điện Biên Phủ, từ ngày 13 tháng 3 đến ngày 7 tháng 5 năm 1954. Chiến thắng lừng lẫy năm châu, chấn động địa cầu."
  },
  {
    id: "truongson", name: "Đường Trường Sơn - đường Hồ Chí Minh", year: "1959", lon: 106.7, lat: 16.55, cover: "tworegions",
    summary: "Ngày 19/5/1959, Đoàn 559 được thành lập để mở tuyến vận tải chiến lược Bắc - Nam qua dãy Trường Sơn, chi viện sức người, sức của cho miền Nam.",
    strategic: "Nối hậu phương lớn miền Bắc với tiền tuyến lớn miền Nam, bảo đảm chi viện liên tục cho cách mạng.",
    narration: "Đường Trường Sơn, đường Hồ Chí Minh, mở từ năm 1959, nối hậu phương lớn miền Bắc với tiền tuyến lớn miền Nam."
  },
  {
    id: "buonmathuot", name: "Buôn Ma Thuột (Đắk Lắk)", year: "1975", lon: 108.05, lat: 12.67, cover: "spring1975",
    summary: "Ngày 10/3/1975, trận Buôn Ma Thuột mở màn chiến dịch Tây Nguyên, tạo bước ngoặt cho cuộc Tổng tiến công và nổi dậy mùa Xuân 1975.",
    strategic: "Phá vỡ thế phòng thủ của đối phương ở Tây Nguyên, mở đà cho các chiến dịch tiếp theo.",
    narration: "Buôn Ma Thuột, ngày 10 tháng 3 năm 1975. Trận mở màn chiến dịch Tây Nguyên, mở đầu cuộc Tổng tiến công mùa Xuân."
  },
  {
    id: "dinhdoclap", name: "Dinh Độc Lập (TP. Hồ Chí Minh)", year: "1975", lon: 106.7, lat: 10.78, cover: "spring1975",
    summary: "Ngày 30/4/1975, Chiến dịch Hồ Chí Minh toàn thắng; lá cờ cách mạng được cắm trên Dinh Độc Lập, miền Nam hoàn toàn giải phóng.",
    strategic: "Kết thúc 30 năm chiến tranh giải phóng, thống nhất đất nước.",
    narration: "Dinh Độc Lập, ngày 30 tháng 4 năm 1975. Chiến dịch Hồ Chí Minh toàn thắng, đất nước thống nhất."
  }
];

/** Tuyến Trường Sơn minh họa (không phải đường đi chính xác). */
export const TRUONG_SON_PATH: [number, number][] = [
  [105.1, 19.9], [105.7, 18.4], [106.5, 16.9], [107.0, 15.5], [107.4, 13.9], [107.0, 12.2], [106.6, 11.3]
];
