import React from 'react'
import {Button} from 'react-bootstrap'

const HeaderOptions = ({currentTab,setCurrentTab}) => {
    const handleOrder = (e) => {
        console.log(e.target.name)
         setCurrentTab({...currentTab,[e.target.name]:true})
    }
    return (
        <div className="d-flex mb-5">
            <Button 
                name="order" 
                className="mr-3 p-3 font-weight-bold" 
                variant="secondary" 
                onClick={handleOrder}
                >Order
                </Button>
            <Button 
                name="processing" 
                className="mr-3 p-3 font-weight-bold" 
                variant="primary"
                onClick={handleOrder}
                >In process
                </Button>
            <Button 
                name="completed"
                className="p-3 font-weight-bold"
                variant="success"
                onClick={handleOrder}
                >Completed
                </Button>
        </div>
    )
}

export default HeaderOptions
