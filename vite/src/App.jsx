import { useEffect, useState } from 'react'
import './styles/styles.css';
import ShoeModel from './components/ShoeModel';
import ShirtsPage from './components/ShirtsPage';

function App() {
    const [mainPage, setMainPage] = useState(null);

    return (
        <div className="mainPage">
            <div className="appTitle">Inventory App</div>
            <div className="menu">
                <button onClick={()=>setMainPage(<ShoeModel setMainPage={setMainPage}/>)}>Shoes</button>
                <button onClick={()=>setMainPage(<ShirtsPage setMainPage={setMainPage}/>)}>Shirts</button>
            </div>
            <div className="display">
                {mainPage}
            </div>
        </div>

        
    )
}

export default App
