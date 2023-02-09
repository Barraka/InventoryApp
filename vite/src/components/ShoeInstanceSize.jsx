import React from 'react'

function ShoeInstanceSize(props) {

    return (
        <div key={props.x} className="instanceWrapper" data-size={props.x} data-quantity={props.quantity} onClick={e=>props.displayEdit(e)}>
            size: {props.x} - Quantity: {props.quantity} 
        </div>
    )
}

export default ShoeInstanceSize