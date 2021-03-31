import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from "@material-ui/core";
import { GlobalContext } from "../context/GlobalContext";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ShopItem = ({ id, name, price, image, cart, desc }) => {
  const { addCart } = useContext(GlobalContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          image={image} component="img" title={name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {`$${price}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button onClick={() => addCart(id)} disabled={cart}>
            {cart ? "Added to Cart" : "Add to cart"}
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {desc}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default ShopItem;
