import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProduct: null,
    productData: null,
};

// creating action-reducer slice
export const ProductSlice = createSlice({
    name: "recipe_slice",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        setRecipeData: (state, action) => {
            state.productData = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedProduct, setRecipeData } = ProductSlice.actions;

export default ProductSlice.reducer;