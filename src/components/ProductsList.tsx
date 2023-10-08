import React , {useState} from 'react'
import Loader from './Loader';

interface ProductsListProps {
    displayData: any[],
    handleClick: (data: any) => void;
}

interface CommonCardProps {
    data: {
        thumbnail?: string;     
        title?: string;
        description?: string;
    },
    key: string | number;
    handleClick: (data: any) => void;
}

const CommonCard:React.FC<CommonCardProps> = ({data, key, handleClick}) => {
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
        className='border border-gray-200 rounded-lg shadow cursor-pointer hover:border-gray-200 hover:border-2'
        onClick={() => handleClick(data)}
      >
        <div className='flex items-center justify-center '>
          {isLoading && <Loader />}
          <img
            className={`rounded-t-lg h-40 w-full object-cover ${isLoading ? 'hidden' : 'visited:'} `}
            src={data?.thumbnail}
            onLoad={handleImageLoad}
            onError={handleImageError}
            alt=""
          />
        </div>
        <div className='text-base sm:text-xs p-2'>{data?.title}</div>
        <div className='recipe-title'>{data?.description}</div>
      </div>
    );
}

const ProductsList:React.FC<ProductsListProps> = ({
    displayData, handleClick
}) => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-3 sm:grid-cols-2'>
      {displayData?.map((item) => (
        <CommonCard key={item?._id} data={item} handleClick={handleClick} />
      ))}
    </div>
  )
}

export default ProductsList