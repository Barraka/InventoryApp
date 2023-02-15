import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditModel from './EditModel';
import EditProductHeader from './EditProductHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import loading from '../assets/loading.gif';

function AccessoryInstance(props) {
    const [output, setOutput] = useState();
    const [modelInfo, setModelInfo] = useState({});
    const [displaySizes, setDisplaySizes] = useState();
    const [addSize, setAddSize] = useState();
    const params = useParams();
    const productID=params.id;
    const navigate = useNavigate();

    useEffect(()=>{
        if(props.dataAccessories===undefined)getModelsAndBrands();
        else {
            const target=props.dataAccessories.find(x=>x._id===productID);
            setModelInfo(target); 
        }       
    },[]);

    useEffect(()=>{       
        setDisplaySizes(<div className="instanceWrapper"  onClick={e=>displayEdit(e)}>
            Quantity: {modelInfo.quantity} 
        </div>) 
       
    },[modelInfo]);

    async function getModelsAndBrands() {
        let modelsArray =[];
        await axios.get('http://localhost:3000/accessories')
            .then(res=>  {
                let allModels= res.data.message;
                const allBrands=res.data.brands;
                props.setBrands(allBrands);                
                allModels.forEach(x=> {
                    //Get the brand Name from the stores _id
                    allBrands.forEach(brand=> {
                        if(x.brand===brand._id) {
                            x.brandName = brand.name;
                            modelsArray.push(x);
                        }                    
                    });
                    //Display a placeholder image if none is provided
                    if(!x.picture)x.picture=placeholderImage;
                });                
                props.setDataAccessories([...modelsArray]);
                const target=modelsArray.find(x=>x._id===productID);
                setModelInfo(target);
            })
            .catch(console.error);
        return modelsArray;
    }

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        o.price=parseFloat(o.price);
        const tempval=[...props.dataAccessories];        
        for(let i=0;i<tempval.length;i++) {
            if(tempval[i]._id===o._id)tempval[i]={...o};
        }
        setModelInfo({...o});
        props.setDataAccessories(tempval);
        const targetPath = 'http://localhost:3000/accessory/'+modelInfo._id;
        const outcome=await axios.put(targetPath, o);  
    }

    function displayEdit(e) {      
        setOutput(<EditModel nosize={true} setOutput={setOutput}  valQuantity={modelInfo.quantity} updateInfo={updateInfo} setModelInfo={setModelInfo} modelInfo={modelInfo}/>);
    }

    function displayHeader() {
        setOutput(<EditProductHeader link={'/accessories'} deleteProduct={deleteProduct} brands={props.brands} data={modelInfo} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct() {
        navigate('/accessories');
        props.setDataAccessories(prev=>prev.filter(x=>x._id!==modelInfo._id));
        const targetPath = 'http://localhost:3000/accessory/'+modelInfo._id;
        const outcome=await axios.delete(targetPath, modelInfo._id);
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