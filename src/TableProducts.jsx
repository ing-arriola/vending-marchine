import React,{ useState } from 'react'
import axios from 'axios'
import {Table,Button} from 'react-bootstrap'
import { FaPlus } from "react-icons/fa";
import NewProduct from './NewProdudct'
import moment from 'moment'
import Notification from './Notification/Notification'

const TableProducts = ({products,getProducts}) => {
  const [show,setShow] = useState(false)
  const [confirm,setConfirm] = useState(false)
  const [newProduct,setNewProduct] = useState({
    name:"",
    minutes:"",
    seconds:"",
    nameError:"",
    minutesError:"",
    secondsError:""
  })
  const {name,minutes,seconds,nameError,minutesError,secondsError} = newProduct
    const handleAddProduct = () => {
      setShow(true)
    }

    const handleChange = (e) => {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const validate = () => {
      let minutesError = ""
      let secondsError = ""

      if (minutes > 59 ) {
        minutesError = "Minutes can't be greater than 60"
      }

      if(seconds > 59) {
        secondsError = "Seconds can't be greater than 60"
      }

      if(minutesError){
        setNewProduct({...newProduct,minutesError:minutesError})
        return false
      }

      if(secondsError){
        setNewProduct({...newProduct,minutesError:minutesError})
        return false
      }

      return true

    }
     
    const sendData = (e) => {
      e.preventDefault()
      const isValid = validate()
      if(isValid){
        const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.post('/products.json',newProduct)
        .then(res => console.log(res))
        setShow(false)
        setNewProduct({
          name:"",
          minutes:"",
          seconds:"",
          nameError:"",
          minutesError:"",
          secondsError:""
        })
        getProducts()
      }
    }

    const placeNerOrder = (almostNewOrder) => {
      const currentTime = new Date()
      const timeStart = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const d = moment.duration(timeStart).add(moment.duration(`00:${almostNewOrder.minutes}:${almostNewOrder.seconds}`))
      const timeTarget = moment.utc(d.as('milliseconds')).format("HH:mm:ss")
      const newOrder = {...almostNewOrder,state:1,time:timeTarget}
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.post('/processing.json',newOrder)
        .then(res => setConfirm(true))
        .catch(err => console.log(err) )
    }
    return (
      <>
      <div className='d-flex justify-content-end align-items-center mb-3'>
       <label className="mr-2" >Add new product</label>
       <Button 
          className='rounded-circle' 
          variant="success"
          onClick={handleAddProduct}>
          <FaPlus/>
        </Button>
      </div>
      <div  className="d-flex justify-content-center">
        <Table striped bordered hover>
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
          nameError={nameError}
          minutesError={minutesError}
          secondsError={secondsError}
        />
        </div>
        <Notification 
          messsage="Nueva orden agregada con exito"
          setConfirm={setConfirm}
          confirm={confirm}
          />
    </>
    )
}

export default TableProducts