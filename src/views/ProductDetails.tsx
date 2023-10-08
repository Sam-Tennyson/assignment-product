// libs
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// constants
import { APP_BASE_URL } from '../shared/Constants';
import { ROUTE_CONSTANTS } from "../shared/Routes";

// components
import Loader from "../components/Loader";

// actions
import { setBagData } from "../store/slice/BagSlice";
import { RootState } from "../store/rootReducer";

interface ProductProps {
    id: number;
    thumbnail: string;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    stock?: number;
    rating?: number;
}

const ProductDetails: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const [productData, setProductData] = useState<ProductProps | any>();
    const [isAdded, setIsAdded] = useState<boolean>(false);

    const bagDataRed = useSelector((state: RootState) => state.bag.bagData) ?? []

    let action_id = searchParams.get('action_id')

    const handleBagClick = () => {
        if (productData) dispatch(setBagData({ ...productData }))
    }

    const isPresentProduct = (data: ProductProps) => {
        let isPresent = bagDataRed.findIndex(item => item?.id === data?.id)
        if (isPresent !== -1) setIsAdded(true)
    }

    useEffect(() => {
        if (productData) isPresentProduct(productData)
    }, [bagDataRed, productData])

    useEffect(() => {
        const getProductsdata = async () => {
            let URL = APP_BASE_URL + `/${action_id}`
            const { data } = await axios.get(URL)
            isPresentProduct(data)
            setProductData(data);
        }

        getProductsdata()
    }, [])

    return (
        <>
            {!!productData ? (
                <div className="">
                    <div className="mb-4 flex  items-start justify-between  ">
                        <h2 className="md:text-4xl underline mb-4 text-lg font-semibold">Product Details</h2>
                        <button className='text-sm md:p-2 p-1 flex items-center justify-start rounded-md font-medium bg-yellow-500' onClick={() => navigate(ROUTE_CONSTANTS.HOME)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
						More products</button>
                    </div>
                    <div className="grid grid-cols-8 gap-4">
                        <div className="md:col-start-1 md:col-end-3 sm:col-start-1 sm:col-end-5 col-start-1 col-end-9 mx-auto ">
                            <img
                                src={productData?.thumbnail} alt="thumbnails"
                                className="shadow-xl rounded-md  "
                            />
                            {isAdded ? (
                                <>
                                    <button className="w-full mt-2 p-4 rounded-lg text-lg font-medium text-white bg-red-500 border-0 tracking-wide"
                                        onClick={() => navigate(ROUTE_CONSTANTS.BAGS)}
                                    >Go to Bag</button>
                                </>
                            ) : (
                                <button className="w-full mt-2 p-4 border-2 border-red-300 rounded-lg text-lg font-medium hover:text-white hover:bg-red-500 hover:border-0 tracking-wide"
                                    onClick={handleBagClick}
                                >Add to Bag</button>
                            )}
                        </div>
                        <div className="md:col-start-3 md:col-end-9 sm:col-start-5 sm:col-end-9 col-start-1 col-end-9 text-left ">
                            <div className="product-detail-card-border">
                                <div className="flex justify-between">

                                    <h2 className="md:text-2xl text-left mb-5 text-lg font-medium" >{productData?.title}</h2>
                                    <div className='flex items-center justify-between relative mb-4'>
                                        <div className='text-sm  bg-green-700 p-2 mb-2 w-auto flex items-center justify-start text-white rounded-md '>
                                            <span className='pr-2'>{productData?.rating}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill='#fff' ><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='md:text-sm   text-md flex items-center justify-start mb-5 '>
                                    <span className='mr-4  md:text-3xl font-medium' >&#8377; {productData?.price?.toLocaleString('en-US')}</span>
                                    <span className=' line-through mr-4' > &#8377; {Math.floor(((productData?.price ?? 1) * 100) / (100 - (productData?.discountPercentage ?? 0)))?.toLocaleString('en-US')}</span>
                                    <span className='mr-2 font-medium ' >{productData?.discountPercentage} % off</span>
                                </div>
                                <p className="text-sm tracking-wide">
                                    {productData?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loader />}
        </>
    )
}

export default ProductDetails