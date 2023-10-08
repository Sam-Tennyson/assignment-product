import { combineReducers } from 'redux';

// Import your individual reducers here
import ProductSlice from './slice/ProductSlice';

// Combine the reducers into one root reducer
const rootReducer = combineReducers({
    product: ProductSlice
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
export default rootReducer;