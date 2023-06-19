import "./go-back-button.css";
import { Link } from "react-router-dom";
import backArrow from "./../../assets/icons/back-arrow.svg";

export const GoBackButton = ({ children, to = "/", margin }) => {
  return (
    <Link className="go-back-button" style={{ margin }} to={to}>
      <img src={backArrow}></img>
      {children}
    </Link>
  );
};
