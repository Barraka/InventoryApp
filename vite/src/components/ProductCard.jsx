import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ProductCard(props) {
    const [target, setTarget] = useState(null);
    const navigate=useNavigate();

    useEffect(()=>{        
        if(props.data._id) {
            const tempval=props.target+props.data._id;
            setTarget(tempval);
        }
    },[]);

    function redirect() {
        if(target)navigate(target);
    }

    return (
        <div onClick={redirect} className='productCard' key={props.data._id} data-id={props.data._id} >           
            <div className="cardItem cardTitle">{props.data.model ? props.data.model : props.data.name}</div>
            <div className="cardItem cardBrand">{props.data.brandName}</div>
            <div className="cardImageWrapper">
                <img src={props.data.picture} alt="picture" />
            </div>
            {props.data.price ? <div className="priceWrapper">{props.data.price.toFixed(2)} €</div> : null}
            {props.nosize ?  <div className="inStock">In stock: {props.data.quantity ? props.data.quantity : props.data.count}</div> : <div className="inStock">In stock: {Object.entries(props.data.sizes).reduce((a,b)=>a+parseInt(b[1]),0)}</div>}            
        </div>
    )
}

export default ProductCard