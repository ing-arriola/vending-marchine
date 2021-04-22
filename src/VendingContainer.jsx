import React,{ useState } from 'react'
import HeaderOptions from './HeaderOptions'
import Order from './Order'
import Processing from './Processing'

const VendingContainer = () => {
    const [currentTab,setCurrentTab] = useState({
        order:true,
        processing:false,
        completed:false
    })
    return (
        <div className="d-flex justify-content-center align-items-center flex-column min-vh-100" >
            <h1 className="mb-5 display-3" >Vending machine</h1>
            <HeaderOptions setCurrentTab={setCurrentTab} />
            {currentTab.order&& <Order/>}
            {currentTab.processing && <Processing/> }
        </div>
    )
}

export default VendingContainer
