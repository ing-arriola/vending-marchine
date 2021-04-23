import React from 'react'
import {Table} from 'react-bootstrap'
import Empty from './Empty/Empty'
import Timer from './Timer'
import { ReactComponent as Void } from './empty.svg'
import Loading from './Loading/Loading'

// <ProgressBar animated now={45} />

const TableProcessing = ({loading,products,state}) => {

    const table = (
      <div className="d-flex justify-content-center">
        <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Product</th>
                <th className="text-center">Time to prepare</th>
                {state === 1 ? (<th className="text-center">Time Left</th>) : null}
              </tr>
            </thead>
            <tbody>  
              { products.map(product  => (
              <tr>
                <td className="d-flex justify-content-center align-items-center">{product.name}</td>
                <td className="text-center">{product.minutes}:{product.seconds}
                </td>
                {state === 1 ? (
                <td className="text-center">
                <Timer 
                  startedDate={new Date(`${new Date().toDateString("MM-dd-yyyy")} ${product.time} `)}
                  product = {product}   
                />
                </td>) : null}
              </tr>
          ))}
            </tbody>
          </Table>
        </div>
    )


    const componentToRender = () => {
      let component=null

      if (products.length > 0) {
        component = table
      }else{
        component = <Empty 
          Component={Void} 
          headMessage="No hay ordernes aqui"  
          message="Opps!! no hay nada que mostrar aqui" />
      }
      return component
    }

    return (
      <>
        {
          loading ? 
          (<Loading/>):
          (componentToRender())
        }
    </>
    )
}

export default TableProcessing
