export interface MindNode {
  id: string;
  label: string;
  note?: string;
  children?: MindNode[];
}

export const MINDMAPS: { id: string; title: string; root: MindNode }[] = [
  {
    id: "turn",
    title: "Chuyển hướng chỉ đạo chiến lược (1939 - 1941)",
    root: {
      id: "turn",
      label: "Chuyển hướng chiến lược 1939 - 1941",
      note: "Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.",
      children: [
        {
          id: "tw6", label: "Hội nghị TW 6 (11/1939)",
          children: [
            { id: "tw6a", label: "Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu" },
            { id: "tw6b", label: "Thành lập Mặt trận Dân tộc thống nhất phản đế Đông Dương" }
          ]
        },
        {
          id: "tw7", label: "Hội nghị TW 7 (11/1940)",
          children: [{ id: "tw7a", label: "Tiếp tục chuẩn bị khởi nghĩa vũ trang" }]
        },
        {
          id: "tw8", label: "Hội nghị TW 8 (5/1941)",
          note: "Do Nguyễn Ái Quốc chủ trì tại Pác Bó (Cao Bằng).",
          children: [
            { id: "tw8a", label: "Hoàn chỉnh chuyển hướng chiến lược" },
            { id: "tw8b", label: "Thành lập Việt Minh (19/5/1941)" }
          ]
        },
        { id: "res", label: "Kết quả", children: [{ id: "resa", label: "Chuẩn bị lực lượng cho Tổng khởi nghĩa Tháng Tám 1945" }] }
      ]
    }
  },
  {
    id: "doimoi",
    title: "Tìm tòi đổi mới kinh tế (1979 - 1986)",
    root: {
      id: "doimoi",
      label: "Đường tới Đổi mới (1979 - 1986)",
      note: "Từ tháo gỡ cục bộ đến đổi mới toàn diện.",
      children: [
        { id: "d79", label: "Hội nghị TW 6 khóa IV (8/1979)", children: [{ id: "d79a", label: "Bước đầu tháo gỡ các vướng mắc của cơ chế cũ" }] },
        {
          id: "d81", label: "Năm 1981",
          children: [
            { id: "d81a", label: "Chỉ thị 100-CT/TW (khoán 100)", note: "Khoán sản phẩm đến nhóm lao động và người lao động trong nông nghiệp." },
            { id: "d81b", label: "Quyết định 25-CP", note: "Quyền chủ động sản xuất, kinh doanh của xí nghiệp quốc doanh." }
          ]
        },
        { id: "d85", label: "Hội nghị TW 8 khóa V (6/1985)", children: [{ id: "d85a", label: "Về giá - lương - tiền" }] },
        {
          id: "d86", label: "Đại hội VI (12/1986)",
          children: [
            { id: "d86a", label: "Khởi xướng Đổi mới toàn diện" },
            { id: "d86b", label: "Nhìn thẳng vào sự thật" }
          ]
        }
      ]
    }
  }
];
