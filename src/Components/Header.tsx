import { withStyles } from "@mui/styles";
import { createStyles, styled } from "@mui/material/styles";
import {
  AppBar,
  AppBarProps,
  Avatar,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { LocalUrlEnum, post, readCookie, UrlEnum } from "../Utils/Utils";
import useNoActivity from "../Hooks/useNoActivity";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Vocabulary } from "../Utils/Vocabulary";
import { Logout, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuContext } from "../Context/menuContext";

type Props = {
  classes: any;
};
let logoutTimeout: any;
const drawerWidth = 240;

interface CustomAppBarProps extends AppBarProps {
  open?: boolean;
}

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<CustomAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 30,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header(props: Props) {
  const { classes } = props;
  const hasActivity = useNoActivity();
  const menuContext = useContext(MenuContext);
  const [showUserOptions, setShowUserOptions] = useState(null);

  /**
   *
   */
  useEffect(() => {
    if (!hasActivity) {
      logoutTimeout = setTimeout(() => {
        logout();
      }, 1000 * 60 * 5);
    } else {
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
    }
  }, [hasActivity]);

  /**
   *
   */
  const menuHandleClick = () => {
    menuContext.setOpen(!menuContext.open);
  };

  /**
   *
   */
  function logout() {
    post(UrlEnum.logout).then((response) => {
      if (response.errors) return null;
      const expires = new Date(Date.now() - 3600).toUTCString();
      document.cookie = `access_token=;expires=${expires};path=/`;
      document.cookie = "userName=;";
      document.cookie = "fullName=;";
      localStorage.removeItem("user");
      document.location.href = LocalUrlEnum.login;
    });
  }

  /**
   *
   */
  function handleCloseUserMenu() {
    setShowUserOptions(null);
  }

  /**
   *
   * @param event
   */
  function handleOpenUserMenu(event: any) {
    setShowUserOptions(event.currentTarget);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar
        position="static"
        className={classes.container}
        open={menuContext.open}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                ...(menuContext.open && { display: "none" }),
              }}
              onClick={menuHandleClick}
            >
              <Avatar className={classes.avatar}>
                <MenuIcon />
              </Avatar>
            </IconButton>
            {/* <div className={classes.image}>
              <img src={"/vetmed_logo.png"} alt="VETMED GHID" width="100%" />
            </div> */}
          </div>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(event) => {
              handleOpenUserMenu(event);
            }}
          >
            <Avatar className={classes.avatar}>
              {readCookie("userName").charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Toolbar>
        <Box>
          <Menu
            anchorEl={showUserOptions}
            sx={{ mt: "50px" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(showUserOptions)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Settings
                fontSize="large"
                style={{
                  paddingRight: "10px",
                }}
              />
              <Typography variant="h6">{Vocabulary.settings}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                logout();
              }}
            >
              <Logout
                fontSize="large"
                style={{
                  paddingRight: "10px",
                }}
              />
              <Typography variant="h6">{Vocabulary.logout}</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </CustomAppBar>
    </Box>
  );
}

const styles = (theme: any) =>
  createStyles({
    container: {
      width: "100%",
      backgroundColor: "#f2e9e4 !important",
      boxShadow: "1px 3px 10px #000000",
      [theme.breakpoints.down("lg")]: {},
    },
    image: {
      width: "300px",
    },
    avatar: {
      backgroundColor: "#000000 !important",
    },
  });

export default withStyles(styles, { withTheme: true })(Header);
