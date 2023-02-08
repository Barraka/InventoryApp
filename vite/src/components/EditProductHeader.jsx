import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ShoeModel from './ShoeModel';
import ZoomedImage from './ZoomedImage';

function EditProductHeader(props) {
    const [data, setData] = useState({});
    const [brands, setBrands] = useState([]);
    const [zoomedImage, setZoomedImage] = useState('');

    useEffect(()=>{
        setData(props.data);
        setBrands(props.brands);
    },[]);
    
    function getBase64(file) {
        function update(info) {            
            setData({...data, picture: info})
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            update(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     function dropdownChange(e) {
        const idChosen = e.target.children[e.target.selectedIndex].getAttribute('data-id');
        setData({...data, brand:idChosen, brandName:e.target.value});
    }
    function imageZoom() {
        setZoomedImage(<ZoomedImage src={data.picture} setZoomedImage={setZoomedImage}/>);
    }   
    async function deleteProduct() {
        const targetPath = 'http://localhost:3000/shoe_models/'+props.data._id;
        const outcome=await axios.delete(targetPath, data._id);
        // console.log('outcome: ', outcome.data.message);
        const newData=outcome.data.message;
        props.setMainPage(<ShoeModel setMainPage={props.setMainPage}/>);
    }

    return (
        
        <div className='editProductHeader'>
            <div className="backdrop"></div>
            <div className='editProductHeaderWrapper'>
                {zoomedImage}
                <div className="productNameLabel">Product Name:</div>
                <input type="text" value={data.model || ''} onChange={e=>setData({...data, model:e.target.value})}/>

                <div className="productBrand">Brand:</div>
                <select name="brand" id="brand" onChange={dropdownChange} value={data.brandName || ''}>
                    {brands.map(x=><option key={x._id} data-id={x._id}>{x.name}</option>)}
                </select>

                <div className="productPicture">Producut Image:</div>
                <input type="file" name="image" id="image"  onChange={(e) => getBase64(e.target.files[0])}/>

                <div className="productPrice">Price:</div>
                <input type="text" value={data.price || ''} onChange={e=>setData({...data, price:parseFloat(e.target.value)})}/>

                <div className="headerImageWrapper" onClick={imageZoom}>
                    <img src={data.picture} alt="" />
                </div>
                <div className="buttonsWrapper">
                    <button className='editButton' onClick={()=>props.updateInfo(data)}>Confirm</button>
                    <button className='editButton' onClick={()=>props.setOutput('')}>Cancel</button>
                </div>
                <button className='deleteButton' onClick={deleteProduct}>Delete Product</button>
            </div>
            
        </div>
    )
}

export default EditProductHeader