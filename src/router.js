import { createBrowserRouter } from "react-router-dom";
import CreateExpense from "./containers/expenses/create";
import CreateBill from "./containers/bills/create";
import Browse from "./containers/browse";
import BrowseBills from "./containers/bills/browse";
import BillDetail from "./containers/bills/detail";
import BrowseExpenses from "./containers/expenses/browse";

export default createBrowserRouter([
 {
   path: "/",
   element: <Browse />
 },
 {
   path: "/expenses/create",
   element: <CreateExpense />
 },
  {
    path: "/bills/create",
    element: <CreateBill />
  },
  {
    path: "/bills/browse",
    element: <BrowseBills />
  },
  {
    path: "/bills/detail",
    element: <BillDetail />
  },
  {
    path: "/expenses/browse",
    element: <BrowseExpenses />
  }
]);