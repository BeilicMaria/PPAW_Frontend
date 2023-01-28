import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";

type Props = {
  classes: any;
  model: any;
  handleChange: (event: any) => void;
  handleCheckBox: (event: any) => void;
};

function Subject(props: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4}>
        <TextValidator
          id="name"
          name="name"
          label={Vocabulary.name}
          value={props.model ? props.model.name : ""}
          fullWidth
          variant="standard"
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextValidator
          id="credits"
          name="credits"
          type="number"
          label={Vocabulary.credits}
          value={props.model ? props.model.credits : ""}
          fullWidth
          variant="standard"
          validators={["required", "minNumber:1", "maxNumber: 10"]}
          errorMessages={[
            Vocabulary.requiredField,
            Vocabulary.minValue,
            Vocabulary.maxValue,
          ]}
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} style={{ paddingTop: 30 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.model ? props.model.isMandatory : false}
              onChange={props.handleCheckBox}
            />
          }
          label={Vocabulary.isMandatory}
        />
      </Grid>
    </Grid>
  );
}

const styles = (theme: any) => createStyles({});

export default withStyles(styles, { withTheme: true })(Subject);
