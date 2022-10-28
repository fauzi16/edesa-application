import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Grid, Button} from '@mui/material';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import Link from 'next/link';
import axios from 'axios';
import UserContext from '../../utils/UserContext';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
const Pelaporan = () => {
    const user = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [admin, setAdmin] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [merchants, setmerchants] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const getUsers = () => {
        const url = `http://localhost:8080/users`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setAdmin(resp.data)
            console.log(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }


    useEffect(()=>{
        getUsers();
    },[])

    const columns = [
        { field: 'username', headerName: 'Username', width: 250  },
        { headerName: 'Nama - Nomor HP - Role', valueGetter: (params) => `${params.row.userInfo?.name} - ${params.row.userInfo?.hp} - ${params.row.userInfo?.role?.name}`, width: 600 },
    ];
    return(
        <Fragment>
            <Head title="Pelaporan - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="heading-2">PELAPORAN</div>
                            </Grid>
                            <Grid item md={6} xs={12} className="text-right">
                                {user?.user?.roleId === 3 &&
                                    <Link href="/admin/add_pelaporan">
                                        <Button variant="contained" color="primary">TAMBAH PELAPORAN</Button>
                                    </Link>
                                }
                            </Grid>
                        </Grid>   
                        <br/>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={admin}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[5]}
                            />
                        </div>
                        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default Pelaporan;