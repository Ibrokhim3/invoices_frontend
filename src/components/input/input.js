import { useField } from "formik";
import "./input.css";

export const Input = ({
  type = "text",
  name,
  inputId,
  label,
  width,
  defaultValue,
  className = "",
}) => {
  const [field, { error }] = useField(name);
  return (
    <div style={{ width }} className={"input-wrapper " + className}>
      <span className="input-span">
        <label
          className={`input-label ${error ? "input-label--error" : ""}`}
          htmlFor={inputId}
        >
          {label}
        </label>
        <span className="input-error">{error}</span>
      </span>
      <input
        defaultValue={defaultValue}
        id={inputId}
        name={name}
        type={type}
        className={`input ${error ? "input--error" : ""}`}
        {...field}
      />
    </div>
  );
};
