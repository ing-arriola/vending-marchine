import React from 'react'
import {Button,Modal,Form,Row,Col} from 'react-bootstrap'

const NewProdudct = ({show,sendData,handleChange,name,minutes,seconds,setShow}) => {
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
                    <Form.Label>Time to prepare</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control 
                          type="number" 
                          name="minutes"
                          min="0"
                          max="60" 
                          placeholder="minutes" 
                          value={minutes} 
                          onChange={handleChange}
                          required
                          />
                      </Col>
                      <Col>
                        <Form.Control 
                          type="number" 
                          name="seconds"
                          min="0" 
                          max="60"
                          maxLength = "2"
                          placeholder="seconds" 
                          value={seconds} 
                          onChange={handleChange} 
                          required
                          />
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
