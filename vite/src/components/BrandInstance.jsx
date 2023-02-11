import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import EditProductHeader from './EditProductHeader';


function BrandInstance(props) {
    const [output, setOutput] = useState();
    const [data, setData] = useState();
    const [modelInfo, setModelInfo] = useState({});
    const [displaySizes, setDisplaySizes] = useState();
    const [displayCategory ,setDisplayCategory] = useState();
    const [addSize, setAddSize] = useState();

    useEffect(()=>{  
        setData(props.data);
        console.log('data: ', props.data);     
        setDisplayCategory(<div className='brandWrapper'>
            {Object.keys(props.data.products.category1).length ? <div className='category'><div className='categoryName'>Shoes</div><div className='brandProductList'>{props.data.products.category1.map(x=> 
                 (<div key={x._id} className="brandProduct"><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
            )
            }</div></div>: null}

            {Object.keys(props.data.products.category2).length ? <div className='category'><div className='categoryName'>Shirts</div><div className='brandProductList'>{props.data.products.category2.map(x=> 
                 (<div key={x._id} className="brandProduct"><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
            )
            }</div></div>: null}

            {Object.keys(props.data.products.category3).length ? <div className='category'><div className='categoryName'>Coats</div><div className='brandProductList'>{props.data.products.category3.map(x=> 
                 (<div key={x._id} className="brandProduct"><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
            )
            }</div></div>: null}
            
            {Object.keys(props.data.products.category4).length ? <div className='category'><div className='categoryName'>Accessories</div><div className='brandProductList'>{props.data.products.category4.map(x=> 
                 (<div key={x._id} className="brandProduct"><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
            )
            }</div></div>: null}
        </div>);
    },[]);

    // useEffect(()=>{
        
    // },[displayCategory]);

    // useEffect(()=>{       
    //     setDisplaySizes(<div className="instanceWrapper"  onClick={e=>displayEdit(e)}>
    //         Quantity: {modelInfo.quantity} 
    //     </div>)         
    // },[modelInfo]);

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        o.price=parseFloat(o.price);
        const tempval=[...props.models];        
        for(let i=0;i<tempval.length;i++) {
            if(tempval[i]._id===o._id)tempval[i]={...o};
        }
        setModelInfo({...o});
        props.setModels(tempval);
        const targetPath = 'http://localhost:3000/accessory/'+props.data._id;
        const outcome=await axios.put(targetPath, o);  
        console.log('update: ', o);
    }

    function displayEdit(e) {
        // const valSize=e.target.getAttribute('data-size');
        // const valQuantity=e.target.getAttribute('data-quantity');        
        setOutput(<EditModel nosize={true} setOutput={setOutput}  valQuantity={modelInfo.quantity} updateInfo={updateInfo} setModelInfo={setModelInfo} modelInfo={modelInfo}/>);
    }

    function displayHeader() {
        setOutput(<EditProductHeader deleteProduct={deleteProduct} setMainPage={props.setMainPage}  setModals={props.setModals} brands={props.brands} data={modelInfo} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct() {
        props.refresh();
        props.setModels(prev=>prev.filter(x=>x._id!==modelInfo._id));
        const targetPath = 'http://localhost:3000/accessory/'+props.data._id;
        const outcome=await axios.delete(targetPath, modelInfo._id);
    }

    return (
        <div className='productInstance'>
            <button className='backButton' onClick={props.refresh}><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9 18-6-6 6-6 1.4 1.4L6.8 11H21v2H6.8l3.6 3.6Z"/></svg><span>Back to catalogue</span></button>
            {/* <button onClick={newQuantity}>new quantity</button> */}
            <div className="modelHeader" onClick={displayHeader}>
                <div className="model">{data ? data.name : ''}</div>
                <div className="brandName"></div>
                <div className="instanceImageWrapper">
                    <img src={data ? data.picture : ''} alt="picture" />
                </div>
            </div>
            {/* <button className='addSizeButton' onClick={()=>setAddSize(<AddSizeShirt setAddSize={setAddSize} modelInfo={modelInfo} updateInfo={updateInfo}/>)}>{addIcon} <span>Add new size</span></button> */}
            {displayCategory}
            {output}
            {displaySizes}
            {addSize}           
        </div>
    )
}

export default BrandInstance