/* eslint-disable no-unused-vars */
import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { TextValidator } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";
import { Vocabulary } from "../../Utils/Vocabulary";

type Props = {
  classes: any;
  handleChange: (event: any) => void;
  model: any;
};

function SecondStep(props: Props) {
  const { classes } = props;

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={6}>
        <TextValidator
          id="fullName"
          name="fullName"
          label={Vocabulary.fullName}
          value={props.model.fullName}
          fullWidth
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          id="userName"
          name="userName"
          label={Vocabulary.username}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          value={props.model.userName}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          id="email"
          name="email"
          label={Vocabulary.email}
          validators={["required", "isEmail"]}
          errorMessages={[Vocabulary.requiredField, Vocabulary.emailValidation]}
          value={props.model.email}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          type="number"
          id="phone"
          name="phone"
          label={Vocabulary.phone}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          value={props.model.phone}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
    </Grid>
  );
}
const styles = (theme: any) =>
  createStyles({
    container: {
      padding: 20,
      [theme.breakpoints.down("md")]: {},
    },
  });

export default withStyles(styles, { withTheme: true })(SecondStep);
