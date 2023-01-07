import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { ValidatorForm } from "react-material-ui-form-validator";

import { Backdrop, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import User from "./User";
import { UrlEnum, get, handleChange, post } from "../Utils/Utils";
import { useLocation } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import { Vocabulary } from "../Utils/Vocabulary";
import { UserModel } from "../Models/Models";

type Props = {
  classes: any;
  model?: any;
};

function UserRequest(props: Props) {
  const { classes } = props;
  const [model, setModel] = useState(new UserModel());
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  /**
   *
   */
  useEffect(() => {
    if (state?.id) {
      setLoading(true);
      get(`${UrlEnum.user}/${state.id}`).then((response: any) => {
        if (response.errorMessages) {
          console.log(response);
        }
        setLoading(false);
        setModel(response.user);
      });
    }
  }, []);

  /**
   *
   * @param event
   */
  function handleInputChange(event: any) {
    const newModel: any = handleChange(event, model);
    setModel(newModel);
  }

  function handleUpdate() {
    console.log("update");
  }

  function handleCreate() {
    console.log(model);
    post(UrlEnum.user, model).then((response) => {
      console.log(response);
    });
  }

  return (
    <Dashboard>
      <Paper className={classes.paper}>
        <ValidatorForm
          onSubmit={() => {
            state?.id ? handleUpdate() : handleCreate();
          }}
          instantValidate={true}
        >
          <fieldset className={classes.fieldset}>
            <legend>{Vocabulary.newUser}</legend>
            <User model={model} handleChange={handleInputChange} />
          </fieldset>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" type="submit">
              {Vocabulary.save}
            </Button>
          </Grid>
        </ValidatorForm>
      </Paper>
      {loading ? (
        <Backdrop open={true} sx={{ zIndex: "1600 !important" }}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
    </Dashboard>
  );
}

const styles = (theme: any) =>
  createStyles({
    paper: {
      margin: "0 auto",
      marginBottom: 70,
      marginTop: 10,
      padding: 20,
      [theme.breakpoints.down("md")]: {
        marginBottom: 0,
      },
    },
    select: {
      paddingTop: 0,
      width: "10%",
      marginBottom: 15,
      paddingRight: 10,
      marginRight: 10,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    fieldset: {
      borderRadius: 10,
      borderColor: "#00197540",
      marginBottom: 20,
      padding: 20,
    },
  });
export default withStyles(styles, { withTheme: true })(UserRequest);
