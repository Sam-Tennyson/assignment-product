import React, { useState } from 'react'
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
		rating?: number;
		price?: number | 1;
		discountPercentage?: number | 1;
	},
	key: string | number;
	handleClick: (data: any) => void;
}

const CommonCard: React.FC<CommonCardProps> = ({ data, key, handleClick }) => {
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
			className='border border-gray-200 rounded-lg shadow cursor-pointer hover:border-gray-200 hover:border-2 p-4 text-left'
			onClick={() => handleClick(data)}
		>
			<div className='flex items-center justify-center '>
				{isLoading && <Loader />}
				<img
					className={`rounded-t-lg h-40 w-full object-contain p-8 ${isLoading ? 'hidden' : 'visited:'} `}
					src={data?.thumbnail}
					onLoad={handleImageLoad}
					onError={handleImageError}
					alt=""
				/>
			</div>
			<div className='flex items-center justify-between relative mb-4'>
				<div className='text-sm  bg-green-700 p-2 mb-2 w-auto flex items-center justify-start text-white rounded-md absolute -top-6'>
					<span className='pr-2'>{data?.rating}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill='#fff' ><path  d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
				</div>
			</div>
			<div className='md:text-sm  xs:text-xs text-xs flex items-center justify-between mb-2'>
				<span className='' >&#8377; {data?.price}</span> 
				<span className='text-xs line-through' > &#8377; {Math.floor(((data?.price ?? 1) *100)/(100-(data?.discountPercentage ?? 0)))}</span> 
				<span className='' >{data?.discountPercentage} % off</span>
			</div>
			<div className='text-xl mb-2'>{data?.title}</div>
		</div>
	);
}

const ProductsList: React.FC<ProductsListProps> = ({
	displayData, handleClick
}) => {
	return (
		<div className='grid lg:grid-cols-4 md:grid-cols-3 gap-3 xs:grid-cols-2 '>
			{displayData?.map((item) => (
				<CommonCard key={item?._id} data={item} handleClick={handleClick} />
			))}
		</div>
	)
}

export default ProductsList