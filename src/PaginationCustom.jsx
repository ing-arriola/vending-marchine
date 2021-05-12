import React,{useState} from 'react'
import {Pagination} from 'react-bootstrap'

const PaginationCustom = ({itemsPerPage,totalItems,setCurrentPage}) => {
    const  [active,setActive] = useState(1)
    const items = [];

    const update = (number) => {
        setCurrentPage(number)
        setActive(number)
    }

    for (let number = 1; number <= Math.ceil(totalItems/itemsPerPage); number++) {
        items.push(
        <Pagination.Item key={number} active={number === active} onClick={ () => update(number)  } >
            {number}
        </Pagination.Item>,
        )
    }
    return (
        <Pagination>{items}</Pagination>
    )
}

export default PaginationCustom
