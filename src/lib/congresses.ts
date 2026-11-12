export interface Congress {
  no: string;
  year: number;
  dateStr: string;
  place: string;
  leader: string;
  context: string;
  keyPoints: string[];
  keywords: string[];
}

/** Các kỳ Đại hội đại biểu toàn quốc của Đảng (I - XIII). Cần đối chiếu giáo trình khi trích dẫn. */
export const CONGRESSES: Congress[] = [
  {
    no: "I", year: 1935, dateStr: "3/1935", place: "Ma Cao (Trung Quốc)", leader: "Lê Hồng Phong",
    context: "Sau thời kỳ đàn áp khốc liệt, hệ thống tổ chức của Đảng được phục hồi và củng cố.",
    keyPoints: ["Củng cố và kiện toàn tổ chức Đảng.", "Bầu Ban Chấp hành Trung ương mới, Lê Hồng Phong giữ chức Tổng Bí thư."],
    keywords: ["phục hồi", "củng cố", "tổ chức"]
  },
  {
    no: "II", year: 1951, dateStr: "2/1951", place: "Tuyên Quang", leader: "Trường Chinh",
    context: "Cuộc kháng chiến chống Pháp bước vào giai đoạn mới; Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam.",
    keyPoints: ["Thông qua Chính cương của Đảng Lao động Việt Nam.", "Đề ra nhiệm vụ đưa kháng chiến đến thắng lợi."],
    keywords: ["kháng chiến", "Đảng Lao động", "chính cương"]
  },
  {
    no: "III", year: 1960, dateStr: "9/1960", place: "Hà Nội", leader: "Lê Duẩn (Bí thư thứ nhất)",
    context: "Đất nước tạm thời chia cắt; miền Bắc xây dựng chủ nghĩa xã hội, miền Nam đấu tranh giải phóng.",
    keyPoints: ["Hoàn chỉnh đường lối chiến lược chung của cách mạng cả nước.", "Xác định nhiệm vụ xây dựng chủ nghĩa xã hội ở miền Bắc và giải phóng miền Nam."],
    keywords: ["hai miền", "chiến lược", "xây dựng xã hội chủ nghĩa"]
  },
  {
    no: "IV", year: 1976, dateStr: "12/1976", place: "Hà Nội", leader: "Lê Duẩn",
    context: "Đất nước thống nhất sau đại thắng mùa Xuân 1975.",
    keyPoints: ["Đổi tên Đảng thành Đảng Cộng sản Việt Nam.", "Thông qua đường lối cách mạng xã hội chủ nghĩa trong cả nước và kế hoạch 5 năm 1976 - 1980."],
    keywords: ["thống nhất", "Đảng Cộng sản Việt Nam", "kế hoạch 5 năm"]
  },
  {
    no: "V", year: 1982, dateStr: "3/1982", place: "Hà Nội", leader: "Lê Duẩn",
    context: "Đất nước đối mặt với khó khăn kinh tế - xã hội kéo dài.",
    keyPoints: ["Tiếp tục xác định nhiệm vụ xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc.", "Thời kỳ tiếp tục tìm tòi các giải pháp tháo gỡ khó khăn."],
    keywords: ["khó khăn", "tìm tòi", "bảo vệ Tổ quốc"]
  },
  {
    no: "VI", year: 1986, dateStr: "12/1986", place: "Hà Nội", leader: "Nguyễn Văn Linh",
    context: "Khủng hoảng kinh tế - xã hội trầm trọng do cơ chế kế hoạch hóa tập trung quan liêu, bao cấp.",
    keyPoints: ["Khởi xướng đường lối Đổi mới toàn diện.", "Tinh thần nhìn thẳng vào sự thật, đánh giá đúng sự thật, đổi mới tư duy trước hết là tư duy kinh tế."],
    keywords: ["đổi mới", "nhìn thẳng vào sự thật", "tư duy kinh tế"]
  },
  {
    no: "VII", year: 1991, dateStr: "6/1991", place: "Hà Nội", leader: "Đỗ Mười",
    context: "Liên Xô và hệ thống xã hội chủ nghĩa ở Đông Âu khủng hoảng, tan rã; Việt Nam tiếp tục Đổi mới.",
    keyPoints: ["Thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội.", "Thông qua Chiến lược ổn định và phát triển kinh tế - xã hội đến năm 2000."],
    keywords: ["cương lĩnh 1991", "quá độ", "đổi mới"]
  },
  {
    no: "VIII", year: 1996, dateStr: "6/1996", place: "Hà Nội", leader: "Đỗ Mười",
    context: "Đất nước ra khỏi khủng hoảng kinh tế - xã hội, chuyển sang thời kỳ phát triển mới.",
    keyPoints: ["Đánh giá đất nước ra khỏi khủng hoảng, chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa."],
    keywords: ["công nghiệp hóa", "hiện đại hóa", "CNH-HĐH"]
  },
  {
    no: "IX", year: 2001, dateStr: "4/2001", place: "Hà Nội", leader: "Nông Đức Mạnh",
    context: "Bước vào thế kỷ XXI, đất nước tiếp tục đổi mới và hội nhập.",
    keyPoints: ["Tiếp tục đẩy mạnh công nghiệp hóa, hiện đại hóa.", "Hình thành khái niệm kinh tế thị trường định hướng xã hội chủ nghĩa."],
    keywords: ["thế kỷ XXI", "kinh tế thị trường", "hội nhập"]
  },
  {
    no: "X", year: 2006, dateStr: "4/2006", place: "Hà Nội", leader: "Nông Đức Mạnh",
    context: "Hội nhập quốc tế ngày càng sâu rộng.",
    keyPoints: ["Tổng kết 20 năm Đổi mới, tiếp tục đẩy mạnh toàn diện công cuộc Đổi mới.", "Xác định phương hướng phát triển đất nước, sớm đưa nước ta ra khỏi tình trạng kém phát triển."],
    keywords: ["20 năm đổi mới", "hội nhập", "phát triển"]
  },
  {
    no: "XI", year: 2011, dateStr: "1/2011", place: "Hà Nội", leader: "Nguyễn Phú Trọng",
    context: "Kinh tế thế giới biến động; 20 năm thực hiện Cương lĩnh 1991.",
    keyPoints: ["Thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (bổ sung, phát triển năm 2011).", "Xác định mô hình xã hội chủ nghĩa ở Việt Nam với 8 đặc trưng."],
    keywords: ["cương lĩnh 2011", "8 đặc trưng", "bổ sung phát triển"]
  },
  {
    no: "XII", year: 2016, dateStr: "1/2016", place: "Hà Nội", leader: "Nguyễn Phú Trọng",
    context: "Đất nước tiếp tục hội nhập sâu rộng, yêu cầu xây dựng và chỉnh đốn Đảng được đặt ra gay gắt.",
    keyPoints: ["Nhấn mạnh xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh.", "Tiếp tục đẩy mạnh công cuộc đổi mới và hội nhập quốc tế."],
    keywords: ["xây dựng chỉnh đốn Đảng", "hội nhập", "đổi mới"]
  },
  {
    no: "XIII", year: 2021, dateStr: "1 - 2/2021", place: "Hà Nội", leader: "Nguyễn Phú Trọng",
    context: "Đại hội diễn ra khi đất nước có tổng kết 35 năm Đổi mới và 10 năm thực hiện Cương lĩnh 2011.",
    keyPoints: ["Xác định định hướng phát triển đất nước giai đoạn 2021 - 2030.", "Đề cao xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh."],
    keywords: ["35 năm đổi mới", "phát triển", "chỉnh đốn Đảng"]
  }
];
