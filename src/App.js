import './App.css'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import {Auth0Provider} from '@auth0/auth0-react'
import PrivateRoute from './PrivateRoute'
import VendingContainer from './VendingContainer'
import NavbarContainer from './NavbarContainer'
import {StoreContext} from 'storeon/react'
import store from './store'

const domain=process.env.REACT_APP_AUTH0_DOMAIN
const id=process.env.REACT_APP_AUTH0_CLIENT_ID

const  App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Auth0Provider
        domain={domain}
        clientId={id}
        redirectUri={window.location.origin}
       >
        <Router>
          <NavbarContainer/>
          <Switch>
            <PrivateRoute path="/" component={VendingContainer} />
          </Switch>
        </Router>
      </Auth0Provider>
    </StoreContext.Provider>
        
  );
}

export default App;
