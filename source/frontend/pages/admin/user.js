import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Grid, Button} from '@mui/material';
import Head from '../components/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';
import Link from 'next/link';
import axios from 'axios';
import { cookie } from '../../utils/global';
import { TOKEN } from '../../utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router'
import DataTable from 'react-data-table-component';
import {orderBy} from 'lodash';
const User = () => {
    const [admin, setAdmin] = useState([]);
    const router = useRouter();
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const getUsers = () => {
        const url = `http://103.176.78.92:8080/users`;
        const head = {
            headers: {
                'Authorization': `Bearer ${cookie.get(TOKEN)}`
            }
        }
        axios.get(url, head)
        .then(resp => {
            let data = [];
            resp.data.filter((a)=>a.userInfo !== null).map((d)=>
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
        {
            name:'Username',
            sortable:true,
            selector: 'email',
            width:'250px'   
        },
        {
            name:'Nama',
            sortable:true,
            selector: 'name',
            width:'250px'   
        },
        {
            name:'Nomor HP',
            sortable:true,
            selector: 'hp',
            width:'250px'   
        },
        {
            name: 'Role',
            sortable: true,
            width: '200px',
            cell: (row,index) => {return <div key={index}>
              {row.roleId == 1 ? 'Admin' : row.roleId == 2 ? 'Perangkat Desa' : 'Warga'}
            </div>
            },
        },
        {
            name: 'Aksi',
            sortable: false,
            width: '100px',
            cell: (row,index) => {return <div key={index}>
              <a onClick={()=>router.push(`/admin/edit_user?id=${row.id}`)}><EditIcon/></a>
            </div>
            },
        },
    ];
    const customSort = (rows, field, direction) => {
        const handleField = row => {
            if (row[field]) {
                return row[field].toLowerCase();
            }
            return row[field];
        }
        return orderBy(rows, handleField, direction);
    }
    const customStyles2 = {
        header:{
            style:{
                display:'none'
            }
        },
        headCells: {
            style: {
                fontWeight:'600',
                fontSize:'14px',
                minWidth:'100px'
            },
        },
        cells: {
            style: {
              wordBreak: 'break-word',
              fontSize:'14px',
              paddingTop:'5px',
              paddingBottom:'5px'
            },
        },
        subHeader: {
            style: {
              minWidth: '100px',
            },
        },
    };

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
                            <DataTable
                                data={admin}
                                columns={columns}
                                pagination
                                paginationResetDefaultPage={resetPaginationToggle}
                                sortFunction={customSort}
                                customStyles={customStyles2}
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