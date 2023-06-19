import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  GoBackButton,
  InvoiceForm,
  Sidebar,
} from "../../components";
import { axiosInstance } from "../../sevices";
import { invoicesActions } from "../../store/invoices";

export const EditInvoice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentInvoice, loading, error } = useSelector(
    (state) => state.invoices
  );
  const user = useSelector((state) => state.user.user);

  const { to, email, dueDate, term, description, price, paid } = currentInvoice;

  const handleEditSubmit = (value) => {
    const editedInvoice = {
      userId: user.id,
      to: value.clientsName,
      email: value.clientsEmail,
      dueDate: value.dueDate,
      term: +value.paymentTerms,
      description: value.projectDescription,
      price: value.price,
      paid: paid,
      createdDate: new Date().toISOString(),
    };

    dispatch(invoicesActions.setLoading(true));
    axiosInstance.put("invoices/" + id, editedInvoice).then((data) => {
      console.log(data);
      dispatch(invoicesActions.setEditingInvoice(data.data));
      navigate("/");
    });
  };

  const trimId = id.slice(-6);

  return (
    <Container width={631}>
      <Sidebar />
      <div>
        <GoBackButton>Go back</GoBackButton>
        <InvoiceForm
          initialValues={{
            clientsName: to,
            clientsEmail: email,
            dueDate: dueDate,
            paymentTerms: +term,
            projectDescription: description,
            price: price,
          }}
          onSubmit={handleEditSubmit}
          justifyContent={"space-between"}
          buttonName={"Cancel"}
          mainButtonName={"Save changes"}
          formTitle={"Edit "}
          symbol={"#"}
          invoiceId={trimId}
          disabled={loading}
        ></InvoiceForm>
      </div>
    </Container>
  );
};
