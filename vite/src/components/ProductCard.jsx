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
        if(props.dataFor==='shoes') {
            console.log('its for shoes');
            // props.setMainPage(<ShoeInstance setMainPage={props.setMainPage}  setModals={props.setModals} brands={props.brands} data={props.data} model={props.model} brandName={props.brandName} picture={props.picture}/>)
        }
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
            <div className="imageWrapper">
                <img src={props.picture} alt="picture" />
            </div>
            <div className="priceWrapper">{props.data.price} €</div>
        </div>
    )
}

export default ProductCard