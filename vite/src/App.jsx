import { useEffect, useState } from 'react'
import './styles/styles.css';
import axios from 'axios';
import ShoeModel from './components/ShoeModel';
import ShoeModelAdd from './components/ShoeModelAdd';

function App() {
    const [shoeModel, setShoeModel] = useState();
    const [shoeModelAdd, setShoeModelAdd] = useState();
    const [shoeInstance, setShoeInstance] = useState();
    const [output, setOutput] = useState();

    function displayPage() {
        setShoeModel(<ShoeModel />);
    }
    function changePage(p) {
        setShoeModel('');
        setShoeModelAdd('');
        setShoeInstance('');
    }
    useEffect(()=>{
        console.log('in shoe instance use effect, app.jsx');
    },[shoeInstance]);
    
    return (
        <div className="mainPage">
            <div className="appTitle">Inventory App</div>
            <button onClick={()=>console.log(shoeInstance)}>Get shoe instance info</button>
            <div className="menu">
                <button onClick={()=>setOutput(<ShoeModel setOutput={setOutput}/>)}>Get Shoe Models</button>
                <button onClick={()=>setOutput(<ShoeModelAdd />)}>Add Shoe Model</button>
            </div>
            <div className="display">
                <div className="displayTitle">This is the display section:</div>
                {output ? output : null}
            </div>
        </div>

        
    )
}

export default App
