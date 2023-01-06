import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";
import { Grid, InputLabel, Paper, Select } from "@mui/material";
import { useRef } from "react";
import CachedDataSingleton from "../Utils/CachedDataSingleton";
import Company from "./Company";
import Address from "./Address";

type Props = {
  classes: any;
  model: any;
};

function CompanyRequest(props: Props) {
  const cachedData = CachedDataSingleton.getInstance();
  const { classes } = props;
  const validatorRef = useRef<any>(null);
  const subscriptions = cachedData.get("subscriptions");
  return (
    <Paper className={classes.paper}>
      <ValidatorForm
        onSubmit={() => {
          console.log("Sdasdi");
        }}
        instantValidate={true}
        ref={validatorRef}
      >
        <Grid container spacing={2}>
          <Company model={props.model.company} />
          <Grid item xs={12} sm={8} md={4}>
            <TextValidator
              id="fullName"
              name="fullName"
              label={Vocabulary.fullName}
              value={props.model.fullName ? props.model.fullName : ""}
              fullWidth
              variant="standard"
              validators={["required"]}
              errorMessages={[Vocabulary.requiredField]}
              onChange={(event) => {
                //   props.handleChange(event);
                console.log(event);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <TextValidator
              id="userName"
              name="userName"
              label={Vocabulary.username}
              validators={["required"]}
              errorMessages={[Vocabulary.requiredField]}
              value={props.model.userName ? props.model.userName : ""}
              fullWidth
              variant="standard"
              onChange={(event) => {
                //   props.handleChange(event);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <TextValidator
              id="email"
              name="email"
              label={Vocabulary.email}
              validators={["required", "isEmail"]}
              errorMessages={[
                Vocabulary.requiredField,
                Vocabulary.emailValidation,
              ]}
              value={props.model.email ? props.model.email : ""}
              fullWidth
              variant="standard"
              onChange={(event) => {
                // props.handleChange(event);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <TextValidator
              type="number"
              id="phone"
              name="phone"
              label={Vocabulary.phone}
              validators={["required"]}
              errorMessages={[Vocabulary.requiredField]}
              value={props.model.phone ? props.model.phone : ""}
              fullWidth
              variant="standard"
              onChange={(event) => {
                // props.handleChange(event);
              }}
            />
          </Grid>
          <Address model={props.model.address} />
          <Grid item xs={12} sm={8} md={4}>
            <InputLabel style={{ fontSize: 12 }}>
              {Vocabulary.subscription}
            </InputLabel>
            <Select
              native
              required
              fullWidth
              variant="standard"
              value={
                props.model.FK_subscriptionId
                  ? props.model.FK_subscriptionId
                  : ""
              }
              id={"FK_subscriptionId"}
              name={"FK_subscriptionId"}
              onChange={(event) => {
                // props.handleChange(event);
              }}
              className={classes.select}
            >
              <option value="" selected disabled hidden>
                {Vocabulary.selectSubscriptions}
              </option>
              {subscriptions.map((value: any, key: any) => {
                return (
                  <option value={value.id} key={key}>
                    {`${value.type} ${value.price} lei/${value.valability} ${
                      key === 0 ? Vocabulary.month : Vocabulary.months
                    }`}
                  </option>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Paper>
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
  });
export default withStyles(styles, { withTheme: true })(CompanyRequest);
