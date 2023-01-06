import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";
import { Grid, InputLabel, Select } from "@mui/material";
import CachedDataSingleton from "../Utils/CachedDataSingleton";

type Props = {
  classes: any;
  model: any;
};

function Company(props: Props) {
  const cachedData = CachedDataSingleton.getInstance();
  const { classes } = props;
  const companyCategories = cachedData.get("companyCategories");

  return (
    <>
      <Grid item xs={12} sm={8} md={4}>
        <InputLabel style={{ fontSize: 12 }}>
          {Vocabulary.accountType}
        </InputLabel>
        <Select
          label={Vocabulary.accountType}
          className={classes.select}
          native
          required
          fullWidth
          variant="standard"
          value={props.model.FK_categoryId ? props.model.FK_categoryId : ""}
          id={"FK_categoryId"}
          name={"FK_categoryId"}
          onChange={(event) => {
            // props.handleChange(event);
          }}
        >
          <option value="" selected disabled hidden></option>
          {companyCategories.map((value: any, key: any) => {
            return (
              <option value={value.id} key={key}>
                {value.category}
              </option>
            );
          })}
        </Select>
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          variant="standard"
          id="name"
          name="name"
          label={Vocabulary.companyName}
          value={props.model.name ? props.model.name : ""}
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
          variant="standard"
          id="CUI"
          name="CUI"
          label={Vocabulary.CUI}
          value={props.model.CUI ? props.model.CUI : ""}
          fullWidth
          onChange={(event) => {
            // props.handleChange(event);
          }}
          validators={["matchRegexp:^RO.[0-9]{0,8}$|[0-9]{0,8}$", "required"]}
          errorMessages={[Vocabulary.cuiValidation, Vocabulary.requiredField]}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          variant="standard"
          id="registerNo"
          name="registerNo"
          label={Vocabulary.registerNo}
          value={props.model.registerNo ? props.model.registerNo : ""}
          fullWidth
          onChange={(event) => {
            // props.handleChange(event);
          }}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          variant="standard"
          id="representativeName"
          name="representativeName"
          label={Vocabulary.representativeName}
          value={
            props.model.representativeName ? props.model.representativeName : ""
          }
          fullWidth
          onChange={(event) => {
            // props.handleChange(event);
          }}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          variant="standard"
          id="email"
          name="email"
          label={Vocabulary.email}
          value={props.model.email ? props.model.email : ""}
          fullWidth
          onChange={(event) => {
            // props.handleChange(event);
          }}
          validators={["required", "isEmail"]}
          errorMessages={[Vocabulary.requiredField, Vocabulary.emailValidation]}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <TextValidator
          variant="standard"
          id="phone"
          name="phone"
          label={Vocabulary.phone}
          value={props.model.phone ? props.model.phone : ""}
          fullWidth
          onChange={(event) => {
            // props.handleChange(event);
          }}
          validators={["required"]}
          errorMessages={[Vocabulary.requiredField]}
        />
      </Grid>
    </>
  );
}

const styles = (theme: any) =>
  createStyles({
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
  });
export default withStyles(styles, { withTheme: true })(Company);
