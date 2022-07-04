//import logo from './logo.svg';
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import AdminRoute from "./components/Navigation/AdminRoute";
import Login from "./pages/users/login/Login";
import Register from "./pages/users/register/Register";
import AddExpense from "./pages/expense/add/AddExpense";
import AddIncome from "./pages/income/add/AddIncome";
import Profile from "./pages/users/Profile/Profile";
import Navbar from "./components/Navigation/Navbar";
import { useSelector } from "react-redux";
import NotAdmin from "./components/NotAdmin";
import DashBoard from "./pages/users/dashboard/DashBoard";
import ExpensesList from "./pages/expense/List/ExpensesList";
import IncomeList from "./pages/income/list/IncomeList";
import EditContent from "./components/editContent/EditContent";
import UserProfileExpList from "./pages/users/UserProfile/UserProfileExpList/UserProfileExpList";
import UserProfileIncList from "./pages/users/UserProfile/UserProfileIncList/UserProfileIncList";
import UpdateUser from "./pages/users/updateuser/UpdateUser";


function App({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state?.users?.userAuth);
  console.log(userLogin);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/not-found" component={NotAdmin} />
        <ProtectedRoute exact path="/edit" component={EditContent} />
        <AdminRoute exact path="/incomes" component={IncomeList} />
        <AdminRoute exact path="/expenses" component={ExpensesList} />
        <AdminRoute exact path="/dashboard" component={DashBoard} />
        <ProtectedRoute exact path="/add-income" component={AddIncome} />
        <ProtectedRoute exact path="/add-expense" component={AddExpense} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute
          exact
          path="/user-expenses"
          component={UserProfileExpList}
        />
        <ProtectedRoute
          exact
          path="/user-income"
          component={UserProfileIncList}
        />
         <ProtectedRoute
          exact
          path="/user-edit"
          component={UpdateUser}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
