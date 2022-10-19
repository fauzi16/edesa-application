import React,{useContext} from 'react';
import { withRouter, useRouter } from 'next/router';
import UserContext from '../../utils/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import {Chip} from '@mui/material';
const Sidebar = () => {
    const user = useContext(UserContext);
    const router = useRouter();
    const navActive = (path) => {
        return path === router.pathname ? 'active' : '';
      };
    return(
        <div className="border-right view-more-991" id="sidebar-wrapper">
            <div className="list-group list-group-flush">
                <Link href="/admin/dashboard">
                    <a href="#" className={`list-group-item list-group-item-action ${navActive('/admin/dashboard')}`}>
                        Dashboard
                    </a>
                </Link>
                <Link href="/admin/user">
                    <a href="#" className={`list-group-item list-group-item-action ${navActive('/admin/user') || navActive('/admin/add_user')}`}>
                        Manajemen User
                    </a>
                </Link>
            </div>
        </div>
    )
}
export default withRouter(Sidebar);