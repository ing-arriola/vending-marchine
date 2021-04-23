import React from 'react'
import {Button} from 'react-bootstrap'

const HeaderOptions = ({currentTab,setCurrentTab}) => {
    const handleOrder = (e) => {
         setCurrentTab({
            processing:false,
            completed:false,
            [e.target.name]:true})
    }
    const handleProcesing = (e) => {
        setCurrentTab({
            order:false,
            completed:false
            ,[e.target.name]:true})
   }
    return (
        <div className="d-flex mb-5">
            <Button 
                name="order" 
                className="mr-3 p-3 font-weight-bold" 
                variant={ currentTab.order ? 'primary':'secondary'}   
                onClick={handleOrder}
                >Order
                </Button>
            <Button 
                name="processing" 
                className="mr-3 p-3 font-weight-bold" 
                variant={ currentTab.processing ? 'primary':'secondary'}
                onClick={handleProcesing}
                >In process
                </Button>
            <Button 
                name="completed"
                className="p-3 font-weight-bold"
                variant={ currentTab.completed ? 'primary':'secondary'}
                onClick={handleOrder}
                >Completed
                </Button>
        </div>
    )
}

export default HeaderOptions
