import React from 'react'
import { Button } from "react-bootstrap"
import {useAuth0} from '@auth0/auth0-react'

const LogoutButton = () => {
    const {logout}=useAuth0()
    
    return (
        <Button
        onClick={()=>logout()}
        className="btn btn-lg btn-block hero-button"
      >
        Logout
      </Button>
    )
}

export default LogoutButton
