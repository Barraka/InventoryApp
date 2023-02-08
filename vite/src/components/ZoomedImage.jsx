import React from 'react'

function ZoomedImage(props) {


    return (
        <div className='zoomedImage' onClick={()=>props.setZoomedImage('')}>
            <img src={props.src} alt="pic" />
        </div>
    )
}

export default ZoomedImage