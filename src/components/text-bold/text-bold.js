import "./text-bold.css";

export const TextBold = ({ children, margin, width }) => {
  return (
    <p style={{ margin, width }} className="text-bold">
      {children}
    </p>
  );
};
