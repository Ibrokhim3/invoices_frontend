import { Container, InvoicesHeader, Sidebar } from "../../components";
import "./not-found.css";

export const NotFound = () => {
  return (
    <Container>
      <Sidebar />
      <div className="not-found">
        <InvoicesHeader margin={"0 0 147px 0"}></InvoicesHeader>
        <h3 className="not-found__title">There is nothing here</h3>
        <p className="not-found__text">
          {" "}
          Create an invoice by clicking the{" "}
          <span className="not-found__span">New invoice</span> button and get
          started
        </p>
      </div>
    </Container>
  );
};
