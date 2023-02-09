import { useEffect, useState } from 'react'
import './styles/styles.css';
import ShoeModel from './components/ShoesPage';
import ShirtsPage from './components/ShirtsPage';
import CoatsPage from './components/CoatsPage';

function App() {
    const [mainPage, setMainPage] = useState(null);

    return (
        <div className="mainPage">
            <div className="appTitle">Inventory App</div>
            <div className="menu">
                <button className='menuButton' onClick={()=>setMainPage(<ShoeModel setMainPage={setMainPage}/>)}>Shoes</button>
                <button className='menuButton' onClick={()=>setMainPage(<ShirtsPage setMainPage={setMainPage}/>)}>Shirts</button>
                <button className='menuButton' onClick={()=>setMainPage(<CoatsPage setMainPage={setMainPage}/>)}>Coats</button>
            </div>
            <div className="display">
                {mainPage}
            </div>
        </div>

        
    )
}

export default App
