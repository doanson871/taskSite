import { Offcanvas } from "react-bootstrap";
import { navBarList } from "../../utils/constant";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Avatar } from "antd";
interface Props {}

const Navbar: React.FC<Props> = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const {
    authState: { account },
  } = useContext(AuthContext);
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

  return (
    <div className={`header d-grid`}>
      <div className="icon-menu d-flex">
        <i className="bi bi-list" onClick={() => setShowNavbar(true)}></i>
      </div>
      <div className="nav-bar-name d-flex">Task Site</div>
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
          <div className="details d-flex">
            <Avatar
              src={account.photoURL || ""}
              icon={!account.photoURL && <i className="bi bi-person"></i>}
            />
            <span>{account.name}</span>
          </div>
          <Link className="item" to={"/profile"} onClick={handleclick}>
            Thông tin cá nhân
          </Link>
          <div className="item">Tin nhắn</div>
          <div className="item">Thông báo</div>
          <div className="item" onClick={() => logOut()}>
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
            {navBarList.map((item, index) => (
              <tr key={index} className="nav-bar-item">
                <th className="nav-bar-icon">
                  <i className={`${item.icon}`} />
                </th>
                <th className="nav-bar-name">
                  <Link to={item.path} onClick={() => setShowNavbar(false)}>
                    {item.bossName}
                  </Link>
                </th>
              </tr>
            ))}
          </table>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default Navbar;
