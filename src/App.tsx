import './App.css'
import RootRouter from './routes/RootRouter'
import store from './store/store'
import { Provider } from 'react-redux'

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
