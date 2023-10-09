// libs
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// components
import BagsList from '../components/BagsList'

// actions
import { decrementQty, deleteProduct, incrementQty } from '../store/slice/BagSlice'

// actions
import { ROUTE_CONSTANTS } from '../shared/Routes'

// rootstate proptype
import { RootState } from '../store/rootReducer'

interface BagProps {
	id: number;
	thumbnail: string;
	title?: string;
	price?: number;
	rating?: number;
	qty?: number;
}

const Bag: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const bagDataRed = useSelector((state: RootState) => state.bag.bagData) ?? []
	const bagDataCountRed = useSelector((state: RootState) => state.bag.bagData_count) ?? 0
	const totalPriceRed = useSelector((state: RootState) => state.bag.total_price) ?? 0

	const handleIncrement = (data: BagProps) => dispatch(incrementQty(data?.id))
	const handleDecrement = (data: BagProps) => { ((data?.qty ?? 1) > 1) && dispatch(decrementQty(data?.id)) }
	const handleDeleteProduct = (data: BagProps) => { dispatch(deleteProduct(data?.id)) }

	return (
		<>
			<div className='text-center'>
				<h2 className="text-4xl underline mb-4 ">Bags Details</h2>
				{totalPriceRed ? (
						<div className='text-lg mb-4 font-medium'>Total: <span className='font-semimedium'>&#8377;{totalPriceRed?.toLocaleString('en-US')}</span></div>
					): null}
				{
					bagDataCountRed < 1 ? (
						<div className='w-1/3 mx-auto'>
						<button className='w-full p-2 flex items-center justify-start rounded-md font-medium bg-yellow-500' onClick={() => navigate(ROUTE_CONSTANTS.HOME)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
							You can add products</button>
					</div>
					) : null
				}
				<div className='mb-2 w-full mx-auto'>
					{bagDataRed?.length ? (
						<BagsList
							displayData={bagDataRed}
							handleIncrement={handleIncrement}
							handleDecrement={handleDecrement}
							handleDeleteProduct={handleDeleteProduct}
						/>
					) : null}

				</div>
			</div>
		</>
	)
}

export default Bag