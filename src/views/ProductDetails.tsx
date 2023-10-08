// libs
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";

// constants
import { APP_BASE_URL } from '../shared/Constants';
import Loader from "../components/Loader";

interface ProductProps {
    thumbnail: string;
    title?: string; 
    description?: string;
    price?: number;
    discountPercentage?: number;
    stock?: number;
  }

const ProductDetails:React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [productData, setProductData] = useState<ProductProps>();

    let action_id = searchParams.get('action_id')

    useEffect(() => {
        const getProductsdata = async () => {
            let URL = APP_BASE_URL+`/${action_id}`
            const { data } = await axios.get(URL)
            setProductData(data);
        }
    
        getProductsdata()
    }, [])

    return (
    <>
        {!!productData ? (
            <div className="">
                <h2 className="text-4xl underline mb-4">Product Details</h2>
                <div className="grid grid-cols-8 gap-4">
                    <div className="md:col-start-1 md:col-end-3">
                        <img 
                            src={productData?.thumbnail} alt="thumbnails" 
                            className="shadow-xl rounded-md"
                        />
                    </div>
                    <div className="md:col-start-4 md:col-end-8 text-left">
                        <div className="product-detail-card-border">
                            <h2 className="text-2xl text-left" >{productData?.title}</h2>
                            <div className="my-2">
                              <span>&#8377;{productData?.price?.toLocaleString('en-US')}</span> | <span>{productData?.discountPercentage} % off</span>
                            </div>
                            <p className="text-sm tracking-tight md:tracking-wide"> 
                                {productData?.description} 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ): <Loader /> }
    </>
  )
}

export default ProductDetails