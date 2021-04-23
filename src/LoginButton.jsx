import React from 'react'
import { Button } from "react-bootstrap"
import {useAuth0} from '@auth0/auth0-react'

const LoginButton = () => {
    const {loginWithRedirect}=useAuth0()
    
    return (
        <Button
          onClick={()=>loginWithRedirect()}
          className="btn btn-lg btn-block hero-button"
          
        >
          Log in
        </Button>
    )
}

export default LoginButton