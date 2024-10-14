import './App.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'
import RoutesApp from './routes/routes'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesApp />
      </PersistGate>
    </Provider>
  )
}

export default App
