import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import {Table,Button} from 'react-bootstrap'
import { FaPlus,FaEdit,FaShoppingCart,FaTrash } from "react-icons/fa";
import NewProduct from './NewProdudct'
import moment from 'moment'
import {useStoreon} from 'storeon/react'
import Notification from './Notification/Notification'
import EditProduct from './EditProduct'
import Empty from './Empty/Empty'
import { ReactComponent as Void } from './empty.svg'

const TableProducts = ({products}) => {
  const [show,setShow] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [idEdition,setIdEdition] = useState("")
  const [confirm,setConfirm] = useState(false)
  const [confirmDelete,setConfirmDelete] = useState(false)
  const {dispatch} = useStoreon('processing')
  const [newProduct,setNewProduct] = useState({
    name:"",
    minutes:"",
    seconds:"",
    nameError:"",
    minutesError:"",
    secondsError:""
  })

  useEffect(() => {
    if(!showEdit && !show ){
      setNewProduct({
        name:"",
        minutes:"",
        seconds:"",
        nameError:"",
        minutesError:"",
        secondsError:""
      })
    }
    
  }, [show,showEdit])

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
     
    const showEdition = (e,product) => {
      setShowEdit(true)
      setNewProduct({
          name:product.name,
          minutes:product.minutes,
          seconds:product.seconds,
          nameError:"",
          minutesError:"",
          secondsError:""
      })
      setIdEdition(product.id) 
    }

   

    const deleteProduct = (prod) => {
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.delete(`/products/${prod.id}.json`)
      .then(res => setConfirmDelete(true))
      .catch(err => console.log(err) )
      
    }

    const placeNerOrder = (almostNewOrder) => {
      const currentTime = new Date()
      const timeStart = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const d = moment.duration(timeStart).add(moment.duration(`00:${almostNewOrder.minutes}:${almostNewOrder.seconds}`))
      const timeTarget = moment.utc(d.as('milliseconds')).format("HH:mm:ss")
      const newOrder = {...almostNewOrder,state:1,time:timeTarget}
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
      dataFirebase.post('/processing.json',newOrder)
        .then(res => {
          dispatch('newOrder', newOrder)
          setConfirm(true)
        })
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
      {products.length > 0 ? (
        <> 
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
                    <FaShoppingCart/>
                  </Button>
                  <Button
                    className="mx-3"
                    variant="primary"
                    onClick={(e)=>showEdition(e,product)}
                    >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="primary"
                    onClick={()=>deleteProduct(product)}
                    >
                    <FaTrash />
                  </Button>
                  </td>
                </tr>
            ))}
              </tbody>
            </Table>
     
            < EditProduct 
              show={showEdit}
              setShow={setShowEdit}
              handleChange={handleChange}
              name={name}
              minutes={minutes}
              seconds={seconds}
              nameError={nameError}
              minutesError={minutesError}
              secondsError={secondsError}
              validate={validate}
              setNewProduct={setNewProduct}
              setShowEdit={setShowEdit}
              idEdition={idEdition}
              newProduct={newProduct}
            />
            </div>
          </>
      ) : (
        
        <Empty 
          Component={Void} 
          headMessage="No hay ordernes aqui"  
          message="Opps!! no hay nada que mostrar aqui" />
      )}
       < NewProduct 
              show={show}
              setShow={setShow}
              handleChange={handleChange}
              name={name}
              minutes={minutes}
              seconds={seconds}
              nameError={nameError}
              minutesError={minutesError}
              secondsError={secondsError}
              validate={validate}
              setNewProduct={setNewProduct}
              newProduct={newProduct}
            />
        <Notification 
          message="New order added successfully, please check:  In process tab "
          setConfirm={setConfirm}
          confirm={confirm}
          />
        <Notification 
          message="Product deleted successfully,please press F5 to check it"
          setConfirm={setConfirmDelete}
          confirm={confirmDelete}
          />
    </>
    )
}

export default TableProducts
