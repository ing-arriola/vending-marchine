import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import TableProducts from './TableProducts'

const Order = () => { 
    const [products,setProducts] = useState([])

    const getProducts = () => {
        console.log('PUTA')
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        dataFirebase.get('/products.json')
        .then(res => {
            const prods = []
            for (const key in res.data) {
                prods.push({...res.data[key],id:key})
            }
            setProducts(prods)
        } )
    }

    useEffect(()=>{
        getProducts()
    },[])

    return (
        <>
         <TableProducts products={products} getProducts={getProducts}/>  
        </>
    )
}

export default Order
