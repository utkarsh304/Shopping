import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { uiActions } from "./store/ui-slice";                         // Option-1
import Notification from "./components/UI/Notification";
// import { sendCartData } from "./store/cart-slice";                    // Option-2
import { sendCartData, fetchCartData } from "./store/cart-actions";      // Option-2

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  // Option-1(Inside the components using useEffect()) :- 
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "Pending",
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );

  //     const response = await fetch('https://redux-advanced-1c313-default-rtdb.firebaseio.com/cart.json', {
  //       method: "PUT",
  //       body: JSON.stringify(cart)
  //     });

  //     if (!response.ok) {
  //       throw new Error("Sending cart data failed.");
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "Success",
  //         title: "Success!",
  //         message: "Sent cart data successfully!",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "Error",
  //         title: "Error!",
  //         message: "Sent cart data failed!",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  // Option-2(using action creators/Thunks) :-

  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(() => {
    if (isInitial){
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification &&
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
