import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  InvoicesHeader,
  InvoicesItem,
  Sidebar,
} from "../../components";
import { useDebounce } from "../../hooks";
import { axiosInstance } from "../../sevices";
import { invoicesActions } from "../../store/invoices/invoices.slice";
import { NotFound } from "../not-found";
import "./invoices.css";

export const Invoices = () => {
  const { list, loading, error } = useSelector((state) => state.invoices);
  const [searchValue, setSearchValue] = useState("");
  const dispath = useDispatch();

  const debauncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispath(invoicesActions.setLoading(true));
    axiosInstance
      .get("invoices", { params: { paid_like: debauncedValue } })
      .then((data) => {
        console.log(data);
        dispath(invoicesActions.setList(data.data));
      })
      .catch(() => {
        dispath(invoicesActions.setError(true));
      });
  }, [debauncedValue]);

  const handleSearchChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  if (loading) return <div class="loader"></div>;
  if (error) return <p className="error">Something went wrong...</p>;
  if (list === undefined) return <NotFound />;

  return (
    <Container>
      <Sidebar />
      <div className="invoices">
        <InvoicesHeader onChange={handleSearchChange} />
        <ul className="invoices__list">
          {list?.map((item, index) => (
            <InvoicesItem key={index} item={item}></InvoicesItem>
          ))}
        </ul>
      </div>
    </Container>
  );
};
