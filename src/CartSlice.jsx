import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      let found = state.items.find((itm) =>itm.name === name );
      if (found) {
        found.quantity++; 
      }
      else {
        state.items.push({name, image, cost, quantity: 1});
      }
      state.total++; 
    },
    removeItem: (state, action) => {
      const name = action.payload;
      let foundIdx = state.items.findIndex((itm) =>itm.name === name );
      if (foundIdx > -1) {
        state.total-=state.items[foundIdx].quantity; 
        state.items.splice(foundIdx, 1); 
      }
    },
    updateQuantity: (state, action) => {
      let { name, quantity } = action.payload;
      //console.log("name is: " + name + " type: " + typeof name);
      name = JSON.stringify(name).replace(/[\[\]"]/g, ''); 
      let found = state.items.find((itm) =>itm.name.trim() === name.trim() );
      if (found) {
        state.total = state.total -found.quantity + quantity;
        found.quantity = quantity;
      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
