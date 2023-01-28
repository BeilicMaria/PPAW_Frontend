import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Error } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Vocabulary } from "../Utils/Vocabulary";

type Props = {
  classes: any;
};

function PageNotFound(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Typography variant="h2">404</Typography>
      <p>{Vocabulary.notFound}</p>
      <Error fontSize="large" />
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    datePicker: {
      width: "100%",
    },
  });

export default withStyles(styles, { withTheme: true })(PageNotFound);
