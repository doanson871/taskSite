import React, { useState } from "react";
import "./styles.scss";
import ProfileDetail from "../../mini-component/profile-details/ProfileDetail";

enum ProfileType {
  Details,
  Password,
  Job,
}

const Profile: React.FC = () => {
  const [profileType, setProfileType] = useState<ProfileType>(
    ProfileType.Details
  );
  return (
    <div className="profile d-grid">
      <div className="left-profile"></div>
      <div className="center-profile">
        {profileType === ProfileType.Details && <ProfileDetail />}
      </div>
      <div className="right-profile"></div>
    </div>
  );
};

export default Profile;
