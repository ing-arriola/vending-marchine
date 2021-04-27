import React from 'react'
import TableProcessing from './TableProcessing'
import {useStoreon} from 'storeon/react'


const Processing = ({state}) => {
    const {processing} = useStoreon('processing')
    console.log(processing)    
    return (
        <>
            <TableProcessing 
                products={processing.filter(product => product.state === state)} 
                state={state} />  
        </>
    )
}

export default Processing
