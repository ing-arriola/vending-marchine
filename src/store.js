import {createStoreon} from 'storeon'
//import { persistState } from '@storeon/localstorage'
import axios from 'axios'

let processing = store => {
    store.on('@init',() => {
        const prods = []
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        dataFirebase.get('/processing.json')
            .then(res => {
                for (const key in res.data) {
                    prods.push({...res.data[key],id: key})    
                    }
                }
            )
            return  {processing:prods}    
    })
    store.on('completed',({processing}, order)=>{
        return{
            processing: processing.map(process => 
                process.id === order.id ? order : process
                )
        }
    })
    store.on('newOrder',({processing},order)=>{
        return{
            processing: [...processing, order]
        }
    })
      
}

const store = createStoreon([
    processing
])

export default store;
