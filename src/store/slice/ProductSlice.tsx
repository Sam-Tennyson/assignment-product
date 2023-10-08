import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductState {
    selectedProduct: any[] | null; 
    productData: any[] | null; 
  }

const initialState:ProductState = {
    selectedProduct: null,
    productData: null,
};

// creating action-reducer slice
export const ProductSlice = createSlice({
    name: "product_slice",
    initialState,
    reducers: {
        setSelectedProduct: (state, action: PayloadAction<any[]>) => {
            state.selectedProduct = action.payload
        },
        setRecipeData: (state, action: PayloadAction<any[]>) => {
            state.productData = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedProduct, setRecipeData } = ProductSlice.actions;

export default ProductSlice.reducer;