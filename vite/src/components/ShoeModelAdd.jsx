import React from 'react'
import { useEffect, useState } from 'react'
import '../styles/styles.css';
import axios from 'axios';

function ShoeModelAdd(props) {
    const [shoe_model, setShoe_model] = useState({model: '', brand: '', description:''});
    const [brands, setBrands] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(()=>{
        getBrandsFetch();
    },[]);

    function getBrands() {
        axios.get('http://localhost:3000/brands')
            // .then(res=>  setBrands(res.data))
            .then(res=>  {
                const allBrands= res.data.message;                
                allBrands.forEach(x=> {
                    temp2.push(<div>{x.name}</div>);
                })
                setBrands([...temp2]);
            })
            .catch(e=>console.log);
    }
    function getBrandsFetch() {
        fetch('http://localhost:3000/brands')
            .then(res=> res.json())
            .then(res=> {
               setBrands(prev=>[...res.message]);
            })
    }

    function outcomeData(o) {
        console.log('outcome: ', o);
    }
    async function sendData() {
        let outcome;
        axios.post('http://localhost:3000/add_shoe_model', shoe_model)
        .then(res=>  {
            outcome=res.data.acknowledged;
            return outcomeData(outcome);
        })
        .catch(e=>{
            console.log('error: ', e);
            const errorArray=e.response?.data?.message?.errors;
        })
        
    }
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            update(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        function update(info) {
            
            setShoe_model({...shoe_model, picture: info})
        }
        update(reader.result);
        
     }

    function dropdownChange(e) {
        const idChosen = e.target.children[e.target.selectedIndex].getAttribute('data-id');
        setShoe_model({...shoe_model, brand:idChosen});
    }

    function getInfo() {
        console.log('shoe_model: ', shoe_model);
    }
    
    return (
        <div className="shoeModelPage">
            <div className="intro">
                This is the shoe model add page:<br/>
                
            </div>
            <button onClick={getInfo}>get info</button>


            <form className='form shoeModelForm'>
                <label htmlFor="model">Model Name:</label>
                <input type="text" name='model' required onChange={e=>setShoe_model({...shoe_model, model: e.target.value})}/>
                <br/>
                <label htmlFor="brand">Brand:</label>
                <select name="brand" id="brand" onChange={dropdownChange}>
                    {brands.map(x=><option key={x._id} data-id={x._id}>{x.name}</option>)}
                </select>
                <label htmlFor="image">Upload image (optional)</label>
                <input type="file" name="image" id="image"  onChange={(e) => getBase64(e.target.files[0])}/>
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" cols="30" rows="3" placeholder='Description' onChange={e=>setShoe_model({...shoe_model, description: e.target.value})}></textarea>
                <button onClick={e=>{e.preventDefault();sendData(e)}}>Submit</button>
            </form>
        </div>
        
    )
}

export default ShoeModelAdd