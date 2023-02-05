import React from 'react'
import { useEffect, useState } from 'react'
import '../styles/styles.css';
import axios from 'axios';
import placeholderImage from '../assets/empty.jpg';
import ProductCard from './ProductCard';
function ShoeModel(props) {
    const [models, setModals] = useState();
    const [brands, setBrands] = useState([]);

    useEffect(()=>{
        // getBrands();
        getModels();

    },[]);
    useEffect(()=>{
        console.log('props: ', props);
    },[]);

    function getModels() {
        axios.get('http://localhost:3000/shoe_models')
            .then(res=>  {
                let allModels= res.data.message;
                const allBrands=res.data.brands;
                let models2 =[];
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
            .catch(e=>console.log);
    }
    // function getModelsFetch() {
    //     fetch('http://localhost:3000/shoe_models')
    //         .then(res=> res.json())
    //         .then(res=> {
    //             setModals(prev=>[...res.message]);
    //         })
    // }
    function getInfo() {
        console.log('models', models);
        models.forEach(x=> {
            if('picture' in x) {
                get
            }
        });
    }
    
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
          return reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }


    function getBrands() {
        axios.get('http://localhost:3000/brands')
            // .then(res=>  setBrands(res.data))
            .then(res=>  {
                const allBrands= res.data.message;                
                allBrands.forEach(x=> {
                    temp2.push(<div>{x.model}</div>);
                })
                setBrands([...temp2]);
            })
            .catch(e=>console.log);
    }
    
    return (
        <div className="shoeModelPage">
            <div className="intro">
                This is the shoe model page:<br/>
                <button onClick={getInfo}>get info</button>
                
            </div>
            <div className="models">
                {models ? models.map(x=><ProductCard key={x._id} id={x._id} model={x.model} brandName={x.brandName} picture={x.picture} setOutput={props.setOutput}/>): null}
            </div>

           
        </div>
        
    )
}

export default ShoeModel