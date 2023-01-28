import { withStyles } from "@mui/styles";
import { createStyles, styled } from "@mui/material/styles";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  Grade,
  Home,
  Person,
  School,
  Subject,
} from "@mui/icons-material";
import { CSSObject } from "@mui/system";
import { useContext } from "react";
import { MenuContext } from "../Context/menuContext";
import { Vocabulary } from "../Utils/Vocabulary";
import { useNavigate } from "react-router-dom";
import { LocalUrlEnum } from "../Utils/Utils";

type Props = {
  classes: any;
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 30px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: "79px",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function DrawerLayout(props: Props) {
  const { classes } = props;
  const menuContext = useContext(MenuContext);
  const navigate = useNavigate();

  /**
   *
   * @param path
   */
  function handleNavigationChange(path: string) {
    navigate(path);
  }

  return (
    <CustomDrawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: "#1e1f25",
        },
      }}
      open={menuContext.open}
    >
      <DrawerHeader>
        <IconButton
          onClick={() => {
            menuContext.setOpen(!menuContext.open);
          }}
        >
          <Avatar className={classes.avatar}>
            <ChevronLeft color="primary" fontSize="large" />
          </Avatar>
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem onClick={(event) => handleNavigationChange("/")}>
          <ListItemButton
            sx={{
              justifyContent: menuContext.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: menuContext.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Home color="primary" fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text} variant="h6">
                  {Vocabulary.dashboard}
                </Typography>
              }
              sx={{ opacity: menuContext.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          onClick={(event) => handleNavigationChange(LocalUrlEnum.users)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: menuContext.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: menuContext.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Person color="primary" fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text} variant="h6">
                  {Vocabulary.users}
                </Typography>
              }
              sx={{ opacity: menuContext.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={(event) => handleNavigationChange(LocalUrlEnum.classes)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: menuContext.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: menuContext.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <School color="primary" fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text} variant="h6">
                  {Vocabulary.classes}
                </Typography>
              }
              sx={{ opacity: menuContext.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={(event) => handleNavigationChange(LocalUrlEnum.subjects)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: menuContext.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: menuContext.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Subject color="primary" fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text} variant="h6">
                  {Vocabulary.subjects}
                </Typography>
              }
              sx={{ opacity: menuContext.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem onClick={(event) => handleNavigationChange("/")}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: menuContext.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: menuContext.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Grade color="primary" fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text} variant="h6">
                  {Vocabulary.grades}
                </Typography>
              }
              sx={{ opacity: menuContext.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </CustomDrawer>
  );
}

const styles = (theme: any) =>
  createStyles({
    container: {
      [theme.breakpoints.down("lg")]: {},
    },
    avatar: {
      backgroundColor: "#000 !important",
    },
    text: { color: "#fff" },
  });

export default withStyles(styles, { withTheme: true })(DrawerLayout);
