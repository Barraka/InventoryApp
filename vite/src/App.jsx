import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './styles/styles.css';
import axios from 'axios';
import ShoesPage from './components/ShoesPage';
import ShirtsPage from './components/ShirtsPage';
import CoatsPage from './components/CoatsPage';
import AccessoriesPage from './components/AccessoriesPage';
import BrandsPage from './components/BrandsPage';
import ShoeInstance from './components/ShoeInstance';
import ShirtInstance from './components/ShirtInstance';
import CoatInstance from './components/CoatInstance';
import AccessoryInstance from './components/AccessoryInstance';
import BrandInstance from './components/BrandInstance';
import Home from './components/Home';

function App() {
    const [mainPage, setMainPage] = useState(null);
    const [brands, setBrands] = useState();
    const [dataShoes, setDataShoes] = useState();
    const [dataShirts, setDataShirts] = useState();
    const [dataCoats, setDataCoats] = useState();
    const [dataAccessories, setDataAccessories] = useState();    
    const [dataBrands, setDataBrands] = useState();

    useEffect(()=>{
        getBrands();
    },[dataShoes, dataShirts, dataCoats, dataAccessories]);

    async function getBrands() {
        await axios.get('http://localhost:3000/brands')
            .then(res=>  {
                const data=res.data.message;
                const justBrands = res.data.justBrands;
                setDataBrands(data);
                setBrands(justBrands);            
            })
            .catch(console.error);
    }

    return (        
            <div className="mainPage">
                <div className="menu">

                    <Link to="/shoes">
                        <button className='menuButton' >Shoes</button>
                    </Link>
                    <Link to="/shirts">
                        <button className='menuButton' >Shirts</button>
                    </Link>
                    <Link to="/coats">
                        <button className='menuButton' >Coats</button>
                    </Link>
                    <Link to="/accessories">
                        <button className='menuButton' >Accessories</button>
                    </Link>
                    <Link to="/brands">
                        <button className='menuButton' >Brands</button>
                    </Link>     
                    
                </div>
                <div className="display">
                    {mainPage}
                    <Routes>           
                        <Route path="/" element={<Home />} />             
                        <Route path="/shoes" element={<ShoesPage getBrands={getBrands} brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} />} />                            
                        <Route path="/shoes/:id" element={<ShoeInstance getBrands={getBrands} brands={brands}  dataShoes={dataShoes} setDataShoes={setDataShoes} />} />

                        <Route path="/shirts" element={<ShirtsPage getBrands={getBrands} dataShirts={dataShirts} setDataShirts={setDataShirts} brands={brands} setBrands={setBrands} />} />
                        <Route path="/shirts/:id" element={<ShirtInstance getBrands={getBrands} brands={brands}  dataShirts={dataShirts} setDataShirts={setDataShirts} />} />

                        <Route path="/coats" element={<CoatsPage getBrands={getBrands} brands={brands} setBrands={setBrands} dataCoats={dataCoats} setDataCoats={setDataCoats} />} />
                        <Route path="/coats/:id" element={<CoatInstance getBrands={getBrands} brands={brands}  dataCoats={dataCoats} setDataCoats={setDataCoats} />} />

                        <Route path="/accessories" element={<AccessoriesPage getBrands={getBrands} brands={brands} setBrands={setBrands} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />
                        <Route path="/accessories/:id" element={<AccessoryInstance getBrands={getBrands} brands={brands}  dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />

                        <Route path="/brands" element={<BrandsPage getBrands={getBrands} brands={brands} setBrands={setBrands} setDataBrands={setDataBrands} dataBrands={dataBrands}/>} />
                        <Route path="/brands/:id" element={<BrandInstance brands={brands}  setBrands={setBrands} dataBrands={dataBrands} setDataBrands={setDataBrands} />} />
                    </Routes>
                    
                </div>
            </div>
        

        
    )
}

export default App
