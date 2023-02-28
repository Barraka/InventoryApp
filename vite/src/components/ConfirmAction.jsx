import React, { useEffect, useRef, useState } from 'react'

function ConfirmAction(props) {
    const inputRef=useRef(null);

    return (
        <div className='confirmActionWrapper'>
            <div className="backdrop"></div>
            <div className="confirmAction">
                <div className="confirmActionText">
                    You are about to delete this item. <br />
                    Enter password:
                </div>
                <input ref={inputRef} type="password" />
                <button onClick={e=>props.useConfirm(null)} className="editButton">Cancel</button>
                <button onClick={e=>props.beforeDeletion(inputRef.current.value)} className="editButton">Proceed</button>
            </div>

        </div>
    )
}

export default ConfirmAction