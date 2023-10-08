// libs

import React, {useEffect} from "react"
import { APP_BASE_URL } from "../shared/Constants"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setRecipeData, setSelectedProduct } from "../store/slice/ProductSlice"
import { RootState } from "../store/rootReducer"
import {useNavigate} from "react-router-dom"
import ProductsList from "../components/ProductsList"
import { ROUTE_CONSTANTS } from "../shared/Routes"

interface RecipeDataProps {
    id: Number,
    thumbnail?: string;     
    title?: string;
    description?: string;
}

const Home:React.FC = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productDataRed = useSelector((state: RootState) => state.product.productData) ?? []
    
    const handleClick = (data: RecipeDataProps) => {
        // dispatch(setSelectedProduct(data))
        console.log(`${ROUTE_CONSTANTS.PRODUCT_DETAILS}?action_id=${data?.id}`);
        
        navigate(`${ROUTE_CONSTANTS.PRODUCT_DETAILS}?action_id=${data?.id}`)
    }

    useEffect(() => {
        const getProductsdata = async () => {
            let URL = APP_BASE_URL
            const { data } = await axios.get(URL)
            dispatch(setRecipeData(data?.products))
        }
    
        getProductsdata()
    }, [])
    
    console.log(productDataRed);
    return (
        <>
            <div className='pt-12'>
                Home
                <div className='mb-2 p-2 w-4/5 mx-auto'>
                    {productDataRed?.length ? <ProductsList displayData={productDataRed} handleClick={handleClick} /> : (
                        <div className='mt-20 text-center text-2xl text-yellow-900 p-4 rounded-xl'>
                            Search Ingredient to get your desired dish 🎉
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home