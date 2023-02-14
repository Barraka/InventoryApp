import axios from 'axios';

async function getBrandsFile() {
    await axios.get('http://localhost:3000/brands')
        .then(res=>  {
            const data=res.data.message;
            const justBrands = res.data.justBrands;
            // setDataBrands(data);
            // setBrands(justBrands);                
            return('teste');
        })
        .catch(console.error)
        
}


export {getBrandsFile as default}