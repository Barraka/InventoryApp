import React, { useRef, useState } from 'react'

function AddSizeShirt(props) {
    const [size, setSize] = useState('XXS');
    const [quantity, setQuantity] = useState('');
    const inputRef = useRef(null);
    const qtRef = useRef(null);

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    function validate() {
        //Make checks
        let qtErrorMsg=[];

        //Check quantity
        if(quantity==='')qtErrorMsg.push('Please fill out this field');
        else if(!isNumeric(quantity))qtErrorMsg.push('Not a valid number');
        else if(!Number.isInteger(parseFloat(quantity)))qtErrorMsg.push('Must be an integer');
        else if(quantity<=0)qtErrorMsg.push('Quantity must be at least 1');

        if(qtErrorMsg.length) {
            qtRef.current.setCustomValidity(qtErrorMsg[0]);
            qtRef.current.reportValidity();
        }   
        else {
            const tempval={...props.modelInfo};
            //Remove sizes that are of quantity 0
            for(let x in tempval.sizes) {
                if(tempval.sizes[x]==='0')delete tempval.sizes[x];
            }
            tempval.sizes[size]=parseFloat(quantity);
            props.updateInfo(tempval);
        }        
    }


    return (
        <div className='editModel'>
            <div className="backdrop"></div>
            <div className="editModelInner">
                <div className="newSizeTitle">Choose the size and quantity that needs to be added:</div>
                <div className="inputGroup">
                    <label htmlFor="size">New size:</label>
                    <select ref={inputRef} type="text" name="size"  onChange={e=>setSize((e.target.value))} required >
                        <option value="XXS">XXS</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label htmlFor="quantity">Quantity:</label>
                    <input ref={qtRef} type="text" name="quantity" onChange={e=>setQuantity((e.target.value))} required />
                </div>
                <div className="buttonsWrapper">
                    <button type='submit' className='editButton' onClick={validate}>Confirm</button>
                    <button className='editButton' onClick={()=>props.setAddSize('')}>Cancel</button>
                </div>
            </div>
            
        </div>
    )
}

export default AddSizeShirt