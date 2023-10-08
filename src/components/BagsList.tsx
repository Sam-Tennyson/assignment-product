import React, { useState } from 'react'
import Loader from './Loader';

interface BagsListProps {
    displayData: any[],
    handleIncrement: (data: any) => void;
    handleDecrement: (data: any) => void;
    handleDeleteProduct: (data: any) => void;
}

interface CommonCardProps {
    data: {
        thumbnail?: string;
        title?: string;
        description?: string;
        rating?: number;
        qty?: number;
        price?: number | 1;
        discountPercentage?: number | 1;
    },
    key: string | number;
    handleIncrement: (data: any) => void;
    handleDecrement: (data: any) => void;
    handleDeleteProduct: (data: any) => void;
}

const CommonCard: React.FC<CommonCardProps> = ({
    data,
    key,
    handleIncrement,
    handleDecrement,
    handleDeleteProduct
}) => {

    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
    };

    return (
        <div
            key={key}
            className='border border-gray-200 rounded-lg shadow  hover:border-gray-200 hover:border-2 p-4 text-left mb-4'
        >
            <div className="grid grid-cols-2">
                <div className="mb-3">
                    {isLoading && <Loader />}
                    <img
                        className={`rounded-t-lg h-40 w-full object-contain p-8 ${isLoading ? 'hidden' : 'visited:'} `}
                        src={data?.thumbnail}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        alt=""
                    />
                </div>
                <div className='mb-3'>
                    <div className='flex items-center justify-between relative'>
                        <div className='text-xl mb-2 font-medium'>{data?.title}</div>
                        <em className='absolute -right-3 -top-4 cursor-pointer'
                            onClick={() => handleDeleteProduct(data)}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></em>
                    </div>
                    <div className='flex items-center justify-start' >
                        <button
                            className='font-medium  p-1 rounded-2xl border-2 border-green-500 cursor-pointer'
                            onClick={() => handleIncrement(data)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#008000' width="24" height="24" viewBox="0 0 24 24"><path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"></path></svg></button>
                        <span className='text-xl mx-2'>{data?.qty}</span>
                        <button
                            className='font-medium p-1 rounded-2xl border-2 border-red-500 cursor-pointer'
                            onClick={() => handleDecrement(data)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill='#ff0000' width="24" height="24" viewBox="0 0 24 24" ><path d="M5 11h14v2H5z"></path></svg>
                        </button>
                    </div>
                    <div className='mb-3 font-semibold text-lg'> &#8377; {((data?.qty ?? 1) * (data?.price ?? 1))?.toLocaleString('en-US')}</div>
                </div>
            </div>
        </div>
    );
}

const BagsList: React.FC<BagsListProps> = ({
    displayData,
    handleIncrement,
    handleDecrement,
    handleDeleteProduct
}) => {
    return (
        <div className='grid grid-cols-1 md:w-1/2  '>
            {displayData?.map((item) => (
                <CommonCard
                    key={item?.id}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    handleDeleteProduct={handleDeleteProduct}
                    data={item}
                />
            ))}
        </div>
    )
}

export default BagsList