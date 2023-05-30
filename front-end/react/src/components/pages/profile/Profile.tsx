import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import ProfileDetail from "../../mini-component/profile-details/ProfileDetail";
import { AuthContext } from "../../../contexts/authContext";
import ChangePassword from "../../mini-component/change-password/ChangePassword";
import { useParams } from "react-router-dom";

enum FeatureType {
  Profile,
  Password,
  MyJob,
  MyDocument,
  Logout,
}

const Profile: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // handle
      // get information
    }
  }, []);

  const { logOut } = useContext(AuthContext);
  const [profileType, setProfileType] = useState<FeatureType>(
    FeatureType.Profile
  );
  const listButton = [
    { name: "Hồ sơ", type: FeatureType.Profile },
    { name: "Mật khẩu", type: FeatureType.Password },
    { name: "Công việc của tôi", type: FeatureType.MyJob },
    { name: "Giấy tờ của tôi", type: FeatureType.MyDocument },
    { name: "Đăng xuất", type: FeatureType.Logout },
  ];
  const handleClickButton = (type: FeatureType) => {
    type === FeatureType.Logout && logOut();
    setProfileType(type);
  };
  return (
    <div className="profile d-grid">
      <div className="left-profile"></div>
      <div className="center-profile">
        {profileType === FeatureType.Profile && <ProfileDetail />}
        {profileType === FeatureType.Password && <ChangePassword />}
      </div>
      <div className="right-profile d-grid">
        <span></span>
        <div className="list-button">
          {listButton.map((button) => (
            <div
              className={`button-profile ${
                profileType === button.type ? "active" : ""
              }`}
              onClick={() => handleClickButton(button.type)}
            >
              {button.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
