import React from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'

const NewOrder = ({newOrder}) => {
    console.log(newOrder)
    const placeNerOrder = () => {
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.post('/processing.json',newOrder)
        .then(res => console.log(res))
        .catch(err => console.log(err) )
    }
    return (
        <Button
            variant="primary"
            onClick={placeNerOrder}
            >
            Order
        </Button>
    )
}

export default NewOrder
