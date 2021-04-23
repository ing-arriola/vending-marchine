import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import TableProcessing from './TableProcessing'


const Processing = ({state}) => {
    const [products,setProducts] = useState([])
    const [onloading,setOnloading] = useState(true)

    const getProducts = () => {
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        dataFirebase.get('/processing.json')
        .then(res => {
            const prods = []
            for (const key in res.data) {
                prods.push({...res.data[key],id: key})
            }
            setProducts(prods)
            })
            setOnloading(false)
    }

    useEffect(() => getProducts(),[])
    return (
        <>
            <TableProcessing 
                loading={onloading}
                products={products.filter(product => product.state === state)} 
                state={state} />  
        </>
    )
}

export default Processing
