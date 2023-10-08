import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BagState {
    bagData: any[];
    bagData_count: number;
    total_price: number;
}

const initialState: BagState = {
    bagData: [],
    bagData_count: 0,
    total_price: 0
};

// creating action-reducer slice
export const BagSlice = createSlice({
    name: "bag_slice",
    initialState,
    reducers: {
        setBagData: (state, action: PayloadAction<any[]>) => {
            state.bagData = [...state.bagData, { qty: 1, ...action.payload }]
            state.bagData_count = state.bagData?.length
            state.total_price = state.bagData.reduce((sum, product) => {
                return sum + (product.price * product.qty);
            }, 0)
        },
        incrementQty: (state, action: PayloadAction<number>) =>{
         
            const product = state.bagData.find(item => item?.id === action.payload)
            product.qty += 1
            const updated_product = product;
            const newArray = state.bagData.map((obj) =>obj.id === updated_product.id ? updated_product : obj);
            state.bagData = newArray
            state.total_price = newArray.reduce((sum, product) => {
                return sum + (product.price * product.qty);
            }, 0)

        },
        decrementQty: (state, action: PayloadAction<any[]>) =>{
            const product = state.bagData.find(item => item?.id === action.payload)
            if (product?.qty > 1) {
                product.qty -= 1
                const updated_product = product;
                const newArray = state.bagData.map((obj) =>obj.id === updated_product.id ? updated_product : obj);
                state.bagData = newArray
                state.total_price = newArray.reduce((sum, product) => {
                    return sum + (product.price * product.qty);
                }, 0)
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const { setBagData, incrementQty, decrementQty } = BagSlice.actions;

export default BagSlice.reducer;