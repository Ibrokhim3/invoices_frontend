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
import { format, parseISO, toDate } from "date-fns";
import { useEffect } from "react";

export const EditInvoice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const originalDate = new Date("2024-05-05T00:00:00.000Z");

  console.log(new Date());

  const { currentInvoice, loading, error } = useSelector(
    (state) => state.invoices
  );

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(invoicesActions.setLoading(true));
    axiosInstance.get("invoices/" + id).then((data) => {
      dispatch(invoicesActions.setCurrentInvoice(data.data));
      dispatch(invoicesActions.setLoading(false));
    });
  }, []);

  if (!currentInvoice) {
    return <div className="loader"></div>;
  }

  const { to, email, due_date, term, description, price, paid } =
    currentInvoice;

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
            dueDate: format(new Date(due_date), "yyyy-MM-dd"),
            //used date fns npm, as withot this it doesn't
            //receive initial value
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
