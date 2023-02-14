import React, { useEffect, useState } from 'react'

function ConfirmAction(props) {


    return (
        <div className='confirmActionWrapper'>
            <div className="backdrop"></div>
            <div className="confirmAction">
                <div className="confirmActionText">
                    You are about to delete this item. <br />
                    Are you sure?
                </div>
                <button onClick={e=>props.useConfirm(null)} className="editButton">Cancel</button>
                <button onClick={e=>props.beforeDeletion()} className="editButton">Proceed</button>
            </div>

        </div>
    )
}

export default ConfirmAction