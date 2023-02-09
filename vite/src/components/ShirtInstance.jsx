import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import EditProductHeader from './EditProductHeader';
import ShirtInstanceSize from './ShirtInstanceSize';
import AddSizeShirt from './AddSizeShirt';
import ShirtsPage from './ShirtsPage';

function ShirtInstance(props) {
    const [output, setOutput] = useState();
    const [modelInfo, setModelInfo] = useState({});
    const [displaySizes, setDisplaySizes] = useState();
    const [addSize, setAddSize] = useState();

    useEffect(()=>{
        setModelInfo(props.data);        
    },[]);

    useEffect(()=>{        
        if(Object.keys(modelInfo).length) {            
            if(Object.keys(modelInfo.sizes).length) {
                const shirtOrder=['XXXS','XXS','XS','S','M','L','XL','XXL','XXXL'];
                setDisplaySizes(Object.keys(modelInfo.sizes)
                .sort((a,b)=> shirtOrder.indexOf(a.toUpperCase()) - shirtOrder.indexOf(b.toUpperCase()))
                .map(x=> <ShirtInstanceSize key={x} x={x} quantity={modelInfo.sizes[x]} displayEdit={displayEdit}/>));
            }
            else setDisplaySizes(<div>There are currently no sizes in stock</div>);
        }        
    },[modelInfo]);

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        const tempval=[...props.models];        
        for(let i=0;i<tempval.length;i++) {
            if(tempval[i]._id===o._id)tempval[i]={...o};
        }
        setModelInfo({...o});
        props.setModals(tempval);
        const targetPath = 'http://localhost:3000/shirt_models/'+props.data._id;
        const outcome=await axios.put(targetPath, o);  
        console.log('about to upload: ', o);
    }

    function displayEdit(e) {
        const valSize=e.target.getAttribute('data-size');
        const valQuantity=e.target.getAttribute('data-quantity');        
        setOutput(<EditModel setOutput={setOutput} valSize={valSize} valQuantity={valQuantity} updateInfo={updateInfo} setModelInfo={setModelInfo} modelInfo={modelInfo}/>);
    }

    function displayHeader() {
        setOutput(<EditProductHeader setMainPage={props.setMainPage}  setModals={props.setModals} brands={props.brands} data={modelInfo} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct() {
        const targetPath = 'http://localhost:3000/shirt_models/'+props.data._id;
        const outcome=await axios.delete(targetPath, data._id);
        const newData=outcome.data.message;
        console.log('outcome of deletion: ', newData);
        props.setMainPage(<ShirtsPage setMainPage={props.setMainPage}/>);
    }

    const addIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>;

    return (
        <div className='productInstance shirtInstance'>
        <button className='backButton' onClick={props.refresh}><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9 18-6-6 6-6 1.4 1.4L6.8 11H21v2H6.8l3.6 3.6Z"/></svg><span>Back to catalogue</span></button>
        {/* <button onClick={newQuantity}>new quantity</button> */}
        <div className="modelHeader" onClick={displayHeader}>
            <div className="model">{modelInfo.model}</div>
            <div className="brandName">{modelInfo.brandName}</div>
            <div className="instanceImageWrapper">
                <img src={modelInfo.picture} alt="picture" />
            </div>
        </div>
        <button className='addSizeButton' onClick={()=>setAddSize(<AddSizeShirt setAddSize={setAddSize} modelInfo={modelInfo} updateInfo={updateInfo}/>)}>{addIcon} <span>Add new size</span></button>
        {output}
        {displaySizes}
        {addSize}            
        </div>
    )
}

export default ShirtInstance