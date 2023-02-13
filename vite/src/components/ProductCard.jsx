import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ShoeInstance from './ShoeInstance'

function ProductCard(props) {
    const [parentProps, setParentProps] = useState({});
    const [target, setTarget] = useState(null);
    useEffect(()=>{
        // if(props) {
        //     const tempval={};
        //     tempval.setMainPage=props.setMainPage;
        //     tempval.setModals=props.setModals;
        //     tempval.brands=props.brands;
        //     tempval.data=props.data;
        //     tempval.model=props.model;
        //     tempval.branName=props.brandName;
        //     tempval.picture=props.picture;
        //     setParentProps(tempval)
        // }
        // console.log('props : ', props.data);
        // console.log('qt: ', props.data.count);
        const tempval=`/shoes/${props.data._id}`;
        setTarget(tempval);
    },[]);

    function displayCategory() {
        if(props.forBrands) {
            props.displayInstance(props.data);

        } else {
            const tempval={};
            tempval.id=props.id;
            tempval.data=props.data;
            tempval.model=props.model;
            tempval.brandName=props.brandName;
            tempval.picture=props.picture;
            props.displayInstance(tempval);
        }
                
    }

    return (
        // <div className='productCard' key={props.id} data-id={props.id} onClick={displayCategory}>
        <Link to={target}>
        <div className='productCard' key={props.id} data-id={props.id} >
            

                    
            <div className="cardItem cardTitle">{props.model}</div>
            <div className="cardItem cardBrand">{props.brandName}</div>
            <div className="cardImageWrapper">
                <img src={props.picture} alt="picture" />
            </div>
            {props.data.price ? <div className="priceWrapper">{props.data.price.toFixed(2)} €</div> : null}
            {props.nosize ?  <div className="inStock">In stock: {props.data.count}</div> : <div className="inStock">In stock: {Object.entries(props.data.sizes).reduce((a,b)=>a+parseInt(b[1]),0)}</div>}            
        </div>
        </Link>
    )
}

export default ProductCard