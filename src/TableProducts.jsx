import React,{ useState } from 'react'
import axios from 'axios'
import {Table,Button} from 'react-bootstrap'
import { FaPlus } from "react-icons/fa";
import NewProduct from './NewProdudct'
import moment from 'moment'
const TableProducts = ({products}) => {
  const [show,setShow] = useState(false)
  const [newProduct,setNewProduct] = useState({
    name:"",
    minutes:"",
    seconds:"",
  })
  const {name,minutes,seconds} = newProduct
    const handleAddProduct = () => {
      setShow(true)
    }
    const handleChange = (e) => {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
    const sendData = (e) => {
      e.preventDefault()
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.post('/products.json',newProduct)
        .then(res => console.log(res))
        setShow(false)
    }
    const placeNerOrder = (almostNewOrder) => {
      const currentTime = new Date()
      const timeStart = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const d = moment.duration(timeStart).add(moment.duration(`00:${almostNewOrder.minutes}:${almostNewOrder.seconds}`))
      const timeTarget = moment.utc(d.as('milliseconds')).format("HH:mm:ss")
      const newOrder = {...almostNewOrder,state:1,time:timeTarget}
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.post('/processing.json',newOrder)
        .then(res => console.log(res))
        .catch(err => console.log(err) )
    }
    return (
      <>
      <div className='d-flex w-75 justify-content-end align-items-center mb-3'>
       <label className="mr-2" >Add new product</label>
       <Button className='rounded-circle' onClick={handleAddProduct}>
          <FaPlus/>
        </Button>
      </div>
        <Table striped bordered hover className="w-75">
          <thead>
            <tr>
              <th className="text-center">Product</th>
              <th className="text-center" >Time to prepare</th>
              <th className="text-center" >Action</th>
            </tr>
          </thead>
          <tbody>  
            { products.map(product  => (
             <tr>
              <td className="text-center">{product.name}</td>
              <td className="text-center">{product.minutes}:{product.seconds}</td>
              <td className="d-flex justify-content-center"> 
              <Button
                variant="primary"
                onClick={()=>placeNerOrder(product)}
                >
                Order
              </Button>
              </td>
            </tr>
        ))}
          </tbody>
        </Table>
        < NewProduct 
          show={show}
          setShow={setShow}
          sendData={sendData}
          handleChange={handleChange}
          name={name}
          minutes={minutes}
          seconds={seconds}
        />
    </>
    )
}

export default TableProducts
