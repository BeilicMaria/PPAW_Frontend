import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../../Utils/Vocabulary";

type Props = {
  classes: any;
  handleChange: (event: any) => void;
  model: any;
};

function ThirdStep(props: Props) {
  const { classes } = props;

  /**
   *
   * @returns
   */
  function getValidationContent() {
    if (props.model.isUserAccount === "true") {
      switch (props.model.FK_userAccountId) {
        case "1":
        case "4":
          return (
            <Grid item xs={6}>
              <TextValidator
                type="number"
                id="ValidationCode"
                name="ValidationCode"
                label={
                  props.model.FK_userAccountId === "1"
                    ? Vocabulary.validationNo
                    : Vocabulary.petOwnerCode
                }
                value={props.model.ValidationCode}
                fullWidth
                validators={["required"]}
                errorMessages={[Vocabulary.requiredField]}
                onChange={(event) => {
                  props.handleChange(event);
                }}
              />
            </Grid>
          );
        case "2":
        case "3":
          return (
            <Grid item xs={6}>
              <Typography>
                {props.model.FK_userAccountId === "2"
                  ? Vocabulary.studentCard
                  : Vocabulary.qualificationDiploma}
              </Typography>
              <input
                required
                style={{ marginBottom: 10, width: "100%" }}
                type="file"
                name="image"
                accept=".jpg, .png, .pdf"
                onChange={(event) => {
                  props.handleChange(event);
                }}
              />
            </Grid>
          );
        default:
          return null;
      }
    } else {
      return [...Array(3)].map((_v, i) => {
        return (
          <>
            <Grid item xs={6}>
              <TextValidator
                id={`userNames[${i}]`}
                name={`userNames[${i}]`}
                label={`${Vocabulary.userName} ${i + 1} `}
                value={props.model.userNames[i]}
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
                id={`emails[${i}]`}
                name={`emails[${i}]`}
                label={`${Vocabulary.email} ${i + 1} `}
                value={props.model.emails[i]}
                fullWidth
                validators={["required", "isEmail"]}
                errorMessages={[
                  Vocabulary.requiredField,
                  Vocabulary.emailValidation,
                ]}
                onChange={(event) => {
                  props.handleChange(event);
                }}
              />
            </Grid>
          </>
        );
      });
    }
  }

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={6}>
        <TextValidator
          id="country"
          name="country"
          label={Vocabulary.country}
          value={props.model.country}
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
          id="county"
          name="county"
          label={Vocabulary.county}
          value={props.model.county}
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
          id="city"
          name="city"
          label={Vocabulary.city}
          value={props.model.city}
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
          id="address"
          name="address"
          label={Vocabulary.address}
          value={props.model.address}
          fullWidth
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
      {getValidationContent()}
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

export default withStyles(styles, { withTheme: true })(ThirdStep);
