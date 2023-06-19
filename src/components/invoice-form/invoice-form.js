import "./invoice-form.css";
import { Formik, Form, yupToFormErrors } from "formik";
import { Input } from "../input";
import { Select } from "../select";
import { Button } from "../../components";
import * as yup from "yup";
import { useSelector } from "react-redux";

export const InvoiceForm = ({
  onSubmit,
  buttonName,
  mainButtonName,
  justifyContent,
  formTitle,
  symbol,
  invoiceId,
  disabled,
  initialValues,
}) => {
  // if (!currentInvoice) return null;

  return (
    <div className="invoice-form">
      <h3 className="invoice-form__title">
        {formTitle}
        <span className="invoice-form__span">{symbol}</span>
        <span className="invoice-form__title">{invoiceId}</span>
      </h3>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          clientsName: yup
            .string()
            .required("can't be empty")
            .min(3, "at least 3 symbols")
            .max(50, "no more than 50 symbols"),
          clientsEmail: yup
            .string()
            .required("can't be empty")
            .email("fill email in the right form"),
          dueDate: yup.date().required("can't be empty"),
          paymentTerms: yup.number().required("can't be empty"),
          projectDescription: yup.string(),
          price: yup
            .number()
            .required("can't be empty")
            .min(100, `Should be over than 100`)
            .max(1000, "No more than 1000"),
        })}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {() => (
          <Form>
            <Input
              // defaultValue={to}
              label={"Client’s Name"}
              name="clientsName"
              inputId={"clientsNameId"}
            />
            <Input
              // defaultValue={email}
              type={"email"}
              label={"Client’s Email"}
              name="clientsEmail"
              inputId={"clientsEmailId"}
            />
            <div className="form__selects-wrapper">
              <Input
                width={"47.5%"}
                type={"date"}
                label={"Due date"}
                name="dueDate"
                inputId={"dueDateId"}
                className={"input-date"}
              />
              <Select
                // defaultValue={term}
                name="paymentTerms"
                width={"47.5%"}
                label={"Payment Terms"}
                inputId={"paymentTermsId"}
                className={"select"}
              ></Select>
            </div>
            <Input
              // defaultValue={description}
              label={"Project Description"}
              name="projectDescription"
              inputId={"projectDescriptionId"}
            />
            <Input
              // defaultValue={price}
              type={"number"}
              label={"Price"}
              name="price"
              inputId={"priceId"}
            />
            <div
              style={{ justifyContent }}
              className="invoice-form__button-wrapper"
            >
              <Button color={"#7E88C3"} to={"/"} background={"grey"}>
                {buttonName}
              </Button>
              <Button
                disabled={disabled}
                type="submit"
                margin={"0 0 0 8px"}
                color={"#FFF"}
                background={"blue"}
              >
                {mainButtonName}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
