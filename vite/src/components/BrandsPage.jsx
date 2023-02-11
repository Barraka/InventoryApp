import React, { useEffect, useState } from 'react'
import axios from 'axios';
import placeholderImage from '../assets/empty.jpg';
import ProductCard from './ProductCard';
import loading from '../assets/loading.gif';
import BrandInstance from './BrandInstance';
import ProductAdd from './ProductAdd';

function BrandsPage(props) {
    const [data, setData] = useState([]);
    const [productInstance, setProductInstance] = useState(null);
    const [display, setDisplay] = useState(true);
    const [addModel, setAddModel] = useState();
    const [loadingImg, setLoadingImg] = useState(<div className='loadingWrapper'><img src={loading} alt="loading" /></div>);

    useEffect(()=>{
        getBrands();
    },[]);

    async function getBrands() {
        await axios.get('http://localhost:3000/brands')
            .then(res=>  {
                const data=res.data.message;
                console.log('data got: ', data);
                setData(data);
                setLoadingImg(null);                
            })
            .catch(console.error);
    }

    async function refresh() {
        setDisplay(true);
        setProductInstance(null);
        setAddModel(null);
    }

    function displayInstance(data) {
        setDisplay(false);
        setProductInstance(<BrandInstance setProductInstance={setProductInstance} refresh={refresh} id={data._id} data={data} brandName={data.name} picture={data.picture} setData={setData} setMainPage={props.setMainPage} />);
    }

    async function sendData(o) {
        const prevData=data;
        axios.post('http://localhost:3000/brands', o)
        .then(res=>{
            setData(res.data.message);
        })     
        .catch(e=>{
            console.error('error: ', e);
            setData(prevData);
        });
        setData(prev=>[...prev, o]); 
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
                    <button className='addSizeButton' onClick={()=>setAddModel(<ProductAdd forBrand={true} sendData={sendData} setModels={setData} refresh={refresh} models={data}  setAddModel={setAddModel} />)}> {addIcon}<span>Add Brand</span> </button> 
                </div>
                <div className="models">
                    {/* {models ? models.map((x,i)=><ProductCard nosize={true}  displayInstance={displayInstance} key={x._id || i} id={x._id} setModels={setModels} data={x} brands={brands} model={x.model} brandName={x.brandName} picture={x.picture || placeholderImage} setMainPage={props.setMainPage}/>): <div className='loadingWrapper'><img src={loading} alt="loading" /></div>} */}

                    {data ? data.map((x,i)=><ProductCard nosize={true} forBrands={true}  displayInstance={displayInstance} key={x._id || i} id={x._id} data={x} brandName={x.name} picture={x.picture || placeholderImage} setMainPage={props.setMainPage}/>): null}
                    {loadingImg}

                    {/* {data ? data.map((x,i)=><div key={x._id} className='productCard' onClick={displayInstance}  >
                        <div className="cardItem cardTitle">{x.name}</div>
                        <div className="cardImageWrapper">
                            <img src={x.picture || placeholderImage} alt="picture" />
                        </div>
                        <div className='cardItem'>Number of items: {x.count}</div>
                         
                         </div>): <div className='loadingWrapper'><img src={loading} alt="loading" /></div>} */}
                </div>
            
            </div> : null}
        </div>        
    )
}

export default BrandsPage