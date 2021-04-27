import React,{ useEffect } from 'react'
import {useStoreon} from 'storeon/react'
import axios from 'axios'


const Done = ({product}) => {
    const {dispatch} = useStoreon('tasks')

    const competed = (res,id) => {
        dispatch('completed',{...res,id})
    }


    const updateData = async () => {
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        const res = await dataFirebase.put(`/processing/${product.id}.json`,{
            minutes:product.minutes,
            seconds:product.seconds,
            name:product.name,
            time:product.time,
            state:2})
        competed(res.data,product.id)
    }

    useEffect(() => {
        updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
               Done
        </div>
    )
}

export default Done
