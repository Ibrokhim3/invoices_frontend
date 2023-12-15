import { useSelector } from "react-redux/es/exports";
import plus from "../../assets/icons/plus.svg";
import { Link } from "react-router-dom";
import "./invoices-header.css";

export const InvoicesHeader = ({ margin, onChange, searchValue }) => {
  const list = useSelector((state) => state.invoices.list);
  const user = useSelector((state) => state.user.user);

  return (
    <div style={{ margin }} className="invoices__header">
      <div className="invoices__titles">
        <h1 className="invoices__title">Invoices</h1>
        <p className="invoices__subtitle">
          {list ? `There are ${list?.length} total invoices` : "No invoices"}
        </p>
        <p className="invoices__subtitle invoices__subtitle-mobile">{`${list?.length} invoices`}</p>
      </div>
      <div className="invoices__buttons">
        <label className="invoices__filter-label" htmlFor="statusFilter">
          Filter:
          <select
            onChange={onChange}
            id="statusFilter"
            name="statusFilter"
            className="invoices__select"
            value={searchValue}
          >
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
        </label>
        <Link
          to={user ? "add-invoice" : "login"}
          state={{
            redirect: !user && "/add-invoice",
          }}
          className="invoices__button"
        >
          <img style={{ marginRight: 5 }} src={plus}></img>New
          <span className="invoices__button-span"> &nbsp;Invoice</span>
        </Link>
      </div>
    </div>
  );
};
