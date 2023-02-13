import { useEffect, useState } from 'react'
import './styles/styles.css';
import ShoeModel from './components/ShoesPage';
import ShirtsPage from './components/ShirtsPage';
import CoatsPage from './components/CoatsPage';
import AccessoriesPage from './components/AccessoriesPage';
import BrandsPage from './components/BrandsPage';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ShoeInstance from './components/ShoeInstance';
import ShoesPage from './components/ShoesPage';

function App() {
    const [mainPage, setMainPage] = useState(null);
    const [dataShoes, setDataShoes] = useState();
    const [brands, setBrands] = useState();

    useEffect(()=>{
        console.log('data shoes in app: ', dataShoes);
    },[dataShoes]);

    return (
        
            <div className="mainPage">
                <div className="appTitle">Inventory App</div>
                <div className="menu">
                    {/* <Link to="/shoes">
                        <button className='menuButton' onClick={()=>setMainPage(<ShoeModel setMainPage={setMainPage}/>)}>Shoes</button>
                    </Link>
                    <Link to="/shirts">
                        <button className='menuButton' onClick={()=>setMainPage(<ShirtsPage setMainPage={setMainPage}/>)}>Shirts</button>
                    </Link>
                    <Link to="/coats">
                        <button className='menuButton' onClick={()=>setMainPage(<CoatsPage setMainPage={setMainPage}/>)}>Coats</button>
                    </Link>
                    <Link to="/accessories">
                        <button className='menuButton' onClick={()=>setMainPage(<AccessoriesPage setMainPage={setMainPage}/>)}>Accessories</button>
                    </Link>
                    <Link to="/accessories">
                        <button className='menuButton' onClick={()=>setMainPage(<BrandsPage setMainPage={setMainPage}/>)}>Brands</button>
                    </Link> */}

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
                        {/* <Route path="/" element={<App />} /> */}
                        <Route path="/shoes" element={<ShoesPage brands={brands} setBrands={setBrands} dataShoes={dataShoes} setDataShoes={setDataShoes} setMainPage={setMainPage}/>}>
                            
                        </Route>
                        <Route path="/shoes/:id" element={<ShoeInstance  dataShoes={dataShoes} setDataShoes={setDataShoes} />} />
                        {/* <Route path="/shoes/:id" element={<ShoeModel setMainPage={setMainPage}/>} /> */}
                        <Route path="/shirts" element={<ShirtsPage setMainPage={setMainPage}/>} />
                        <Route path="/coats" element={<CoatsPage setMainPage={setMainPage}/>} />
                        <Route path="/accessories" element={<AccessoriesPage setMainPage={setMainPage}/>} />
                        <Route path="/brands" element={<BrandsPage setMainPage={setMainPage}/>} />
                    </Routes>
                    
                </div>
            </div>
        

        
    )
}

export default App
