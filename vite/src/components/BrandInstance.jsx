import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditProductHeader from './EditProductHeader';
import { Link, useParams, useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/empty.jpg';
import loading from '../assets/loading.gif';


function BrandInstance(props) {
    const [output, setOutput] = useState();
    const [data, setData] = useState({});
    const [displaySizes, setDisplaySizes] = useState();
    const [displayCategory ,setDisplayCategory] = useState();
    const [addSize, setAddSize] = useState();
    const [warning, setWarning] = useState(null);
    const params = useParams();
    const productID=params.id;
    const navigate=useNavigate();

    useEffect(()=>{  
        if(props.dataBrands===undefined)getBrands();
        else {
            const target=props.dataBrands.find(x=>x._id===productID);
            setData(target);     
            displayAll(target); 
        } 
    },[]);

    async function getBrands() {
        await axios.get('http://localhost:3000/brands')
            .then(res=>  {
                const data=res.data.message;
                const justBrands = res.data.justBrands;
                props.setDataBrands(data);
                props.setBrands(justBrands); 
                const target=data.find(x=>x._id===productID);
                setData(target);
                displayAll(target);       
            })
            .catch(console.error);
    }

    function displayAll(target) {
        if(target===undefined || target.products===undefined ||!Object.keys(target.products).length) {
            setDisplayCategory(<div className='category'>There are currently no items under this brand.</div>);
            data.picture=placeholderImage;
            return;
        }
        setDisplayCategory(<div className='brandWrapper'>
        {Object.keys(target.products?.category1).length ? <div className='category'><div className='categoryName'>Shoes</div><div className='brandProductList'>{target.products.category1.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/shoes/'+x._id)}><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}

        {Object.keys(target.products.category2).length ? <div className='category'><div className='categoryName'>Shirts</div><div className='brandProductList'>{target.products.category2.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/shirts/'+x._id)}><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}

        {Object.keys(target.products.category3).length ? <div className='category'><div className='categoryName'>Coats</div><div className='brandProductList'>{target.products.category3.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/coats/'+x._id)}><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}
        
        {Object.keys(target.products.category4).length ? <div className='category'><div className='categoryName'>Accessories</div><div className='brandProductList'>{target.products.category4.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/accessories/'+x._id)}><div className='brandProductWrapper'><img src={x.picture} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}
    </div>);
    }

    async function updateInfo(o) {
        setOutput('');
        setAddSize('');
        setData({...o});
        const tempval1=[...props.dataBrands]; 
        const tempval2=[...props.brands]; 
        for(let i=0;i<tempval2.length;i++) {
            if(tempval2[i]._id===o._id)tempval2[i]={...o};
        }
        for(let i=0;i<tempval1.length;i++) {
            if(tempval1[i]._id===o._id) {
                tempval1[i].name=o.name;
                tempval1[i].picture=o.picture;
            }
        }
        const targetPath = 'http://localhost:3000/brands/'+o._id;
        const outcome=await axios.patch(targetPath, o);  
    }

    function displayHeader() {
        setOutput(<EditProductHeader link={'/brands'} forBrand={true} deleteProduct={deleteProduct}  brands={props.brands} data={data} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct() {
        if(data.count) {         
            setOutput(null);   
            console.log('cannot delete');
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
            navigate('/brands');
            props.setDataBrands(prev=>prev.filter(x=>x._id!==data._id));
            props.setBrands(prev=>prev.filter(x=>x._id!==data._id));
            const targetPath = 'http://localhost:3000/brands/'+data._id;
            const outcome=await axios.delete(targetPath, data._id);
            
        }
    }

    return (
        <div className='productInstance'>
            
            <Link to="/brands">
                <button className='backButton' ><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9 18-6-6 6-6 1.4 1.4L6.8 11H21v2H6.8l3.6 3.6Z"/></svg><span>Back to catalogue</span></button>
            </Link>

            <div className="modelHeader" onClick={displayHeader}>
                <div className="model">{data ? data.name : ''}</div>
                <div className="brandName"></div>
                <div className="instanceImageWrapper">
                    <img src={data.picture ? data.picture : loading} alt="picture" />
                </div>
            </div>
            {displayCategory}
            {output}
            {displaySizes}
            {addSize}   
            {warning}     
        </div>
    )
}

export default BrandInstance