import "./dark-grey-text.css";

export const DarkGreyText = ({
  children,
  weight,
  margin,
  color,
  display,
  width,
}) => {
  return (
    <span
      style={{ fontWeight: weight, margin, color, display, width }}
      className="dark-grey-text"
    >
      {children}
    </span>
  );
};
