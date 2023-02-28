import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditProductHeader from './EditProductHeader';
import { Link, useParams, useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/empty.jpg';
import {getAllBrands, getJustBrands, getShirts, getShoes, getCoats, getAccessories, outputAccessories, outputAllBrands, outputCoats, outputJustBrands, outputShirts, outputShoes} from '../crud';
import WrongPassword from './WrongPassword';


function BrandInstance(props) {
    const [output, setOutput] = useState();
    const [data, setData] = useState({});
    const [displayCategory ,setDisplayCategory] = useState();
    const [warning, setWarning] = useState(null);
    const params = useParams();
    const productID=params.id;
    const navigate=useNavigate();

    useEffect(()=>{  
        if(props.dataBrands===undefined)getDataBrands(); 
        else {
            const target=props.dataBrands.find(x=>x._id===productID);
            setData(target); 
            displayAll(target); 
        }
        if(props.dataShoes==undefined)getDataShoes();
        if(props.brands===undefined)getDataBrands();
        if(props.dataBrands===undefined)getDataAllBrands(); 
        if(props.dataShirts===undefined)getDataShirts();
        if(props.dataCoats===undefined)getDataCoats();
        if(props.dataAccessories===undefined)getDataAccessories();
 
    },[]);

    useEffect(()=>{
        if(props.dataBrands) {
            const target=props.dataBrands.find(x=>x._id===productID);
            setData(target);
            displayAll(target);
        } 
    },[props.dataBrands]);

    async function getDataShoes() {
        await getShoes();
        const result=outputShoes;
        props.setDataShoes(result);
    }
    async function getDataShirts() {
        await getShirts();
        const result=outputShirts;
        props.setDataShirts(result);
    }
    async function getDataCoats() {
        await getCoats();
        const result=outputCoats;
        props.setDataCoats(result);
    }
    async function getDataAccessories() {
        await getAccessories();
        const result=outputAccessories;
        props.setDataAccessories(result);
    }
    async function getDataBrands() {
        await getJustBrands();
        const result=outputJustBrands;
        props.setBrands(result);
    }
    async function getDataAllBrands() {
        await getAllBrands();
        const result=outputAllBrands;
        props.setDataBrands(result);
    }


    function displayAll(target) {
        if(target===undefined || target.products===undefined ||!Object.keys(target.products).length) {
            setDisplayCategory(<div className='category'>There are currently no items under this brand.</div>);
            data.picture=placeholderImage;
            return;
        }
        setDisplayCategory(<div className='brandWrapper'>
        {Object.keys(target.products?.category1).length ? <div className='category'><div className='categoryName'>Shoes</div><div className='brandProductList'>{target.products.category1.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/shoes/'+x._id)}><div className='brandProductWrapper'><img src={x.picture ? x.picture : placeholderImage} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}

        {Object.keys(target.products.category2).length ? <div className='category'><div className='categoryName'>Shirts</div><div className='brandProductList'>{target.products.category2.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/shirts/'+x._id)}><div className='brandProductWrapper'><img src={x.picture ? x.picture : placeholderImage} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}

        {Object.keys(target.products.category3).length ? <div className='category'><div className='categoryName'>Coats</div><div className='brandProductList'>{target.products.category3.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/coats/'+x._id)}><div className='brandProductWrapper'><img src={x.picture ? x.picture : placeholderImage} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}
        
        {Object.keys(target.products.category4).length ? <div className='category'><div className='categoryName'>Accessories</div><div className='brandProductList'>{target.products.category4.map((x,i)=> 
             (<div key={x._id ? x._id : i} className="brandProduct" onClick={e=>navigate('/accessories/'+x._id)}><div className='brandProductWrapper'><img src={x.picture ? x.picture : placeholderImage} alt="thumbnail" /></div><div className='brandProductName'>{x.model}</div></div>)
        )
        }</div></div>: null}
    </div>);
    }

    async function updateInfo(o) {
        setOutput('');
        setData({...o});
        const tempval1=[...props.dataBrands]; 
        const tempval2=[...props.brands]; 
        const prevDataBrands = JSON.parse(JSON.stringify(tempval1));
        const prevBrands = JSON.parse(JSON.stringify(tempval2));
        for(let i=0;i<tempval2.length;i++) {
            if(tempval2[i]._id===o._id)tempval2[i]={...o};
        }
        for(let i=0;i<tempval1.length;i++) {
            if(tempval1[i]._id===o._id) {
                tempval1[i].name=o.name;
                tempval1[i].picture=o.picture;
            }
        }

        props.setDataBrands(tempval1);
        props.setBrands(tempval2);
        const targetPath = 'https://inventori.up.railway.app/brands/'+o._id;
        // const targetPath = 'http://localhost:3000/brands/'+o._id;
        await axios.put(targetPath, o)
        .catch(e=> {
            console.error('Error updating info: ', e);
            props.setDataBrands(prevDataBrands);
            props.setBrands(prevBrands);
        }); 
    }

    function displayHeader() {
        setOutput(<EditProductHeader setBrands={props.setBrands} setDataBrands={props.setDataBrands} link={'/brands'} forBrand={true} deleteProduct={deleteProduct}  brands={props.brands} data={data} updateInfo={updateInfo} setOutput={setOutput}/>);
    }

    async function deleteProduct(pw) {
        if(data.count) {         
            setOutput(null);   
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
            const prevDataBrands=JSON.parse(JSON.stringify(props.dataBrands));
            const prevBrands=JSON.parse(JSON.stringify(props.brands));
            props.setDataBrands(prev=>prev.filter(x=>x._id!==data._id));
            props.setBrands(prev=>prev.filter(x=>x._id!==data._id));
            // const targetPath = 'http://localhost:3000/brands/'+data._id;
            const targetPath = 'https://inventori.up.railway.app/brands/'+data._id;
            await axios.delete(targetPath, {data: {pw: pw}})
            .then(res=> {
                getDataAllBrands();                
            })
            .catch(e=> {
                console.error('Error deleting brand: ', e);
                props.setDataBrands(prevDataBrands);
                props.setBrands(prevBrands);
                props.setPassword(<WrongPassword setPassword={props.setPassword}/>);
            });
            
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
                    <img src={data.picture ? data.picture : placeholderImage} alt="picture" />
                </div>
            </div>
            {displayCategory}
            {output} 
            {warning}     
        </div>
    )
}

export default BrandInstance