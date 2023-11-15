// pour le correcteur, voici les identifiants pour se connecter sur le panneau admin : 

// adresse mail : correcteur@gmail.com
// password : test12345

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.jsx';
import {Provider} from 'react-redux'
import './bootstrap/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App />
  </Provider>,
)
