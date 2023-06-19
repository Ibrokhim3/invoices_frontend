import "./button.css";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  to,
  margin,
  color,
  background,
  disabled,
  type = "submit",
  onClick,
  paid,
  className
}) => {
  const btnColors = {
    grey: "#F9FAFE",
    red: "#EC5757",
    blue: "#7C5DFA",
  };

  const activeBackground = btnColors[background] || background;
  if (to)
    return (
      <Link
        className="button"
        style={{ margin, background: activeBackground, color }}
        to={to}
      >
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ margin, background: activeBackground, color }}
      className={`button ${paid === true ? className : ""}`}
    >
      {children}
    </button>
  );
};
