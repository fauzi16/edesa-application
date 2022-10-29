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
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router'
import {
    DataGridPro,
    GridActionsCellItem,
  } from '@mui/x-data-grid-pro';
const User = () => {
    const [admin, setAdmin] = useState([]);
    const router = useRouter();
    
    const getUsers = () => {
        const url = `http://localhost:8080/users`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            let data = [];
            resp.data.filter((a)=>a.username !== null).map((d)=>
                data.push(d.userInfo)
            )
            setAdmin(data)
        }).catch(err => {
            console.log('err', err)
        });  
    }


    useEffect(()=>{
        getUsers();
    },[])

    const columns = [
        { field: 'email', headerName: 'Username', width: 250  },
        { field: 'name', headerName: 'Nama', width: 250  },
        { field: 'hp', headerName: 'Nomor HP', width: 250  },
        { field: 'roleId', headerName: 'Role', width: 250  },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            headerName: 'Aksi',
            getActions: ({id}) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={()=>router.push(`/admin/edit_user?id=${id}`)}/>,
            ],
        },
    ];
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
                        <div style={{ height: 600, width: '100%' }}>
                            <DataGridPro
                                rows={admin}
                                columns={columns}
                            />
                        </div>
                        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    )
}
export default User;