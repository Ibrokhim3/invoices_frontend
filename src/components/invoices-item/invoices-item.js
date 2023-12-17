import { DarkGreyText } from "../dark-grey-text";
import { LightGreyText } from "../light-grey-text";
import { PaymentStatus } from "../payment-status";
import { TextBold } from "../text-bold";
import { Link } from "react-router-dom";
import "./invoices-item.css";
import moment from "moment";
// import arrow from "../../assets/icons/arrow.svg";

export const InvoicesItem = ({
  item: { id, userId, created_date, due_date, email, paid, price, term, to },
}) => {
  const trimId = id.slice(-6);

  return (
    <li className="invoices-item">
      <Link to={`invoice/${id}`} className="invoices-item-link">
        <div className="invoices-item-left-wrapper">
          <TextBold width={"27px"} margin={"0 45px 0 0"}>
            <DarkGreyText>#</DarkGreyText>
            {trimId}
          </TextBold>
          <DarkGreyText width={"120px"} weight={500} margin={"0 auto 0 0"}>
            <LightGreyText>Due &nbsp;</LightGreyText>
            {moment(due_date).format("DD MMMM YYYY")}
          </DarkGreyText>
          <div className="invoice-item__text-wrapper">
            <LightGreyText lineHeight={1.5}>{to}</LightGreyText>
          </div>
        </div>
        <div className="invoices-item-right-wrapper">
          <p className="invoices-item__price">
            <span className="invoices-item__currency">&pound; &nbsp;</span>
            {price}
          </p>
          <PaymentStatus paid={paid}></PaymentStatus>
          <div className="invoices-item__link">
            {/* <Link to={`invoice/${id}`}>
              <img
                className="invoices-item__link-img"
                src={arrow}
                alt="arrow-button"
              />
            </Link> */}
          </div>
        </div>
      </Link>
    </li>
  );
};
