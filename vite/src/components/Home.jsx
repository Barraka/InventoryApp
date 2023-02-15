import React, { useEffect, useState } from 'react'
import homeImg from '../assets/home.gif'
import wait from '../assets/loading.gif'

function Home(props) {
    

    return (
        <div className='homePage'>
            <div className="homeTitle">
                <div className="homeBig">STOCK</div>
                <div className="homeSmall">MONITOR</div>
            </div>
            <div className="svgWrapper">
                <img src={homeImg} alt="Warehouse" />
            </div>
        </div>



    )
}

export default Home