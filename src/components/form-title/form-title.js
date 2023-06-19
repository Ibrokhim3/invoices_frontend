import "./form-title.css";

export const FormTitle = ({ children, margin }) => {
  return (
    <h3 style={{ margin }} className="form-title">
      {children}
    </h3>
  );
};
