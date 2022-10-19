import React, {Fragment} from 'react';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
    return(
        <Fragment>
            <Head title="Dashboard - SIPENGADU"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content" style={{display: 'flex', alignItems:'center', flexDirection:'column'}}>
                        <h1>HALO, HANIFA FISSALMA</h1>
                        <br/>
                        <h1>SELAMAT DATANG DI <span className="text-primary">SIPENGADU</span></h1>        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Dashboard;