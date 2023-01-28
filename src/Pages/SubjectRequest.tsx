import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Backdrop, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { UrlEnum, get, handleChange, post } from "../Utils/Utils";
import { useLocation } from "react-router-dom";
import { Vocabulary } from "../Utils/Vocabulary";
import { SubjectModel } from "../Models/Models";
import { ToastContainer, toast } from "react-toastify";
import Subject from "../Components/Subject";

type Props = {
  classes: any;
  model?: any;
};

function SubjectRequest(props: Props) {
  const { classes } = props;
  const [model, setModel] = useState(new SubjectModel());
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  /**
   *
   */
  function getSubjectDetails() {
    get(`${UrlEnum.subject}/${state.id}`).then((response: any) => {
      if (response.errors) {
        toast.error(response.errors);
      }
      setLoading(false);
      setModel(response.subject);
    });
  }
  /**
   *
   */
  useEffect(() => {
    if (state?.id) {
      setLoading(true);
      getSubjectDetails();
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
    post(`${UrlEnum.subject}/${state?.id}`, model).then((response) => {
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
    post(UrlEnum.subject, model).then((response) => {
      setLoading(false);
      if (response.errors) {
        toast.error(Vocabulary.generalAddError);
      } else {
        toast.success(Vocabulary.generalAddSuccess);
      }
    });
  }

  /**
   *
   * @param e
   */
  function handleCheckBoxChange(e: any) {
    const newModel: any = Object.assign({}, model);
    newModel.isMandatory = e.target.checked;
    setModel(newModel);
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
          <Subject
            model={model}
            handleChange={handleInputChange}
            handleCheckBox={handleCheckBoxChange}
          />
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
export default withStyles(styles, { withTheme: true })(SubjectRequest);
