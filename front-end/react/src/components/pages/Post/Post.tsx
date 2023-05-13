import React from "react";
import Navbar from "../../navbar/Navbar";
import "./styles.scss";
import CenterFilter from "../../mini-component/center-filter/CenterFilter";
interface Props {}
const Post: React.FC<Props> = () => {
  return (
    <div className="post">
      <Navbar />
      <CenterFilter />
    </div>
  );
};

export default Post;
