import React from 'react'
import axios from 'axios'
import {Button,Modal,Form,Row,Col} from 'react-bootstrap'

const NewProdudct = ({show,handleChange,name,minutes,seconds,setShow,nameError,secondsError,minutesError,validate,setNewProduct,newProduct}) => {

  const sendData = (e) => {
    e.preventDefault()
    const isValid = validate()
    if(isValid){
      const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
    dataFirebase.post('/products.json',newProduct)
      .then(res => {
        console.log(res)

      })
      setShow(false)
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
                    Add
                </Button>
                 </Form>
              </Modal.Body>
        </Modal>
    )
}

export default NewProdudct
