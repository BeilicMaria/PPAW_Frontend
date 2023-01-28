import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Grid, InputLabel, Select, TextField } from "@mui/material";
import { TextValidator } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CachedDataSingleton from "../Utils/CachedDataSingleton";

type Props = {
  classes: any;
  model: any;
  handleChange: (event: any) => void;
};

function User(props: Props) {
  const cachedData = CachedDataSingleton.getInstance();
  const roles = cachedData.get("roles");
  const { classes } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <TextValidator
            id="userName"
            name="userName"
            label={Vocabulary.userName}
            value={props.model ? props.model.userName : ""}
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
            type="password"
            id="password"
            name="password"
            label={Vocabulary.password}
            value={props.model ? props.model.password : ""}
            validators={props.model?.id ? [] : ["required"]}
            errorMessages={[props.model?.id ? "" : Vocabulary.requiredField]}
            fullWidth
            variant="standard"
            onChange={(event) => {
              props.handleChange(event);
            }}
          />
        </Grid>
        {props.model?.id ? null : (
          <Grid item xs={12} sm={12} md={4}>
            <TextValidator
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              label={Vocabulary.passwordConfirmation}
              value={props.model ? props.model.password_confirmation : ""}
              fullWidth
              validators={["required"]}
              errorMessages={[Vocabulary.requiredField]}
              variant="standard"
              onChange={(event) => {
                props.handleChange(event);
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={4}>
          <TextValidator
            id="lastName"
            name="lastName"
            label={Vocabulary.lastName}
            value={props.model ? props.model.lastName : ""}
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
            id="firstName"
            name="firstName"
            label={Vocabulary.firstName}
            validators={["required"]}
            errorMessages={[Vocabulary.requiredField]}
            value={props.model ? props.model.firstName : ""}
            fullWidth
            variant="standard"
            onChange={(event) => {
              props.handleChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextValidator
            id="email"
            name="email"
            label={Vocabulary.email}
            validators={["required", "isEmail"]}
            errorMessages={[
              Vocabulary.requiredField,
              Vocabulary.emailValidation,
            ]}
            value={props.model ? props.model.email : ""}
            fullWidth
            variant="standard"
            onChange={(event) => {
              props.handleChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextValidator
            type="number"
            id="phone"
            name="phone"
            label={Vocabulary.phone}
            validators={["required"]}
            errorMessages={[Vocabulary.requiredField]}
            value={props.model ? props.model.phone : ""}
            fullWidth
            variant="standard"
            onChange={(event) => {
              props.handleChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={props.model ? props.model.dateOfBirth : null}
              className={`disableWrapper ${classes.datePicker}`}
              openTo="year"
              views={["year", "month", "day"]}
              onChange={(newValue) => {
                const event = {
                  target: { name: "dateOfBirth", value: newValue },
                };
                props.handleChange(event);
              }}
              renderInput={(params) => <TextField required {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
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
            value={props.model ? props.model.FK_roleId : ""}
            id={"FK_roleId"}
            name={"FK_roleId"}
            onChange={(event) => {
              props.handleChange(event);
            }}
          >
            <option value="" selected disabled hidden></option>
            {roles?.map((value: any, key: any) => {
              return (
                <option value={value.id} key={key}>
                  {value.role}
                </option>
              );
            })}
          </Select>
        </Grid>
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
    datePicker: {
      width: "100%",
    },
  });

export default withStyles(styles, { withTheme: true })(User);
