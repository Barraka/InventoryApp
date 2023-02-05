import React from 'react'

function ShoeInstance(props) {

    function getInstances() {
        axios.get('http://localhost:3000/shoe_models')
            .then(res=>  {
                let allModels= res.data.message;
                const allBrands=res.data.brands;
                let models2 =[];
                allModels.map(x=> {
                    //Get the brand Name from the stores _id
                    allBrands.forEach(brand=> {
                        if(x.brand===brand._id) {
                            x.brandName = brand.name;
                            models2.push(x);
                        }                    
                    });
                    //Display a placeholder image if none is provided
                    if(!x.picture)x.picture=placeholderImage;
                });                
                setModals([...models2]);
            })
            .catch(e=>console.log);
    }
    

    return (
        <div className='productInstance shoeInstance'>
            <div className="model">{props.model}</div>
            <div className="brandName">{props.brandName}</div>
            <div className="imageWrapper">
                <img src={props.picture} alt="picture" />
            </div>
        </div>
    )
}

export default ShoeInstance