import React from 'react'
import {Table,ProgressBar} from 'react-bootstrap'
import Timer from './Timer'

// <ProgressBar animated now={45} />
//${product.time}

const TableProcessing = ({products}) => {
    console.log(products)
    return (
      <>
        <Table striped bordered hover className="w-75">
          <thead>
            <tr>
              <th className="text-center">Product</th>
              <th className="text-center">Time to prepare</th>
              <th className="text-center">Time Left</th>
            </tr>
          </thead>
          <tbody>  
            { products.map(product  => (
             <tr>
              <td className="d-flex justify-content-center align-items-center">{product.name}</td>
              <td className="text-center">{product.minutes}:{product.seconds}
              </td>
              <td className="text-center">
              <Timer 
                startedDate={new Date(`${new Date().toDateString("MM-dd-yyyy")} ${product.time} `)}
                product = {product}   
              />
              </td>
              
            </tr>
        ))}
          </tbody>
        </Table>
      
    </>
    )
}

export default TableProcessing
