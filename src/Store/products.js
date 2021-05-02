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
    store.on('updateProduct',({products}, product)=>{
        return{
            processing: products.map(prod => 
                prod.id === product.id ? product : process
                )
        }
    })
    store.on('deleteProduct',({products}, id)=>{
        return{
            processing: products.filter(product => product.id !== id )            
        }
    })
}

export default products