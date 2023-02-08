import React, { useEffect, useState } from 'react'
import placeholderImage from '../assets/empty.jpg';
import axios from 'axios';
import ProductCard from './ProductCard';

function ShirtsPage(props) {
    const [models, setModals] = useState();
    const [brands, setBrands] = useState([]);
    const [addModel, setAddModel] = useState(null);

    useEffect(()=>{
        getModelsAndBrands();
    },[]);

    async function getModelsAndBrands() {
        let modelsArray =[];
        await axios.get('http://localhost:3000/shirts_models')
            .then(res=>  {
                let allModels= res.data.message;
                const allBrands=res.data.brands;
                setBrands(allBrands);
                
                allModels.map(x=> {
                    //Get the brand Name from the stores _id
                    allBrands.every(brand=> {
                        if(x.brand===brand._id) {
                            x.brandName = brand.name;
                            modelsArray.push(x);
                            //break out of loop:
                            return false;
                        }                    
                    });
                    //Display a placeholder image if none is provided
                    if(!x.picture)x.picture=placeholderImage;
                });                
                setModals([...modelsArray]);
            })
            .catch(console.error);
        return modelsArray;
    }

    return (
        <div className='shirtsPage productPage'>
            {addModel}
            <div className="intro">
                <button >Add Shirt Model</button>                
            </div>
            <div className="models">
                {models ? models.map(x=><ProductCard key={x._id} id={x._id} setModals={setModals} data={x} brands={brands} model={x.model} brandName={x.brandName} picture={x.picture} setMainPage={props.setMainPage}/>): null}
            </div>
        </div>
    )
}

export default ShirtsPage