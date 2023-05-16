export const apiURL = "http://localhost:3000";
export const LOCAL_STORAGE_TOKEN_NAME = "LOCAL_TOKEN";

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
