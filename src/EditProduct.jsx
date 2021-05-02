import React from 'react'
import {Button,Modal,Form,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import {useStoreon} from 'storeon/react'

const NewProdudct = ({show,handleChange,name,minutes,seconds,setShow,nameError,secondsError,minutesError,validate,setNewProduct,setShowEdit,idEdition,newProduct}) => {
  const {dispatch} = useStoreon('products')
  const sendData = (e) => {
    e.preventDefault()
    const isValid = validate()
    if(isValid){
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
    dataFirebase.put(`/products/${idEdition}.json`,newProduct)
      .then(res => {
        dispatch('updateProduct',{...newProduct,id:idEdition})
      })
      setShowEdit(false)
      setNewProduct({
        name:"",
        minutes:"",
        seconds:"",
        nameError:"",
        minutesError:"",
        secondsError:""
      })
      //getProducts()
    }
  }

    return (
        <Modal
            show={show}
            onHide={()=>{setShow(false)}}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
              <Modal.Header closeButton>
                Editar producto
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={sendData}>
                  <Form.Group>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control 
                      type="text"
                      name="name" 
                      placeholder="product name" 
                      value={name} 
                      onChange={handleChange}
                      required
                      />
                    <div style={{fontSize:12,color:"red"}} >
                      {nameError}
                    </div>
                    <Form.Label>Time to prepare</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control 
                          type="number" 
                          name="minutes"
                          min="0"
                          max="59" 
                          placeholder="minutes" 
                          value={minutes} 
                          onChange={handleChange}
                          required
                          />
                          <div style={{fontSize:12,color:"red"}} >
                            {minutesError}
                          </div>
                      </Col>
                      <Col>
                        <Form.Control 
                          type="number" 
                          name="seconds"
                          min="0" 
                          max="59"
                          maxLength = "2"
                          placeholder="seconds" 
                          value={seconds} 
                          onChange={handleChange} 
                          required
                          />
                          <div style={{fontSize:12,color:"red"}} >
                            {secondsError}
                          </div>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button
                  type="submit"
                  variant="primary"
                  >
                    Update
                </Button>
                 </Form>
              </Modal.Body>
        </Modal>
    )
}

export default NewProdudct
