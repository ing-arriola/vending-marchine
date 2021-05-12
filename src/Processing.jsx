import React,{useState} from 'react'
import TableProcessing from './TableProcessing'
import {useStoreon} from 'storeon/react'
import PaginationCustom from './PaginationCustom'


const Processing = ({state}) => {
    const {processing} = useStoreon('processing')
    const [currentPage,setCurrentPage] = useState(1)
    const itemsPerPage=10
    const data = processing.filter(product => product.state === state)
    const indexLastItem = (currentPage * itemsPerPage)
    const indexFirstItem = indexLastItem - itemsPerPage
    const currentItems = data.slice(indexFirstItem,indexLastItem)
    const dataToShow = state=== 1 ? data : currentItems
    
    return (
        <div className='d-flex flex-column align-items-center'>
           <div className=' w-100' >
                <TableProcessing 
                    products={dataToShow} 
                    state={state}
                    />  
           </div>
            <PaginationCustom 
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default Processing
