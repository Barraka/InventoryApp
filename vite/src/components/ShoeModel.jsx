import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import placeholderImage from '../assets/empty.jpg';
import ProductCard from './ProductCard';
import ShoeModelAdd from './ShoeModelAdd';
import ShoeInstance from './ShoeInstance';
function ShoeModel(props) {
    const [models, setModals] = useState();
    const [brands, setBrands] = useState([]);
    const [addModel, setAddModel] = useState(null);
    const [shoeInstance, setShoeInstance] = useState(null);
    const [display, setDisplay] = useState(true);

    useEffect(()=>{
        getModelsAndBrands();
    },[]);

    useEffect(()=>{

    },[models]);

    async function getModelsAndBrands() {
        let models2 =[];
        await axios.get('http://localhost:3000/shoe_models')
            .then(res=>  {
                let allModels= res.data.message;
                const allBrands=res.data.brands;
                setBrands(allBrands);
                
                allModels.map(x=> {
                    //Get the brand Name from the stores _id
                    allBrands.forEach(brand=> {
                        if(x.brand===brand._id) {
                            x.brandName = brand.name;
                            models2.push(x);
                        }                    
                    });
                    //Display a placeholder image if none is provided
                    if(!x.picture)x.picture=placeholderImage;
                });                
                setModals([...models2]);
            })
            .catch(console.error);
        return models2;
    }

    function cleanData() {
        const tempvalList=[];
        models.forEach(x=> {
            const tempData={};
            tempData._id=x._id;
            tempData.model=x.model;
            tempData.brand=x.brand;
            tempData.sizes={38:2, 39.5:1, 40:2, 40.5:5, 41.5:2, 43:3};
            tempvalList.push(tempData);
        });
        console.log('list: ', tempvalList);
        updateWithCleanData(tempvalList);
    }

    async function updateModels(o) {
        axios.put('http://localhost:3000/shoe_models', {38:2, 39.5:1, 40:2, 40.5:5, 41.5:2, 43:3})
            .then(res=>console.log('res after put: ', res));

        axios.put('http://localhost:3000/shoe_models', o)
        .then(res=>console.log('res after put: ', res));
    }

    async function updateWithCleanData(o) {
        axios.put('http://localhost:3000/clean_data', o)
        .then(res=>console.log('res after put: ', res));
    }

    // function getModelsFetch() {
    //     fetch('http://localhost:3000/shoe_models')
    //         .then(res=> res.json())
    //         .then(res=> {
    //             setModals(prev=>[...res.message]);
    //         })
    // }
    function getInfo() {
        // console.log('models', models);
        // updateModels();
        // cleanData();
    }

    async function refresh() {
        console.log('in refresh');
        // setAddModel(null);
        setDisplay(true);
        setShoeInstance(null);
    }

    function displayInstance(data) {
        setDisplay(false);
        setShoeInstance(<ShoeInstance refresh={refresh} getModelsAndBrands={getModelsAndBrands} id={data.id} data={data.data} model={data.model} brandName={data.brandName} picture={data.picture} setMainPage={props.setMainPage}  setModals={setModals} brands={brands} models={models}/>);

    }

    return (
        <div className="shoePage productPage">
            {addModel}
            {shoeInstance}
            {display ?
            <div className="modelsWrapper">
                <div className="intro">
                    <button onClick={()=>setAddModel(<ShoeModelAdd refresh={refresh} models={models} getModelsAndBrands={getModelsAndBrands} brands={brands} setAddModel={setAddModel} />)}>Add Shoe Model</button>                
                </div>
                <div className="models">
                    {models ? models.map(x=><ProductCard  displayInstance={displayInstance} dataFor={'shoes'} key={x._id} id={x._id} setModals={setModals} data={x} brands={brands} model={x.model} brandName={x.brandName} picture={x.picture} setMainPage={props.setMainPage}/>): null}
                </div>

                {/* {models ? models.map(x=><ShoeInstance key={x._id} id={x._id} setModals={setModals} data={x} brands={brands} model={x.model} brandName={x.brandName} picture={x.picture} setMainPage={props.setMainPage}/>): null} */}

            
            </div> : null}
        </div>        
    )
}

export default ShoeModel