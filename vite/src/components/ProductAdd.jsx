import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import placeholderImage from '../assets/empty.jpg';

function ProductAdd(props) {
    const [data, setData] = useState({model: '', brand: '', brandName: '', price: '', picture:placeholderImage, quantity:0, sizes:{}});
    const [brands, setBrands] = useState([]);
    const modelRef = useRef(null);
    const priceRef = useRef(null);
    const brandRef = useRef(null);
    const fileRef=useRef(null);

    useEffect(()=>{
        setBrands(props.brands);
        if(props.forBrand)setData({model:'', picture: placeholderImage});        
    },[]);

    useEffect(()=>{
        console.log('brands: ', brands);
        window.brands=brands;
    },[brands]);

    function getBase64(file) {
        //Check extension first
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
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
        console.log('size: ', fileRef.current.files[0].size);
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
        const brandChosen = e.target.children[e.target.selectedIndex].value;
        setData({...data, brand:idChosen, brandName: brandChosen});
    }
    
    function isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    function validate(e) {
        e.preventDefault();
        //Make checks
        let modelNameErrors=[];
        let priceErrors=[];
        //Check name
        if(data.model==='')modelNameErrors.push('Please fill out this field.');
        else if(data.model.length<3)modelNameErrors.push('Model name must be at least 3 characters.');
        //Check price
        if(!props.forBrand && data.price==='')priceErrors.push('Please fill out this field.');
        else if(!props.forBrand && !isNumeric(data.price)) {
            priceErrors.push('Not a valid price.');
        }        
        if(modelNameErrors.length) {
            modelRef.current.setCustomValidity(modelNameErrors[0]);
            modelRef.current.reportValidity();
        }
        else if(!props.forBrand && priceErrors.length) {
            priceRef.current.setCustomValidity(priceErrors[0]);
            priceRef.current.reportValidity();
        }   
        else {
            //set default brand id            
            let tempdata={...data};
            if(!props.forBrand && tempdata.brand==='') {
                const idChosen = brandRef.current.children[brandRef.current.selectedIndex].getAttribute('data-id');
                const brandChosen = brandRef.current.children[brandRef.current.selectedIndex].value;
                tempdata.brand=idChosen;                
                tempdata.brandName=brandChosen;
            }
            if(!props.forBrand)tempdata.price=parseFloat(tempdata.price);
            props.sendData(tempdata);
        }        
    }

    return (
        <div className="addProduct">
            <div className="backdrop"></div>
            <div className="addProductBody">
                <div className="addProductTitle">Add item:</div>
                <form className='form' method='post'>
                    {/* model name */}
                    <label htmlFor="model">{props.forBrand? "Brand" : "Model"} Name:</label>
                    <input autoFocus ref={modelRef} type="text" name='model' value={data.model} required onChange={e=>setData({...data, model: e.target.value})}/>
                    <br/>

                    {/* brand dropdown*/}
                    {props.forBrand ? null :
                    <><label htmlFor="brand">Brand:</label>
                    <select ref={brandRef} name="brand" id="brand" onChange={dropdownChange}>
                        {brands.sort((a,b)=> {
                            const nameA=a.name.toLowerCase();
                            const nameB=b.name.toLowerCase();
                            if(nameA<nameB)return -1;
                            else return 1;   
                        }).map(x=><option key={x._id} data-id={x._id}>{x.name}</option>)}
                    </select></>}

                    {/* picture */}
                    <label htmlFor="image">Upload image (optional)</label>
                    <input ref={fileRef} className="fileChoose" type="file" name="image" id="image"  onChange={(e) => getBase64(e.target.files[0])}/>

                    {/* price */}
                    {props.forBrand ? null :
                    <><label htmlFor="price">Price:</label>
                    <input ref={priceRef} name="price" id="price" placeholder='Price' onChange={e=>setData({...data, price: (e.target.value)})} required ></input>
                    </>}

                    <div className="buttonsWrapper">
                        <button className='editButton' onClick={validate}>Submit</button>
                        <button className='editButton' onClick={()=>props.setAddModel(null)}>Cancel</button>
                    </div>
                </form>                
            </div>
        </div>
    )
}

export default ProductAdd