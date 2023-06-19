import { useSelector } from "react-redux/es/exports";
import plus from "../../assets/icons/plus.svg";
import { Link } from "react-router-dom";
import "./invoices-header.css";

export const InvoicesHeader = ({ margin, onChange }) => {
  const list = useSelector((state) => state.invoices.list);
  const user = useSelector((state) => state.user.user);

  return (
    <div style={{ margin }} className="invoices__header">
      <div className="invoices__titles">
        <h1 className="invoices__title">Invoices</h1>
        <p className="invoices__subtitle">
          {list ? `There are ${list?.length} total invoices` : "No invoices"}
        </p>
      </div>
      <div className="invoices__buttons">
        <label className="invoices__filter-label" htmlFor="statusFilter">
          {" "}
        </label>
        <select
          onChange={onChange}
          id="statusFilter"
          name="statusFilter"
          className="invoices__select"
          defaultValue={"0"}
        >
          <option
            disabled
            className="invoices__filter-label invoices__select-option"
            value="0"
          >
            Filter by Status
          </option>
          <option className="invoices__select-option" value="">
            All
          </option>
          <option className="invoices__select-option" value="false">
            Pending
          </option>
          <option className="invoices__select-option" value="true">
            Paid
          </option>
        </select>
        <Link
          to={user ? "add-invoice" : "login"}
          state={{
            redirect: !user && "/add-invoice",
          }}
          className="invoices__button"
        >
          <img src={plus}></img>New Invoice
        </Link>
      </div>
    </div>
  );
};
