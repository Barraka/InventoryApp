import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import './styles/styles.css';
import homeIcon from './assets/house.png';
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
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log('update on coats: ', dataCoats);
    },[dataCoats]);

    function showActiveMenu(e) {
        const allButtons=document.querySelectorAll('.menuButton');
        allButtons.forEach(x=>x.classList.remove('buttonActive')); 
        e.target.classList.add('buttonActive');
    }


    return (        
            <div className="mainPage">
                <div className="navbar">
                    <div className="menuWide">
                        {/* <button onClick={e=>console.log(dataBrands)}>All brands state</button> */}
                        <Link to="/">
                            <img className='homeIcon' src={homeIcon}  alt="home" />
                        </Link>
                        <Link to="/shoes">
                            <button className='menuButton' onClick={showActiveMenu}>Shoes</button>
                        </Link>
                        <Link to="/shirts">
                            <button className='menuButton' onClick={showActiveMenu} >Shirts</button>
                        </Link>
                        <Link to="/coats">
                            <button className='menuButton' onClick={showActiveMenu} >Coats</button>
                        </Link>
                        <Link to="/accessories">
                            <button className='menuButton' onClick={showActiveMenu} >Accessories</button>
                        </Link>
                        <Link to="/brands">
                            <button className='menuButton' onClick={showActiveMenu} >Brands</button>
                        </Link>    
                    </div>

                    <div className="menuSmall">
                        <Link to="/">
                            <img className='homeIcon' src={homeIcon}  alt="home" />
                        </Link>

                        <div className="menuWrapper">
                            <Link to="/shoes">
                                <button className='menuButton' onClick={showActiveMenu} >Shoes</button>
                            </Link>
                            <Link to="/shirts">
                                <button className='menuButton' onClick={showActiveMenu} >Shirts</button>
                            </Link>
                            <Link to="/coats">
                                <button className='menuButton' onClick={showActiveMenu} >Coats</button>
                            </Link>
                            <Link to="/accessories">
                                <button className='menuButton' onClick={showActiveMenu} >Accessories</button>
                            </Link>
                            <Link to="/brands">
                                <button className='menuButton' onClick={showActiveMenu} >Brands</button>
                            </Link>
                        </div>
                    </div>
                </div>
                

                <div className="display">
                    {password}
                    <Routes>           
                        <Route path="/" element={<Home />} />             
                        <Route path="/shoes" element={<ShoesPage setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>} />                            
                        <Route path="/shoes/:id" element={<ShoeInstance setPassword={setPassword}  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>}  />

                        <Route path="/shirts" element={<ShirtsPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>} />
                        <Route path="/shirts/:id" element={<ShirtInstance setPassword={setPassword}  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />

                        <Route path="/coats" element={<CoatsPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />
                        <Route path="/coats/:id" element={<CoatInstance setPassword={setPassword}  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />}  />

                        <Route path="/accessories" element={<AccessoriesPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />
                        <Route path="/accessories/:id" element={<AccessoryInstance setPassword={setPassword}  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories} />} />

                        <Route path="/brands" element={<BrandsPage  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}/>} />
                        <Route path="/brands/:id" element={<BrandInstance setPassword={setPassword}  setDataBrands={setDataBrands} dataBrands={dataBrands}  brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} dataShirts={dataShirts} setDataShirts={setDataShirts} dataCoats={dataCoats} setDataCoats={setDataCoats} dataAccessories={dataAccessories} setDataAccessories={setDataAccessories}  />} />
                    </Routes>
                    
                </div>
            </div>
        

        
    )
}

export default App
