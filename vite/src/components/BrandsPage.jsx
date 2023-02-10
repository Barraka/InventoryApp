import React, { useEffect, useState } from 'react'
import axios from 'axios';
import placeholderImage from '../assets/empty.jpg';
import ProductCard from './ProductCard';
import loading from '../assets/loading.gif';
import BrandInstance from './BrandInstance';

function AccessoriesPage(props) {
    const [brands, setBrands] = useState([]);
    const [productInstance, setProductInstance] = useState(null);
    const [display, setDisplay] = useState(true);

    useEffect(()=>{
        getBrands();
    },[]);

    async function getBrands() {
        await axios.get('http://localhost:3000/brands')
            .then(res=>  {
                const allBrands=res.data.message;
                console.log('brands got: ', allBrands);
                setBrands(allBrands);                
            })
            .catch(console.error);
    }

    async function refresh() {
        setAddModel(null);
        setDisplay(true);
        setProductInstance(null);
    }

    function displayInstance(data) {
        setDisplay(false);
        setProductInstance(<BrandInstance setProductInstance={setProductInstance} refresh={refresh} id={data.id} data={data.data} model={data.model} brandName={data.brandName} picture={data.picture} setMainPage={props.setMainPage}  setModels={setModels} brands={brands} models={models}/>);
    }

    const addIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>;

    return (
        <div className="productPage">
            {/* {addModel} */}
            {productInstance}
            {display ?
            <div className="modelsWrapper">
                <div className="intro">
                    {/* <button className='addSizeButton' onClick={()=>setAddModel(<AccessoryAdd setModels={setModels} refresh={refresh} models={models} getModelsAndBrands={getModelsAndBrands} brands={brands} setAddModel={setAddModel} />)}> {addIcon}<span>Add Brand</span> </button>                 */}
                    <button className='addSizeButton'>Add Brand</button>
                </div>
                <div className="models">
                    {/* {models ? models.map((x,i)=><ProductCard nosize={true}  displayInstance={displayInstance} key={x._id || i} id={x._id} setModels={setModels} data={x} brands={brands} model={x.model} brandName={x.brandName} picture={x.picture || placeholderImage} setMainPage={props.setMainPage}/>): <div className='loadingWrapper'><img src={loading} alt="loading" /></div>} */}
                    {brands ? brands.map((x,i)=><div key={i} className='productCard' onClick={displayInstance}  >
                        <div className="cardItem cardTitle">{x.name}</div>
                        <div className="cardImageWrapper">
                            <img src={x.picture || placeholderImage} alt="picture" />
                        </div>
                        <div className='cardItem'>Number of items: {x.count}</div>
                         
                         </div>): <div className='loadingWrapper'><img src={loading} alt="loading" /></div>}
                </div>
            
            </div> : null}
        </div>        
    )
}

export default AccessoriesPage