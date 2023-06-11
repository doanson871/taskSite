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

// export const openNotification = () => {
//   api.open({
//     message: "Đăng bài thành công",
//     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
//   });
// };

export enum StatusApply {
  PROCESSING,
  ACCEPTED,
  REJECTED,
}

export var randomColor =
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const getDataTimeAnalysis = () => {
  const date = new Date();
  const month = date.getMonth() + 1;

  let newDate = new Date(
    date.setFullYear(date.getFullYear(), date.getMonth(), 0)
  );

  const list = [];

  for (let i = 0; i < 4; i++) {
    const x = new Date(newDate);
    list.push({
      totalCost: 0,
      breakTimePoint: new Date(x.setMonth(x.getMonth() - i)),
      name: `T${month - i}`,
    });
  }

  return list;
};

export const navBarList = [
  {
    id: 1,
    userName: "Đăng việc",
    employeeName: "Đăng bài",
    userPath: "/post",
    employeePath: "/employee/post",
    icon: "bi bi-postcard",
    role: "COMMON",
  },
  {
    id: 2,
    userName: "Nhân lực có sẵn",
    employeeName: "Tìm việc",
    userPath: "/availableWorks",
    employeePath: "/listPost",
    icon: "bi bi-person-workspace",
    role: "COMMON",
  },
  {
    id: 3,
    userName: "Tin nhắn",
    employeeName: "Tin nhắn",
    userPath: "/message",
    employeePath: "/message",
    icon: "bi bi-messenger",
    role: "COMMON",
  },
  {
    id: 4,
    userName: "Lịch sử tuyển dụng",
    employeeName: "Các đơn đã ứng tuyển",
    userPath: "/history",
    employeePath: "/history",
    icon: "bi bi-clock-history",
    role: "COMMON",
  },
  {
    id: 5,
    userName: "Hồ sơ cá nhân",
    employeeName: "Hồ sơ cá nhân",
    userPath: "/profile",
    employeePath: "/profile",
    icon: "bi bi-person-circle",
    role: "COMMON",
  },
  {
    id: 6,
    userName: "Thống kê",
    employeeName: "Thống kê",
    userPath: "/analysis",
    employeePath: "/analysis",
    icon: "bi bi-graph-up",
    role: "EMPLOYEE",
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
      "Quảng Nam",
      "Tam Kỳ",
      "Núi Thành",
    ],
  },
  {
    city: "Vũng Tàu",
    district: [
      "Bà Rịa",
      "Vũng Tàu",
      "Xuyên Mộc",
      "Long Điền",
      "Đất Đỏ",
      "Châu Đức",
    ],
  },
  {
    city: "Phan Thiết",
    district: [
      "Phan Thiết",
      "Tuy Phong",
      "Bắc Bình",
      "Hàm Thuận Bắc",
      "Hàm Thuận Nam",
      "Tánh Linh",
      "Đức Linh",
      "Hàm Tân",
      "Phú Quí",
    ],
  },
  {
    city: "Đồng Nai",
    district: [
      "Biên Hòa",
      "Long Khánh",
      "Trảng Bom",
      "Vĩnh Cửu",
      "Định Quán",
      "Thống Nhất",
      "Cẩm Mỹ",
      "Long Thành",
      "Xuân Lộc",
      "Nhơn Trạch",
    ],
  },
  {
    city: "Bình Dương",
    district: [
      "Thủ Dầu Một",
      "Bến Cát",
      "Dầu Tiếng",
      "Tân Uyên",
      "Thuận An",
      "Bắc Tân Uyên",
      "Lái Thiêu",
      "Dĩ An",
      "Phú Giáo",
    ],
  },
  {
    city: "Quy Nhơn",
    district: [
      "Quy Nhơn",
      "An Nhơn",
      "Hoài Nhơn",
      "Hoài Ân",
      "Phù Cát",
      "Tuy Phước",
      "Vân Canh",
      "An Lão",
      "Vĩnh Thạnh",
    ],
  },
  {
    city: "Buôn Ma Thuột",
    district: [
      "Buôn Ma Thuột",
      "Buôn Hồ",
      "Ea H'leo",
      "Ea Súp",
      "Krông Buk",
      "Krông Năng",
      "Ea Kar",
      "Cư M'gar",
      "Krông Bông",
      "Krông Pắc",
      "Krông A Na",
      "Lắk",
      "M'Đrắk",
    ],
  },
  {
    city: "Quảng Ngãi",
    district: [
      "Quảng Ngãi",
      "Lý Sơn",
      "Bình Sơn",
      "Trà Bồng",
      "Tư Nghĩa",
      "Sơn Tịnh",
      "Sơn Hà",
      "Sơn Tây",
      "Minh Long",
      "Nghĩa Hành",
      "Mộ Đức",
      "Đức Phổ",
      "Ba Tơ",
      "Sơn Tinh",
    ],
  },
  {
    city: "Thái Nguyên",
    district: [
      "Thái Nguyên",
      "Sông Công",
      "Định Hóa",
      "Phổ Yên",
      "Đại Từ",
      "Phú Lương",
      "Võ Nhai",
      "Đồng Hỷ",
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
      "Quỳnh Lưu",
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
      "Hoàng Mai",
    ],
  },
];
