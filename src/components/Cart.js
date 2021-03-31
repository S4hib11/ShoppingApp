import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Badge,
  Button
} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Delete, Add, ShoppingCart } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '10px'
  },
  accordianStyle: {
    marginBottom: '20px',
    marginTop: '20px'
  },
  checkout: {
    backgroundColor: '#1abc9c',
    border: 'none',
    color: 'black',
    padding: '5px 5px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '5px 5px',
    cursor: 'pointer',
    float: 'right'
  },
  successAlert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const Cart = () => {
  const context = useContext(GlobalContext);
  const classes = useStyles();
  const [success, setSuccess] = useState(false);

  const amount = context.cartItems
    .map(item => item.price * item.qty)
    .reduce((acc, i) => (acc += i), 0)
    .toFixed(2);

  const items = context.cartItems
    .map(item => item.qty)
    .reduce((acc, i) => (acc += i), 0);

  const CartEmpty = () => (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100px" }}
    >
      <Typography variant="h5">You have no items in your cart</Typography>
    </Grid>
  );

  const checkout = (qty) => {
    if (qty > 0) {
      setSuccess(true);
    }
  }

  return (
    <React.Fragment>
      <Accordion className={classes.accordianStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Badge badgeContent={items} color="error">
              <ShoppingCart fontSize="large" />
            </Badge>
            <Typography variant="h4">Cart</Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ marginBottom: "2%" }}
          >
            {context.cartItems.length === 0 ? (
              <CartEmpty />
            ) : (
              <Grid container spacing={5} alignItems="center" justify="center">
                <Grid item xs={12} sm={7}>
                  <List style={{ width: "100%" }}>
                    {context.cartItems.map((item, i) => (
                      <ListItem key={i} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            alt={item.title}
                            src={item.image}
                            style={{
                              width: "70px",
                              height: "60px",
                              marginRight: "10px"
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {`$${item.price}`}
                              </Typography>
                              <Typography variant="body2">Qty: {item.qty}</Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => context.removeCart(item.id)}>
                            <Delete />
                          </IconButton>
                          <IconButton onClick={() => context.increaseQty(item.id)}>
                            <Add />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5">Total Price</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {`$${amount}`}
                  </Typography>
                  <br />
                  <Typography variant="h5">Total Items</Typography>

                  <Typography variant="body2" color="textSecondary">
                    {items}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
        {success &&
          <div className={classes.successAlert}>
            <Collapse in={success}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Your order was successful and will be delivered to you soon. Happy Shopping!
        </Alert>
            </Collapse>
          </div>
        }
        <Button className={classes.checkout} onClick={() => checkout(context.cartItems.length)}>Checkout</Button>
      </Accordion>
    </React.Fragment>
  );
};
export default Cart;
