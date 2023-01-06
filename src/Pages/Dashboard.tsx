import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { LocalUrlEnum,  readCookie } from "../Utils/Utils";
import DrawerLayout from "../Components/DrawerLayout";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

type Props = {
  classes: any;
  children?: any;
};

function Dashboard(props: Props) {
  const { classes } = props;
  const navigate = useNavigate();

  /**
   *
   */
  useEffect(() => {
    if (!readCookie("access_token")) {
      navigate(LocalUrlEnum.login);
    }

  }, []);

  return (
    <div className={classes.container}>
      <Header />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <DrawerLayout />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {props.children ? props.children : <div></div>}
        </Box>
      </Box>
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    container: {
      [theme.breakpoints.down("lg")]: {},
    },
  });

export default withStyles(styles, { withTheme: true })(Dashboard);
