import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import gifTenor from "./tenor.gif"

const Notification = ({message,setConfirm,confirm}) => {
    return (
        <Modal
              show={confirm}
              onHide={()=>{setConfirm(false)}}
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="h4 font-weight-bold mb-3"> {message} </div>
                  <img src={gifTenor} alt="" width={100} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={()=>{setConfirm(false)}}
                >
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>

    )
}

export default Notification
