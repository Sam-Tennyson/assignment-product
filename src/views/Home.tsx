// libs
import React, {useEffect} from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"

// components
import ProductsList from "../components/ProductsList"

// actions
import { setRecipeData } from "../store/slice/ProductSlice"

// constants
import { APP_BASE_URL } from "../shared/Constants"
import { RootState } from "../store/rootReducer"

// routes
import { ROUTE_CONSTANTS } from "../shared/Routes"

interface RecipeDataProps {
    id: number,
}

const Home:React.FC = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productDataRed = useSelector((state: RootState) => state.product.productData) ?? []
    
    const handleClick = (data: RecipeDataProps) => {
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
            <div className='mx-auto'>
                <h2 className="text-4xl underline mb-4 text-left">List of Products</h2>
                <div className='mb-2 w-full '>
                    {productDataRed?.length ? <ProductsList displayData={productDataRed} handleClick={handleClick} /> :null}
                </div>
            </div>
        </>
    )
}

export default Home