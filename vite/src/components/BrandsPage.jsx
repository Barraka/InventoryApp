import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import loading from '../assets/loading.gif';
import ProductAdd from './ProductAdd';

function BrandsPage(props) {
    const [productInstance, setProductInstance] = useState(null);
    const [addModel, setAddModel] = useState();

    useEffect(()=>{
        if(props.dataBrands===undefined) {
            props.getBrands();            
        }
    },[]);

    useEffect(()=>{
    },[props.brands, props.dataBrands, addModel]);

    async function refresh() {
        setProductInstance(null);
        setAddModel(null);
    }

    async function sendData(o) {
        const prevDataBrands=[...props.dataBrands];
        const prevData=[...props.brands];
        props.setBrands([...prevData, o]); 
        props.setDataBrands([...prevDataBrands, {...o, count:0, products:{}}]);
        axios.post('http://localhost:3000/brands', o)
        .then(res=>{
            const result=res.data.message;
            props.setBrands(result);
            props.getBrands();
        })     
        .catch(e=>{
            console.error('error: ', e);
            props.setBrands(prevData);
            props.setDataBrands(prevDataBrands);
        });
        
        refresh();               
    }

    const addIcon=<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>;

    return (
        <div className="productPage">
            {addModel}
            {productInstance}
            <div className="modelsWrapper">
                <div className="intro">
                    <button className='addSizeButton' onClick={()=>setAddModel(<ProductAdd  setAddModel={setAddModel} forBrand={true} sendData={sendData}  refresh={refresh} brands={props.brands} />)}> {addIcon}<span>Add Brand</span> </button> 
                </div>

                <div className="models">
                    
                    {props.dataBrands ? props.dataBrands.map((x,i)=><ProductCard nosize={true} key={x._id || i} id={x._id} data={x} target={'/brands/'}/>): <div className='loadingWrapper'><img src={loading} alt="loading" /></div>}

                </div>            
            </div>
        </div>        
    )
}

export default BrandsPage