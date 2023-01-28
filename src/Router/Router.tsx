import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import theme from "../Theme/Theme";
import UsersTable from "../Pages/UsersTable";
import UserRequest from "../Pages/UserRequest";
import PageNotFound from "../Pages/PageNotFound";
import SubjectsTable from "../Pages/SubjectsTable";
import Subject from "../Pages/SubjectRequest";
import ClassesTable from "../Pages/ClassesTable";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/users" element={<UsersTable />} />
            <Route path="/user/:id?" element={<UserRequest />} />
            <Route path="/subjects" element={<SubjectsTable />} />
            <Route path="/subject/:id?" element={<Subject />} />
            <Route path="/classes" element={<ClassesTable />} />
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default Router;
