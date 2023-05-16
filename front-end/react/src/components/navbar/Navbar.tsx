import { Offcanvas } from "react-bootstrap";
import { navBarList } from "../../utils/constant";
import "./navbar.scss";
import { useTasksiteContext } from "../../contexts/tasksiteContext";
import { Link } from "react-router-dom";
import { useState } from "react";
interface Props {}

const Navbar: React.FC<Props> = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className={`header d-grid`}>
      <div className="icon-menu d-flex">
        <i className="bi bi-list" onClick={() => setShowNavbar(true)}></i>
      </div>
      <div className="nav-bar-name d-flex">Task Site</div>
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
                  <Link to={item.path} onClick={() => setShowNavbar(false)}>{item.bossName}</Link>
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
