import { Offcanvas } from "react-bootstrap";
import { navBarList, socket } from "../../utils/constant";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Avatar, Badge } from "antd";
import NotifiList from "./NotifiList";
import { NotiContext } from "../../contexts/notiContext";
import { useTasksiteContext } from "../../contexts/tasksiteContext";
interface Props {}

const Navbar: React.FC<Props> = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const { authState, updateProfile } = useContext(AuthContext);

  const account = authState.account;

  const { isShowNoti, setIsShowNoti } = useContext(NotiContext);
  const { resetData } = useTasksiteContext();
  const [showFeature, setShowFeature] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        showFeature &&
        selectRef.current &&
        !selectRef.current?.contains(event.target as Node | null)
      ) {
        setShowFeature(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showFeature]);
  const handleclick = () => {
    setShowFeature(false);
  };

  useEffect(() => {
    socket.on(`onNoti-user${account.id}`, (data) => {});

    return () => {
      socket.removeListener("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`header d-grid`}>
      <div className="icon-menu d-flex">
        <i className="bi bi-list" onClick={() => setShowNavbar(true)}></i>
      </div>
      <div className="nav-bar-name d-flex">Task Site</div>
      <div className="nav-noti d-flex">
        <Badge
          overflowCount={10}
          dot={!account.isReadNotification}
          size={"default"}
        >
          <i
            className="bi bi-bell"
            onClick={() => {
              setIsShowNoti(!isShowNoti);
              if (!isShowNoti) {
                updateProfile({ isReadNotification: true });
              }
            }}
            style={{ fontSize: 30 }}
          ></i>
        </Badge>

        {isShowNoti && (
          <div
            className="position-absolute nav-noti-details"
            style={{ zIndex: 99 }}
          >
            <NotifiList />
          </div>
        )}
      </div>
      <div className="avatar-nav d-flex position-relative">
        <Avatar
          src={account.photoURL || ""}
          icon={!account.photoURL && <i className="bi bi-person"></i>}
          size={40}
          onClick={() => setShowFeature(!showFeature)}
        />
        <div
          className={`avatar-feature d-grid position-absolute ${
            showFeature || "d-none"
          }`}
          ref={selectRef}
        >
          <div className="details d-grid">
            <Avatar
              src={account.photoURL || ""}
              icon={!account.photoURL && <i className="bi bi-person"></i>}
              className="avatar-details"
            />
            <span>{account.name}</span>
          </div>
          <Link className="item" to={"/profile"} onClick={handleclick}>
            Thông tin cá nhân
          </Link>
          <div className="item">Tin nhắn</div>
          <div className="item">Thông báo</div>
          <div
            className="item"
            onClick={() => {
              resetData();
              logOut();
            }}
          >
            Đăng xuất
          </div>
        </div>
      </div>
      <Offcanvas
        className="header-canvas"
        show={showNavbar}
        onHide={() => setShowNavbar(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="header-navbar">Task Site</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <table className="nav-bar">
            {navBarList.map((item, index) => {
              return (
                (item.role === "COMMON" || item.role === account.role) && (
                  <tr key={index} className="nav-bar-item">
                    <th className="nav-bar-icon">
                      <i className={`${item.icon}`} />
                    </th>
                    <th className="nav-bar-name">
                      <Link
                        to={
                          account.role === "EMPLOYEE"
                            ? item.employeePath
                            : item.userPath
                        }
                        onClick={() => setShowNavbar(false)}
                      >
                        {account.role === "EMPLOYEE"
                          ? item.employeeName
                          : item.userName}
                      </Link>
                    </th>
                  </tr>
                )
              );
            })}
          </table>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default Navbar;
