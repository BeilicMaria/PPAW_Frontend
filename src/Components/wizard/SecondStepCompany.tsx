/* eslint-disable no-unused-vars */
import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../../Utils/Vocabulary";
import { Grid } from "@mui/material";

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
          id="name"
          name="name"
          label={Vocabulary.companyName}
          value={props.model.name}
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
          id="CUI"
          name="CUI"
          label={Vocabulary.CUI}
          value={props.model.CUI}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
          validators={["matchRegexp:^RO.[0-9]{0,8}$|[0-9]{0,8}$", "required"]}
          errorMessages={[Vocabulary.cuiValidation, Vocabulary.requiredField]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          id="registerNo"
          name="registerNo"
          label={Vocabulary.registerNo}
          value={props.model.registerNo}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          id="representativeName"
          name="representativeName"
          label={Vocabulary.representativeName}
          value={props.model.representativeName}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          id="email"
          name="email"
          label={Vocabulary.email}
          value={props.model.email}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
          validators={["required", "isEmail"]}
          errorMessages={[Vocabulary.requiredField, Vocabulary.emailValidation]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextValidator
          id="phone"
          name="phone"
          label={Vocabulary.phone}
          value={props.model.phone}
          fullWidth
          onChange={(event) => {
            props.handleChange(event);
          }}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
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
    textLabel: {
      marginTop: "10px !important",
    },
  });

export default withStyles(styles, { withTheme: true })(SecondStep);
