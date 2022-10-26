import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Grid, Button} from '@mui/material';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import Link from 'next/link';
import {useRouter} from 'next/router';
import axios from 'axios';
import UserContext from '../../utils/UserContext';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
import * as Yup from 'yup';
import {useFormik} from 'formik';
const User = () => {
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
    const getAdmins = () => {
        const url = `http://168.138.181.227:8080/adminMarketplaces`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setAdmin(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }

    const getMerchants = () => {
        const url = `http://168.138.181.227:8080/adminMerchants`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setmerchants(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }

    const getCustomers = () => {
        const url = `http://168.138.181.227:8080/customers`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setCustomer(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }
    useEffect(()=>{
        getAdmins();
        getMerchants();
        getCustomers();
    },[])
    const reset = () => {
        setName('');
    }
    const cari = () => {
        const temp = users?.filter((d)=> d.name?.includes(name));
        setUsers(temp)
    }
    useEffect(()=> {
        let a = admin.concat(merchants)
        let b = a.concat(customer)
        setUsers(b)
    },[admin, merchants, customer])
    return(
        <Fragment>
            <Head title="Manajamen User - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="heading-2">MANAJEMEN USER</div>
                            </Grid>
                            <Grid item md={6} xs={12} className="text-right">
                                <Link href="/admin/add_user">
                                    <Button variant="contained" color="primary">TAMBAH USER</Button>
                                </Link>
                            </Grid>
                        </Grid>   
                        <br/>
                        <table className="table table-border" width="100%">
                            <thead>
                                <tr style={{background:'#B4FFD3', color:'#25D366', fontWeight:'bold'}}>
                                    <td>Email</td>
                                    <td>Jenis User</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {users.filter(d=>d.user?.deleted === false).length > 0 ? 
                                    users.filter(d=>d.user?.deleted === false).map((d,i)=>
                                        <tr key={i}>
                                            <td>{d.user?.email}</td>
                                            <td>{d.user?.role?.roleName}</td>
                                            <td>
                                                {d.user?.role?.id == 3 || d.user?.role?.id == 4 ?
                                                    <Tooltip title="Edit User">
                                                        <a href={`/admin/add-product?id=${d.id}`}><i className="fas fa-edit"></i></a>
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title="Lihat User">
                                                        <a><i className="fas fa-eye"></i></a>
                                                    </Tooltip>
                                                }
                                                <Tooltip title="Nonaktifkan User">
                                                    <a
                                                        onClick={() => {
                                                            setOpen(true)
                                                            setData(d)
                                                        }}
                                                    >
                                                        <i className="fas fa-trash m-l-10"></i>
                                                    </a>
                                                </Tooltip>
                                            </td>     
                                        </tr>
                                    ) : <tr><td colSpan={4}><center>Tidak ada data</center></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default User;