import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import TableProcessing from './TableProcessing'

const Processing = () => {
    const [products,setProducts] = useState([])

    useEffect(()=>{
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        dataFirebase.get('/processing.json')
        .then(res => {
            const prods = []
            for (const key in res.data) {
                prods.push({...res.data[key],id: key})
            }
            setProducts(prods)
        } )
    },[])
    return (
        <>
            <TableProcessing products={products}/>  
        </>
    )
}

export default Processing
