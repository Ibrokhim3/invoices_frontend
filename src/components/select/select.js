import { useField } from "formik";
import "./select.css";

export const Select = ({
  inputId,
  label,
  className = "",
  width,
  name,
  defaultValue,
}) => {
  const [field, { error }] = useField(name);
  return (
    <div style={{ width }} className="select-wrapper">
      <span className="input-span">
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
        <span className="input-error">{error}</span>
      </span>
      <select
        defaultValue={defaultValue}
        className={`input ${error ? "input--error" : ""} ${className}`}
        name={name}
        id={inputId}
        {...field}
      >
        <option value="">Select term</option>
        <option value="1">Net 1 Day</option>
        <option value="7">Net 7 Day</option>
        <option value="14">Net 14 Day</option>
        <option value="30">Net 30 Day</option>
      </select>
    </div>
  );
};
