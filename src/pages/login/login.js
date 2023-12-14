import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button, Container, FormTitle, Input } from "../../components";
import { axiosInstance } from "../../sevices";
import { userActions } from "../../store/invoices";
import "./login.css";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = ({ email, password }) => {
    setLoading(true);
    const user = {
      email: email,
      password: password,
    };

    axiosInstance
      .post("login", user)
      .then((data) => {
        dispatch(userActions.setUser(data.data));
        axiosInstance.defaults.headers.Authorization = `Bearer ${data.data.accessToken}`;
        navigate(location.state?.redirect || "/");
      })
      .catch(() => {
        setError("You entered the wrong password or email");
      })
      .finally(() => {
        setLoading(false);
      });

    // if (user) return navigate(location.state?.redirect || "/");
  };

  return (
    <Container width={631}>
      <div className="login">
        <div className="login-wrapper">
          <FormTitle margin={"0 0 35px 0"}>Login</FormTitle>
          <Formik
            onSubmit={handleLoginSubmit}
            initialValues={{ email: "", password: "" }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email("write the email in the right form")
                .required("can't be empty"),
              password: yup
                .string()
                .required("can't be empty")
                .min(3, "at least 3 symbols are required")
                .max(15, "no more than 15 symbols"),
            })}
            validateOnChange={false}
            validateOnBlur={true}
          >
            <Form>
              <Input name={"email"} type={"email"} label={"Email"}></Input>
              <Input
                name={"password"}
                type={"password"}
                label={"Password"}
              ></Input>
              {error && (
                <p style={{ marginBottom: 5, color: "red" }}>{error}</p>
              )}
              <div className="login__button-wrapper">
                <Button disabled={loading} background={"blue"} color="#FFFFFF">
                  Login
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};
