import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import ShoeInstanceSize from './ShoeInstanceSize';
import EditProductHeader from './EditProductHeader';
import AddSizeShoe from './AddSizeShoe';

function ShoeInstance(props) {
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
                setDisplaySizes(Object.keys(modelInfo.sizes).sort().map(x=> <ShoeInstanceSize key={x} x={x} quantity={modelInfo.sizes[x]} displayEdit={displayEdit}/>));
            }
            else setDisplaySizes(<div>There are currently no sizes in stock</div>);
        }
        
    },[modelInfo]);
   

    function sortData(d) {
        const todisplay={};
        d.forEach(x=> todisplay[x.size] ? todisplay[x.size]++ : todisplay[x.size]=1);
        return todisplay;
    }
    

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        const targetPath = 'http://localhost:3000/shoe_models/'+props.data._id;
        const outcome=await axios.put(targetPath, o);
        setModelInfo({...o});
        const tempval=[...props.models];
        for(let i=0;i<tempval.length;i++) {
            if(tempval[i]._id===o._id) {tempval[i]={...o};console.log('found ', tempval[i]);}
        }
        props.setModals(tempval);
    }

    function displayEdit(e) {
        const valSize=e.target.getAttribute('data-size');
        const valQuantity=e.target.getAttribute('data-quantity');        
        setOutput(<EditModel setOutput={setOutput} valSize={valSize} valQuantity={valQuantity} updateInfo={updateInfo} setModelInfo={setModelInfo} modelInfo={modelInfo}/>);
    }

    function displayHeader() {
        setOutput(<EditProductHeader setMainPage={props.setMainPage}  setModals={props.setModals} brands={props.brands} data={modelInfo} updateInfo={updateInfo} setOutput={setOutput}/>);
    }   

    function newQuantity() {
        const tempval={...modelInfo};
        tempval.sizes={38:2, 39.5:1, 40:2, 40.5:5, 41.5:2, 43:3};
        const targetPath = 'http://localhost:3000/shoe_models/'+props.data._id;
        axios.put(targetPath, tempval);
        setModelInfo({...tempval});
    }


    const editIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>;

    return (
        <div className='productInstance shoeInstance'>
            <button onClick={props.refresh}>Back to catalogue</button>
            {/* <button onClick={newQuantity}>new quantity</button> */}
            <div className="modelHeader" onClick={displayHeader}>
                <div className="model">{modelInfo.model}</div>
                <div className="brandName">{modelInfo.brandName}</div>
                <div className="instanceImageWrapper">
                    <img src={modelInfo.picture} alt="picture" />
                </div>
            </div>
            <button onClick={()=>setAddSize(<AddSizeShoe setAddSize={setAddSize} modelInfo={modelInfo} updateInfo={updateInfo}/>)}>Add new size</button>
            {output}
            {displaySizes}
            {addSize}            
        </div>
    )
}

export default ShoeInstance