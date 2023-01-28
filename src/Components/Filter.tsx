import { withStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Vocabulary } from "../Utils/Vocabulary";

type Props = {
  classes: any;
  children: any;
  handleDeleteFilters: () => void;
};
function Filter(props: Props) {
  const { classes } = props;
  return (
    <Accordion className={classes.filtersAccordion}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{Vocabulary.filters}</Typography>
      </AccordionSummary>
      <div className={classes.filterContainer}>
        {props.children}
        <Button
          variant="contained"
          className={classes.restartFilter}
          onClick={props.handleDeleteFilters}
        >
          {Vocabulary.resetFilter}
        </Button>
      </div>
    </Accordion>
  );
}

const styles = (theme: any) =>
  createStyles({
    filtersAccordion: {
      marginBottom: 20,
      padding: 10,
      borderRadius: "5px !important",
    },
    filterContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    restartFilter: {
      alignSelf: "flex-end",
    },
  });
export default withStyles(styles, { withTheme: true })(Filter);
