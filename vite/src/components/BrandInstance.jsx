import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import EditProductHeader from './EditProductHeader';
import ShoeInstance from './ShoeInstance';


function BrandInstance(props) {
    const [output, setOutput] = useState();
    const [data, setData] = useState();
    const [displaySizes, setDisplaySizes] = useState();
    const [displayCategory ,setDisplayCategory] = useState();
    const [addSize, setAddSize] = useState();
    const [warning, setWarning] = useState(null);
    const [link, setLink] = useState(null);

    useEffect(()=>{  
        setData(props.data);
        console.log('brandinstance data: ', props.data);     
        displayAll();
        console.log('data: ', props.data.count);
    },[]);

    function displayAll() {
        setDisplayCategory(<div className='brandWrapper'>
        {Object.keys(props.data.products?.category1).length ? <div className='category'><div className='categoryName'>Shoes</div><div className='brandProductList'>{props.data.products.category1.map(x=> 
             (<div onClick={e=>displayInstance(x)} key={x._id} className="brandProduct"><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
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
    }

    function displayInstance(e) {
        setOutput(null);
        setAddSize(null);
        setDisplayCategory(null);
        setLink(<ShoeInstance refresh={refresh} data={e}/>)
    }

    function refresh() {
        setLink(null);
        displayAll();
    }

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        setData({...o});
        const targetPath = 'http://localhost:3000/brands/'+o._id;
        const outcome=await axios.patch(targetPath, o);  
        console.log('outcome: ', outcome);
    }

    function displayEdit(e) {      
        setOutput(<EditModel nosize={true} setOutput={setOutput} updateInfo={updateInfo} />);
    }

    function displayHeader() {
        setOutput(<EditProductHeader forBrand={true} deleteProduct={deleteProduct} setMainPage={props.setMainPage}  setModals={props.setModals} brands={props.brands} data={data} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct() {
        if(props.data.count) {         
            setOutput(null);   
            setWarning(<div className='warningWrapper'>
                <div className='backdrop'></div>
                <div className="warning">
                    <div className="warningText">
                        You cannot delete a brand this is linked to existing products.<br/><br /> There is currently {data.count} product{data.count>1 ? 's' : null} under this brand.
                    </div>
                    <button className='editButton' onClick={e=>setWarning(null)}>OK</button>
                </div>
                
            </div>);
        } else {
            props.refresh();
            props.setData(prev=>prev.filter(x=>x._id!==data._id));
            const targetPath = 'http://localhost:3000/brands/'+props.data._id;
            const outcome=await axios.delete(targetPath, data._id);
        }
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
            {displayCategory}
            {output}
            {displaySizes}
            {addSize}   
            {warning}     
            {link}   
        </div>
    )
}

export default BrandInstance