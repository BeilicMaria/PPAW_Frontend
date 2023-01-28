import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { createStyles } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { useEffect,  useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Vocabulary } from "../Utils/Vocabulary";
import { Link, useNavigate } from "react-router-dom";
import { post, readCookie, UrlEnum } from "../Utils/Utils";
import { LoginModel } from "../Models/Models";
import { Visibility } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  classes: any;
};

function Login(props: Props) {
  const { classes } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginModel>(new LoginModel());
  const [showPassword, setShowPassword] = useState(false);

  /**
   *
   */
  useEffect(() => {
    if (readCookie("access_token")) {
      navigate("/");
    }
  }, []);

  /**
   *
   * @param event
   */
  function onChangeTextField(event: any) {
    const newUser: any = Object.assign({}, user);
    newUser[event.target.name] = event.target.value;
    setUser(newUser);
  }

  /**
   *
   */
  function handleSubmit() {
      const newUser: any = Object.assign({}, user);
      post(UrlEnum.login, newUser, { credentials: "include" }).then(
        (response) => {
          if (response.errors) {
            toast.error(response.errors);
          }
          if (response.access_token) {
            const expires = new Date(Date.now() + 180 * 10000000).toUTCString();
            document.cookie = `access_token=${response.access_token};expires=${expires};path=/`;
            document.cookie = `userName=${response.user.userName};expires=${expires};path=/`;
            document.cookie = `fullName=${response.user.fullName};expires=${expires};path=/`;
            localStorage.setItem("user", JSON.stringify(response.user));
            window.location.href = "/";
          }
        }
      );
    }
  

  return (
    <div className={classes.root}>
      <ToastContainer hideProgressBar={true} />
      <ValidatorForm
        className={classes.form}
        instantValidate={false}
        onSubmit={handleSubmit}
      >
        <TextValidator
          variant="filled"
          required={true}
          id="email"
          name="email"
          label={Vocabulary.email}
          validators={["required"]}
          value={user.email}
          onChange={(e) => onChangeTextField(e)}
          className={classes.textField}
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextValidator
          variant="filled"
          required={true}
          id="password"
          name="password"
          type={!showPassword ? "password" : "text"}
          label={Vocabulary.password}
          validators={["required"]}
          value={user.password}
          onChange={(e) => onChangeTextField(e)}
          className={classes.textField}
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{ color: "white" }}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <Visibility />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" type="submit" className={classes.button}>
          {Vocabulary.login}
        </Button>
      </ValidatorForm>
      <div className={classes.bottomText}>
        <Link to="/register" className={classes.text}>
          <Typography>{Vocabulary.requireRegister}</Typography>
        </Link>
        <Link to="/register" className={classes.text}>
          <Typography>{Vocabulary.resetPassword}</Typography>
        </Link>
      </div>
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#000",
      background:
        "radial-gradient(circle, rgba(74,74,74,1) 0%, rgba(0,0,0,1) 93%)",
    },
    textField: {
      margin: "5px !important",
      height: "50px",
      width: "300px",
      color: "#FFF !important",
      [theme.breakpoints.down("lg")]: {},
    },
    button: {
      height: "50px",
      width: "300px",
      marginTop: "30px !important",
    },
    form: {
      width: "60%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    image: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
      width: "450px",
    },
    text: {
      color: "#FFF",
      textDecoration: "inherit",
    },
    ReCAPTCHA: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginTop: 30,
    },
    bottomText: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "300px",
      marginTop: 10,
    },
  });

export default withStyles(styles, { withTheme: true })(Login);
