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
const Pelaporan = () => {
    const [issues, setIssues] = useState([]);
    const router = useRouter();
    
    const getIssues = () => {
        const url = `http://localhost:8080/issues`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            setIssues(resp.data)
            console.log(resp.data)
        }).catch(err => {
            console.log('err', err)
        });  
    }


    useEffect(()=>{
        getIssues();
    },[])

    const columns = [
        { field: 'coordinate', headerName: 'Koordinat', width: 250  },
        { field: 'description', headerName: 'Deskripsi', width: 500  },
        { field: 'status', headerName: 'Status', width: 100  },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            headerName: 'Aksi',
            getActions: ({id}) => [
              <GridActionsCellItem icon={<EditIcon />} label="Penugasan" onClick={()=>router.push(`/admin/penugasan?id=${id}`)}/>,
            ],
        },
    ];
    return(
        <Fragment>
            <Head title="Manajamen Pengaduan - E-DESA"/>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div id="page-content-wrapper">
                    <div id="content">
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="heading-2">PENGADUAN</div>
                            </Grid>
                            <Grid item md={6} xs={12} className="text-right">
                                <Link href="/admin/add_pelaporan">
                                    <Button variant="contained" color="primary">TAMBAH PENGADUAN</Button>
                                </Link>
                            </Grid>
                        </Grid>   
                        <br/>
                        <div style={{ height: 600, width: '100%' }}>
                            <DataGridPro
                                rows={issues}
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
export default Pelaporan;