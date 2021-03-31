import React, { useContext, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { GlobalContext } from "../context/GlobalContext";
import ShopItem from "./ShopItem";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  searchbar: {
    width: '90%',
  },
}));

const Shop = (props) => {
  const context = useContext(GlobalContext);
  const { data, setData } = props;
  const [allData, setAllData] = useState(context.items);
  const classes = useStyles();
  let filteredData = [];

  const search = (event) => {
    if (event.target.value) {
      filteredData = allData.filter(row => row.title.toLowerCase().includes(event.target.value));
      setData(filteredData);
    }
    else {
      filteredData = allData;
      setData(filteredData);
    }
  }

  return (
    <Grid container spacing={2} justify="center">
      <TextField id="outlined-basic" label="Search" variant="outlined" className={classes.searchbar} onChange={() => search(event)} />
      {data.map((item, index) => (
        <Grid item key={index}>
          <ShopItem
            id={item.id}
            name={item.title}
            desc={item.description}
            price={item.price}
            image={item.image}
            cart={item.cart}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Shop;
