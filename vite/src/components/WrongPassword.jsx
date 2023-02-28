import React, { useEffect, useState } from 'react'

function WrongPassword(props) {


    return (
        <div className='wrongPasswordWrapper'>
            <div className="backdrop"></div>
            <div className="confirmAction">
                <div className="confirmActionText">
                    Wrong password.
                </div>
                <button onClick={e=>props.setPassword(null)} className="editButton">OK</button>
            </div>


        </div>
    )
}

export default WrongPassword