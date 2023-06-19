import "./light-grey-text.css";

export const LightGreyText = ({lineHeight, margin, children }) => {
  return (
    <span style={{ margin, lineHeight: lineHeight}} className="light-grey-text">
      {children}
    </span>
  );
};
