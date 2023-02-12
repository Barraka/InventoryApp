import { useEffect, useState } from 'react'
import './styles/styles.css';
import ShoeModel from './components/ShoesPage';
import ShirtsPage from './components/ShirtsPage';
import CoatsPage from './components/CoatsPage';
import AccessoriesPage from './components/AccessoriesPage';
import BrandsPage from './components/BrandsPage';

function App() {
    const [mainPage, setMainPage] = useState(null);

    return (
        <div className="mainPage">
            <div className="appTitle">Inventory App</div>
            <div className="menu">
                <button className='menuButton' onClick={()=>setMainPage(<ShoeModel setMainPage={setMainPage}/>)}>Shoes</button>
                <button className='menuButton' onClick={()=>setMainPage(<ShirtsPage setMainPage={setMainPage}/>)}>Shirts</button>
                <button className='menuButton' onClick={()=>setMainPage(<CoatsPage setMainPage={setMainPage}/>)}>Coats</button>
                <button className='menuButton' onClick={()=>setMainPage(<AccessoriesPage setMainPage={setMainPage}/>)}>Accessories</button>
                <button className='menuButton' onClick={()=>setMainPage(<BrandsPage setMainPage={setMainPage}/>)}>Brands</button>
            </div>
            <div className="display">
                {mainPage}
            </div>
        </div>

        
    )
}

export default App
