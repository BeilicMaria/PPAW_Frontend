import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { Vocabulary } from "../../Utils/Vocabulary";
import { WizardModel } from "../../Models/Models";

type Props = {
  classes: any;
  handleChange: (event: any) => void;
  model: WizardModel;
  accounts: any;
  companyCategories: any;
};

function FirstStep(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <InputLabel>{Vocabulary.selectAccountType}</InputLabel>
      <RadioGroup
        value={props.model.isUserAccount}
        row
        id={"isUserAccount"}
        name={"isUserAccount"}
        onChange={(event) => {
          props.handleChange(event);
        }}
      >
        <FormControlLabel
          value={"true"}
          control={<Radio />}
          label={Vocabulary.naturalPerson}
        />
        <FormControlLabel
          value={"false"}
          control={<Radio />}
          label={Vocabulary.legalPerson}
        />
      </RadioGroup>
      {props.model.isUserAccount === "true" ? (
        <>
          <InputLabel>{Vocabulary.selectRole}</InputLabel>
          <Select
            native
            required
            fullWidth
            value={
              props.model.FK_userAccountId ? props.model.FK_userAccountId : ""
            }
            id={"FK_userAccountId"}
            name={"FK_userAccountId"}
            onChange={(event) => {
              props.handleChange(event);
            }}
          >
            <option value="" selected disabled hidden></option>
            {props.accounts.map((value: any, key: any) => {
              return (
                <option value={value.id} key={key}>
                  {value.account}
                </option>
              );
            })}
          </Select>
        </>
      ) : (
        <>
          <InputLabel>{Vocabulary.selectRole}</InputLabel>
          <Select
            native
            required
            fullWidth
            value={props.model.FK_categoryId ? props.model.FK_categoryId : ""}
            name="FK_categoryId"
            onChange={(event) => {
              props.handleChange(event);
            }}
          >
            <option value="" selected disabled hidden></option>
            {props.companyCategories.map((value: any, key: any) => {
              return (
                <option value={value.id} key={key}>
                  {value.category}
                </option>
              );
            })}
          </Select>
        </>
      )}
    </div>
  );
}
const styles = (theme: any) =>
  createStyles({
    container: {
      padding: 20,
      [theme.breakpoints.down("md")]: {},
    },
  });

export default withStyles(styles, { withTheme: true })(FirstStep);
