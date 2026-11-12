import type { Chapter, Milestone, DocumentComparison } from "./types";

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: "intro",
    code: "Mở đầu",
    title: "Chương nhập môn",
    subtitle: "Đối tượng, chức năng, nhiệm vụ và phương pháp nghiên cứu",
    period: "Nhập môn",
    summary: "Nghiên cứu đối tượng, chức năng, nhiệm vụ và hệ phương pháp khoa học chuyên biệt của Lịch sử Đảng Cộng sản Việt Nam.",
    sections: [
      {
        id: "intro-1",
        title: "I. Đối tượng nghiên cứu của môn học",
        content: [
          "Lịch sử Đảng Cộng sản Việt Nam là một ngành khoa học nghiên cứu sự ra đời, phát triển và hoạt động lãnh đạo của Đảng qua các thời kỳ lịch sử.",
          "Đối tượng nghiên cứu chính là hệ thống sự kiện lịch sử Đảng, quy luật hình thành, phát triển, các cương lĩnh, đường lối, chủ trương, chính sách lớn và quá trình chỉ đạo thực tiễn của Đảng."
        ],
        keyPoints: [
          "Nghiên cứu quá trình Đảng ra đời, phát triển và lãnh đạo cách mạng Việt Nam.",
          "Làm rõ tính quy luật của sự ra đời và vai trò lãnh đạo tất yếu của Đảng.",
          "Tổng kết các bài học kinh nghiệm lịch sử phục vụ công cuộc đổi mới và phát triển đất nước."
        ]
      },
      {
        id: "intro-2",
        title: "II. Chức năng và nhiệm vụ của môn học",
        content: [
          "Chức năng nhận thức: Cung cấp tri thức có hệ thống, khoa học về toàn bộ tiến trình lãnh đạo cách mạng của Đảng.",
          "Chức năng giáo dục: Bồi dưỡng lý tưởng cách mạng, lòng yêu nước, niềm tin vào sự lãnh đạo của Đảng và con đường đi lên CNXH.",
          "Chức năng dự báo và phê phán: Đúc kết quy luật để định hướng tương lai, bảo vệ nền tảng tư tưởng của Đảng, đấu tranh phản bác các quan điểm sai trái, thù địch."
        ],
        keyPoints: [
          "Ba chức năng: Nhận thức - Giáo dục - Dự báo & Phê phán.",
          "Nhiệm vụ: Tái hiện chân thực tiến trình lịch sử, đúc kết bài học thực tiễn, giáo dục truyền thống."
        ]
      },
      {
        id: "intro-3",
        title: "III. Phương pháp nghiên cứu, học tập",
        content: [
          "Phương pháp luận cơ bản: Dựa trên chủ nghĩa duy vật biện chứng và chủ nghĩa duy vật lịch sử của chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh.",
          "Phương pháp nghiên cứu chuyên biệt: Kết hợp chặt chẽ phương pháp lịch sử và phương pháp logic. Phương pháp lịch sử tái hiện sự kiện theo trình tự thời gian cụ thể; phương pháp logic vạch ra bản chất, quy luật bên trong của sự kiện.",
          "Các phương pháp bổ trợ: Phân tích, tổng hợp, so sánh, phỏng vấn nhân chứng lịch sử và thống kê xã hội học."
        ],
        keyPoints: [
          "Kết hợp phương pháp lịch sử và logic là nguyên tắc then chốt.",
          "Đảm bảo tính khách quan khoa học và tính đảng sâu sắc."
        ]
      }
    ],
    reviewQuestions: [
      {
        id: "q-intro-1",
        question: "Đối tượng nghiên cứu trọng tâm của môn Lịch sử Đảng Cộng sản Việt Nam là gì?",
        options: [
          "Sự ra đời, phát triển và hoạt động lãnh đạo toàn diện của Đảng qua các thời kỳ",
          "Lịch sử các triều đại phong kiến Việt Nam",
          "Quá trình biến động kinh tế thế giới thế kỷ XX",
          "Lý luận thuần túy về triết học Mác - Lênin"
        ],
        correctIndex: 0,
        explanation: "Môn học tập trung nghiên cứu sự ra đời, phát triển và toàn bộ hoạt động lãnh đạo của Đảng đối với cách mạng Việt Nam."
      },
      {
        id: "q-intro-2",
        question: "Hai phương pháp nghiên cứu cốt lõi thường được kết hợp chặt chẽ trong môn Lịch sử Đảng là gì?",
        options: [
          "Phương pháp lịch sử và phương pháp logic",
          "Phương pháp toán học và vật lý học",
          "Phương pháp thống kê thuần túy và diễn dịch",
          "Phương pháp định lượng và quy nạp hình thức"
        ],
        correctIndex: 0,
        explanation: "Sự kết hợp giữa phương pháp lịch sử (tái hiện sự kiện chân thực) và phương pháp logic (tìm ra quy luật bản chất) là đặc trưng của môn học."
      },
      {
        id: "q-intro-3",
        question: "Ba chức năng của môn Lịch sử Đảng là gì?",
        options: [
          "Nhận thức, giáo dục, dự báo và phê phán",
          "Kinh tế, chính trị, văn hóa",
          "Lập pháp, hành pháp, tư pháp",
          "Tuyên truyền, tổ chức, kiểm tra"
        ],
        correctIndex: 0,
        explanation: "Môn học có ba chức năng: nhận thức, giáo dục, dự báo và phê phán."
      }
    ]
  },
  {
    id: "ch1",
    code: "Chương 1",
    title: "Đảng ra đời và đấu tranh giành chính quyền",
    subtitle: "Giai đoạn lịch sử bước ngoặt vĩ đại (1930 - 1945)",
    period: "1930 - 1945",
    summary: "Đảng Cộng sản Việt Nam ra đời ngày 3/2/1930 chấm dứt cuộc khủng hoảng đường lối cứu nước, lãnh đạo 3 cao trào cách mạng đỉnh cao là Cách mạng Tháng Tám 1945.",
    sections: [
      {
        id: "ch1-1",
        title: "I. Hoàn cảnh lịch sử và sự ra đời của Đảng Cộng sản Việt Nam",
        content: [
          "Bối cảnh quốc tế: Chủ nghĩa tư bản chuyển sang giai đoạn đế quốc chủ nghĩa; thắng lợi của Cách mạng Tháng Mười Nga (1917) mở ra thời đại mới; Quốc tế Cộng sản ra đời (1919).",
          "Bối cảnh trong nước: Thực dân Pháp thi hành chính sách khai thác thuộc địa tàn bạo, biến xã hội Việt Nam thành xã hội thuộc địa nửa phong kiến với hai mâu thuẫn cơ bản: mâu thuẫn dân tộc (toàn thể dân tộc Việt Nam với thực dân Pháp) và mâu thuẫn giai cấp (nông dân với địa chủ phong kiến).",
          "Vai trò của Nguyễn Ái Quốc: Chuẩn bị về tư tưởng, chính trị và tổ chức (Hội Việt Nam Cách mạng Thanh niên 1925), triệu tập và chủ trì Hội nghị thành lập Đảng từ ngày 6/1 đến 7/2/1930 tại Cửu Long (Hương Cảng, Trung Quốc)."
        ],
        keyPoints: [
          "Quy luật ra đời: Chủ nghĩa Mác - Lênin + Phong trào công nhân + Phong trào yêu nước = Đảng Cộng sản Việt Nam.",
          "Hội nghị thành lập Đảng thông qua Chánh cương vắn tắt, Sách lược vắn tắt do Nguyễn Ái Quốc soạn thảo - Cương lĩnh chính trị đầu tiên đúng đắn, sáng tạo."
        ],
        historicalEvents: [
          {
            date: "03/02/1930",
            event: "Thành lập Đảng Cộng sản Việt Nam",
            significance: "Chấm dứt thời kỳ khủng hoảng sâu sắc về đường lối cứu nước và giai cấp lãnh đạo."
          },
          {
            date: "10/1930",
            event: "Hội nghị BCH Trung ương lâm thời",
            significance: "Đổi tên Đảng thành Đảng Cộng sản Đông Dương, thông qua Luận cương chính trị do Trần Phú khởi thảo."
          }
        ]
      },
      {
        id: "ch1-2",
        title: "II. Cao trào cách mạng 1930 - 1931 và Xô viết Nghệ - Tĩnh",
        content: [
          "Cao trào cách mạng 1930 - 1931 với đỉnh cao Xô viết Nghệ - Tĩnh: Cuộc tổng diễn tập đầu tiên khẳng định quyền lãnh đạo và liên minh công nông."
        ],
        keyPoints: [
          "Lần đầu tiên công nhân và nông dân dưới sự lãnh đạo của Đảng giành chính quyền ở cơ sở, xây dựng chính quyền kiểu Xô viết."
        ]
      },
      {
        id: "ch1-3",
        title: "III. Cuộc vận động dân chủ 1936 - 1939",
        content: [
          "Cuộc vận động dân chủ 1936 - 1939: Cuộc diễn tập thứ hai, sử dụng hình thức đấu tranh công khai, bán công khai, xây dựng mặt trận dân chủ rộng rãi."
        ],
        keyPoints: [
          "Đảng kết hợp đấu tranh hợp pháp với bí mật, mở rộng ảnh hưởng chính trị và tập hợp quần chúng."
        ]
      },
      {
        id: "ch1-4",
        title: "IV. Chuyển hướng chiến lược, Mặt trận Việt Minh (1939 - 1945)",
        content: [
          "Cao trào kháng Nhật cứu nước (1939 - 1945): Đặt nhiệm vụ giải phóng dân tộc lên hàng trước tiên và tối cao, thành lập Mặt trận Việt Minh (1941), phát động khởi nghĩa từng phần."
        ],
        keyPoints: [
          "Chuyển hướng chỉ đạo chiến lược tại các Hội nghị Trung ương 6 (1939), 7 (1940) và Hội nghị Trung ương 8 (5/1941)."
        ]
      },
      {
        id: "ch1-5",
        title: "V. Cách mạng Tháng Tám 1945 và Tuyên ngôn Độc lập",
        content: [
          "Cách mạng Tháng Tám năm 1945: Tận dụng thời cơ ngàn năm có một khi Nhật đầu hàng Đồng minh, toàn dân tộc vùng dậy giành chính quyền trong cả nước từ ngày 14/8 đến 28/8/1945. Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa."
        ],
        keyPoints: [
          "Nghệ thuật chớp thời cơ và kết hợp khởi nghĩa nông thôn với thành thị chớp nhoáng, thắng lợi trọn vẹn."
        ],
        historicalEvents: [
          {
            date: "02/09/1945",
            event: "Tuyên ngôn Độc lập tại Quảng trường Ba Đình",
            significance: "Khai sinh nước Việt Nam Dân chủ Cộng hòa."
          }
        ]
      }
    ],
    reviewQuestions: [
      {
        id: "q-ch1-1",
        question: "Đảng Cộng sản Việt Nam ra đời là sản phẩm của sự kết hợp giữa các yếu tố nào theo quan điểm Hồ Chí Minh?",
        options: [
          "Chủ nghĩa Mác - Lênin, phong trào công nhân và phong trào yêu nước",
          "Chủ nghĩa Mác - Lênin và phong trào công nhân đơn thuần",
          "Chủ nghĩa yêu nước truyền thống và tư tưởng dân chủ tư sản",
          "Phong trào công nhân và phong trào nông dân"
        ],
        correctIndex: 0,
        explanation: "Hồ Chí Minh khẳng định Đảng Cộng sản Việt Nam ra đời từ sự kết hợp của Chủ nghĩa Mác - Lênin với phong trào công nhân và phong trào yêu nước Việt Nam."
      },
      {
        id: "q-ch1-2",
        question: "Hội nghị nào của Trung ương Đảng đã hoàn chỉnh sự chuyển hướng chỉ đạo chiến lược đặt nhiệm vụ giải phóng dân tộc lên hàng đầu?",
        options: [
          "Hội nghị Trung ương 8 (tháng 5/1941 tại Pác Bó)",
          "Hội nghị Trung ương 6 (tháng 11/1939)",
          "Hội nghị thành lập Đảng (tháng 2/1930)",
          "Hội nghị Trung ương 1 (tháng 10/1930)"
        ],
        correctIndex: 0,
        explanation: "Hội nghị Trung ương 8 do Nguyễn Ái Quốc chủ trì tại Pác Bó (Cao Bằng) tháng 5/1941 đã hoàn chỉnh đường lối giương cao ngọn cờ giải phóng dân tộc và thành lập Mặt trận Việt Minh."
      },
      {
        id: "q-ch1-3",
        question: "Hội nghị thành lập Đảng (đầu năm 1930) thông qua văn kiện nào do Nguyễn Ái Quốc soạn thảo?",
        options: [
          "Chánh cương vắn tắt và Sách lược vắn tắt",
          "Luận cương chính trị",
          "Tuyên ngôn Độc lập",
          "Chương trình Việt Minh"
        ],
        correctIndex: 0,
        explanation: "Chánh cương vắn tắt, Sách lược vắn tắt là Cương lĩnh chính trị đầu tiên của Đảng. Luận cương chính trị do Trần Phú khởi thảo, thông qua tháng 10/1930."
      },
      {
        id: "q-ch1-4",
        question: "Cuộc vận động dân chủ 1936 - 1939 được xem là gì trong tiến trình giành chính quyền?",
        options: [
          "Cuộc diễn tập thứ hai",
          "Cuộc tổng diễn tập đầu tiên",
          "Cuộc tổng khởi nghĩa",
          "Cuộc kháng chiến toàn quốc"
        ],
        correctIndex: 0,
        explanation: "Cao trào 1930 - 1931 là cuộc tổng diễn tập đầu tiên; cuộc vận động dân chủ 1936 - 1939 là cuộc diễn tập thứ hai, chuẩn bị cho Cách mạng Tháng Tám."
      },
      {
        id: "q-ch1-5",
        question: "Cách mạng Tháng Tám 1945 giành chính quyền trong cả nước trong khoảng thời gian nào?",
        options: [
          "Từ 14/8 đến 28/8/1945",
          "Từ 6/1 đến 7/2/1930",
          "Từ 19/12/1946 đến 1947",
          "Từ 6/3 đến 14/9/1946"
        ],
        correctIndex: 0,
        explanation: "Tổng khởi nghĩa diễn ra từ 14/8 đến 28/8/1945; ngày 2/9/1945 Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập."
      },
      {
        id: "q-ch1-6",
        question: "Xô viết Nghệ - Tĩnh nằm trong cao trào cách mạng giai đoạn nào?",
        options: [
          "1930 - 1931",
          "1936 - 1939",
          "1939 - 1945",
          "1945 - 1946"
        ],
        correctIndex: 0,
        explanation: "Xô viết Nghệ - Tĩnh là đỉnh cao của cao trào cách mạng 1930 - 1931."
      }
    ]
  },
  {
    id: "ch2",
    code: "Chương 2",
    title: "Lãnh đạo hai cuộc kháng chiến chống ngoại xâm",
    subtitle: "Giải phóng dân tộc, thống nhất Tổ quốc (1945 - 1975)",
    period: "1945 - 1975",
    summary: "Bảo vệ nền độc lập non trẻ trong thế 'ngàn cân treo sợi tóc', tiến hành 9 năm kháng chiến chống Pháp (1945-1954) và 21 năm đánh Mỹ cứu nước (1954-1975).",
    sections: [
      {
        id: "ch2-1",
        title: "I. Kháng chiến chống thực dân Pháp xâm lược (1945 - 1954)",
        content: [
          "Bảo vệ chính quyền cách mạng (1945 - 1946): Giải quyết giặc đói, giặc dốt, giặc ngoại xâm; thực hiện sách lược nhân nhượng có nguyên tắc (Hiệp định Sơ bộ 6/3, Tạm ước 14/9).",
          "Đường lối kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh: Lời kêu gọi toàn quốc kháng chiến (19/12/1946) và tác phẩm 'Kháng chiến nhất định thắng lợi' của Trường Chinh.",
          "Các chiến dịch lớn: Việt Bắc Thu - Đông (1947), Biên giới (1950) và Chiến dịch lịch sử Điện Biên Phủ (1954) 'lừng lẫy năm châu, chấn động địa cầu', buộc Pháp ký Hiệp định Giơnevơ."
        ],
        keyPoints: [
          "Đường lối kháng chiến: Toàn dân, toàn diện, trường kỳ và tự lực cánh sinh.",
          "Chiến thắng Điện Biên Phủ đập tan kế hoạch Nava, kết thúc thắng lợi cuộc kháng chiến chống Pháp."
        ]
      },
      {
        id: "ch2-2",
        title: "II. Chiến lược cách mạng hai miền (1954 - 1973)",
        content: [
          "Đặc điểm đất nước tạm thời bị chia cắt làm hai miền: Miền Bắc xây dựng CNXH làm hậu phương lớn; Miền Nam tiếp tục cách mạng dân tộc dân chủ nhân dân làm tiền tuyến lớn.",
          "Đánh bại các chiến lược chiến tranh của đế quốc Mỹ: Chiến tranh đơn phương (1954-1960 với phong trào Đồng Khởi), Chiến tranh đặc biệt (1961-1965), Chiến tranh cục bộ (1965-1968 với Tổng tiến công Tết Mậu Thân 1968), Việt Nam hóa chiến tranh (1969-1973).",
        ],
        keyPoints: [
          "Tiến hành đồng thời hai chiến lược cách mạng ở hai miền là nét độc đáo, sáng tạo chưa từng có trong lịch sử."
        ]
      },
      {
        id: "ch2-3",
        title: "III. Đại thắng mùa Xuân 1975",
        content: [
          "Hiệp định Paris (1973) buộc Mỹ rút quân về nước. Cuộc Tổng tiến công và nổi dậy mùa Xuân 1975 với đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử ngày 30/4/1975 giải phóng hoàn toàn miền Nam, thống nhất đất nước."
        ],
        keyPoints: [
          "Đại thắng mùa Xuân 1975 kết thúc 30 năm chiến tranh giải phóng, mở ra kỷ nguyên độc lập thống nhất đi lên CNXH."
        ]
      }
    ],
    reviewQuestions: [
      {
        id: "q-ch2-1",
        question: "Phương châm chiến lược cơ bản của cuộc kháng chiến chống thực dân Pháp (1946 - 1954) là gì?",
        options: [
          "Toàn dân, toàn diện, trường kỳ và tự lực cánh sinh",
          "Đánh nhanh thắng nhanh, tập trung toàn lực",
          "Dựa hoàn toàn vào viện trợ của các nước xã hội chủ nghĩa",
          "Chiến tranh du kích cục bộ không vận động chiến"
        ],
        correctIndex: 0,
        explanation: "Đường lối kháng chiến chống Pháp xác định phương châm: Toàn dân, toàn diện, trường kỳ và dựa vào sức mình là chính (tự lực cánh sinh)."
      },
      {
        id: "q-ch2-2",
        question: "Đại hội lần thứ mấy của Đảng đã xác định đường lối tiến hành đồng thời hai chiến lược cách mạng ở hai miền Bắc - Nam?",
        options: [
          "Đại hội đại biểu toàn quốc lần thứ III (tháng 9/1960)",
          "Đại hội đại biểu toàn quốc lần thứ II (tháng 2/1951)",
          "Đại hội đại biểu toàn quốc lần thứ IV (tháng 12/1976)",
          "Đại hội đại biểu toàn quốc lần thứ I (tháng 3/1935)"
        ],
        correctIndex: 0,
        explanation: "Đại hội III (1960) hoàn chỉnh đường lối chiến lược: cách mạng XHCN ở miền Bắc giữ vai trò quyết định nhất, cách mạng dân tộc dân chủ nhân dân ở miền Nam giữ vai trò quyết định trực tiếp."
      },
      {
        id: "q-ch2-3",
        question: "Lời kêu gọi toàn quốc kháng chiến của Chủ tịch Hồ Chí Minh được phát đi vào ngày nào?",
        options: [
          "19/12/1946",
          "2/9/1945",
          "7/5/1954",
          "30/4/1975"
        ],
        correctIndex: 0,
        explanation: "Ngày 19/12/1946 Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến."
      },
      {
        id: "q-ch2-4",
        question: "Chiến thắng nào buộc thực dân Pháp phải ký Hiệp định Giơnevơ (1954)?",
        options: [
          "Điện Biên Phủ",
          "Việt Bắc Thu - Đông 1947",
          "Biên giới 1950",
          "Chiến dịch Hồ Chí Minh"
        ],
        correctIndex: 0,
        explanation: "Chiến thắng Điện Biên Phủ năm 1954 đập tan kế hoạch Nava, buộc Pháp ký Hiệp định Giơnevơ."
      },
      {
        id: "q-ch2-5",
        question: "Phong trào nào là bước ngoặt của cách mạng miền Nam trong giai đoạn 1954 - 1960?",
        options: [
          "Phong trào Đồng Khởi",
          "Tổng tiến công Tết Mậu Thân",
          "Chiến dịch Tây Nguyên",
          "Hiệp định Paris"
        ],
        correctIndex: 0,
        explanation: "Giáo trình nêu phong trào Đồng Khởi là dấu mốc của giai đoạn Chiến tranh đơn phương (1954 - 1960)."
      },
      {
        id: "q-ch2-6",
        question: "Chiến dịch cuối cùng kết thúc cuộc kháng chiến chống Mỹ, cứu nước là gì?",
        options: [
          "Chiến dịch Hồ Chí Minh",
          "Chiến dịch Điện Biên Phủ",
          "Chiến dịch Biên giới",
          "Chiến dịch Việt Bắc"
        ],
        correctIndex: 0,
        explanation: "Chiến dịch Hồ Chí Minh kết thúc ngày 30/4/1975, giải phóng hoàn toàn miền Nam, thống nhất đất nước."
      }
    ]
  },
  {
    id: "ch3",
    code: "Chương 3",
    title: "Cả nước quá độ lên CNXH và Công cuộc Đổi mới",
    subtitle: "Từ năm 1975 đến nay: Đổi mới, CNH - HĐH và Hội nhập",
    period: "1975 - Nay",
    summary: "Lãnh đạo xây dựng và bảo vệ Tổ quốc, khởi xướng công cuộc Đổi mới tại Đại hội VI (1986), đưa đất nước đạt được những thành tựu to lớn, có ý nghĩa lịch sử.",
    sections: [
      {
        id: "ch3-1",
        title: "I. Thời kỳ trước Đổi mới: Xây dựng CNXH và bảo vệ Tổ quốc (1975 - 1986)",
        content: [
          "Thống nhất đất nước về mặt nhà nước (1975 - 1976), Quốc hội khóa VI đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam.",
          "Thực hiện hai kế hoạch 5 năm (1976 - 1985), chiến tranh bảo vệ biên giới Tây Nam và biên giới phía Bắc (1979).",
          "Kinh tế lâm vào khủng hoảng kinh tế - xã hội trầm trọng do duy trì quá lâu cơ chế kế hoạch hóa tập trung quan liêu, bao cấp; các bước đột phá tìm tòi: Chỉ thị 100-CT/TW (khoán 100), Hội nghị Trung ương 8 khóa V về giá - lương - tiền."
        ],
        keyPoints: [
          "Nhận diện nguyên nhân khủng hoảng: Sai lầm về bố trí cơ cấu kinh tế và duy trì cơ chế bao cấp.",
          "Quá trình tìm tòi, khảo nghiệm thực tiễn chuẩn bị cho đường lối Đổi mới toàn diện."
        ]
      },
      {
        id: "ch3-2",
        title: "II. Công cuộc Đổi mới toàn diện và hội nhập quốc tế (1986 - Nay)",
        content: [
          "Đại hội VI (12/1986): Mốc son lịch sử khởi xướng đường lối Đổi mới toàn diện, nhìn thẳng vào sự thật, đánh giá đúng sự thật, đổi mới tư duy trước hết là tư duy kinh tế.",
          "Cương lĩnh năm 1991 và Cương lĩnh bổ sung, phát triển năm 2011 xác định mô hình CNXH ở Việt Nam gồm 8 đặc trưng và 8 phương hướng cơ bản.",
          "Đổi mới kinh tế: Phát triển kinh tế thị trường định hướng XHCN, đa dạng hóa các hình thức sở hữu.",
          "Đổi mới chính trị và đối ngoại: Xây dựng Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân; đường lối đối ngoại độc lập, tự chủ, đa phương hóa, đa dạng hóa, chủ động và tích cực hội nhập quốc tế toàn diện; xây dựng chỉnh đốn Đảng trong sạch vững mạnh."
        ],
        keyPoints: [
          "Đất nước ra khỏi khủng hoảng, trở thành nước đang phát triển có thu nhập trung bình.",
          "Khẳng định bài học: 'Đất nước ta chưa bao giờ có được cơ đồ, tiềm lực, vị thế và uy tín quốc tế như ngày nay'."
        ]
      }
    ],
    reviewQuestions: [
      {
        id: "q-ch3-1",
        question: "Đại hội nào của Đảng đã đề ra đường lối Đổi mới toàn diện đất nước?",
        options: [
          "Đại hội đại biểu toàn quốc lần thứ VI (tháng 12/1986)",
          "Đại hội đại biểu toàn quốc lần thứ V (tháng 3/1982)",
          "Đại hội đại biểu toàn quốc lần thứ VII (tháng 6/1991)",
          "Đại hội đại biểu toàn quốc lần thứ VIII (tháng 6/1996)"
        ],
        correctIndex: 0,
        explanation: "Đại hội VI (12/1986) là đại hội khởi xướng công cuộc Đổi mới toàn diện đất nước với tinh thần nhìn thẳng vào sự thật."
      },
      {
        id: "q-ch3-2",
        question: "Đặc trưng tổng quát của xã hội XHCN mà nhân dân ta xây dựng theo Cương lĩnh 2011 là gì?",
        options: [
          "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh",
          "Dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh",
          "Nước mạnh, dân giàu, tự do, hạnh phúc",
          "Công nghiệp hiện đại, xã hội văn minh, bình đẳng"
        ],
        correctIndex: 0,
        explanation: "Cương lĩnh (bổ sung, phát triển năm 2011) xác định mục tiêu tổng quát: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh."
      },
      {
        id: "q-ch3-3",
        question: "Đại hội nào của Đảng khởi xướng công cuộc Đổi mới?",
        options: [
          "Đại hội VI (12/1986)",
          "Đại hội III (1960)",
          "Đại hội V (1982)",
          "Đại hội VII (1991)"
        ],
        correctIndex: 0,
        explanation: "Đại hội VI (12/1986) khởi xướng đường lối Đổi mới toàn diện đất nước."
      },
      {
        id: "q-ch3-4",
        question: "Nguyên nhân chủ yếu của khủng hoảng kinh tế - xã hội trước Đổi mới là gì?",
        options: [
          "Duy trì quá lâu cơ chế kế hoạch hóa tập trung quan liêu, bao cấp",
          "Thiếu sự lãnh đạo của Đảng",
          "Mở cửa hội nhập quá sớm",
          "Thiếu lao động"
        ],
        correctIndex: 0,
        explanation: "Giáo trình chỉ ra nguyên nhân chính là sai lầm trong bố trí cơ cấu kinh tế và duy trì lâu dài cơ chế kế hoạch hóa tập trung quan liêu, bao cấp."
      },
      {
        id: "q-ch3-5",
        question: "Tên nước Cộng hòa Xã hội Chủ nghĩa Việt Nam được Quốc hội đặt vào thời điểm nào?",
        options: [
          "Năm 1976 (Quốc hội khóa VI)",
          "Năm 1945",
          "Năm 1954",
          "Năm 1986"
        ],
        correctIndex: 0,
        explanation: "Sau thống nhất đất nước về mặt nhà nước (1975 - 1976), Quốc hội khóa VI đặt tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam."
      },
      {
        id: "q-ch3-6",
        question: "Chỉ thị 100-CT/TW (khoán 100) thuộc nhóm những bước đột phá nào?",
        options: [
          "Tìm tòi trước Đổi mới",
          "Chính sách đối ngoại sau 1991",
          "Cương lĩnh 2011",
          "Kháng chiến chống Pháp"
        ],
        correctIndex: 0,
        explanation: "Khoán 100 là một trong những bước đột phá tìm tòi trong thực tiễn, chuẩn bị cho đường lối Đổi mới toàn diện."
      }
    ]
  }
];

export const MILESTONES_DATA: Milestone[] = [
  {
    id: "m1",
    year: "1930",
    dateStr: "03/02/1930",
    title: "Thành lập Đảng Cộng sản Việt Nam",
    chapterCode: "Chương 1",
    description: "Hội nghị hợp nhất các tổ chức cộng sản tại Cửu Long (Hương Cảng, Trung Quốc) do Nguyễn Ái Quốc chủ trì.",
    significance: "Chấm dứt thời kỳ khủng hoảng đường lối cứu nước kéo dài gần một thế kỷ."
  },
  {
    id: "m2",
    year: "1930",
    dateStr: "12/09/1930",
    title: "Đỉnh cao Xô viết Nghệ - Tĩnh",
    chapterCode: "Chương 1",
    description: "Quần chúng công nông lập chính quyền xô viết sơ khai tại Nghệ An và Hà Tĩnh.",
    significance: "Cuộc diễn tập đầu tiên khẳng định năng lực lãnh đạo và sức mạnh liên minh công nông."
  },
  {
    id: "m3",
    year: "1941",
    dateStr: "19/05/1941",
    title: "Thành lập Mặt trận Việt Minh",
    chapterCode: "Chương 1",
    description: "Hội nghị Trung ương 8 quyết định thành lập Việt Nam Độc lập Đồng minh (Việt Minh).",
    significance: "Quy tụ đại đoàn kết toàn dân tộc phục vụ mục tiêu giải phóng dân tộc tối thượng."
  },
  {
    id: "m4",
    year: "1945",
    dateStr: "02/09/1945",
    title: "Tuyên ngôn Độc lập - Nước VN Dân chủ Cộng hòa",
    chapterCode: "Chương 1",
    description: "Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập lịch sử tại Quảng trường Ba Đình.",
    significance: "Khai sinh nước Việt Nam mới, mở đầu kỷ nguyên độc lập tự do."
  },
  {
    id: "m5",
    year: "1954",
    dateStr: "07/05/1954",
    title: "Chiến thắng lịch sử Điện Biên Phủ",
    chapterCode: "Chương 2",
    description: "Tiêu diệt tập đoàn cứ điểm Điện Biên Phủ sau 56 ngày đêm khoét núi ngủ hầm.",
    significance: "Buộc Pháp ký Hiệp định Giơnevơ, giải phóng hoàn toàn miền Bắc."
  },
  {
    id: "m6",
    year: "1960",
    dateStr: "17/01/1960",
    title: "Phong trào Đồng Khởi Bến Tre",
    chapterCode: "Chương 2",
    description: "Nhân dân miền Nam đồng loạt nổi dậy đập tan bộ máy kìm kẹp của chính quyền Ngô Đình Diệm.",
    significance: "Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công."
  },
  {
    id: "m7",
    year: "1975",
    dateStr: "30/04/1975",
    title: "Đại thắng mùa Xuân 1975",
    chapterCode: "Chương 2",
    description: "Chiến dịch Hồ Chí Minh toàn thắng, cờ cách mạng tung bay trên nóc Dinh Độc Lập.",
    significance: "Giải phóng hoàn toàn miền Nam, non sông thu về một mối."
  },
  {
    id: "m8",
    year: "1986",
    dateStr: "12/1986",
    title: "Đại hội VI - Khởi xướng Đổi mới",
    chapterCode: "Chương 3",
    description: "Đại hội VI của Đảng quyết định đổi mới toàn diện, xóa bỏ cơ chế tập trung quan liêu bao cấp.",
    significance: "Bước ngoặt lịch sử mở ra con đường phát triển kinh tế thị trường định hướng XHCN."
  },
  {
    id: "m9",
    year: "1991",
    dateStr: "06/1991",
    title: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ (Cương lĩnh 1991)",
    chapterCode: "Chương 3",
    description: "Đại hội VII thông qua Cương lĩnh định hình rõ nét mô hình CNXH tại Việt Nam.",
    significance: "Ngọn cờ tư tưởng dẫn dắt công cuộc đổi mới thời kỳ mở cửa và hội nhập."
  },
  {
    id: "m10",
    year: "2011",
    dateStr: "01/2011",
    title: "Cương lĩnh bổ sung, phát triển năm 2011",
    chapterCode: "Chương 3",
    description: "Đại hội XI đúc kết 8 đặc trưng và 8 mối quan hệ lớn của thời kỳ quá độ lên CNXH.",
    significance: "Hoàn thiện hệ thống lý luận về đường lối đổi mới và CNXH ở Việt Nam."
  },
  {
    id: "m11",
    year: "1925",
    dateStr: "06/1925",
    title: "Thành lập Hội Việt Nam Cách mạng Thanh niên",
    chapterCode: "Chương 1",
    description: "Nguyễn Ái Quốc thành lập Hội tại Quảng Châu (Trung Quốc), đào tạo cán bộ và truyền bá chủ nghĩa Mác - Lênin vào Việt Nam.",
    significance: "Tổ chức tiền thân của Đảng, chuẩn bị về tư tưởng, chính trị và tổ chức cho việc thành lập Đảng."
  },
  {
    id: "m12",
    year: "1927",
    dateStr: "1927",
    title: "Xuất bản tác phẩm Đường Kách mệnh",
    chapterCode: "Chương 1",
    description: "Tập hợp các bài giảng của Nguyễn Ái Quốc tại các lớp huấn luyện cán bộ ở Quảng Châu.",
    significance: "Đặt nền móng tư tưởng cho đường lối cách mạng Việt Nam."
  },
  {
    id: "m13",
    year: "1929",
    dateStr: "03/1929",
    title: "Chi bộ cộng sản đầu tiên ra đời",
    chapterCode: "Chương 1",
    description: "Chi bộ cộng sản đầu tiên được thành lập tại số nhà 5D phố Hàm Long, Hà Nội.",
    significance: "Bước chuẩn bị trực tiếp cho sự ra đời của các tổ chức cộng sản ở Việt Nam."
  },
  {
    id: "m14",
    year: "1929",
    dateStr: "17/06/1929",
    title: "Đông Dương Cộng sản Đảng ra đời",
    chapterCode: "Chương 1",
    description: "Đại biểu các chi bộ cộng sản ở Bắc Kỳ họp tại Hà Nội, quyết định thành lập Đông Dương Cộng sản Đảng.",
    significance: "Phản ánh xu thế phát triển của cách mạng, đồng thời đặt ra yêu cầu hợp nhất các tổ chức cộng sản riêng rẽ."
  },
  {
    id: "m15",
    year: "1930",
    dateStr: "10/1930",
    title: "Luận cương chính trị và đổi tên Đảng thành Đảng Cộng sản Đông Dương",
    chapterCode: "Chương 1",
    description: "Hội nghị Ban Chấp hành Trung ương lần thứ nhất thông qua Luận cương chính trị, bầu Trần Phú làm Tổng Bí thư.",
    significance: "Hoàn chỉnh đường lối cách mạng ở Đông Dương và xác lập tổ chức Đảng thống nhất trong khuôn khổ Quốc tế Cộng sản."
  },
  {
    id: "m16",
    year: "1936",
    dateStr: "07/1936",
    title: "Hội nghị Trung ương chuyển hướng chỉ đạo chiến lược",
    chapterCode: "Chương 1",
    description: "Hội nghị Trung ương họp tại Thượng Hải, chủ trương thành lập Mặt trận Dân tộc thống nhất phản đế Đông Dương.",
    significance: "Đưa cách mạng chuyển sang thời kỳ đấu tranh công khai, hợp pháp đòi dân sinh, dân chủ."
  },
  {
    id: "m17",
    year: "1939",
    dateStr: "11/1939",
    title: "Hội nghị Trung ương 6 đặt nhiệm vụ giải phóng dân tộc lên hàng đầu",
    chapterCode: "Chương 1",
    description: "Hội nghị họp tại Bà Điểm (Hóc Môn, Gia Định), quyết định chuyển hướng chỉ đạo chiến lược cách mạng.",
    significance: "Mở đầu quá trình chuyển hướng, được hoàn chỉnh ở Hội nghị Trung ương 8 (5/1941)."
  },
  {
    id: "m18",
    year: "1940",
    dateStr: "23/11/1940",
    title: "Khởi nghĩa Nam Kỳ",
    chapterCode: "Chương 1",
    description: "Nhân dân Nam Kỳ nổi dậy khởi nghĩa vũ trang chống thực dân Pháp dưới sự lãnh đạo của Đảng bộ Nam Kỳ.",
    significance: "Cuộc tổng diễn tập đầu tiên, để lại nhiều bài học về khởi nghĩa vũ trang."
  },
  {
    id: "m19",
    year: "1944",
    dateStr: "22/12/1944",
    title: "Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân",
    chapterCode: "Chương 1",
    description: "Đội được thành lập tại Cao Bằng dưới sự chỉ huy của Võ Nguyên Giáp.",
    significance: "Tiền thân của Quân đội nhân dân Việt Nam."
  },
  {
    id: "m20",
    year: "1945",
    dateStr: "12/03/1945",
    title: "Chỉ thị \"Nhật - Pháp bắn nhau và hành động của chúng ta\"",
    chapterCode: "Chương 1",
    description: "Sau cuộc đảo chính Nhật - Pháp ngày 9/3/1945, Ban Thường vụ Trung ương Đảng ra chỉ thị phát động cao trào kháng Nhật cứu nước.",
    significance: "Xác định kẻ thù chính và phát động cao trào chuẩn bị tổng khởi nghĩa."
  },
  {
    id: "m21",
    year: "1945",
    dateStr: "19/08/1945",
    title: "Tổng khởi nghĩa giành chính quyền ở Hà Nội",
    chapterCode: "Chương 1",
    description: "Nhân dân Hà Nội khởi nghĩa giành chính quyền, mở đầu thắng lợi của Cách mạng Tháng Tám trên cả nước.",
    significance: "Cách mạng Tháng Tám thành công, lật đổ ách thống trị của thực dân và phát xít."
  },
  {
    id: "m22",
    year: "1946",
    dateStr: "19/12/1946",
    title: "Toàn quốc kháng chiến chống thực dân Pháp",
    chapterCode: "Chương 2",
    description: "Cuộc kháng chiến toàn quốc bùng nổ; Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến.",
    significance: "Mở đầu cuộc kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh."
  },
  {
    id: "m23",
    year: "1947",
    dateStr: "10/1947",
    title: "Chiến thắng Việt Bắc thu - đông 1947",
    chapterCode: "Chương 2",
    description: "Quân dân ta đánh bại cuộc tiến công quy mô lớn của quân Pháp lên căn cứ địa Việt Bắc.",
    significance: "Bảo vệ cơ quan đầu não kháng chiến, làm thất bại chiến lược \"đánh nhanh thắng nhanh\" của Pháp."
  },
  {
    id: "m24",
    year: "1950",
    dateStr: "09/1950",
    title: "Chiến dịch Biên giới thu - đông 1950",
    chapterCode: "Chương 2",
    description: "Quân ta mở chiến dịch tiến công trên tuyến biên giới Việt - Trung.",
    significance: "Phá vỡ thế bao vây, mở thông biên giới và giành quyền chủ động trên chiến trường chính."
  },
  {
    id: "m25",
    year: "1951",
    dateStr: "02/1951",
    title: "Đại hội đại biểu toàn quốc lần thứ II của Đảng",
    chapterCode: "Chương 2",
    description: "Đại hội họp tại Tuyên Quang; Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam.",
    significance: "Đưa kháng chiến đến thắng lợi bằng đường lối và tổ chức Đảng được củng cố."
  },
  {
    id: "m26",
    year: "1954",
    dateStr: "21/07/1954",
    title: "Ký Hiệp định Giơnevơ về Đông Dương",
    chapterCode: "Chương 2",
    description: "Hiệp định công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, Lào, Campuchia.",
    significance: "Kết thúc cuộc kháng chiến chống Pháp, miền Bắc hoàn toàn giải phóng."
  },
  {
    id: "m27",
    year: "1960",
    dateStr: "09/1960",
    title: "Đại hội đại biểu toàn quốc lần thứ III của Đảng",
    chapterCode: "Chương 2",
    description: "Đại hội xác định đường lối chung: xây dựng chủ nghĩa xã hội ở miền Bắc và giải phóng miền Nam.",
    significance: "Hoạch định chiến lược cách mạng cả nước trong giai đoạn mới."
  },
  {
    id: "m28",
    year: "1960",
    dateStr: "20/12/1960",
    title: "Thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    chapterCode: "Chương 2",
    description: "Mặt trận ra đời, tập hợp mọi lực lượng yêu nước ở miền Nam chống Mỹ và chính quyền Sài Gòn.",
    significance: "Khối đại đoàn kết toàn dân tộc ở miền Nam, lãnh đạo cuộc kháng chiến cứu nước."
  },
  {
    id: "m29",
    year: "1972",
    dateStr: "12/1972",
    title: "Chiến thắng \"Điện Biên Phủ trên không\"",
    chapterCode: "Chương 2",
    description: "Quân dân miền Bắc đánh bại cuộc tập kích bằng máy bay B-52 của Mỹ vào Hà Nội, Hải Phòng.",
    significance: "Buộc Mỹ trở lại bàn đàm phán và ký Hiệp định Pa-ri."
  },
  {
    id: "m30",
    year: "1973",
    dateStr: "27/01/1973",
    title: "Ký Hiệp định Pa-ri về Việt Nam",
    chapterCode: "Chương 2",
    description: "Hiệp định chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam; Mỹ rút quân khỏi miền Nam.",
    significance: "Tạo điều kiện thuận lợi để cách mạng miền Nam tiến tới giải phóng hoàn toàn."
  },
  {
    id: "m31",
    year: "1976",
    dateStr: "07/1976",
    title: "Quốc hội quyết định tên nước Cộng hòa xã hội chủ nghĩa Việt Nam",
    chapterCode: "Chương 3",
    description: "Quốc hội khóa VI của nước Việt Nam thống nhất quyết định tên nước và các vấn đề lớn của đất nước.",
    significance: "Hoàn thành thống nhất đất nước về mặt nhà nước."
  },
  {
    id: "m32",
    year: "1976",
    dateStr: "12/1976",
    title: "Đại hội đại biểu toàn quốc lần thứ IV của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội đổi tên Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam.",
    significance: "Xác định đường lối xây dựng chủ nghĩa xã hội trong phạm vi cả nước."
  },
  {
    id: "m33",
    year: "1982",
    dateStr: "03/1982",
    title: "Đại hội đại biểu toàn quốc lần thứ V của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội tiếp tục khẳng định hai nhiệm vụ chiến lược: xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc.",
    significance: "Giai đoạn trước Đổi mới, nhiều khó khăn kinh tế - xã hội nảy sinh đòi hỏi đổi mới tư duy."
  },
  {
    id: "m34",
    year: "1995",
    dateStr: "07/1995",
    title: "Gia nhập ASEAN và bình thường hóa quan hệ với Hoa Kỳ",
    chapterCode: "Chương 3",
    description: "Việt Nam trở thành thành viên ASEAN và bình thường hóa quan hệ ngoại giao với Hoa Kỳ.",
    significance: "Phá thế bao vây cô lập, mở rộng quan hệ đối ngoại đa phương hóa, đa dạng hóa."
  },
  {
    id: "m35",
    year: "1996",
    dateStr: "06/1996",
    title: "Đại hội đại biểu toàn quốc lần thứ VIII của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội đánh giá đất nước ra khỏi khủng hoảng kinh tế - xã hội, chuyển sang thời kỳ đẩy mạnh công nghiệp hóa, hiện đại hóa.",
    significance: "Xác định công nghiệp hóa, hiện đại hóa là nhiệm vụ trung tâm."
  },
  {
    id: "m36",
    year: "2001",
    dateStr: "04/2001",
    title: "Đại hội đại biểu toàn quốc lần thứ IX của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội xác định mô hình kinh tế tổng quát là nền kinh tế thị trường định hướng xã hội chủ nghĩa.",
    significance: "Hoàn thiện nhận thức về mô hình kinh tế của thời kỳ quá độ."
  },
  {
    id: "m37",
    year: "2007",
    dateStr: "11/01/2007",
    title: "Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO)",
    chapterCode: "Chương 3",
    description: "Việt Nam chính thức trở thành thành viên của WTO.",
    significance: "Đánh dấu bước hội nhập kinh tế quốc tế sâu rộng."
  },
  {
    id: "m38",
    year: "2021",
    dateStr: "01/2021",
    title: "Đại hội đại biểu toàn quốc lần thứ XIII của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội đề ra mục tiêu đến năm 2030 là nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao; đến năm 2045 là nước phát triển, thu nhập cao.",
    significance: "Định hướng phát triển đất nước trong giai đoạn mới."
  },
  {
    id: "m39",
    year: "1911",
    dateStr: "05/06/1911",
    title: "Nguyễn Tất Thành ra đi tìm đường cứu nước",
    chapterCode: "Chương 1",
    description: "Người thanh niên Nguyễn Tất Thành rời bến cảng Nhà Rồng trên con tàu Đô đốc Latouche-Tréville ra đi tìm con đường giải phóng cho dân tộc.",
    significance: "Mở đầu hành trình tìm kiếm chân lý cứu nước đúng đắn cho cách mạng Việt Nam."
  },
  {
    id: "m40",
    year: "1920",
    dateStr: "07/1920",
    title: "Nguyễn Ái Quốc đọc Sơ thảo Luận cương của Lênin",
    chapterCode: "Chương 1",
    description: "Đọc bản 'Sơ thảo lần thứ nhất những Luận cương về vấn đề dân tộc và vấn đề thuộc địa' của Lênin đăng trên báo L'Humanité.",
    significance: "Bước ngoặt quyết định đưa Nguyễn Ái Quốc tin theo Lênin và chủ nghĩa Mác - Lênin."
  },
  {
    id: "m41",
    year: "1920",
    dateStr: "12/1920",
    title: "Bỏ phiếu tán thành Quốc tế III và sáng lập Đảng Cộng sản Pháp",
    chapterCode: "Chương 1",
    description: "Tại Đại hội Tours của Đảng Xã hội Pháp, Nguyễn Ái Quốc bỏ phiếu gia nhập Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp.",
    significance: "Đánh dấu bước chuyển biến quyết định từ chủ nghĩa yêu nước sang chủ nghĩa cộng sản."
  },
  {
    id: "m42",
    year: "1925",
    dateStr: "08/1925",
    title: "Bãi công Ba Son do Tôn Đức Thắng lãnh đạo",
    chapterCode: "Chương 1",
    description: "Công nhân xưởng Ba Son (Sài Gòn) bãi công đòi tăng lương và trì hoãn tàu chiến Pháp sang đàn áp phong trào cách mạng Trung Quốc.",
    significance: "Đánh dấu phong trào công nhân Việt Nam bắt đầu chuyển từ đấu tranh tự phát sang đấu tranh tự giác."
  },
  {
    id: "m43",
    year: "1928",
    dateStr: "1928",
    title: "Chủ trương 'Vô sản hóa' của Hội VN Cách mạng Thanh niên",
    chapterCode: "Chương 1",
    description: "Đưa hội viên vào các nhà máy, hầm mỏ, đồn điền cùng lao động và sinh hoạt với công nhân.",
    significance: "Thúc đẩy mạnh mẽ việc truyền bá chủ nghĩa Mác - Lênin vào phong trào công nhân và phong trào yêu nước."
  },
  {
    id: "m44",
    year: "1929",
    dateStr: "25/07/1929",
    title: "An Nam Cộng sản Đảng được thành lập",
    chapterCode: "Chương 1",
    description: "Các hội viên tiên tiến của Hội Việt Nam Cách mạng Thanh niên ở Nam Kỳ thành lập An Nam Cộng sản Đảng.",
    significance: "Khẳng định sự phân hóa sâu sắc và xu thế phát triển tất yếu của phong trào cộng sản ở Việt Nam."
  },
  {
    id: "m45",
    year: "1929",
    dateStr: "09/1929",
    title: "Đông Dương Cộng sản Liên đoàn ra đời",
    chapterCode: "Chương 1",
    description: "Các đảng viên tiên tiến của Tân Việt Cách mạng Đảng tuyên bố thành lập Đông Dương Cộng sản Liên đoàn tại Trung Kỳ.",
    significance: "Hoàn tất sự xuất hiện của ba tổ chức cộng sản trong năm 1929 ở cả ba miền đất nước."
  },
  {
    id: "m46",
    year: "1935",
    dateStr: "27/03/1935",
    title: "Đại hội đại biểu lần thứ I của Đảng tại Ma Cao",
    chapterCode: "Chương 1",
    description: "Đại hội họp tại Ma Cao (Trung Quốc), bầu Ban Chấp hành Trung ương mới do Lê Hồng Phong làm Tổng Bí thư.",
    significance: "Đánh dấu sự phục hồi hệ thống tổ chức của Đảng và phong trào cách mạng sau đợt khủng bố trắng."
  },
  {
    id: "m47",
    year: "1941",
    dateStr: "28/01/1941",
    title: "Nguyễn Ái Quốc về nước trực tiếp lãnh đạo cách mạng",
    chapterCode: "Chương 1",
    description: "Sau 30 năm bôn ba hải ngoại, lãnh tụ Nguyễn Ái Quốc vượt qua mốc 108 biên giới Việt - Trung về đến Pác Bó (Hà Quảng, Cao Bằng).",
    significance: "Trực tiếp cùng Trung ương Đảng chèo lái con thuyền cách mạng Việt Nam đi đến thắng lợi của Cách mạng Tháng Tám."
  },
  {
    id: "m48",
    year: "1943",
    dateStr: "02/1943",
    title: "Ban Thường vụ TW Đảng thông qua Đề cương về văn hóa Việt Nam",
    chapterCode: "Chương 1",
    description: "Văn kiện do Tổng Bí thư Trường Chinh soạn thảo, xác lập ba nguyên tắc vận động văn hóa: Dân tộc hóa, Đại chúng hóa, Khoa học hóa.",
    significance: "Cương lĩnh văn hóa đầu tiên của Đảng, quy tụ đội ngũ trí thức, văn nghệ sĩ theo ngọn cờ cứu quốc."
  },
  {
    id: "m49",
    year: "1945",
    dateStr: "14/08/1945",
    title: "Hội nghị toàn quốc của Đảng họp tại Tân Trào",
    chapterCode: "Chương 1",
    description: "Hội nghị quyết định phát động toàn dân Tổng khởi nghĩa giành chính quyền trước khi quân Đồng minh vào Đông Dương.",
    significance: "Kịp thời nắm bắt thời cơ ngàn năm có một để lãnh đạo nhân dân đứng lên giành chính quyền."
  },
  {
    id: "m50",
    year: "1945",
    dateStr: "16/08/1945",
    title: "Đại hội Quốc dân Tân Trào",
    chapterCode: "Chương 1",
    description: "Hơn 60 đại biểu đại diện cho ba miền Bắc - Trung - Nam, các dân tộc, đoàn thể và kiều bào dự hội nghị tại đình Tân Trào.",
    significance: "Tán thành chủ trương Tổng khởi nghĩa, thông qua 10 chính sách lớn của Việt Minh và cử ra Ủy ban Dân tộc giải phóng."
  },
  {
    id: "m51",
    year: "1945",
    dateStr: "23/09/1945",
    title: "Nhân dân Nam Bộ mở đầu cuộc kháng chiến chống Pháp",
    chapterCode: "Chương 2",
    description: "Thực dân Pháp nổ súng đánh úp trụ sở Ủy ban Hành chính Nam Bộ tại Sài Gòn; quân dân Nam Bộ kiên quyết vùng lên chiến đấu bảo vệ độc lập.",
    significance: "Mở đầu cuộc chiến đấu kiên cường giữ vững nền độc lập, thể hiện phẩm chất 'Thành đồng Tổ quốc'."
  },
  {
    id: "m52",
    year: "1945",
    dateStr: "25/11/1945",
    title: "Chỉ thị 'Kháng chiến kiến quốc' của Trung ương Đảng",
    chapterCode: "Chương 2",
    description: "Chỉ thị xác định kẻ thù chính lúc này là thực dân Pháp xâm lược, vạch ra 4 nhiệm vụ cấp bách: củng cố chính quyền, chống thực dân Pháp, bài trừ nội phản, cải thiện đời sống.",
    significance: "Soi sáng con đường cách mạng Việt Nam trong tình thế 'ngàn cân treo sợi tóc'."
  },
  {
    id: "m53",
    year: "1946",
    dateStr: "06/01/1946",
    title: "Cuộc Tổng tuyển cử đầu tiên bầu Quốc hội Việt Nam",
    chapterCode: "Chương 2",
    description: "Hàng triệu cử tri cả nước vượt qua bom đạn đi bỏ phiếu bầu ra Quốc hội khóa I gồm 333 đại biểu.",
    significance: "Khẳng định quyền làm chủ thực sự của nhân dân và tính hợp pháp, hợp hiến của Nhà nước Việt Nam Dân chủ Cộng hòa."
  },
  {
    id: "m54",
    year: "1946",
    dateStr: "06/03/1946",
    title: "Chủ tịch Hồ Chí Minh ký Hiệp định Sơ bộ",
    chapterCode: "Chương 2",
    description: "Chủ tịch Hồ Chí Minh thay mặt Chính phủ ký Hiệp định Sơ bộ với đại diện Pháp là Jean Sainteny, đồng ý cho 15.000 quân Pháp vào miền Bắc thay thế quân Tưởng.",
    significance: "Sách lược ngoại giao tài tình 'hòa để tiến', tránh đối đầu cùng lúc nhiều kẻ thù và tranh thủ thời gian chuẩn bị kháng chiến."
  },
  {
    id: "m55",
    year: "1946",
    dateStr: "09/11/1946",
    title: "Quốc hội thông qua bản Hiến pháp đầu tiên của nước ta",
    chapterCode: "Chương 2",
    description: "Kỳ họp thứ hai Quốc hội khóa I thông qua Hiến pháp năm 1946 – bản hiến pháp dân chủ tiến bộ đầu tiên trong lịch sử dân tộc.",
    significance: "Đặt nền tảng pháp lý vững chắc cho chế độ dân chủ cộng hòa và quyền tự do, bình đẳng của mọi công dân."
  },
  {
    id: "m56",
    year: "1948",
    dateStr: "11/06/1948",
    title: "Chủ tịch Hồ Chí Minh ra Lời kêu gọi Thi đua ái quốc",
    chapterCode: "Chương 2",
    description: "Bác Hồ kêu gọi toàn thể đồng bào thi đua diệt giặc đói, diệt giặc dốt, diệt giặc ngoại xâm để xây dựng đất nước kháng chiến thành công.",
    significance: "Khơi dậy mạnh mẽ nguồn lực to lớn và tinh thần tự lực cánh sinh của toàn thể dân tộc."
  },
  {
    id: "m57",
    year: "1950",
    dateStr: "01/1950",
    title: "Liên Xô, Trung Quốc công nhận và đặt quan hệ ngoại giao với Việt Nam",
    chapterCode: "Chương 2",
    description: "Nước CHND Trung Hoa và Liên bang Xô viết chính thức tuyên bố công nhận và thiết lập quan hệ ngoại giao với Việt Nam Dân chủ Cộng hòa.",
    significance: "Phá vỡ hoàn toàn thế bao vây cô lập quốc tế của chủ nghĩa đế quốc đối với căn cứ địa kháng chiến Việt Nam."
  },
  {
    id: "m58",
    year: "1959",
    dateStr: "19/05/1959",
    title: "Khai mở tuyến đường vận tải quân sự chiến lược Trường Sơn",
    chapterCode: "Chương 2",
    description: "Đoàn 559 được thành lập để mở đường Trường Sơn chi viện sức người, vũ khí và lương thực từ hậu phương lớn miền Bắc cho tiền tuyến lớn miền Nam.",
    significance: "Huyết mạch giao thông chiến lược huyền thoại quyết định thắng lợi vẻ vang của cuộc kháng chiến chống Mỹ cứu nước."
  },
  {
    id: "m59",
    year: "1959",
    dateStr: "01/1959",
    title: "Nghị quyết Trung ương 15 về đường lối cách mạng miền Nam",
    chapterCode: "Chương 2",
    description: "Hội nghị Trung ương 15 (khóa II) xác định con đường cơ bản của cách mạng miền Nam là dùng bạo lực cách mạng của quần chúng.",
    significance: "Đáp ứng đúng nguyện vọng cháy bỏng của nhân dân miền Nam, thổi bùng lên ngọn lửa Đồng Khởi lịch sử."
  },
  {
    id: "m60",
    year: "1963",
    dateStr: "02/01/1963",
    title: "Chiến thắng Ấp Bắc (Mỹ Tho)",
    chapterCode: "Chương 2",
    description: "Quân và dân Mỹ Tho bẻ gãy cuộc hành quân càn quét quy mô lớn của đối phương, tiêu diệt nhiều xe bọc thép M113 và máy bay trực thăng.",
    significance: "Đánh dấu sự phá sản về mặt chiến thuật của chiến lược 'Chiến tranh đặc biệt' của đế quốc Mỹ."
  },
  {
    id: "m61",
    year: "1965",
    dateStr: "18/08/1965",
    title: "Chiến thắng Vạn Tường (Quảng Ngãi)",
    chapterCode: "Chương 2",
    description: "Trận đọ sức trực tiếp đầu tiên giữa quân giải phóng và lực lượng lính thủy đánh bộ Mỹ tại bán đảo Vạn Tường.",
    significance: "Chứng minh quân dân miền Nam hoàn toàn có khả năng đánh thắng quân đội viễn chinh Mỹ trong 'Chiến tranh cục bộ'."
  },
  {
    id: "m62",
    year: "1968",
    dateStr: "30/01/1968",
    title: "Tổng tiến công và nổi dậy Tết Mậu Thân 1968",
    chapterCode: "Chương 2",
    description: "Lực lượng vũ trang và nhân dân miền Nam bất ngờ đồng loạt tiến công vào hầu khắp các thành phố, thị xã, sào huyệt đầu não của địch.",
    significance: "Làm lung lay ý chí xâm lược của Mỹ, buộc Mỹ chấm dứt ném bom miền Bắc và chấp nhận đàm phán tại Hội nghị Paris."
  },
  {
    id: "m63",
    year: "1975",
    dateStr: "10/03/1975",
    title: "Chiến thắng Buôn Ma Thuột mở màn Chiến dịch Tây Nguyên",
    chapterCode: "Chương 2",
    description: "Trận đánh then chốt điểm trúng huyệt hiểm yếu giải phóng thị xã Buôn Ma Thuột, làm rung chuyển toàn bộ hệ thống phòng thủ đối phương.",
    significance: "Mở ra bước ngoặt quyết định chuyển từ thế tiến công chiến lược sang Tổng tiến công và nổi dậy giải phóng hoàn toàn miền Nam."
  },
  {
    id: "m64",
    year: "1975",
    dateStr: "29/03/1975",
    title: "Chiến dịch Huế - Đà Nẵng toàn thắng",
    chapterCode: "Chương 2",
    description: "Quân ta tiến công thần tốc đập tan căn cứ quân sự liên hợp khổng lồ Đà Nẵng, quét sạch đối phương ở dải đất miền Trung.",
    significance: "Tạo ưu thế tuyệt đối về quân sự và tinh thần để Bộ Chính trị quyết định mở Chiến dịch Hồ Chí Minh lịch sử."
  },
  {
    id: "m65",
    year: "1979",
    dateStr: "1979",
    title: "Chiến đấu bảo vệ biên giới Tây Nam và biên giới phía Bắc",
    chapterCode: "Chương 3",
    description: "Quân và dân cả nước kiên cường chiến đấu đánh bại các cuộc tiến công xâm lấn biên giới, giữ vững toàn vẹn lãnh thổ thiêng liêng.",
    significance: "Bảo vệ vững chắc nền độc lập, chủ quyền Tổ quốc và hoàn thành nghĩa vụ quốc tế cao cả."
  },
  {
    id: "m66",
    year: "1981",
    dateStr: "13/01/1981",
    title: "Chỉ thị 100-CT/TW về khoán sản phẩm trong nông nghiệp",
    chapterCode: "Chương 3",
    description: "Ban Bí thư Trung ương Đảng ban hành chủ trương cải tiến công tác khoán, mở rộng khoán sản phẩm đến nhóm và người lao động trong HTX nông nghiệp.",
    significance: "Bước đột phá đầu tiên cởi trói tư duy quản lý kinh tế nông nghiệp, tiền đề dẫn tới Khoán 10."
  },
  {
    id: "m67",
    year: "1985",
    dateStr: "06/1985",
    title: "Hội nghị TW8 khóa V về xóa bỏ quan liêu bao cấp",
    chapterCode: "Chương 3",
    description: "Hội nghị Trung ương 8 (khóa V) thảo luận về Giá - Lương - Tiền, quyết định dứt khoát xóa bỏ cơ chế tập trung quan liêu bao cấp.",
    significance: "Đột phá tư duy kinh tế then chốt mở đường trực tiếp cho đường lối Đổi mới tại Đại hội VI."
  },
  {
    id: "m68",
    year: "1988",
    dateStr: "05/04/1988",
    title: "Nghị quyết 10-NQ/TW của Bộ Chính trị (Khoán 10)",
    chapterCode: "Chương 3",
    description: "Nghị quyết về đổi mới quản lý kinh tế nông nghiệp thừa nhận hộ nông dân là đơn vị kinh tế tự chủ, giao ruộng đất ổn định lâu dài.",
    significance: "Tạo động lực mạnh mẽ giải phóng sức sản xuất nông nghiệp, đưa Việt Nam từ thiếu lương thực trở thành nước xuất khẩu gạo hàng đầu."
  },
  {
    id: "m69",
    year: "2000",
    dateStr: "13/07/2000",
    title: "Ký kết Hiệp định Thương mại song phương Việt Nam - Hoa Kỳ (BTA)",
    chapterCode: "Chương 3",
    description: "Hiệp định BTA được ký kết tại Washington D.C, bình thường hóa hoàn toàn quan hệ kinh tế thương mại giữa hai quốc gia.",
    significance: "Tạo xung lực quan trọng mở rộng thị trường xuất khẩu và chuẩn bị điều kiện gia nhập WTO."
  },
  {
    id: "m70",
    year: "2006",
    dateStr: "04/2006",
    title: "Đại hội đại biểu toàn quốc lần thứ X của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội đề ra mục tiêu sớm đưa nước ta ra khỏi tình trạng kém phát triển, cho phép đảng viên làm kinh tế tư nhân.",
    significance: "Bước tiến lớn trong đổi mới tư duy lý luận về kinh tế tư nhân và vai trò của đảng viên."
  },
  {
    id: "m71",
    year: "2013",
    dateStr: "28/11/2013",
    title: "Quốc hội thông qua bản Hiến pháp năm 2013",
    chapterCode: "Chương 3",
    description: "Quốc hội khóa XIII thông qua bản Hiến pháp thời kỳ đẩy mạnh toàn diện công cuộc đổi mới và hội nhập quốc tế.",
    significance: "Thể chế hóa Cương lĩnh năm 2011, khẳng định bản chất Nhà nước pháp quyền XHCN và quyền con người."
  },
  {
    id: "m72",
    year: "2016",
    dateStr: "01/2016",
    title: "Đại hội đại biểu toàn quốc lần thứ XII của Đảng",
    chapterCode: "Chương 3",
    description: "Đại hội xác định mục tiêu phát triển kinh tế nhanh, bền vững, gắn với đẩy mạnh xây dựng chỉnh đốn Đảng và phòng chống tham nhũng, lãng phí.",
    significance: "Tạo dấu ấn mới về quyết tâm chính trị trong công tác phòng chống tham nhũng, tiêu cực và chỉnh đốn Đảng."
  },
  {
    id: "m73",
    year: "2020",
    dateStr: "2020",
    title: "Việt Nam hoàn thành xuất sắc vai trò Chủ tịch ASEAN 2020",
    chapterCode: "Chương 3",
    description: "Đảm nhận thành công vai trò kép: Chủ tịch ASEAN 2020 và Ủy viên không thường trực Hội đồng Bảo an Liên Hợp Quốc nhiệm kỳ 2020 - 2021.",
    significance: "Khẳng định bản lĩnh đối ngoại vững vàng và uy tín quốc tế ngày càng cao của đất nước."
  }
];

export const COMPARISONS_DATA: DocumentComparison[] = [
  {
    id: "comp-1",
    title: "So sánh Cương lĩnh chính trị đầu tiên (2/1930) và Luận cương chính trị (10/1930)",
    period: "Giai đoạn 1930",
    aspects: [
      {
        criteria: "Người khởi thảo",
        docA: { name: "Cương lĩnh chính trị (2/1930)", content: "Nguyễn Ái Quốc" },
        docB: { name: "Luận cương chính trị (10/1930)", content: "Trần Phú" },
        analysis: "Cả hai văn kiện đều là nền tảng tư tưởng cơ bản của Đảng trong năm đầu thành lập."
      },
      {
        criteria: "Nhiệm vụ cách mạng",
        docA: { name: "Cương lĩnh chính trị (2/1930)", content: "Đặt nhiệm vụ giải phóng dân tộc (chống đế quốc) lên hàng đầu, gắn liền với thổ địa cách mạng." },
        docB: { name: "Luận cương chính trị (10/1930)", content: "Nhấn mạnh hai nhiệm vụ chống đế quốc và chống phong kiến có quan hệ khăng khít, đề cao chống phong kiến (thổ địa cách mạng)." },
        analysis: "Cương lĩnh xác định đúng mâu thuẫn chủ yếu là mâu thuẫn dân tộc; Luận cương nặng về đấu tranh giai cấp."
      },
      {
        criteria: "Lực lượng cách mạng",
        docA: { name: "Cương lĩnh chính trị (2/1930)", content: "Công nông là gốc; đoàn kết trí thức, tiểu tư sản, trung nông; tranh thủ hoặc trung lập phú nông, trung tiểu địa chủ, tư sản dân tộc." },
        docB: { name: "Luận cương chính trị (10/1930)", content: "Chỉ coi công nhân và nông dân là động lực chính của cách mạng; chưa đánh giá đúng khả năng tham gia của các giai tầng khác." },
        analysis: "Cương lĩnh thể hiện tinh thần đại đoàn kết dân tộc sâu rộng và sáng tạo hơn."
      }
    ]
  }
];

// Đáp án đúng trong dữ liệu luôn ở vị trí 0 — xoay vòng theo id để vị trí đáp án đa dạng nhưng ổn định giữa các lần tải.
for (const ch of CHAPTERS_DATA) {
  for (const q of ch.reviewQuestions) {
    const n = q.options.length;
    const k = [...q.id].reduce((a, c) => a + c.charCodeAt(0), 0) % n;
    q.options = q.options.map((_, i) => q.options[(i - k + n) % n]);
    q.correctIndex = (q.correctIndex + k) % n;
  }
}
