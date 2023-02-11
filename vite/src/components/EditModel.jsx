import React, { useEffect, useRef, useState } from 'react'

function EditModel(props) {
    const [quantity, setQuantity] = useState('');
    const [data, setData] = useState({});

    const quantityRef = useRef(null);

    useEffect(()=>{
        if(props.valQuantity)setQuantity(props.valQuantity);
        // if(props.nosize)setQuantity(props.modelInfo.quantity);
        setData(props.modelInfo);
    },[]);

    useEffect(()=>{
        setQuantity(props.valQuantity);
    },[props.valQuantity]);

    function modify(e) {
        const newval=parseInt(e.target.value);
        const size=parseFloat(props.valSize);
        const tempData={...data};
        tempData[size]=newval;
        setData({...tempData});
        setQuantity(e.target.value)
    }

    function isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    function validate() {
        let quantityErrors=[];
        //Check name
        if(quantity==='')quantityErrors.push('Please fill out this field.');
        else if(!isNumeric(quantity)) {
            quantityErrors.push('Not a valid price.');
        }        
        else if(parseInt(quantity)!==parseFloat(quantity)) quantityErrors.push('Only integers are allowed.');

        if(quantityErrors.length) {
            quantityRef.current.setCustomValidity(quantityErrors[0]);
            quantityRef.current.reportValidity();
        } else {
            confirm();
        }
    }

    function confirm() {
        if(props.nosize) {
            const tempval={...props.modelInfo};
            tempval.quantity=parseInt(quantity);
            props.updateInfo(tempval);
        } else {
            const tempval={...props.modelInfo};
            tempval.sizes[props.valSize]=parseInt(quantity);
            if(quantity==='0')delete tempval.sizes[props.valSize];
            props.updateInfo(tempval);
        }        
    }

    return (
        <div className='editModel'>
            <div className="backdrop"></div>
            <div className="editQuantity">
                <div className="editModelTitle">Change inventory quantities: </div>
                {props.nosize ? null : <div className='editSizeText'>Size: {props.valSize}</div>}
                Quantity : <input autoFocus ref={quantityRef} type="text" value={quantity || ''} onChange={modify}/>
                <div className="buttonsWrapper">
                    <button className='editButton' onClick={validate}>Confirm</button>
                    <button className='editButton' onClick={()=>props.setOutput('')}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModel