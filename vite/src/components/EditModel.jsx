import React, { useEffect, useState } from 'react'

function EditModel(props) {
    const [quantity, setQuantity] = useState('');
    const [data, setData] = useState({});

    useEffect(()=>{
        if(props.valQuantity)setQuantity(props.valQuantity);
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

    function confirm() {
        const tempval={...props.modelInfo};
        tempval.sizes[props.valSize]=parseInt(quantity);
        if(quantity==='0')delete tempval.sizes[props.valSize];
        props.updateInfo(tempval);
    }

    return (
        <div className='editModel'>
            <div className="backdrop"></div>
            <div className="editQuantity">
                <div className="editModelTitle">Change inventory quantities: </div>
                <div className='editSizeText'>Size: {props.valSize}</div>
                Quantity : <input type="text" value={quantity || ''} onChange={modify}/>
                <div className="buttonsWrapper">
                    <button className='editButton' onClick={confirm}>Confirm</button>
                    <button className='editButton' onClick={()=>props.setOutput('')}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModel