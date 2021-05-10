import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'
import {useStoreon} from 'storeon/react'
import deleteIcon from "./delete.gif"

const DeleteProduct = ({message,setConfirm,confirm,prodToDelete}) => {
  const {dispatch} = useStoreon('products')
  
  const deleteProduct = () => {
    const dataFirebase = axios.create({baseURL: process.env.REACT_APP_FIREBASE_URL})
    dataFirebase.delete(`/products/${prodToDelete.id}.json`)
    .then(res => {
      dispatch('deleteProduct',prodToDelete.id)
      setConfirm(false)
    })
    .catch(err => console.log(err) )
    
  } 

    return (
        <Modal
              show={confirm}
              onHide={()=>{setConfirm(false)}}
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete {prodToDelete.name} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="h4 font-weight-bold mb-3"> {message} </div>
                  <img src={deleteIcon} alt="" width={200} className="rounded"  />
                </div>
              </Modal.Body>
              <Modal.Footer className='d-flex justify-content-around' >
                <Button
                  className='w-25'
                  variant="primary"
                  onClick={deleteProduct}
                >
                  Yes
                </Button>
                <Button
                  className='w-25'
                  variant="danger"
                  onClick={()=>{setConfirm(false)}}
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>

    )
}

export default DeleteProduct
