import React from 'react'
import TableProducts from './TableProducts'
import {useStoreon} from 'storeon/react'

const Order = () => { 
    const {products} = useStoreon('products')
    console.log(products)
    
    return (
        <>
         <TableProducts products={products} />  
        </>
    )
}

export default Order
