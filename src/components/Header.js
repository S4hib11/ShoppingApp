import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  head: {
    background: "#1abc9c",
  },
  header: {
    padding: "40px",
    paddingBottom: "10px",
    textAlign: "center",
    color: "white"
  },
  subHeading: {
    padding: "15px",
    color: "white",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.head}
    >
      <Typography variant="h3" className={classes.header}>Shopify</Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom className={classes.subHeading}>
        Shop till you drop, from your favourite App
      </Typography>
    </Grid>
  );
};

export default Header;
