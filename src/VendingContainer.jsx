import React,{ useState } from 'react'
import HeaderOptions from './HeaderOptions'
import Order from './Order'
import Processing from './Processing'
import { ReactComponent as Standing } from './standing.svg'

const VendingContainer = () => {
    const [currentTab,setCurrentTab] = useState({
        order:true,
        processing:false,
        completed:false
    })
    return (
        <div className="d-flex justify-content-center align-items-center flex-column min-vh-100" >
            <h1 className='text-center' >Vending machine</h1>
            <div className='mb-3' >
                <Standing />
            </div>
            <HeaderOptions
                currentTab={currentTab} 
                setCurrentTab={setCurrentTab} />
            <div className="orders-container w-75">
                {currentTab.order&& <Order/>}
                {currentTab.processing && <Processing state={1} /> }
                {currentTab.completed && <Processing state={2}  /> }
            </div>
        </div>
    )
}

export default VendingContainer
