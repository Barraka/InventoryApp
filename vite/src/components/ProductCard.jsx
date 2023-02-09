import React, { useEffect, useState } from 'react'
import ShoeInstance from './ShoeInstance'

function ProductCard(props) {
    const [parentProps, setParentProps] = useState({});

    useEffect(()=>{
        if(props) {
            const tempval={};
            tempval.setMainPage=props.setMainPage;
            tempval.setModals=props.setModals;
            tempval.brands=props.brands;
            tempval.data=props.data;
            tempval.model=props.model;
            tempval.branName=props.brandName;
            tempval.picture=props.picture;
            setParentProps(tempval)
        }
    },[]);

    function displayCategory() {
        const tempval={};
        tempval.id=props.id;
        tempval.data=props.data;
        tempval.model=props.model;
        tempval.brandName=props.brandName;
        tempval.picture=props.picture;
        props.displayInstance(tempval);        
    }

    return (
        <div className='productCard' key={props.id} data-id={props.id} onClick={displayCategory}>
            <div className="cardItem cardTitle">{props.model}</div>
            <div className="cardItem cardBrand">{props.brandName}</div>
            <div className="cardImageWrapper">
                <img src={props.picture} alt="picture" />
            </div>
            <div className="priceWrapper">{props.data.price} €</div>
            {/* <div className="inStock">In stock: {Object.entries(props.data.sizes).reduce((a,b)=>a+parseInt(b[1]),0)}</div> */}

            
        </div>
    )
}

export default ProductCard