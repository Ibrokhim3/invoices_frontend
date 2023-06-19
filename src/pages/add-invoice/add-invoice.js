import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import {
  Container,
  GoBackButton,
  InvoiceForm,
  Sidebar,
} from "../../components";
import { axiosInstance } from "../../sevices";
import { invoicesActions } from "../../store/invoices";
import "./add-invoice.css";

export const AddInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { loading, error } = useSelector((state) => state.invoices);
  const handleFormSubmit = (value, actions) => {
    const newInvoice = {
      userId: user.id,
      to: value.clientsName,
      email: value.clientsEmail,
      dueDate: value.dueDate,
      term: +value.paymentTerms,
      description: value.projectDescription,
      price: +value.price,
      createdDate: new Date().toISOString(),
    };

    dispatch(invoicesActions.setLoading(true));
    axiosInstance
      .post("/invoices", newInvoice)
      .then((data) => dispatch(invoicesActions.addInvoice(data.data)))
      .catch((err) => {
        dispatch(invoicesActions.setError(true));
      })
      .finally(() => {
        if (!error) return navigate("/");
      });

    if (error) return <p className="error">Something went wrong...</p>;
  };

  return (
    <Container width={631}>
      <Sidebar />
      <div>
        <GoBackButton>Go back</GoBackButton>
        <InvoiceForm
          initialValues={{
            clientsName: "",
            clientsEmail: "",
            dueDate: "",
            paymentTerms: "",
            projectDescription: "",
            price: "",
          }}
          onSubmit={handleFormSubmit}
          justifyContent={"space-between"}
          buttonName={"Discard"}
          disabled={loading}
          mainButtonName={"Save & send"}
          formTitle="New invoice"
        ></InvoiceForm>
      </div>
    </Container>
  );
};
