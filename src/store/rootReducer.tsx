import { combineReducers } from 'redux';

// Import your individual reducers here
import ProductSlice from './slice/ProductSlice';
import BagSlice from './slice/BagSlice';

// Combine the reducers into one root reducer
const rootReducer = combineReducers({
    product: ProductSlice,
    bag: BagSlice
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;