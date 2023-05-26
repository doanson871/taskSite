import { io } from "socket.io-client";

export const apiURL = "http://localhost:3000";
export const LOCAL_STORAGE_TOKEN_NAME = "LOCAL_TOKEN";
export const socket = io(apiURL, {
  autoConnect: false,
});

export interface AccountType {
  id: number;
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photoUrl: string;
  role: string;
  createAt: Date;
  updateAt: Date;
  description: string | null;
}

export const initialRole = [
  { name: "Người tìm việc", role: "EMPLOYEE" },
  { name: "Người tuyển dụng", role: "USER" },
];

export const initialGender = ["Không xác định", "Nam", "Nữ"];

export const navBarList = [
  {
    id: 1,
    bossName: "Đăng bài",
    employeeName: "Đăng bài",
    path: "/post",
    icon: "bi bi-postcard",
  },
  {
    id: 2,
    bossName: "Công việc có sẵn",
    employeeName: "Công việc đang tuyển",
    path: "/joblist",
    icon: "bi bi-person-workspace",
  },
  {
    id: 3,
    bossName: "Tin nhắn",
    employeeName: "Tin nhắn",
    path: "/message",
    icon: "bi bi-messenger",
  },
  {
    id: 4,
    bossName: "Thông báo",
    employeeName: "Thông báo",
    path: "/notify",
    icon: "bi bi-bell",
  },
  {
    id: 5,
    bossName: "Thông tin cá nhân",
    employeeName: "Thông tin cá nhân",
    path: "/profile",
    icon: "bi bi-person-circle",
  },
];
export const getDOB = (dateTest: string) => {
  if (!dateTest) return dateTest;

  const date = new Date(dateTest);
  // console.log(date);
  const day =
    date.getDate().toString().length === 2
      ? date.getDate()
      : `0${date.getDate()}`;
  const month =
    (date.getMonth() + 1).toString().length === 2
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
};

export const compare = (a: string, b: string) => {
  const date1 = new Date(a);
  const date2 = new Date(b);

  if (date1.getTime() < date2.getTime()) {
    return 1;
  } else return -1;
};
export const listAddress = [
  {
    city: "Hà Nội",
    district: [
      "Ba Đình",
      "Hoàn Kiếm",
      "Tây Hồ",
      "Cầu Giấy",
      "Đống Đa",
      "Hai Bà Trưng",
      "Thanh Xuân",
      "Hoàng Mai",
      "Long Biên",
    ],
  },
  {
    city: "Hồ Chí Minh",
    district: [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Bình Thạnh",
      "Gò Vấp",
      "Phú Nhuận",
      "Tân Bình",
      "Tân Phú",
      "Thủ Đức",
    ],
  },
  {
    city: "Đà Nẵng",
    district: [
      "Hải Châu",
      "Thanh Khê",
      "Sơn Trà",
      "Ngũ Hành Sơn",
      "Liên Chiểu",
      "Cẩm Lệ",
      "Hòa Vang",
    ],
  },
  {
    city: "Hải Phòng",
    district: [
      "Hồng Bàng",
      "Lê Chân",
      "Ngô Quyền",
      "Kiến An",
      "Hải An",
      "Đồ Sơn",
      "Dương Kinh",
      "Thuỷ Nguyên",
      "An Dương",
      "An Lão",
      "Vĩnh Bảo",
      "Cát Hải",
    ],
  },
  {
    city: "Cần Thơ",
    district: ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"],
  },
  {
    city: "Đà Lạt",
    district: [
      "Đà Lạt",
      "Hòa Bình",
      "Lộc Thắng",
      "Bảo Lộc",
      "Đam Rông",
      "Di Linh",
      "Đơn Dương",
      "Lạc Dương",
      "Đức Trọng",
    ],
  },
  {
    city: "Huế",
    district: [
      "Huế",
      "Phú Vang",
      "Hương Thủy",
      "Hương Trà",
      "Phú Lộc",
      "Nam Đông",
      "A Lưới",
    ],
  },
  {
    city: "Nha Trang",
    district: ["Nha Trang", "Cam Ranh", "Ninh Hòa", "Khánh Vĩnh", "Diên Khánh"],
  },
  {
    city: "Hội An",
    district: [
      "Hội An",
      "Duy Xuyên",
      "Điện Bàn",
      "Quế Sơn",
      "Tam Kỳ",
      "Núi Thành",
    ],
  },
  {
    city: "Đà Nẵng",
    district: [
      "Hải Châu",
      "Thanh Khê",
      "Sơn Trà",
      "Ngũ Hành Sơn",
      "Liên Chiểu",
      "Cẩm Lệ",
      "Hòa Vang",
    ],
  },
  {
    city: "Phan Thiết",
    district: [
      "Phan Thiết",
      "La Gi",
      "Tuy Phong",
      "Bắc Bình",
      "Hàm Thuận Bắc",
      "Hàm Thuận Nam",
      "Tánh Linh",
      "Đức Linh",
      "Hàm Tân",
      "Phú Quý",
    ],
  },
  {
    city: "Vũng Tàu",
    district: [
      "Vũng Tàu",
      "Bà Rịa",
      "Châu Đức",
      "Xuyên Mộc",
      "Long Điền",
      "Đất Đỏ",
    ],
  },
  {
    city: "Quy Nhơn",
    district: [
      "Quy Nhơn",
      "An Lão",
      "Hoài Nhơn",
      "Hoài Ân",
      "Phù Mỹ",
      "Tuy Phước",
      "Vân Canh",
      "An Nhơn",
      "Tây Sơn",
    ],
  },
  {
    city: "Buôn Ma Thuột",
    district: [
      "Buôn Ma Thuột",
      "Buôn Hồ",
      "Krông Buk",
      "Krông Năng",
      "Krông Pắc",
      "Ea Kar",
      "Ea Súp",
      "Cư M'gar",
      "Krông Ana",
      "Krông Bông",
      "Krông Búk",
      "Krông Nô",
      "Ea H'leo",
      "Ea Súp",
    ],
  },
  {
    city: "Long Xuyên",
    district: [
      "Long Xuyên",
      "Châu Đốc",
      "An Phú",
      "Tân Châu",
      "Phú Tân",
      "Châu Phú",
      "Thoại Sơn",
    ],
  },
  {
    city: "Rạch Giá",
    district: [
      "Rạch Giá",
      "Hà Tiên",
      "Kiên Lương",
      "Hòn Đất",
      "Gò Quao",
      "An Biên",
      "An Minh",
      "Vĩnh Thuận",
      "Phú Quốc",
      "Kiên Hải",
      "U Minh Thượng",
      "Giồng Riềng",
      "Tân Hiệp",
    ],
  },
  {
    city: "Cà Mau",
    district: [
      "Cà Mau",
      "U Minh",
      "Thới Bình",
      "Trần Văn Thời",
      "Cái Nước",
      "Đầm Dơi",
      "Ngọc Hiển",
    ],
  },
  {
    city: "Bắc Giang",
    district: [
      "Bắc Giang",
      "Yên Thế",
      "Tân Yên",
      "Lạng Giang",
      "Lục Nam",
      "Lục Ngạn",
      "Sơn Động",
      "Yên Dũng",
      "Việt Yên",
      "Hiệp Hòa",
      "Lạng Giang",
    ],
  },
  {
    city: "Bắc Ninh",
    district: [
      "Bắc Ninh",
      "Yên Phong",
      "Quế Võ",
      "Tiên Du",
      "Từ Sơn",
      "Thuận Thành",
      "Gia Bình",
      "Lương Tài",
    ],
  },
  {
    city: "Nam Định",
    district: [
      "Nam Định",
      "Mỹ Lộc",
      "Vụ Bản",
      "Ý Yên",
      "Nghĩa Hưng",
      "Nam Trực",
      "Trực Ninh",
      "Xuân Trường",
      "Giao Thủy",
      "Hải Hậu",
    ],
  },
  {
    city: "Vinh",
    district: [
      "Vinh",
      "Cửa Lò",
      "Thái Hoà",
      "Quế Phong",
      "Quỳ Châu",
      "Kỳ Sơn",
      "Tương Dương",
      "Nghĩa Đàn",
      "Quỳ Hợp",
      "Con Cuông",
      "Tân Kỳ",
      "Anh Sơn",
      "Diễn Châu",
      "Yên Thành",
      "Đô Lương",
      "Thanh Chương",
      "Nghi Lộc",
      "Nam Đàn",
      "Hưng Nguyên",
    ],
  },
  {
    city: "Ninh Bình",
    district: [
      "Ninh Bình",
      "Tam Điệp",
      "Nho Quan",
      "Gia Viễn",
      "Hoa Lư",
      "Yên Khánh",
      "Kim Sơn",
      "Yên Mô",
    ],
  },
  {
    city: "Thanh Hóa",
    district: [
      "Thanh Hóa",
      "Bỉm Sơn",
      "Sầm Sơn",
      "Mường Lát",
      "Quan Hóa",
      "Bá Thước",
      "Quan Sơn",
      "Lang Chánh",
      "Ngọc Lặc",
      "Cẩm Thủy",
      "Thạch Thành",
      "Hà Trung",
      "Vĩnh Lộc",
      "Yên Định",
      "Thọ Xuân",
      "Thường Xuân",
      "Triệu Sơn",
      "Nông Cống",
      "Đông Sơn",
      "Hậu Lộc",
      "Nga Sơn",
      "Như Xuân",
      "Như Thanh",
      "Nghi Sơn",
      "Hà Trung",
      "Vĩnh Lộc",
      "Yên Định",
      "Thọ Xuân",
      "Thường Xuân",
      "Triệu Sơn",
      "Nông Cống",
      "Đông Sơn",
      "Hậu Lộc",
      "Nga Sơn",
      "Như Xuân",
      "Như Thanh",
      "Nghi Sơn",
      "Hậu Lộc",
      "Hoằng Hóa",
      "Hậu Lộc",
      "Hậu Lộc",
      "Thiệu Hoá",
      "Thiệu Hóa",
      "Hoằng Hoá",
      "Hậu Lộc",
      "Hậu Lộc",
      "Vĩnh Long",
      "Hoằng Hóa",
    ],
  },
  {
    city: "Đồng Hới",
    district: [
      "Đồng Hới",
      "Minh Hoá",
      "Quảng Trạch",
      "Quảng Ninh",
      "Bố Trạch",
      "Lệ Thủy",
      "Tuyên Hóa",
      "Ba Đồn",
    ],
  },
  {
    city: "Quảng Ngãi",
    district: [
      "Quảng Ngãi",
      "Ba Tơ",
      "Bình Sơn",
      "Đức Phổ",
      "Lý Sơn",
      "Minh Long",
      "Mộ Đức",
      "Nghĩa Hành",
      "Sơn Hà",
      "Sơn Tây",
      "Sơn Tịnh",
      "Tây Trà",
      "Trà Bồng",
      "Tư Nghĩa",
      "Ngã Lâm",
      "Châu Thành",
    ],
  },
];
