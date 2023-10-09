// libs
import { Provider } from 'react-redux'

// components
import RootRouter from './routes/RootRouter'

// store
import store from './store/store'

// styles
import './App.css'

function App() {
	return (
		<>
			<Provider store={store}>
				<RootRouter />
			</Provider>
		</>
	)
}

export default App
