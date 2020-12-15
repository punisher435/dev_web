import React from 'react'
import Welcome from './Welcome'
import CardList from './CardList'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'antd/dist/antd.css';

function Home() {
    return (
        <div>
            Home
            <Welcome/>
            <CardList/>
        </div>
    )
}

export default Home
