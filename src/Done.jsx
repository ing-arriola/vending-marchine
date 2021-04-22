import React,{ useEffect } from 'react'
import axios from 'axios'

const Done = ({product}) => {
    useEffect(() => {
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        dataFirebase.put(`/processing/${product.id}.json`,{
            minutes:product.minutes,
            seconds:product.seconds,
            name:product.name,
            time:product.time,
            state:2})

    }, [])
    return (
        <div>
               Done
        </div>
    )
}

export default Done
