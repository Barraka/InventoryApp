import React, { useEffect, useState } from 'react'
import axios from 'axios';
import placeholderImage from '../assets/empty.jpg';
import ProductCard from './ProductCard';
import loading from '../assets/loading.gif';
import AccessoryInstance from './AccessoryInstance';
import ProductAdd from './ProductAdd';

function AccessoriesPage(props) {
    const [models, setModels] = useState();
    const [brands, setBrands] = useState([]);
    const [addModel, setAddModel] = useState(null);
    const [productInstance, setProductInstance] = useState(null);
    const [display, setDisplay] = useState(true);

    useEffect(()=>{
        getModelsAndBrands();
    },[]);

    useEffect(()=>{
    },[models]);

    async function getModelsAndBrands() {
        let modelsArray =[];
        await axios.get('http://localhost:3000/accessories')
            .then(res=>  {
                let allModels= res.data.message;
                const allBrands=res.data.brands;
                setBrands(allBrands);                
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
                setModels([...modelsArray]);
            })
            .catch(console.error);
        return modelsArray;
    }

    async function refresh() {
        setAddModel(null);
        setDisplay(true);
        setProductInstance(null);
    }

    function displayInstance(data) {
        setDisplay(false);
        setProductInstance(<AccessoryInstance setProductInstance={setProductInstance} refresh={refresh} getModelsAndBrands={getModelsAndBrands} id={data.id} data={data.data} model={data.model} brandName={data.brandName} picture={data.picture} setMainPage={props.setMainPage}  setModels={setModels} brands={brands} models={models}/>);
    }

    async function sendData(o) {
        const prevData=models;
        axios.post('http://localhost:3000/add_accessory', o)
        .then(res=>{
            setModels(res.data.message);
        })     
        .catch(e=>{
            console.error('error: ', e);
            setModels(prevData);
        });
        setModels(prev=>[...prev, o]); 
        refresh();               
    }

    const addIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>;

    return (
        <div className="productPage">
            {addModel}
            {productInstance}
            {display ?
            <div className="modelsWrapper">
                <div className="intro">
                    {/* <button className='addSizeButton' onClick={()=>setAddModel(<AccessoryAdd setModels={setModels} refresh={refresh} models={models} getModelsAndBrands={getModelsAndBrands} brands={brands} setAddModel={setAddModel} />)}> {addIcon}<span>Add Accessory</span> </button>            */}
                    <button className='addSizeButton' onClick={()=>setAddModel(<ProductAdd sendData={sendData} setModels={setModels} refresh={refresh} models={models} getModelsAndBrands={getModelsAndBrands} brands={brands} setAddModel={setAddModel} />)}> {addIcon}<span>Add Accessory</span> </button>      
                </div>
                <div className="models">
                    {models ? models.map((x,i)=><ProductCard nosize={true}  displayInstance={displayInstance} key={x._id || i} id={x._id} setModels={setModels} data={x} brands={brands} model={x.model} brandName={x.brandName} picture={x.picture || placeholderImage} setMainPage={props.setMainPage}/>): <div className='loadingWrapper'><img src={loading} alt="loading" /></div>}
                </div>
            
            </div> : null}
        </div>        
    )
}

export default AccessoriesPage