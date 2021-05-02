import axios from 'axios'

let products = store => {
    store.on('@init',() => {
        const prods = []
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
        dataFirebase.get('/products.json')
            .then(res => {
                for (const key in res.data) {
                    prods.push({...res.data[key],id: key})    
                    }
                }
            )
            return  {products:prods}    
    })
    store.on('newProduct',({products},product)=>{
        return{
            products: [...products, product]
        }
    })
}

export default products