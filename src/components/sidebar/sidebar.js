import "./sidebar.css";
import { Link } from "react-router-dom";
import userIcon from "./../../assets/icons/user-icon.svg";
import profileIcon from "../../assets/icons/man-profile-svgrepo-com.svg";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="sidebar">
      <div className="sidebar__logo-background"></div>
      <span className="sidebar__line"></span>
      <div className="user-icon-wrapper">
        <Link to={!user ? "login" : "/"}>
          {user ? (
            <img width={40} height={40} src={userIcon} alt="userIcon" />
          ) : (
            <img width={40} height={40} src={profileIcon} alt="userIcon" />
          )}
        </Link>
      </div>
    </div>
  );
};
