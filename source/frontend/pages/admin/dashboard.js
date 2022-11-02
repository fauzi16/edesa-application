import React, {Fragment, useContext, useState} from 'react';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import UserContext from '../../utils/UserContext';
const Dashboard = () => {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false)
    return(
        <Fragment>
            <Head title="Dashboard - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content" style={{display: 'flex', alignItems:'center', flexDirection:'column'}}>
                        <h1>HALO, {user?.user?.name}</h1>
                        <br/>
                        <h1>SELAMAT DATANG DI <span className="text-primary">E-DESA</span></h1>
                        <br/><br/>
                        {user?.user?.roleId === 3 &&
                            <div className="text-center">
                                <a onClick={()=>setOpen(true)}>
                                    <img src="/panic.png" width="200"/>
                                </a>
                            </div>
                        }        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Dashboard;