import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import '../styles/styles.css';
import axios from 'axios';

function ShoeModelAdd(props) {
    const [data, setData] = useState({model: '', brand: '', price: '', picture:'', sizes:{}});
    const [brands, setBrands] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(()=>{
        setBrands(props.brands);        
    },[]);

    useEffect(()=>{
        console.log('file change: ', file);
    },[file]);

    const modelRef = useRef(null);
    const priceRef = useRef(null);
    const brandRef = useRef(null);

    function outcomeData(o) {
        console.log('outcome: ', o);
    }

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
        setData({...data, brand:idChosen});
    }
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
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
        if(data.price==='')priceErrors.push('Please fill out this field.');
        else if(!isNumeric(data.price)) {
            priceErrors.push('Not a valid price.');
        }        

        if(modelNameErrors.length) {
            modelRef.current.setCustomValidity(modelNameErrors[0]);
            modelRef.current.reportValidity();
        }
        else if(priceErrors.length) {
            priceRef.current.setCustomValidity(priceErrors[0]);
            priceRef.current.reportValidity();
        }   
        else {
            //set default brand id
            let tempdata={...data};
            if(tempdata.brand==='') {
                const idChosen = brandRef.current.children[brandRef.current.selectedIndex].getAttribute('data-id');
                tempdata.brand=idChosen;
            }
            sendData(tempdata);
        }        
    }

    async function sendData(o) {
        let outcome;
        console.log('sendData model: ', o.brand);
        axios.post('http://localhost:3000/add_shoe_model', o)
        .then(res=>  {
            // outcome=res.data.acknowledged;
            outcome=res;
            console.log('outcome: ', outcome.message);
            setFile(res);
        })
        .catch(e=>{
            console.error('error: ', e);
            const errorArray=e.response?.data?.message?.errors;
        })
        props.refresh();        
    }
    
    return (
        <div className="addShoeModel">
            <div className="backdrop"></div>
            <div className="intro">
                Add another model:<br/>
                
            </div>

            <form className='form shoeModelForm' method='post'>
                {/* model name */}
                <label htmlFor="model">Model Name:</label>
                <input ref={modelRef} type="text" name='model' value={data.model} required onChange={e=>setData({...data, model: e.target.value})}/>
                <br/>

                {/* brand dropdown*/}
                <label htmlFor="brand">Brand:</label>
                <select ref={brandRef} name="brand" id="brand" onChange={dropdownChange}>
                    {brands.map(x=><option key={x._id} data-id={x._id}>{x.name}</option>)}
                </select>

                {/* picture */}
                <label htmlFor="image">Upload image (optional)</label>
                <input type="file" name="image" id="image"  onChange={(e) => getBase64(e.target.files[0])}/>

                {/* price */}
                <label htmlFor="price">Price:</label>
                <input ref={priceRef} name="price" id="price" placeholder='Price' onChange={e=>setData({...data, price: e.target.value})} required ></input>

                <div className="buttonsWrapper">
                    <button onClick={validate}>Submit</button>
                    <button onClick={()=>props.setAddModel(null)}>Cancel</button>
                </div>                              
                
            </form>
        </div>
        
    )
}

export default ShoeModelAdd