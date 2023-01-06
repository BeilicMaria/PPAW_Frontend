import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Paper, Typography, Select } from "@mui/material";
import { Vocabulary } from "../../Utils/Vocabulary";
import { useEffect, useState } from "react";

type Props = {
  classes: any;
  handleChange: (event: any) => void;
  model: any;
  subscriptions: any;
};

function FourthStep(props: Props) {
  const { classes } = props;
  const [companySubscriptions, setCompanySubscriptions] = useState([]);

  /**
   *
   */
  useEffect(() => {
    const companyArray = props.subscriptions;
    setCompanySubscriptions(companyArray.slice(3, 7));
    handleChangeSubscription();
  }, []);

  /**
   *
   * @returns
   */
  function handleChangeSubscription() {
    switch (props.model.FK_userAccountId) {
      case "1":
      case "2":
        props.handleChange({
          target: {
            value: props.subscriptions[2].id,
            name: "FK_subscriptionId",
          },
        });
        return;
      case "3":
      case "4":
        props.handleChange({
          target: {
            value: props.subscriptions[1].id,
            name: "FK_subscriptionId",
          },
        });
        return;
      default:
        return null;
    }
  }

  /**
   *
   * @param subscription
   * @returns
   */
  function showSubscription(
    subscription: any,
    style: any,
    isCompany?: boolean
  ) {
    return (
      <Paper className={classes.paper}>
        <div className={style}>
          {Vocabulary.subscription}
          <Typography variant="h5" align="center">
            {subscription?.type}
          </Typography>
        </div>
        {!isCompany ? (
          <Typography className={classes.text} variant="h6" align="center">{`${
            props.model.FK_userAccountId === "2"
              ? subscription.price / 2
              : subscription.price
          } ${Vocabulary.currency}/${Vocabulary.month}`}</Typography>
        ) : null}

        <Typography className={classes.text} align="center" variant="subtitle1">
          {Vocabulary.subscriptionText}
        </Typography>
        {isCompany ? (
          <div className={classes.select}>
            <Select
              native
              required
              fullWidth
              value={
                props.model.FK_subscriptionId
                  ? props.model.FK_subscriptionId
                  : ""
              }
              id={"FK_subscriptionId"}
              name={"FK_subscriptionId"}
              onChange={(event) => {
                props.handleChange(event);
              }}
            >
              <option value="" selected disabled hidden>
                {Vocabulary.selectSubscriptions}
              </option>
              {companySubscriptions.map((value: any, key: any) => {
                return (
                  <option value={value.id} key={key}>
                    {`${value.type} ${value.price} lei/${value.valability} ${
                      key === 0 ? Vocabulary.month : Vocabulary.months
                    }`}
                  </option>
                );
              })}
            </Select>
          </div>
        ) : null}
      </Paper>
    );
  }
  return (
    <div className={classes.container}>
      {(() => {
        if (props.model.isUserAccount === "false") {
          return showSubscription(
            props.subscriptions[3],
            classes.subscriptionNameProfessional,
            true
          );
        }
        switch (props.model.FK_userAccountId) {
          case "1":
          case "2":
            return showSubscription(
              props.subscriptions[2],
              classes.subscriptionNamePremium
            );
          case "3":
          case "4":
            return showSubscription(
              props.subscriptions[1],
              classes.subscriptionNameBasic
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    container: {
      padding: 20,
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {},
    },
    paper: {
      margin: 20,
      width: "40%",
    },
    subscriptionNameProfessional: {
      backgroundColor: "#12A152",
      padding: 20,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    subscriptionNameBasic: {
      backgroundColor: "#348BB9",
      padding: 20,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    subscriptionNamePremium: {
      backgroundColor: "#FED049",
      padding: 20,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    text: {
      padding: 15,
    },
    select: {
      margin: 15,
    },
  });

export default withStyles(styles, { withTheme: true })(FourthStep);
