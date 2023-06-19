import "./light-grey-text.css";

export const LightGreyText = ({ margin, children }) => {
  return (
    <span style={{ margin }} className="light-grey-text">
      {children}
    </span>
  );
};
