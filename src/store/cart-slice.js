import { createSlice } from "@reduxjs/toolkit";
// import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItems = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItems) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItems.quantity++;
                existingItems.totalPrice = existingItems.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

// Option-2(using action creator) :-
// export const sendCartData = (cart) => {
//     return async (dispatch) => {
//         dispatch(
//             uiActions.showNotification({
//                 status: "Pending",
//                 title: "Sending...",
//                 message: "Sending cart data!",
//             })
//         );

//         const sendRequest = async () => {
//             const response = await fetch(
//                 'https://redux-advanced-1c313-default-rtdb.firebaseio.com/cart.json',
//                 {
//                     method: "PUT",
//                     body: JSON.stringify(cart)
//                 });

//             if (!response.ok) {
//                 throw new Error("Sending cart data failed.");
//             }
//         };

//         try {
//             await sendRequest();

//             dispatch(
//                 uiActions.showNotification({
//                     status: "Success",
//                     title: "Success!",
//                     message: "Sent cart data successfully!",
//                 })
//             );
//         } catch (error) {
//             dispatch(
//                 uiActions.showNotification({
//                     status: "Error",
//                     title: "Error!",
//                     message: "Sent cart data failed!",
//                 })
//             );
//         }
//     };
// };

export const cartActions = cartSlice.actions;
export default cartSlice;