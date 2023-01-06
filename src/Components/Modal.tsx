import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";
import { disableAllFields } from "../Utils/Utils";

type Props = {
  classes: any;
  open: boolean;
  onClose: () => void;
  children: any;
  title: any;
  actions?: any;
};

function Modal(props: Props) {
  const { open, children, onClose, classes, title, actions } = props;
  /**
   *
   */
  useEffect(() => {
    setTimeout(() => {
      if (open) disableAllFields();
    }, 500);
  }, []);

  return (
    <Dialog open={open} maxWidth={"lg"}>
      <DialogActions className={classes.dialogHeader}>
        <DialogTitle>{title}</DialogTitle>
        <Fab
          className={classes.fab}
          size="small"
          color="primary"
          onClick={onClose}
        >
          <Close />
        </Fab>
      </DialogActions>
      <DialogContent id="previewDialogContent">{children}</DialogContent>
      <DialogActions className={classes.dialogActions}>{actions}</DialogActions>
    </Dialog>
  );
}

const styles = (theme: any) =>
  createStyles({
    dialogActions: {
      // backgroundColor: "#B4C408",
    },
    dialogHeader: {
      justifyContent: "space-between !important",
    },
    fab: {
      marginRight: "15px !important",
    },
  });
export default withStyles(styles, { withTheme: true })(Modal);
