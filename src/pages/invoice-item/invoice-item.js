import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  DarkGreyText,
  PaymentStatus,
  Sidebar,
} from "../../components";
import { GoBackButton } from "../../components/go-back-button";
import { InvoiceInfo } from "../../components/invoice-info";
import { axiosInstance } from "../../sevices";
import { invoicesActions } from "../../store/invoices";
import moment from "moment";
import "./invoice-item.css";

export const InvoiceItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentInvoice, paidStatus } = useSelector(
    (state) => state.invoices
  );
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(invoicesActions.setLoading(true));
    axiosInstance.get("invoices/" + id).then((data) => {
      dispatch(invoicesActions.setCurrentInvoice(data.data));
      dispatch(invoicesActions.setLoading(false));
    });
  }, [paidStatus]);

  if (!currentInvoice) return null;

  const { to, price, due_date, email, paid, created_date, description } =
    currentInvoice;

  if (loading) return <p className="loader"></p>;

  const handleDeleteClick = () => {
    dispatch(invoicesActions.setLoading(true));
    axiosInstance
      .delete("invoices/" + id)
      .then(() => dispatch(invoicesActions.setDeletingInvoice(+id)))
      .catch(() => {
        dispatch(invoicesActions.setError(true));
      });
    navigate("/");
  };

  const handlePatchClick = () => {
    const newStatus = {
      userId: user.id,
      paid: true,
    };
    dispatch(invoicesActions.setLoading(true));
    axiosInstance
      .patch("invoices/" + id, newStatus)
      .then(() => dispatch(invoicesActions.setPayingInvoice(!paidStatus)));
    dispatch(invoicesActions.setLoading(false));
  };

  const trimId = id.slice(-6);

  if (error) return <p className="error">Something went wrong...</p>;

  return (
    <Container>
      <Sidebar />
      <div className="invoice-item">
        <GoBackButton margin={"0 0 32px 0"}>Go back</GoBackButton>
        <div className="invoice-item__header">
          <div className="invoice-item__status-wrapper">
            <span className="invoice-item__span">Status</span>
            <PaymentStatus paid={paid}></PaymentStatus>
          </div>
          <div className="invoice-item__button-wrapper">
            <Button
              to={user ? `/invoice/${id}/edit-invoice` : "/login"}
              background={"grey"}
              state={{
                redirect: !user && `/invoice/${id}/edit-invoice`,
              }}
            >
              Edit
            </Button>
            {user ? (
              <Button
                onClick={handleDeleteClick}
                type="button"
                // paid={paid}
                disabled={loading}
                color={"white"}
                background={"red"}
              >
                Delete
              </Button>
            ) : (
              <Link
                className="button"
                style={{ color: "white", background: "#EC5757" }}
                to={user ? "/invoice/:id" : "/login"}
                background={"grey"}
                state={{
                  redirect: !user && `/invoice/${id} `,
                }}
              >
                Delete
              </Link>
            )}
            {user ? (
              <Button
                className={"button--none"}
                onClick={handlePatchClick}
                color={"white"}
                background={"blue"}
                disabled={loading}
                paid={paid}
                type="button"
              >
                Mark as Paid
              </Button>
            ) : (
              <Link
                className={paid === true ? "button--none" : "button"}
                style={{
                  color: "white",
                  background: "#7C5DFA",
                }}
                to={user ? "/invoice/:id" : "/login"}
                background={"grey"}
                state={{
                  redirect: !user && `/invoice/${id}`,
                }}
              >
                Mark as Paid
              </Link>
            )}
          </div>
        </div>
        <div className="invoice-item__invoice">
          <div className="invoice-item__id">
            <span className="invoice-item__id-symbol">#</span>
            {trimId}
          </div>
          <div className="invoice-item__desc">
            <DarkGreyText weight={500}>{description}</DarkGreyText>
          </div>
          <div className="invoice-item__middle-wrapper">
            <InvoiceInfo
              width={211}
              margin={"0 0 32px 0"}
              desc={"Invoice Date"}
              info={moment(created_date).format("DD MMMM YYYY")}
            ></InvoiceInfo>
            <div className="invoice-item__bill-to-wrapper">
              <InvoiceInfo
                margin={"0 0 32px 0"}
                desc={"Bill To"}
                info={to}
              ></InvoiceInfo>
              <div className="invoice-item__email-wrapper">
                <InvoiceInfo
                  margin={"0 0 32px 0"}
                  desc={"Sent to"}
                  info={email}
                ></InvoiceInfo>
              </div>
            </div>
          </div>
          <InvoiceInfo
            margin={"0 0 50px 0"}
            desc={"Payment Due"}
            info={moment(due_date).format("DD MMMM YYYY")}
          ></InvoiceInfo>
          <div className="invoice-item__email-wrapper-mobile">
            <InvoiceInfo
              margin={"0 0 32px 0"}
              desc={"Sent to"}
              info={email}
            ></InvoiceInfo>
          </div>
          <div className="invoice-item__footer">
            <p className="invoice-item__footer-text">Amount Due</p>
            <p className="invoice-item__footer-price">&pound;&nbsp;{price}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
