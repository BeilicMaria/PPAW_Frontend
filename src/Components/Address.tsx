import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";
import { Grid } from "@mui/material";

type Props = {
  classes: any;
  model: any;
};

function Address(props: Props) {
  return (
    <>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          id="country"
          name="country"
          label={Vocabulary.country}
          value={props.model.country ? props.model.country : ""}
          fullWidth
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            // props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          id="county"
          name="county"
          label={Vocabulary.county}
          value={props.model.county ? props.model.county : ""}
          fullWidth
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            // props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          id="city"
          name="city"
          label={Vocabulary.city}
          value={props.model.city ? props.model.city : ""}
          fullWidth
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            // props.handleChange(event);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          id="address"
          name="address"
          label={Vocabulary.address}
          value={props.model.address ? props.model.address : ""}
          fullWidth
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
          onChange={(event) => {
            // props.handleChange(event);
          }}
        />
      </Grid>
    </>
  );
}

const styles = (theme: any) => createStyles({});
export default withStyles(styles, { withTheme: true })(Address);
