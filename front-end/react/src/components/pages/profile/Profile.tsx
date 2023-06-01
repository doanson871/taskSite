import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import ProfileDetail from "../../mini-component/profile-details/ProfileDetail";
import { AuthContext } from "../../../contexts/authContext";
import ChangePassword from "../../mini-component/change-password/ChangePassword";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import WorkList from "../../mini-component/work-list/WorkList";
import { useParams } from "react-router-dom";

enum FeatureType {
  Profile,
  Password,
  MyJob,
  MyDocument,
  Logout,
}

const Profile: React.FC = () => {
  // const [profileInfo, setProfileInfo] = useState(undefined);
  const {
    authState: { account },
  } = useContext(AuthContext);

  const { idProfile } = useParams();
  console.log(idProfile);

  const { logOut } = useContext(AuthContext);
  const { resetData } = useTasksiteContext();
  const [profileType, setProfileType] = useState<FeatureType>(
    FeatureType.Profile
  );
  const listButton = [
    { name: "Hồ sơ", type: FeatureType.Profile, isShow: true },
    {
      name: "Mật khẩu",
      type: FeatureType.Password,
      isShow: account.id === idProfile,
    },
    { name: "Công việc", type: FeatureType.MyJob, isShow: true },
    { name: "Giấy tờ", type: FeatureType.MyDocument, isShow: true },
    {
      name: "Đăng xuất",
      type: FeatureType.Logout,
      isShow: account.id === idProfile || !idProfile,
    },
  ];
  useEffect(() => {}, [idProfile]);
  const handleClickButton = (type: FeatureType) => {
    if (type === FeatureType.Logout) {
      resetData();
      logOut();
    }
    setProfileType(type);
  };
  return (
    <div className="profile d-grid">
      <div className="left-profile"></div>
      <div className="center-profile">
        {profileType === FeatureType.Profile && (
          <ProfileDetail idProfile={parseInt(idProfile as string)} />
        )}
        {profileType === FeatureType.Password && <ChangePassword />}
        {profileType === FeatureType.MyJob && <WorkList />}
      </div>
      <div className="right-profile d-grid">
        <span></span>
        <div className="list-button">
          {listButton.map((button) => {
            return (
              button.isShow && (
                <div
                  className={`button-profile ${
                    profileType === button.type ? "active" : ""
                  }`}
                  onClick={() => handleClickButton(button.type)}
                >
                  {button.name}
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
