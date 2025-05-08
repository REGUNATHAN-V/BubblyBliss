import React from 'react'
import { Provider } from 'react-redux';
import Mainrouter from './routes/Mainrouter';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
      <Mainrouter />
      </div>
     </Provider>
  )
}

export default App;