import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import theme from "../Theme/Theme";
import { readCookie } from "../Utils/Utils";
import UsersTable from "../Pages/UsersTable";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !readCookie("access_token") ? (
                <Navigate to="/login" />
              ) : (
                <Dashboard />
              )
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/users" element={<UsersTable />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default Router;
