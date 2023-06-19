import "./payment-status.css";

export const PaymentStatus = ({ margin, paid }) => {
  return (
    <div
      style={{ margin }}
      className={`payment-status ${
        paid === true ? "payment-status--paid" : ""
      }`}
    >
      <span
        className={`payment-status__inner ${
          paid === true ? "payment-status__inner--paid" : ""
        }`}
      ></span>
      <span
        className={`payment-status__status ${
          paid === true ? "payment-status__status--paid" : ""
        }`}
      >
        {paid === true ? "Paid" : "Pending"}
      </span>
    </div>
  );
};
