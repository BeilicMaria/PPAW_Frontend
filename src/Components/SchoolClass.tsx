import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";

type Props = {
  classes: any;
  model: any;
  handleChange: (event: any) => void;
};

function SchoolClass(props: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
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
      <Grid item xs={12} sm={12} md={6}>
        <TextValidator
          id="schoolYear"
          name="schoolYear"
          label={Vocabulary.schoolYear}
          value={props.model ? props.model.schoolYear : ""}
          fullWidth
          variant="standard"
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            props.handleChange(event);
          }}
        />
      </Grid>
    </Grid>
  );
}

const styles = (theme: any) => createStyles({});

export default withStyles(styles, { withTheme: true })(SchoolClass);
