import "./container.css";

export const Container = ({ children, width, height, margin }) => {
  return (
    <div style={{ maxWidth: width, height, margin }} className="container">
      {children}
    </div>
  );
};
