import "./invoice-info.css";
import { DarkGreyText } from "../dark-grey-text";
import { InfoText } from "../info-text";

export const InvoiceInfo = ({ desc, info, margin, width }) => {
  return (
    <div style={{ margin, width }} className="invoice-info">
      <DarkGreyText display={"flex"} margin={"0 0 12px 0"} weight={500}>
        {desc}
      </DarkGreyText>

      <InfoText>{info}</InfoText>
    </div>
  );
};
