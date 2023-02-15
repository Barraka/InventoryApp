import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './styles/styles.css';
import homeIcon from './assets/house.png';
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
    const [brands, setBrands] = useState();
    const [dataBrands, setDataBrands] = useState();
    const [dataShoes, setDataShoes] = useState();
    const [dataShirts, setDataShirts] = useState();
    const [dataCoats, setDataCoats] = useState();
    const [dataAccessories, setDataAccessories] = useState(); 
    
    useEffect(()=>{
        console.log('update on coats: ', dataCoats);
    },[dataCoats]);


    return (        
            <div className="mainPage">
                <div className="menu">
                    <button onClick={e=>console.log(dataBrands)}>All brands state</button>
                    <Link to="/">
                        <img className='homeIcon' src={homeIcon}  alt="home" />
                    </Link>
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
                    <Routes>           
                        <Route path="/" element={<Home />} />             
                        <Route path="/shoes" element={<ShoesPage setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>} />                            
                        <Route path="/shoes/:id" element={<ShoeInstance  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>}  />

                        <Route path="/shirts" element={<ShirtsPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>} />
                        <Route path="/shirts/:id" element={<ShirtInstance  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />

                        <Route path="/coats" element={<CoatsPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />
                        <Route path="/coats/:id" element={<CoatInstance  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />}  />

                        <Route path="/accessories" element={<AccessoriesPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />
                        <Route path="/accessories/:id" element={<AccessoryInstance  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />

                        <Route path="/brands" element={<BrandsPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>} />
                        <Route path="/brands/:id" element={<BrandInstance  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}  />} />
                    </Routes>
                    
                </div>
            </div>
        

        
    )
}

export default App
