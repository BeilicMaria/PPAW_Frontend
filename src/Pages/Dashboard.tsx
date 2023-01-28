import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { LocalUrlEnum, UrlEnum, get, readCookie } from "../Utils/Utils";
import DrawerLayout from "../Components/DrawerLayout";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import CachedDataSingleton from "../Utils/CachedDataSingleton";

type Props = {
  classes: any;
};

function Dashboard(props: Props) {
  const { classes } = props;
  const navigate = useNavigate();
  const cachedData = CachedDataSingleton.getInstance();

  /**
   *
   */
  useEffect(() => {
    const storage = window.localStorage;
    if (!readCookie("access_token")) {
      navigate(LocalUrlEnum.login);
    }
    if (storage.getItem("roles") && storage.getItem("roles") !== "") {
      const roles = JSON.parse(storage.getItem("roles") || "");
      cachedData.set({
        roles: roles,
      });
    } else {
      const promises = [get(UrlEnum.getRoles)];
      Promise.all(promises).then((values: any) => {
        console.log(values);
        cachedData.set({
          roles: values[0].roles,
        });
        storage.setItem("roles", JSON.stringify(values[0].roles));
      });
    }
  }, []);

  return (
    <div className={classes.container}>
      <Header />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DrawerLayout />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    container: {
      backgroundColor: "#131517",
      height: "100vh",
      [theme.breakpoints.down("lg")]: {},
    },
  });

export default withStyles(styles, { withTheme: true })(Dashboard);
