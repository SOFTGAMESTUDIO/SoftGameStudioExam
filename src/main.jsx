import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById("SoftGameStudio")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(<App />, document.getElementById("root"));


