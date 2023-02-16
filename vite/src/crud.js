import axios from 'axios';

let outputAllBrands=undefined;
let outputJustBrands=undefined;
let outputShirts=undefined;
let outputShoes=undefined;
let outputCoats=undefined;
let outputAccessories=undefined;

async function getAllBrands() {
    await axios.get('http://localhost:3000/brands')
        .then(res=>  {
            const data=res.data.message;
            const justBrands = res.data.justBrands;
            outputAllBrands=data;
            outputJustBrands=justBrands;        
        })
        .catch(console.error)
}

async function getJustBrands() {
    await axios.get('http://localhost:3000/justBrands')
        .then(res=>  {
            const data=res.data.message;
            outputJustBrands=data;        
        })
        .catch(console.error)
}

async function getShirts() {
    let modelsArray =[];
    await axios.get('http://localhost:3000/shirts_models')
        .then(res=>  {
            const  result= res.data.message;   
            outputShirts=result;                        
        })
        .catch(console.error);
    return modelsArray;
}

async function getShoes() {
    let modelsArray =[];
    await axios.get('http://localhost:3000/shoe_models')
        .then(res=>  {
            const  result= res.data.message;   
            outputShoes=result;                        
        })
        .catch(console.error);
    return modelsArray;
}

async function getCoats() {
    let modelsArray =[];
    await axios.get('http://localhost:3000/coats_models')
        .then(res=>  {
            const  result= res.data.message;   
            outputCoats=result;                        
        })
        .catch(console.error);
    return modelsArray;
}

async function getAccessories() {
    let modelsArray =[];
    await axios.get('http://localhost:3000/accessories')
        .then(res=>  {
            const  result= res.data.message;   
            outputAccessories=result;                        
        })
        .catch(console.error);
    return modelsArray;
}

export {getAllBrands, getJustBrands, getShirts, getShoes, getCoats, getAccessories, outputAccessories, outputAllBrands, outputCoats, outputJustBrands, outputShirts, outputShoes}