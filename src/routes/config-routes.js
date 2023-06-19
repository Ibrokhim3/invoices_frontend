import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { AddInvoice, EditInvoice, Invoices, Login } from "../pages";
import { InvoiceItem } from "../pages/invoice-item";
import { NotFound } from "../pages/not-found";

const routes = [
  {
    path: "/",
    element: <Invoices />,
  },
  {
    path: "invoice/:id",
    children: [
      {
        path: "",
        element: <InvoiceItem />,
      },
      {
        path: "edit-invoice",
        element: <EditInvoice />,
      },
    ],
  },
  {
    path: "add-invoice",
    element: <AddInvoice />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export const ConfigRoutes = () => {
  const user = useSelector((state) => state.user.user);

  return useRoutes([
    ...(!user
      ? [
          {
            path: "login",
            element: <Login />,
          },
        ]
      : []),
    ...routes,
  ]);
};
