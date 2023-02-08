import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import EditProductHeader from './EditProductHeader';

function ShirtInstance(props) {
    const [output, setOutput] = useState();
    const [modelInfo, setModelInfo] = useState({});
    const [displaySizes, setDisplaySizes] = useState();
    const [addSize, setAddSize] = useState();


    return (
        <div className='productInstance shirtInstance'>
            <div className="modelHeader" onClick={displayHeader}>
                <div className="model">{modelInfo.model}</div>
                <div className="brandName">{modelInfo.brandName}</div>
                <div className="imageWrapper">
                    <img src={modelInfo.picture} alt="picture" />
                </div>
            </div>
            <button >Add new size</button>
            {output}
            {displaySizes}
            {addSize}            
        </div>
    )
}

export default ShirtInstance