export interface EventLesson {
  heading: string;
  era: string;
  overview: string;
  background: string[];
  events: { date: string; text: string }[];
  significance: string[];
  figures: { name: string; role: string }[];
  remember: string[];
  /** Mục của chương (CHAPTERS_DATA) tương ứng để đối chiếu tóm lược. */
  sectionId?: string;
}

/** Bài học chi tiết cho từng cuốn trên kệ, khóa theo BookItem.id. */
export const EVENT_LESSONS: Record<string, EventLesson> = {
  intro: {
    heading: "Đối tượng, chức năng và phương pháp của môn Lịch sử Đảng",
    era: "Nhập môn",
    overview:
      "Lịch sử Đảng Cộng sản Việt Nam là một ngành khoa học nghiên cứu sự ra đời, phát triển và hoạt động lãnh đạo của Đảng qua các thời kỳ lịch sử. Học môn này là học cách nhìn lại con đường cách mạng bằng tư duy khoa học, có căn cứ và có phê phán.",
    background: [
      "Môn học gắn với yêu cầu giáo dục lý tưởng cách mạng và lòng yêu nước cho sinh viên.",
      "Đối tượng nghiên cứu gồm các sự kiện lịch sử Đảng, cương lĩnh, đường lối, chủ trương và quá trình chỉ đạo thực tiễn của Đảng.",
      "Cần dựa trên chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh để nghiên cứu, đánh giá."
    ],
    events: [
      { date: "Chức năng 1", text: "Nhận thức: cung cấp tri thức có hệ thống về tiến trình lãnh đạo cách mạng của Đảng." },
      { date: "Chức năng 2", text: "Giáo dục: bồi dưỡng lý tưởng cách mạng, lòng yêu nước và niềm tin vào sự lãnh đạo của Đảng." },
      { date: "Chức năng 3", text: "Dự báo và phê phán: đúc kết quy luật để định hướng tương lai, phản bác các quan điểm sai trái." },
      { date: "Phương pháp", text: "Kết hợp phương pháp lịch sử (tái hiện sự kiện chân thực) với phương pháp logic (tìm ra quy luật, bản chất)." }
    ],
    significance: [
      "Giúp người học hiểu vì sao Đảng lãnh đạo là một tất yếu lịch sử.",
      "Rút ra bài học kinh nghiệm phục vụ công cuộc đổi mới và phát triển đất nước."
    ],
    figures: [],
    remember: ["Ba chức năng: Nhận thức - Giáo dục - Dự báo & Phê phán.", "Hai phương pháp đặc trưng: lịch sử và logic."],
    sectionId: "intro-1"
  },
  "ch1-founding": {
    heading: "Đảng Cộng sản Việt Nam ra đời (1930)",
    era: "1920 - 1930",
    overview:
      "Đầu năm 1930, tại Hương Cảng (Trung Quốc), Hội nghị hợp nhất do Nguyễn Ái Quốc chủ trì đã thống nhất các tổ chức cộng sản thành một đảng duy nhất. Ngày 3/2/1930 được ghi nhận là ngày thành lập Đảng Cộng sản Việt Nam.",
    background: [
      "Quốc tế: Cách mạng Tháng Mười Nga (1917) mở ra thời đại mới; Quốc tế Cộng sản ra đời (1919).",
      "Trong nước: thực dân Pháp biến Việt Nam thành xã hội thuộc địa nửa phong kiến, với hai mâu thuẫn cơ bản là dân tộc và giai cấp.",
      "Các phong trào yêu nước theo khuynh hướng cũ lần lượt thất bại, cách mạng rơi vào khủng hoảng về đường lối cứu nước.",
      "Nguyễn Ái Quốc tìm ra con đường cứu nước đúng đắn, truyền bá chủ nghĩa Mác - Lênin và chuẩn bị về chính trị, tư tưởng, tổ chức."
    ],
    events: [
      { date: "1920", text: "Nguyễn Ái Quốc tán thành Quốc tế Cộng sản, trở thành một trong những người sáng lập Đảng Cộng sản Pháp." },
      { date: "6/1925", text: "Thành lập Hội Việt Nam Cách mạng Thanh niên, chuẩn bị về tổ chức cho Đảng." },
      { date: "1929", text: "Các tổ chức cộng sản lần lượt ra đời trong nước, đòi hỏi phải hợp nhất." },
      { date: "6/1 - 7/2/1930", text: "Hội nghị hợp nhất tại Cửu Long (Hương Cảng), do Nguyễn Ái Quốc chủ trì." },
      { date: "3/2/1930", text: "Đảng Cộng sản Việt Nam chính thức thành lập; thông qua Chánh cương vắn tắt, Sách lược vắn tắt." },
      { date: "10/1930", text: "Hội nghị Trung ương lâm thời đổi tên thành Đảng Cộng sản Đông Dương, thông qua Luận cương chính trị." }
    ],
    significance: [
      "Chấm dứt thời kỳ khủng hoảng sâu sắc về đường lối cứu nước và giai cấp lãnh đạo.",
      "Cương lĩnh chính trị đầu tiên đúng đắn, sáng tạo: độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
      "Là bước ngoặt vĩ đại của cách mạng Việt Nam."
    ],
    figures: [
      { name: "Nguyễn Ái Quốc", role: "Chủ trì Hội nghị thành lập Đảng, soạn thảo Cương lĩnh chính trị đầu tiên." },
      { name: "Trần Phú", role: "Khởi thảo Luận cương chính trị (10/1930), Tổng Bí thư đầu tiên của Đảng." }
    ],
    remember: [
      "Quy luật ra đời: Chủ nghĩa Mác - Lênin + Phong trào công nhân + Phong trào yêu nước.",
      "Đảng thành lập ngày 3/2/1930; tên Đảng Cộng sản Đông Dương từ 10/1930."
    ],
    sectionId: "ch1-1"
  },
  "ch1-democracy": {
    heading: "Cao trào dân sinh, dân chủ (1936 - 1939)",
    era: "1936 - 1939",
    overview:
      "Trong những năm 1936 - 1939, Đảng chuyển sang đấu tranh công khai và bán công khai, tập hợp rộng rãi quần chúng trong mặt trận dân chủ. Đây được xem là cuộc diễn tập thứ hai, chuẩn bị lực lượng cho Cách mạng Tháng Tám.",
    background: [
      "Chủ nghĩa phát xít nổi lên, đe dọa hòa bình thế giới; Quốc tế Cộng sản chủ trương lập Mặt trận nhân dân chống phát xít.",
      "Ở Pháp, Mặt trận Nhân dân lên cầm quyền, tạo điều kiện nới rộng quyền tự do dân chủ ở thuộc địa.",
      "Trong nước, đời sống nhân dân khó khăn sau khủng hoảng kinh tế, yêu cầu về cơm áo, tự do, dân chủ trở nên cấp thiết."
    ],
    events: [
      { date: "7/1936", text: "Hội nghị Trung ương xác định nhiệm vụ trước mắt là đấu tranh đòi tự do, dân sinh, dân chủ, cơm áo và hòa bình." },
      { date: "1936 - 1937", text: "Phong trào đấu tranh công khai, bán công khai, đón các phái đoàn và mở rộng báo chí hợp pháp." },
      { date: "3/1938", text: "Mặt trận Dân chủ Đông Dương được thành lập, tập hợp nhiều tầng lớp nhân dân." },
      { date: "1936 - 1939", text: "Đảng kết hợp đấu tranh hợp pháp với hoạt động bí mật, xây dựng và củng cố tổ chức." }
    ],
    significance: [
      "Cuộc diễn tập lần thứ hai, chuẩn bị lực lượng chính trị cho Cách mạng Tháng Tám.",
      "Đảng trưởng thành về nghệ thuật kết hợp các hình thức đấu tranh và xây dựng mặt trận."
    ],
    figures: [
      { name: "Nguyễn Văn Cừ", role: "Tổng Bí thư của Đảng giai đoạn cuối thời kỳ 1936 - 1939." },
      { name: "Lê Hồng Phong", role: "Lãnh đạo Đảng, tham gia chỉ đạo chuyển hướng đấu tranh thời kỳ này." }
    ],
    remember: [
      "1930 - 1931: tổng diễn tập thứ nhất; 1936 - 1939: diễn tập thứ hai.",
      "Hình thức đấu tranh: công khai, bán công khai, kết hợp bí mật."
    ],
    sectionId: "ch1-3"
  },
  "ch1-vietminh": {
    heading: "Chuyển hướng chiến lược và Mặt trận Việt Minh (1939 - 1945)",
    era: "1939 - 1945",
    overview:
      "Khi Chiến tranh thế giới thứ hai bùng nổ, Đảng chuyển hướng chỉ đạo chiến lược, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu. Hội nghị Trung ương 8 do Nguyễn Ái Quốc chủ trì tại Pác Bó (5/1941) hoàn chỉnh sự chuyển hướng và thành lập Mặt trận Việt Minh.",
    background: [
      "Chiến tranh thế giới thứ hai bùng nổ (9/1939); Pháp tăng cường đàn áp, Nhật tiến vào Đông Dương.",
      "Nhân dân Đông Dương chịu ách áp bức kép của Pháp và Nhật, mâu thuẫn dân tộc trở nên gay gắt nhất.",
      "Yêu cầu cấp thiết là tập hợp mọi lực lượng yêu nước vào một mặt trận chung để giải phóng dân tộc."
    ],
    events: [
      { date: "11/1939", text: "Hội nghị Trung ương 6 đặt nhiệm vụ giải phóng dân tộc lên hàng đầu." },
      { date: "11/1940", text: "Hội nghị Trung ương 7 tiếp tục khẳng định hướng chuẩn bị khởi nghĩa vũ trang." },
      { date: "28/1/1941", text: "Nguyễn Ái Quốc về nước, chọn Pác Bó (Cao Bằng) làm nơi hoạt động." },
      { date: "5/1941", text: "Hội nghị Trung ương 8 tại Pác Bó hoàn chỉnh đường lối giải phóng dân tộc." },
      { date: "19/5/1941", text: "Thành lập Việt Nam Độc lập Đồng minh (Việt Minh)." },
      { date: "22/12/1944", text: "Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân tại Cao Bằng." }
    ],
    significance: [
      "Hoàn chỉnh sự chuyển hướng chiến lược, đặt nhiệm vụ giải phóng dân tộc lên trên hết.",
      "Mặt trận Việt Minh quy tụ đại đoàn kết toàn dân tộc, trở thành lực lượng chính trị nòng cốt của Tổng khởi nghĩa."
    ],
    figures: [
      { name: "Nguyễn Ái Quốc", role: "Chủ trì Hội nghị Trung ương 8, lãnh đạo thành lập Việt Minh." },
      { name: "Trường Chinh", role: "Lãnh đạo Đảng, tham gia chỉ đạo chuyển hướng chiến lược." },
      { name: "Võ Nguyên Giáp", role: "Chỉ huy Đội Việt Nam Tuyên truyền Giải phóng quân." }
    ],
    remember: [
      "Hội nghị Trung ương 6 (1939), 7 (1940), 8 (5/1941) hoàn chỉnh chuyển hướng chiến lược.",
      "Việt Minh thành lập ngày 19/5/1941 tại Pác Bó."
    ],
    sectionId: "ch1-4"
  },
  ch1: {
    heading: "Cách mạng Tháng Tám 1945",
    era: "3/1945 - 9/1945",
    overview:
      "Nắm đúng thời cơ khi phát xít Nhật đầu hàng Đồng minh, toàn dân tộc dưới sự lãnh đạo của Đảng vùng dậy giành chính quyền trong cả nước từ 14/8 đến 28/8/1945. Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
    background: [
      "Chiến tranh thế giới thứ hai đi vào giai đoạn kết thúc; phát xít Nhật thất bại và đầu hàng Đồng minh.",
      "Lực lượng chính trị và vũ trang của cách mạng đã được chuẩn bị qua nhiều năm, nòng cốt là Mặt trận Việt Minh.",
      "Thời cơ cách mạng chín muồi: kẻ thù cũ đã gục ngã, kẻ thù mới chưa kịp vào."
    ],
    events: [
      { date: "9/3/1945", text: "Nhật đảo chính Pháp; Đảng ra chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta'." },
      { date: "14 - 15/8/1945", text: "Hội nghị toàn quốc của Đảng tại Tân Trào quyết định Tổng khởi nghĩa." },
      { date: "16/8/1945", text: "Quốc dân Đại hội Tân Trào tán thành chủ trương Tổng khởi nghĩa." },
      { date: "19/8/1945", text: "Khởi nghĩa giành chính quyền thắng lợi ở Hà Nội." },
      { date: "23/8/1945", text: "Giành chính quyền ở Huế." },
      { date: "25/8/1945", text: "Giành chính quyền ở Sài Gòn." },
      { date: "28/8/1945", text: "Cách mạng thành công trong cả nước." },
      { date: "2/9/1945", text: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình." }
    ],
    significance: [
      "Phá tan xiềng xích thực dân, phong kiến và phát xít, lập nên nước Việt Nam Dân chủ Cộng hòa.",
      "Mở ra kỷ nguyên mới: độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
      "Đảng từ một đảng hoạt động bí mật trở thành đảng cầm quyền."
    ],
    figures: [
      { name: "Hồ Chí Minh", role: "Lãnh tụ của cuộc cách mạng, đọc Tuyên ngôn Độc lập ngày 2/9/1945." },
      { name: "Trường Chinh", role: "Tham gia chỉ đạo chủ trương và nghệ thuật khởi nghĩa của Đảng." }
    ],
    remember: [
      "Giành chính quyền trong cả nước từ 14/8 đến 28/8/1945.",
      "Nghệ thuật chớp thời cơ, kết hợp khởi nghĩa ở nông thôn với thành thị."
    ],
    sectionId: "ch1-5"
  },
  ch2: {
    heading: "Kháng chiến chống Pháp và chiến thắng Điện Biên Phủ",
    era: "1945 - 1954",
    overview:
      "Sau Cách mạng Tháng Tám, nền độc lập non trẻ đứng trước muôn vàn khó khăn. Dưới sự lãnh đạo của Đảng, nhân dân ta tiến hành cuộc kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh và giành chiến thắng quyết định ở Điện Biên Phủ năm 1954.",
    background: [
      "Chính quyền non trẻ đối mặt với giặc đói, giặc dốt và giặc ngoại xâm.",
      "Đảng thực hiện sách lược nhân nhượng có nguyên tắc để giữ vững chính quyền (Hiệp định Sơ bộ 6/3/1946, Tạm ước 14/9/1946).",
      "Thực dân Pháp quyết tâm tái chiếm Việt Nam bằng vũ lực."
    ],
    events: [
      { date: "19/12/1946", text: "Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến." },
      { date: "Thu - Đông 1947", text: "Chiến dịch Việt Bắc làm thất bại kế hoạch đánh nhanh thắng nhanh của Pháp." },
      { date: "Thu - Đông 1950", text: "Chiến dịch Biên giới, mở rộng và củng cố căn cứ địa, giành quyền chủ động." },
      { date: "13/3/1954", text: "Mở màn chiến dịch Điện Biên Phủ." },
      { date: "7/5/1954", text: "Chiến thắng Điện Biên Phủ, bắt sống tướng Đờ Cát." },
      { date: "21/7/1954", text: "Hiệp định Giơnevơ được ký kết, chấm dứt chiến tranh ở Đông Dương." }
    ],
    significance: [
      "Đập tan kế hoạch Nava, kết thúc thắng lợi cuộc kháng chiến chống thực dân Pháp.",
      "Buộc Pháp ký Hiệp định Giơnevơ, miền Bắc hoàn toàn giải phóng.",
      "Chiến thắng 'lừng lẫy năm châu, chấn động địa cầu', cổ vũ phong trào giải phóng dân tộc trên thế giới."
    ],
    figures: [
      { name: "Hồ Chí Minh", role: "Chủ tịch nước, lãnh đạo toàn dân kháng chiến." },
      { name: "Võ Nguyên Giáp", role: "Tổng Tư lệnh, chỉ huy chiến dịch Điện Biên Phủ." },
      { name: "Trường Chinh", role: "Tác giả 'Kháng chiến nhất định thắng lợi', hệ thống hóa đường lối kháng chiến." }
    ],
    remember: [
      "Đường lối: toàn dân, toàn diện, trường kỳ, tự lực cánh sinh.",
      "Điện Biên Phủ 1954 dẫn tới Hiệp định Giơnevơ."
    ],
    sectionId: "ch2-1"
  },
  "ch2-tworegions": {
    heading: "Chiến lược cách mạng hai miền (1954 - 1973)",
    era: "1954 - 1973",
    overview:
      "Sau Hiệp định Giơnevơ, đất nước tạm thời bị chia cắt. Đảng đề ra đường lối tiến hành đồng thời hai chiến lược cách mạng: xây dựng chủ nghĩa xã hội ở miền Bắc và tiếp tục cách mạng dân tộc dân chủ nhân dân ở miền Nam, nhằm thống nhất đất nước.",
    background: [
      "Đất nước tạm thời chia cắt hai miền; Mỹ thay chân Pháp can thiệp ở miền Nam.",
      "Miền Bắc có vai trò hậu phương lớn; miền Nam là tiền tuyến lớn.",
      "Tình hình đòi hỏi đường lối chiến lược phù hợp với đặc điểm hai miền."
    ],
    events: [
      { date: "1959 - 1960", text: "Phong trào Đồng Khởi ở miền Nam, mở ra bước phát triển mới của cách mạng." },
      { date: "9/1960", text: "Đại hội III của Đảng hoàn chỉnh đường lối chiến lược chung cho cả nước." },
      { date: "12/1960", text: "Thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam." },
      { date: "1961 - 1965", text: "Đánh bại chiến lược 'Chiến tranh đặc biệt' của Mỹ." },
      { date: "1965 - 1968", text: "Đánh bại 'Chiến tranh cục bộ'; Tổng tiến công và nổi dậy Tết Mậu Thân 1968." },
      { date: "27/1/1973", text: "Hiệp định Paris được ký kết, Mỹ phải rút quân về nước." }
    ],
    significance: [
      "Tiến hành đồng thời hai chiến lược cách mạng ở hai miền là nét độc đáo, sáng tạo chưa từng có.",
      "Kết hợp sức mạnh hậu phương lớn và tiền tuyến lớn, từng bước đánh bại các chiến lược chiến tranh của Mỹ."
    ],
    figures: [
      { name: "Lê Duẩn", role: "Bí thư thứ nhất (Tổng Bí thư) của Đảng, gắn với đường lối chiến lược thời kỳ này." },
      { name: "Hồ Chí Minh", role: "Chủ tịch Đảng, Chủ tịch nước, lãnh đạo kháng chiến chống Mỹ." }
    ],
    remember: [
      "Miền Bắc: cách mạng xã hội chủ nghĩa, vai trò quyết định nhất.",
      "Miền Nam: cách mạng dân tộc dân chủ nhân dân, vai trò quyết định trực tiếp."
    ],
    sectionId: "ch2-2"
  },
  "ch2-1975": {
    heading: "Đại thắng mùa Xuân 1975",
    era: "1973 - 1975",
    overview:
      "Cuộc Tổng tiến công và nổi dậy mùa Xuân 1975 với đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử đã giải phóng hoàn toàn miền Nam, kết thúc 30 năm chiến tranh giải phóng và thống nhất đất nước.",
    background: [
      "Hiệp định Paris (1973) buộc Mỹ rút quân; so sánh lực lượng ở miền Nam chuyển biến có lợi cho cách mạng.",
      "Đảng xác định thời cơ chiến lược đã đến và quyết tâm giải phóng miền Nam.",
      "Hậu phương miền Bắc và các tuyến vận tải chi viện liên tục cho tiền tuyến."
    ],
    events: [
      { date: "6/1/1975", text: "Giải phóng Phước Long, thăm dò khả năng can thiệp của Mỹ." },
      { date: "10/3/1975", text: "Mở màn chiến dịch Tây Nguyên bằng trận Buôn Ma Thuột." },
      { date: "26 - 29/3/1975", text: "Giải phóng Huế và Đà Nẵng." },
      { date: "26/4/1975", text: "Mở đầu Chiến dịch Hồ Chí Minh." },
      { date: "30/4/1975", text: "Giải phóng Sài Gòn, miền Nam hoàn toàn giải phóng." }
    ],
    significance: [
      "Kết thúc 30 năm chiến tranh giải phóng, đất nước thống nhất.",
      "Mở ra kỷ nguyên độc lập, thống nhất và đi lên chủ nghĩa xã hội."
    ],
    figures: [
      { name: "Lê Duẩn", role: "Tổng Bí thư, chỉ đạo chiến lược của cuộc Tổng tiến công." },
      { name: "Văn Tiến Dũng", role: "Tư lệnh Chiến dịch Hồ Chí Minh." }
    ],
    remember: [
      "Chiến dịch Hồ Chí Minh bắt đầu 26/4 và kết thúc 30/4/1975.",
      "Phương châm: thần tốc, táo bạo, bất ngờ, chắc thắng."
    ],
    sectionId: "ch2-3"
  },
  ch3: {
    heading: "Khởi xướng công cuộc Đổi mới",
    era: "1975 - nay",
    overview:
      "Sau 1975, đất nước gặp khủng hoảng kinh tế - xã hội do duy trì quá lâu cơ chế kế hoạch hóa tập trung quan liêu, bao cấp. Đại hội VI (12/1986) khởi xướng đường lối Đổi mới toàn diện, với tinh thần nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.",
    background: [
      "Thống nhất đất nước về mặt nhà nước (1975 - 1976); Quốc hội đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam.",
      "Kinh tế - xã hội lâm vào khủng hoảng trầm trọng do cơ chế bao cấp.",
      "Thực tiễn đòi hỏi các bước tìm tòi, thử nghiệm trước khi đổi mới toàn diện."
    ],
    events: [
      { date: "1981", text: "Chỉ thị 100-CT/TW (khoán 100), một bước đột phá tìm tòi trong nông nghiệp." },
      { date: "6/1985", text: "Hội nghị Trung ương 8 khóa V về giá - lương - tiền." },
      { date: "12/1986", text: "Đại hội VI khởi xướng công cuộc Đổi mới toàn diện." },
      { date: "1991", text: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội." },
      { date: "2011", text: "Cương lĩnh bổ sung, phát triển xác định mô hình xã hội chủ nghĩa ở Việt Nam." }
    ],
    significance: [
      "Đưa đất nước ra khỏi khủng hoảng, trở thành nước đang phát triển có thu nhập trung bình.",
      "Đổi mới tư duy, trước hết là tư duy kinh tế; phát triển kinh tế thị trường định hướng xã hội chủ nghĩa.",
      "Mở rộng đối ngoại, chủ động và tích cực hội nhập quốc tế."
    ],
    figures: [{ name: "Nguyễn Văn Linh", role: "Tổng Bí thư tại Đại hội VI, gắn với khởi xướng Đổi mới." }],
    remember: [
      "Đại hội VI (12/1986) là mốc khởi xướng Đổi mới.",
      "Tinh thần: nhìn thẳng vào sự thật, đánh giá đúng sự thật."
    ],
    sectionId: "ch3-2"
  }
};
