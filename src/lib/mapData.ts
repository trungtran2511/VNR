/** Bản đồ cách điệu (không dùng để đo đạc): tọa độ [kinh độ, vĩ độ] xấp xỉ. */
export const VN_OUTLINE: [number, number][] = [
  [102.15, 22.4], [102.6, 22.75], [103.1, 22.5], [103.9, 22.5], [104.4, 22.8], [104.6, 23.1],
  [105.3, 23.3], [106.0, 23.0], [106.7, 22.9], [106.7, 22.0], [107.3, 21.65], [108.05, 21.55],
  [107.4, 21.3], [106.8, 20.9], [106.5, 20.4], [106.1, 20.0], [105.9, 19.5], [105.7, 18.9],
  [106.2, 18.2], [106.6, 17.6], [107.3, 16.9], [108.2, 16.1], [108.9, 15.4], [109.3, 14.5],
  [109.3, 13.5], [109.3, 12.6], [109.2, 11.7], [108.8, 11.2], [107.8, 10.7], [107.1, 10.4],
  [106.7, 9.9], [106.2, 9.4], [105.5, 8.9], [104.9, 8.6], [104.8, 9.3], [104.5, 10.4],
  [105.0, 10.9], [105.8, 11.6], [106.6, 11.7], [107.5, 12.3], [107.5, 13.4], [107.3, 14.3],
  [107.5, 15.1], [107.0, 16.1], [106.5, 16.7], [105.8, 17.5], [105.1, 18.3], [104.1, 19.2],
  [104.1, 20.1], [104.5, 20.6], [103.7, 20.8], [103.1, 21.7], [102.5, 22.0]
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
