import React, { useEffect, useRef, useState } from 'react'
import ZoomedImage from './ZoomedImage';

function EditProductHeader(props) {
    const [data, setData] = useState({});
    const [brands, setBrands] = useState([]);
    const [zoomedImage, setZoomedImage] = useState('');
    const productRef=useRef(null);
    const fileRef=useRef(null);
    const priceRef=useRef(null);

    useEffect(()=>{
        setData(props.data);
        setBrands(props.brands);
    },[]);
    
    function getBase64(file) {
        //Check extension first
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(fileRef.current.value)) {
            fileRef.current.setCustomValidity("Not a supported file type");
            fileRef.current.reportValidity();
            return;
        }
        if(fileRef.current.files[0].size > 500000) {
            fileRef.current.setCustomValidity("File size too big. Max: 500Ko");
            fileRef.current.reportValidity();
            return;
        }
        //Encode file
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=> {
            setData({...data, picture: reader.result});
        };
        reader.onerror = function (error) {
          console.error('Error: ', error);
        };
    }

    function dropdownChange(e) {
        const idChosen = e.target.children[e.target.selectedIndex].getAttribute('data-id');
        setData({...data, brand:idChosen, brandName:e.target.value});
    }

    function imageZoom() {
        setZoomedImage(<ZoomedImage src={data.picture} setZoomedImage={setZoomedImage}/>);
    }   

    function isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    function validate() {
        let modelNameErrors=[];
        let priceErrors=[];
        //Check name
        if(data.model==='')modelNameErrors.push('Please fill out this field.');
        else if(data.model.length<3)modelNameErrors.push('Model name must be at least 3 characters.');
        //Check price
        if(data.price==='')priceErrors.push('Please fill out this field.');
        else if(!isNumeric(priceRef.current.value)) {
            priceErrors.push('Not a valid price.');
        }        
        else if(priceRef.current.value.split('.')[1]?.length >2) priceErrors.push('Only 2 decimal places are allowed');

        if(modelNameErrors.length) {
            modelRef.current.setCustomValidity(modelNameErrors[0]);
            modelRef.current.reportValidity();
        }
        else if(priceErrors.length) {
            priceRef.current.setCustomValidity(priceErrors[0]);
            priceRef.current.reportValidity();
        }   
        else {
            const tempdata={...data};
            tempdata.price=parseFloat(tempdata.price);
            props.updateInfo(tempdata);
        }
    }   
    

    return (
        
        <div className='editProductHeader'>
            <div className="backdrop"></div>
            <div className='editProductHeaderWrapper'>
                
                <div className="editProductInner">
                    {zoomedImage}
                    <div className="productNameLabel">Product Name:</div>
                    <input ref={productRef} type="text" value={data.model || ''} onChange={e=>setData({...data, model:e.target.value})}/>

                    <div className="productBrand">Brand:</div>
                    <select name="brand" id="brand" onChange={dropdownChange} value={data.brandName || ''}>
                        {brands.map(x=><option key={x._id} data-id={x._id}>{x.name}</option>)}
                    </select>

                    <div className="productPicture">Producut Image:</div>
                    <input ref={fileRef} type="file" name="image" id="image"  onChange={(e) => getBase64(e.target.files[0])}/>

                    <div className="productPrice">Price:</div>
                    <input ref={priceRef} type="text" value={data.price || ''} onChange={e=>setData({...data, price:(e.target.value)})}/>

                    <div className="headerImageWrapper" onClick={imageZoom}>
                        <img src={data.picture} alt="" />
                    </div>
                    <div className="buttonsWrapper">
                        <button className='editButton' onClick={validate}>Confirm</button>
                        <button className='editButton' onClick={()=>props.setOutput('')}>Cancel</button>
                    </div>
                    <button className='deleteButton' onClick={props.deleteProduct}>Delete Product</button>
                </div>
                
            </div>
            
        </div>
    )
}

export default EditProductHeader