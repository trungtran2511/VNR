export interface MindNode {
  id: string;
  label: string;
  note?: string;
  children?: MindNode[];
}

export interface MindmapItem {
  id: string;
  title: string;
  shortLabel: string;
  chapter: "Nhập môn" | "Chương 1" | "Chương 2" | "Chương 3";
  period?: string;
  root: MindNode;
}

export const MINDMAPS: MindmapItem[] = [
  // 1. CHƯƠNG NHẬP MÔN
  {
    id: "intro-methods",
    title: "Đối tượng, chức năng và phương pháp Lịch sử Đảng",
    shortLabel: "Nhập môn",
    chapter: "Nhập môn",
    period: "Nhập môn",
    root: {
      id: "intro",
      label: "Môn Lịch sử Đảng Cộng sản Việt Nam",
      note: "Hệ thống khoa học về sự ra đời, phát triển và hoạt động lãnh đạo của Đảng",
      children: [
        {
          id: "intro-dt",
          label: "Đối tượng nghiên cứu",
          note: "Hệ thống sự kiện, cương lĩnh, quy luật vận động của CMVN",
          children: [
            { id: "intro-dt1", label: "Quá trình Đảng ra đời, phát triển và lãnh đạo cách mạng" },
            { id: "intro-dt2", label: "Hệ thống cương lĩnh, đường lối, chủ trương, chính sách lớn" },
            { id: "intro-dt3", label: "Tổng kết bài học kinh nghiệm lịch sử phục vụ công cuộc đổi mới" }
          ]
        },
        {
          id: "intro-cn",
          label: "Ba chức năng cơ bản",
          note: "Nhận thức - Giáo dục - Dự báo & Phê phán",
          children: [
            { id: "intro-cn1", label: "Chức năng nhận thức", note: "Cung cấp tri thức khách quan, có hệ thống về tiến trình lãnh đạo của Đảng" },
            { id: "intro-cn2", label: "Chức năng giáo dục", note: "Bồi dưỡng lý tưởng cách mạng, lòng yêu nước và niềm tin chính trị vững vàng" },
            { id: "intro-cn3", label: "Chức năng dự báo & phê phán", note: "Tổng kết quy luật định hướng tương lai, bảo vệ nền tảng tư tưởng của Đảng" }
          ]
        },
        {
          id: "intro-pp",
          label: "Phương pháp nghiên cứu",
          note: "Kết hợp phương pháp lịch sử và phương pháp logic",
          children: [
            { id: "intro-pp1", label: "Phương pháp lịch sử", note: "Tái hiện chân thực sự kiện theo tiến trình thời gian cụ thể" },
            { id: "intro-pp2", label: "Phương pháp logic", note: "Vạch rõ bản chất, quy luật khách quan bên trong sự kiện" },
            { id: "intro-pp3", label: "Phương pháp bổ trợ", note: "Phân tích, tổng hợp, so sánh, nhân chứng lịch sử và thống kê" }
          ]
        }
      ]
    }
  },

  // 2. CHƯƠNG 1: THÀNH LẬP ĐẢNG (1920 - 1930)
  {
    id: "ch1-founding",
    title: "Thành lập Đảng & Cương lĩnh đầu tiên (1920 - 1930)",
    shortLabel: "1920 - 1930",
    chapter: "Chương 1",
    period: "1920 - 1930",
    root: {
      id: "fd",
      label: "Đảng Cộng sản Việt Nam ra đời (1930)",
      note: "Bước ngoặt vĩ đại chấm dứt cuộc khủng hoảng đường lối cứu nước",
      children: [
        {
          id: "fd-bc",
          label: "Bối cảnh & Chuẩn bị",
          note: "Nguyễn Ái Quốc chuẩn bị tư tưởng, chính trị và tổ chức",
          children: [
            { id: "fd-bc1", label: "Xã hội thuộc địa nửa phong kiến: Mâu thuẫn dân tộc và giai cấp sâu sắc" },
            { id: "fd-bc2", label: "1920: Nguyễn Ái Quốc bỏ phiếu tán thành Quốc tế III, tìm ra con đường cứu nước" },
            { id: "fd-bc3", label: "6/1925: Thành lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu" }
          ]
        },
        {
          id: "fd-3tochuc",
          label: "Ba tổ chức cộng sản năm 1929",
          note: "Sự phân hóa tất yếu dẫn đến nhu cầu thống nhất",
          children: [
            { id: "fd-tc1", label: "Đông Dương Cộng sản Đảng (6/1929 - Bắc Kỳ)" },
            { id: "fd-tc2", label: "An Nam Cộng sản Đảng (11/1929 - Nam Kỳ)" },
            { id: "fd-tc3", label: "Đông Dương Cộng sản Liên đoàn (1/1930 - Trung Kỳ)" }
          ]
        },
        {
          id: "fd-hn",
          label: "Hội nghị hợp nhất (3/2/1930)",
          note: "Nguyễn Ái Quốc chủ trì tại Cửu Long (Hương Cảng, Trung Quốc)",
          children: [
            { id: "fd-hn1", label: "Hợp nhất các tổ chức thành Đảng Cộng sản Việt Nam duy nhất" },
            { id: "fd-hn2", label: "Thông qua Chánh cương vắn tắt, Sách lược vắn tắt và Điều lệ vắn tắt" }
          ]
        },
        {
          id: "fd-cl",
          label: "Cương lĩnh chính trị đầu tiên",
          note: "Cương lĩnh cách mạng giải phóng dân tộc đúng đắn, sáng tạo",
          children: [
            { id: "fd-cl1", label: "Đường lối chiến lược: Làm tư sản dân quyền CM và thổ địa CM để đi tới xã hội cộng sản" },
            { id: "fd-cl2", label: "Nhiệm vụ hàng đầu: Đánh đổ đế quốc Pháp và phong kiến tay sai, giành độc lập dân tộc" },
            { id: "fd-cl3", label: "Lực lượng: Công nông là gốc; đoàn kết tiểu tư sản, trí thức; tranh thủ trung, phú nông, tư sản dân tộc" },
            { id: "fd-cl4", label: "Lãnh đạo & Quốc tế: Giai cấp công nhân qua Đảng Cộng sản; đoàn kết với vô sản thế giới" }
          ]
        }
      ]
    }
  },

  // 3. CHƯƠNG 1: CHUYỂN HƯỚNG CHIẾN LƯỢC (1939 - 1941)
  {
    id: "turn",
    title: "Chuyển hướng chỉ đạo chiến lược (1939 - 1941)",
    shortLabel: "1939 - 1941",
    chapter: "Chương 1",
    period: "1939 - 1941",
    root: {
      id: "turn",
      label: "Chuyển hướng chiến lược 1939 - 1941",
      note: "Đặt nhiệm vụ giải phóng dân tộc lên hàng trước tiên và tối cao.",
      children: [
        {
          id: "tw6",
          label: "Hội nghị TW 6 (11/1939)",
          note: "Họp tại Bà Điểm (Hóc Môn, Gia Định) do Nguyễn Văn Cừ chủ trì",
          children: [
            { id: "tw6a", label: "Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu", note: "Tạm gác lại khẩu hiệu cách mạng ruộng đất" },
            { id: "tw6b", label: "Thành lập Mặt trận Dân tộc thống nhất phản đế Đông Dương" },
            { id: "tw6c", label: "Chuyển phương thức từ công khai sang hoạt động bí mật, bất hợp pháp" }
          ]
        },
        {
          id: "tw7",
          label: "Hội nghị TW 7 (11/1940)",
          note: "Họp tại Đình Bảng (Từ Sơn, Bắc Ninh) do Trường Chinh chủ trì",
          children: [
            { id: "tw7a", label: "Xác định kẻ thù trước mắt: Cả thực dân Pháp và phát xít Nhật" },
            { id: "tw7b", label: "Duy trì và phát triển Đội du kích Bắc Sơn, chuẩn bị vũ trang khởi nghĩa" }
          ]
        },
        {
          id: "tw8",
          label: "Hội nghị TW 8 (5/1941)",
          note: "Do Nguyễn Ái Quốc chủ trì tại Pác Bó (Cao Bằng)",
          children: [
            { id: "tw8a", label: "Hoàn chỉnh chuyển hướng chiến lược, giải quyết vấn đề dân tộc trong khuôn khổ từng nước" },
            { id: "tw8b", label: "Thành lập Việt Nam Độc lập Đồng minh (Mặt trận Việt Minh, 19/5/1941)" },
            { id: "tw8c", label: "Xác định khởi nghĩa vũ trang là nhiệm vụ trung tâm, đi từ khởi nghĩa từng phần lên tổng khởi nghĩa" }
          ]
        },
        {
          id: "res",
          label: "Kết quả và Ý nghĩa",
          children: [
            { id: "resa", label: "Đưa nhiệm vụ giải phóng dân tộc lên đỉnh cao, hiệu triệu toàn thể quốc dân" },
            { id: "resb", label: "Chuẩn bị trực tiếp lực lượng chính trị và vũ trang cho Tổng khởi nghĩa Tháng Tám 1945" }
          ]
        }
      ]
    }
  },

  // 4. CHƯƠNG 1: CÁCH MẠNG THÁNG TÁM 1945
  {
    id: "ch1-august",
    title: "Tổng khởi nghĩa Cách mạng Tháng Tám năm 1945",
    shortLabel: "CM Tháng 8",
    chapter: "Chương 1",
    period: "1945",
    root: {
      id: "aug",
      label: "Cách mạng Tháng Tám năm 1945",
      note: "Nghệ thuật chớp thời cơ ngàn năm có một giành chính quyền toàn quốc",
      children: [
        {
          id: "aug-tc",
          label: "Thời cơ lịch sử",
          note: "Khoảng thời gian vàng từ 15/8 đến đầu tháng 9/1945",
          children: [
            { id: "aug-tc1", label: "Phát xít Nhật đầu hàng Đồng minh vô điều kiện (15/8/1945)" },
            { id: "aug-tc2", label: "Chính quyền bù nhìn tay sai thân Nhật hoang mang tột độ" },
            { id: "aug-tc3", label: "Quân Đồng minh (Anh, Tưởng) chưa kịp vào Đông Dương giải giáp quân đội Nhật" }
          ]
        },
        {
          id: "aug-qd",
          label: "Quyết định của Đảng",
          note: "Kịp thời lãnh đạo nhân dân đứng lên khởi nghĩa",
          children: [
            { id: "aug-qd1", label: "Hội nghị Toàn quốc của Đảng (13 - 15/8/1945): Ra Quân lệnh số 1 phát động Tổng khởi nghĩa" },
            { id: "aug-qd2", label: "Đại hội Quốc dân Tân Trào (16 - 17/8/1945): Tán thành khởi nghĩa, lập Ủy ban Dân tộc Giải phóng do Hồ Chí Minh làm Chủ tịch" }
          ]
        },
        {
          id: "aug-db",
          label: "Diễn biến thần tốc",
          note: "Thắng lợi trọn vẹn trong vòng 15 ngày trên cả nước",
          children: [
            { id: "aug-db1", label: "18/8/1945: 4 tỉnh giành chính quyền sớm nhất (Bắc Giang, Hải Dương, Hà Tĩnh, Quảng Nam)" },
            { id: "aug-db2", label: "19/8/1945: Giành chính quyền thắng lợi rực rỡ tại Thủ đô Hà Nội" },
            { id: "aug-db3", label: "23/8/1945: Khởi nghĩa thắng lợi tại Huế; vua Bảo Đại tuyên bố thoái vị (25/8)" },
            { id: "aug-db4", label: "25/8/1945: Giành chính quyền thắng lợi tại Sài Gòn" },
            { id: "aug-db5", label: "28/8/1945: Đồng Nai Thượng và Hà Tiên là 2 tỉnh cuối cùng giành chính quyền" }
          ]
        },
        {
          id: "aug-yn",
          label: "Khai sinh nước VNDCCH (2/9/1945)",
          note: "Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập",
          children: [
            { id: "aug-yn1", label: "Đập tan ách thống trị thực dân hơn 80 năm và lật đổ ngai vàng phong kiến nghìn năm" },
            { id: "aug-yn2", label: "Khai sinh nước Việt Nam Dân chủ Cộng hòa - Nhà nước công nông đầu tiên ở Đông Nam Á" },
            { id: "aug-yn3", label: "Mở ra kỷ nguyên mới: Kỷ nguyên độc lập, tự do và đi lên Chủ nghĩa xã hội" }
          ]
        }
      ]
    }
  },

  // 5. CHƯƠNG 2: KHÁNG CHIẾN CHỐNG PHÁP (1945 - 1954)
  {
    id: "ch2-france",
    title: "Kháng chiến chống thực dân Pháp (1945 - 1954)",
    shortLabel: "1945 - 1954",
    chapter: "Chương 2",
    period: "1945 - 1954",
    root: {
      id: "fr",
      label: "Kháng chiến chống thực dân Pháp (1945 - 1954)",
      note: "Bảo vệ chính quyền cách mạng và chiến thắng Điện Biên Phủ lịch sử",
      children: [
        {
          id: "fr-45",
          label: "Bảo vệ chính quyền non trẻ (1945 - 1946)",
          note: "Thế 'ngàn cân treo sợi tóc', giặc đói, giặc dốt, giặc ngoại xâm",
          children:
            [
              { id: "fr-45a", label: "Diệt giặc đói (hũ gạo cứu đói, tăng gia sản xuất) & Diệt giặc dốt (Bình dân học vụ)" },
              { id: "fr-45b", label: "Tổng tuyển cử bầu Quốc hội khóa I (6/1/1946) và ban hành Hiến pháp 1946" },
              { id: "fr-45c", label: "Sách lược hòa hoãn mềm dẻo: Hòa Tưởng gạt Pháp, sau đó Hòa Pháp đuổi Tưởng (Hiệp định Sơ bộ 6/3, Tạm ước 14/9)" }
            ]
        },
        {
          id: "fr-dl",
          label: "Đường lối kháng chiến toàn quốc (12/1946)",
          note: "Lời kêu gọi toàn quốc kháng chiến (19/12/1946)",
          children: [
            { id: "fr-dl1", label: "Kháng chiến toàn dân: Ai có súng dùng súng, ai có gươm dùng gươm" },
            { id: "fr-dl2", label: "Kháng chiến toàn diện: Quân sự, chính trị, kinh tế, văn hóa và ngoại giao" },
            { id: "fr-dl3", label: "Kháng chiến trường kỳ: Đánh lâu dài để chuyển hóa so sánh lực lượng" },
            { id: "fr-dl4", label: "Tự lực cánh sinh: Dựa vào sức mình là chính, kết hợp tranh thủ ủng hộ quốc tế" }
          ]
        },
        {
          id: "fr-cd",
          label: "Ba chiến dịch bước ngoặt",
          note: "Chuyển từ phòng ngự sang thế chủ động tiến công",
          children: [
            { id: "fr-cd1", label: "Việt Bắc Thu - Đông 1947: Đánh bại chiến lược đánh nhanh thắng nhanh của Pháp" },
            { id: "fr-cd2", label: "Biên Giới Thu - Đông 1950: Khai thông biên giới, giành quyền chủ động chiến lược ở Bắc Bộ" },
            { id: "fr-cd3", label: "Điện Biên Phủ 1954: 56 ngày đêm tiêu diệt tập đoàn cứ điểm, làm nên chiến thắng lừng lẫy năm châu" }
          ]
        },
        {
          id: "fr-kt",
          label: "Hiệp định Giơnevơ (21/7/1954)",
          note: "Kết thúc thắng lợi 9 năm kháng chiến trường kỳ",
          children: [
            { id: "fr-kt1", label: "Pháp công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của 3 nước Đông Dương" },
            { id: "fr-kt2", label: "Miền Bắc hoàn toàn giải phóng, bắt tay vào thời kỳ quá độ xây dựng CNXH" }
          ]
        }
      ]
    }
  },

  // 6. CHƯƠNG 2: CHIẾN LƯỢC CÁCH MẠNG HAI MIỀN (1954 - 1975)
  {
    id: "ch2-tworegions",
    title: "Đường lối chiến lược cách mạng hai miền (Đại hội III - 1960)",
    shortLabel: "1954 - 1975",
    chapter: "Chương 2",
    period: "1954 - 1975",
    root: {
      id: "tr",
      label: "Chiến lược cách mạng hai miền (1954 - 1975)",
      note: "Một Đảng lãnh đạo đồng thời hai nhiệm vụ chiến lược ở hai miền",
      children: [
        {
          id: "tr-bc",
          label: "Đặc điểm đất nước tạm thời bị chia cắt",
          children: [
            { id: "tr-bc1", label: "Miền Bắc hoàn toàn giải phóng, bước vào thời kỳ quá độ đi lên CNXH" },
            { id: "tr-bc2", label: "Miền Nam bị đế quốc Mỹ biến thành thuộc địa kiểu mới và căn cứ quân sự" }
          ]
        },
        {
          id: "tr-dh3",
          label: "Nội dung đường lối (Đại hội III - 9/1960)",
          note: "Xác định rõ vị trí, nhiệm vụ chiến lược của từng miền",
          children: [
            { id: "tr-dh1", label: "Miền Bắc: Cách mạng XHCN, xây dựng cơ sở vật chất, giữ vai trò hậu phương lớn" },
            { id: "tr-dh2", label: "Miền Nam: Cách mạng dân tộc dân chủ nhân dân, giải phóng miền Nam, tiền tuyến lớn" }
          ]
        },
        {
          id: "tr-vt",
          label: "Vị trí & Vai trò của từng miền",
          note: "Nguyên tắc then chốt trong giáo trình Lịch sử Đảng",
          children: [
            { id: "tr-vt1", label: "Miền Bắc giữ vai trò QUYẾT ĐỊNH NHẤT đối với toàn bộ sự nghiệp cách mạng cả nước" },
            { id: "tr-vt2", label: "Miền Nam giữ vai trò QUYẾT ĐỊNH TRỰC TIẾP đối với sự nghiệp giải phóng miền Nam, thống nhất Tổ quốc" }
          ]
        },
        {
          id: "tr-qh",
          label: "Mối quan hệ mật thiết giữa hai miền",
          children: [
            { id: "tr-qh1", label: "Cùng hướng về một mục tiêu chung: Hoàn thành độc lập dân tộc và thống nhất non sông" },
            { id: "tr-qh2", label: "Hậu phương lớn miền Bắc chi viện tối đa sức người, sức của cho tiền tuyến lớn miền Nam (đường Hồ Chí Minh)" }
          ]
        }
      ]
    }
  },

  // 7. CHƯƠNG 2: ĐÁNH BẠI 4 CHIẾN LƯỢC CHIẾN TRANH CỦA MỸ (1954 - 1975)
  {
    id: "ch2-wars",
    title: "Đánh bại 4 chiến lược chiến tranh của Mỹ (1954 - 1975)",
    shortLabel: "4 Chiến lược Mỹ",
    chapter: "Chương 2",
    period: "1954 - 1975",
    root: {
      id: "war",
      label: "Đánh bại 4 chiến lược chiến tranh của Mỹ",
      note: "Tiến trình từng bước bẻ gãy ý chí xâm lược của đế quốc Mỹ",
      children: [
        {
          id: "war-1",
          label: "1. Chiến tranh đơn phương (1954 - 1960)",
          note: "Mỹ - Diệm thực hiện Luật 10/59, tố cộng diệt cộng đẫm máu",
          children:
            [
              { id: "war-1a", label: "Nghị quyết TW 15 (1/1959): Kết hợp đấu tranh chính trị với đấu tranh vũ trang" },
              { id: "war-1b", label: "Thắng lợi quyết định: Phong trào Đồng Khởi Bến Tre (1960), chuyển từ thế giữ gìn lực lượng sang thế tiến công" }
            ]
        },
        {
          id: "war-2",
          label: "2. Chiến tranh đặc biệt (1961 - 1965)",
          note: "Quân đội Sài Gòn + Cố vấn, vũ khí Mỹ + Ấp chiến lược",
          children: [
            { id: "war-2a", label: "Chiến thuật: Trực thăng vận, thiết xa vận; dồn dân lập ấp chiến lược làm quốc sách" },
            { id: "war-2b", label: "Thắng lợi quân sự: Ấp Bắc (1/1963), Bình Giã, Ba Gia, Đồng Xoài (1965) làm sụp đổ hoàn toàn chiến lược" }
          ]
        },
        {
          id: "war-3",
          label: "3. Chiến tranh cục bộ (1965 - 1968)",
          note: "Đưa trực tiếp quân viễn chinh Mỹ và chư hầu vào miền Nam, đánh phá miền Bắc",
          children: [
            { id: "war-3a", label: "Chiến thắng Vạn Tường (8/1965): Khẳng định quân và dân ta hoàn toàn có thể đánh Mỹ và thắng Mỹ" },
            { id: "war-3b", label: "Đánh bại 2 cuộc phản công chiến lược mùa khô (1965 - 1966 và 1966 - 1967)" },
            { id: "war-3c", label: "Tổng tiến công và nổi dậy Tết Mậu Thân 1968: Làm lung lay ý chí xâm lược của giới cầm quyền Mỹ" }
          ]
        },
        {
          id: "war-4",
          label: "4. Việt Nam hóa chiến tranh (1969 - 1973)",
          note: "Dùng người Việt đánh người Việt, mở rộng chiến tranh sang Lào và Campuchia",
          children: [
            { id: "war-4a", label: "Đánh bại cuộc tập kích chiến lược B-52 ('Điện Biên Phủ trên không' 12/1972)" },
            { id: "war-4b", label: "Hiệp định Paris (27/1/1973): Buộc Mỹ rút quân, tạo thế và lực mới để 'đánh cho ngụy nhào'" }
          ]
        },
        {
          id: "war-5",
          label: "Đại thắng mùa Xuân 1975",
          note: "Chiến dịch Hồ Chí Minh lịch sử giải phóng hoàn toàn miền Nam",
          children: [
            { id: "war-5a", label: "Chiến dịch Tây Nguyên (4/3 - 24/3/1975): Mở màn đột phá, giải phóng Buôn Ma Thuột" },
            { id: "war-5b", label: "Chiến dịch Huế - Đà Nẵng (19/3 - 29/3/1975): Đập tan tuyến phòng thủ miền Trung" },
            { id: "war-5c", label: "Chiến dịch Hồ Chí Minh (26/4 - 30/4/1975): Trưa 30/4 giải phóng Sài Gòn, thống nhất đất nước" }
          ]
        }
      ]
    }
  },

  // 8. CHƯƠNG 3: BƯỚC ĐỘT PHÁ ĐỔI MỚI KINH TẾ (1979 - 1986)
  {
    id: "doimoi",
    title: "Tìm tòi đổi mới kinh tế (1979 - 1986)",
    shortLabel: "1979 - 1986",
    chapter: "Chương 3",
    period: "1979 - 1986",
    root: {
      id: "doimoi",
      label: "Đường tới Đổi mới (1979 - 1986)",
      note: "Từ tháo gỡ cục bộ đến hình thành đường lối đổi mới toàn diện.",
      children: [
        {
          id: "d79",
          label: "Hội nghị TW 6 khóa IV (8/1979)",
          children: [
            { id: "d79a", label: "Bước đột phá đầu tiên: Cho sản xuất 'bung ra', tháo gỡ cơ chế cũ" },
            { id: "d79b", label: "Khắc phục trì trệ, khuyến khích phát triển sản xuất nông nghiệp và tiểu thủ công nghiệp" }
          ]
        },
        {
          id: "d81",
          label: "Những bước đột phá năm 1981",
          children: [
            { id: "d81a", label: "Chỉ thị 100-CT/TW (1/1981 - Khoán 100)", note: "Khoán sản phẩm cuối cùng đến nhóm lao động và người lao động trong nông nghiệp" },
            { id: "d81b", label: "Quyết định 25-CP (1/1981)", note: "Quyền chủ động sản xuất, kinh doanh của xí nghiệp quốc doanh (kế hoạch 3 phần)" }
          ]
        },
        {
          id: "d85",
          label: "Hội nghị TW 8 khóa V (6/1985)",
          children: [
            { id: "d85a", label: "Đột phá về giá - lương - tiền", note: "Xóa bỏ quan liêu bao cấp, chuyển sang hạch toán kinh tế kinh doanh XHCN" }
          ]
        },
        {
          id: "d86",
          label: "Đại hội VI (12/1986)",
          children: [
            { id: "d86a", label: "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật" },
            { id: "d86b", label: "Khởi xướng Đổi mới toàn diện đất nước, trước hết là đổi mới tư duy kinh tế" }
          ]
        }
      ]
    }
  },

  // 9. CHƯƠNG 3: ĐƯỜNG LỐI ĐỔI MỚI ĐẠI HỘI VI (1986)
  {
    id: "ch3-congress6",
    title: "Đường lối Đổi mới toàn diện tại Đại hội VI (1986)",
    shortLabel: "Đại hội VI (1986)",
    chapter: "Chương 3",
    period: "1986",
    root: {
      id: "c6",
      label: "Đường lối Đổi mới toàn diện (Đại hội VI - 1986)",
      note: "Đại hội bước ngoặt lịch sử mở ra kỷ nguyên phát triển mới",
      children: [
        {
          id: "c6-bc",
          label: "Bối cảnh & Tinh thần đổi mới",
          children: [
            { id: "c6-bc1", label: "Đất nước khủng hoảng kinh tế - xã hội trầm trọng, lạm phát phi mã 774.7%" },
            { id: "c6-bc2", label: "Phương châm: Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật" }
          ]
        },
        {
          id: "c6-kt",
          label: "Đổi mới tư duy kinh tế",
          note: "Trọng tâm cốt lõi của công cuộc Đổi mới",
          children: [
            { id: "c6-kt1", label: "Ba chương trình kinh tế lớn: Lương thực - thực phẩm, Hàng tiêu dùng, Hàng xuất khẩu" },
            { id: "c6-kt2", label: "Thừa nhận và phát triển nền kinh tế nhiều thành phần (quốc doanh, tập thể, cá thể, tư nhân)" },
            { id: "c6-kt3", label: "Xóa bỏ cơ chế bao cấp, vận hành theo cơ chế thị trường có sự quản lý của Nhà nước" }
          ]
        },
        {
          id: "c6-xh",
          label: "Đổi mới chính sách xã hội & con người",
          children: [
            { id: "c6-xh1", label: "Đặt yếu tố con người vào vị trí trung tâm của mọi chính sách phát triển" },
            { id: "c6-xh2", label: "Tạo công ăn việc làm, thực hiện công bằng xã hội và bảo đảm an sinh" }
          ]
        },
        {
          id: "c6-dn",
          label: "Đổi mới đối ngoại & Quốc phòng",
          children: [
            { id: "c6-dn1", label: "Mở rộng quan hệ hợp tác quốc tế, tranh thủ hòa bình để xây dựng đất nước" },
            { id: "c6-dn2", label: "Kết hợp sức mạnh dân tộc với sức mạnh thời đại trong bối cảnh quốc tế mới" }
          ]
        }
      ]
    }
  },

  // 10. CHƯƠNG 3: CƯƠNG LĨNH XÂY DỰNG ĐẤT NƯỚC THỜI KỲ QUÁ ĐỘ (1991 - 2011)
  {
    id: "ch3-cuonglinh",
    title: "Cương lĩnh xây dựng đất nước thời kỳ quá độ (1991 - 2011)",
    shortLabel: "Cương lĩnh QĐ",
    chapter: "Chương 3",
    period: "1991 - 2011",
    root: {
      id: "cl",
      label: "Cương lĩnh thời kỳ quá độ lên CNXH",
      note: "Ngọn cờ lý luận dẫn dắt công cuộc xây dựng và bảo vệ Tổ quốc XHCN",
      children: [
        {
          id: "cl-mt",
          label: "Mục tiêu tổng quát",
          note: "Đích đến của toàn bộ tiến trình cách mạng",
          children: [
            { id: "cl-mt1", label: "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh" },
            { id: "cl-mt2", label: "Xây dựng cơ sở vật chất - kỹ thuật hiện đại của CNXH" }
          ]
        },
        {
          id: "cl-dt",
          label: "8 đặc trưng xã hội XHCN (Cương lĩnh 2011)",
          note: "Mô hình CNXH mà nhân dân ta xây dựng",
          children: [
            { id: "cl-dt1", label: "1. Dân giàu, nước mạnh, dân chủ, công bằng, văn minh" },
            { id: "cl-dt2", label: "2. Do nhân dân làm chủ" },
            { id: "cl-dt3", label: "3. Kinh tế phát triển cao dựa trên LLSX hiện đại và QHSX tiến bộ phù hợp" },
            { id: "cl-dt4", label: "4. Nền văn hóa tiên tiến, đậm đà bản sắc dân tộc" },
            { id: "cl-dt5", label: "5. Con người có cuộc sống ấm no, tự do, hạnh phúc, phát triển toàn diện" },
            { id: "cl-dt6", label: "6. Các dân tộc trong cộng đồng Việt Nam bình đẳng, đoàn kết, giúp nhau cùng phát triển" },
            { id: "cl-dt7", label: "7. Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân dưới sự lãnh đạo của Đảng" },
            { id: "cl-dt8", label: "8. Có quan hệ hữu nghị và hợp tác với các nước trên thế giới" }
          ]
        },
        {
          id: "cl-ph",
          label: "8 phương hướng cơ bản",
          note: "Các giải pháp chiến lược thực hiện mục tiêu",
          children: [
            { id: "cl-ph1", label: "Đẩy mạnh CNH, HĐH gắn với kinh tế tri thức và bảo vệ tài nguyên môi trường" },
            { id: "cl-ph2", label: "Phát triển nền kinh tế thị trường định hướng XHCN" },
            { id: "cl-ph3", label: "Xây dựng nền văn hóa tiên tiến; nâng cao đời sống nhân dân, thực hiện công bằng XH" },
            { id: "cl-ph4", label: "Bảo đảm vững chắc quốc phòng và an ninh quốc gia, trật tự an toàn xã hội" },
            { id: "cl-ph5", label: "Thực hiện đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển" },
            { id: "cl-ph6", label: "Xây dựng nền dân chủ XHCN; củng cố và mở rộng khối đại đoàn kết toàn dân tộc" },
            { id: "cl-ph7", label: "Xây dựng Nhà nước pháp quyền XHCN trong sạch, vững mạnh" },
            { id: "cl-ph8", label: "Xây dựng Đảng trong sạch, vững mạnh - then chốt của then chốt" }
          ]
        }
      ]
    }
  }
];
