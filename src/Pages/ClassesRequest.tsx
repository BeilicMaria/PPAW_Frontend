import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Backdrop, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { LocalUrlEnum, UrlEnum, get, handleChange, post } from "../Utils/Utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Vocabulary } from "../Utils/Vocabulary";
import { ToastContainer, toast } from "react-toastify";
import SchoolClass from "../Components/SchoolClass";
import { SchoolClassModel } from "../Models/Models";

type Props = {
  classes: any;
  model?: any;
};

function ClassesRequest(props: Props) {
  const { classes } = props;
  const [model, setModel] = useState(new SchoolClassModel());
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  /**
   *
   */
  function getClassDetails() {
    get(`${UrlEnum.class}/${state.id}`).then((response: any) => {
      if (response.errors) {
        toast.error(response.errors);
      }
      setLoading(false);
      setModel(response.class);
    });
  }

  /**
   *
   */
  useEffect(() => {
    if (state?.id) {
      setLoading(true);
      getClassDetails();
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

  /**
   *
   */
  function handleUpdate() {
    setLoading(true);
    post(`${UrlEnum.class}/${state?.id}`, model).then((response) => {
      setLoading(false);
      if (response.errors) {
        toast.error(Vocabulary.generalUpdateError);
      } else {
        toast.success(Vocabulary.generalUpdateSuccess);
      }
    });
  }

  /**
   *
   */
  function handleCreate() {
    setLoading(true);
    post(UrlEnum.class, model).then((response) => {
      setLoading(false);
      if (response.errors) {
        toast.error(Vocabulary.generalAddError);
      } else {
        toast.success(Vocabulary.generalAddSuccess);
        navigate(LocalUrlEnum.classes);
      }
    });
  }

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <Paper className={classes.paper}>
        <ValidatorForm
          onSubmit={() => {
            state?.id ? handleUpdate() : handleCreate();
          }}
          instantValidate={true}
        >
          <SchoolClass model={model} handleChange={handleInputChange} />
          <Grid container justifyContent="flex-end">
            <Button variant="contained" color="secondary" type="submit">
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
    </>
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
export default withStyles(styles, { withTheme: true })(ClassesRequest);
