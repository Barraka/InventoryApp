import React, { useEffect } from 'react'
import ShoeInstance from './ShoeInstance'

function ProductCard(props) {
    

    return (
        <div className='productCard' key={props.id} data-id={props.id} onClick={()=>props.setOutput(<ShoeInstance model={props.model} brandName={props.brandName} picture={props.picture}/>)}>
            <div className="cardItem cardTitle">{props.model}</div>
            <div className="cardItem cardBrand">{props.brandName}</div>
            <div className="imageWrapper">
                <img src={props.picture} alt="picture" />
            </div>
        </div>
    )
}

export default ProductCard