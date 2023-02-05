import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [second, setSecond] = useState({})
    const [apiResponse, setApiResponse] = useState({});

    useEffect(()=>{
        callAPI();
        secondCall();
    },[]);

    function callAPI() {
        fetch("/api")
            .then(res => res.json())
            .then(res => setApiResponse(res));
    }

    function secondCall() {
        fetch('/api/test')
            .then(res=> res.json())
            .then(res => setSecond(res));
    }

  return (
    <div className="App">
        <div className="intro">
            This is the response:<br/>

            {apiResponse ? apiResponse.name : ''}<br/>
            { apiResponse ? apiResponse.age : ''}

            <br/>
            This is the second response:<br/>
            {second ? second.name : ''}<br/>
            {second ? second.age : ''}
        </div>
    </div>
  )
}

export default App
