import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import EditProductHeader from './EditProductHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import loading from '../assets/loading.gif';
import {getAllBrands, getJustBrands, getShirts, getShoes, getCoats, getAccessories, outputAccessories, outputAllBrands, outputCoats, outputJustBrands, outputShirts, outputShoes} from '../crud';

function AccessoryInstance(props) {
    const [output, setOutput] = useState();
    const [modelInfo, setModelInfo] = useState({});
    const [displaySizes, setDisplaySizes] = useState();
    const [addSize, setAddSize] = useState();
    const params = useParams();
    const productID=params.id;
    const navigate = useNavigate();

    useEffect(()=>{
        if(props.dataAccessories===undefined)getDataAccessories(); 
        else {
            const target=props.dataAccessories.find(x=>x._id===productID);
            setModelInfo(target); 
        }
        if(props.shoes===undefined)getDataShoes();
        if(props.brands===undefined)getDataBrands();
        if(props.dataBrands===undefined)getDataAllBrands(); 
        if(props.dataShirts===undefined)getDataShirts();
        if(props.dataCoats===undefined)getDataCoats();   
    },[]);

    useEffect(()=>{
        if(props.dataAccessories) {
            const target=props.dataAccessories.find(x=>x._id===productID);
            setModelInfo(target);
        } 
    },[props.dataAccessories]);

    useEffect(()=>{       
        setDisplaySizes(<div className="instanceWrapper"  onClick={e=>displayEdit(e)}>
            Quantity: {modelInfo.quantity} 
        </div>) 
       
    },[modelInfo]);

    async function getDataShoes() {
        console.log('making a request for shoes');
        await getShoes();
        const result=outputShoes;
        props.setDataShoes(result);
    }
    async function getDataShirts() {
        console.log('making a request for shirts');
        await getShirts();
        const result=outputShirts;
        props.setDataShirts(result);
    }
    async function getDataCoats() {
        console.log('making a request for coats');
        await getCoats();
        const result=outputCoats;
        props.setDataCoats(result);
    }
    async function getDataAccessories() {
        console.log('making a request for acccessories');
        await getAccessories();
        const result=outputAccessories;
        props.setDataAccessories(result);
    }
    async function getDataBrands() {
        console.log('making a request for just brands');
        await getJustBrands();
        const result=outputJustBrands;
        props.setBrands(result);
    }
    async function getDataAllBrands() {
        console.log('making a request for all brands');
        await getAllBrands();
        const result=outputAllBrands;
        props.setDataBrands(result);
    }

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        o.price=parseFloat(o.price);
        const tempval=[...props.dataAccessories]; 
        const prevData = JSON.parse(JSON.stringify(tempval));       
        for(let i=0;i<tempval.length;i++) {
            if(tempval[i]._id===o._id)tempval[i]={...o};
        }
        setModelInfo({...o});
        props.setDataAccessories(tempval);
        const targetPath = 'http://localhost:3000/accessory/'+modelInfo._id;
        await axios.put(targetPath, o)
        .then(res=> {
            getDataAllBrands();
        })
        .catch(e=> {
            console.error('Error updating info: ', e);
            props.setDataAccessories(prevData);
        });  
    }

    function displayEdit(e) {      
        setOutput(<EditModel nosize={true} setOutput={setOutput}  valQuantity={modelInfo.quantity} updateInfo={updateInfo} setModelInfo={setModelInfo} modelInfo={modelInfo}/>);
    }

    function displayHeader() {
        setOutput(<EditProductHeader link={'/accessories'} deleteProduct={deleteProduct} brands={props.brands} data={modelInfo} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct() {
        navigate('/accessories');
        const prev=modelInfo;
        props.setDataAccessories(prev=>prev.filter(x=>x._id!==modelInfo._id));
        const targetPath = 'http://localhost:3000/accessory/'+modelInfo._id;
        await axios.delete(targetPath, modelInfo._id)
        .then(res=> {
            getDataAllBrands();
        })
        .catch(e=> {
            console.error('Error deleting product: ', e);
            props.setDataAccessories(prev);
        }); 
    }

    return (
        <div className='productInstance'>
        <Link to="/accessories">
            <button className='backButton' ><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9 18-6-6 6-6 1.4 1.4L6.8 11H21v2H6.8l3.6 3.6Z"/></svg><span>Back to catalogue</span></button>
        </Link>

        <div className="modelHeader" onClick={displayHeader}>
            <div className="model">{modelInfo.model}</div>
            <div className="brandName">{modelInfo.brandName}</div>
            <div className="instanceImageWrapper">
                <img src={modelInfo.picture===undefined ? loading : modelInfo.picture} alt="picture" />
            </div>
        </div>

        {output}
        {displaySizes}
        {addSize}            
        </div>
    )
}

export default AccessoryInstance