import React,{useContext} from 'react';
import { withRouter, useRouter } from 'next/router';
import UserContext from '../../utils/UserContext';
import Link from 'next/link';
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
                    <a className={`list-group-item list-group-item-action ${navActive('/admin/dashboard')}`}>
                        Dashboard
                    </a>
                </Link>
                {/* warga */}
                {user?.user?.roleId === 3 &&
                    <>
                        <Link href="/admin/pelaporan">
                            <a className={`list-group-item list-group-item-action ${navActive('/admin/pengaduan') || navActive('/admin/add_pengaduan')}`}>
                                Pengaduan
                            </a>
                        </Link>
                    </>
                }
                {/* perangkat desa */}
                {user?.user?.roleId === 2 &&
                    <>
                        <Link href="/admin/pelaporan">
                            <a className={`list-group-item list-group-item-action ${navActive('/admin/pengaduan') || navActive('/admin/add_pengaduan')}`}>
                                Pengaduan
                            </a>
                        </Link>
                        <Link href="/admin/cctv">
                            <a className={`list-group-item list-group-item-action ${navActive('/admin/cctv')}`}>
                                CCTV
                            </a>
                        </Link>
                    </>
                }
                {/* admin */}
                {user?.user?.roleId === 1 &&
                    <>
                        <Link href="/admin/user">
                            <a className={`list-group-item list-group-item-action ${navActive('/admin/user') || navActive('/admin/add_user')}`}>
                                Manajemen User
                            </a>
                        </Link>
                        <Link href="/admin/pelaporan">
                            <a className={`list-group-item list-group-item-action ${navActive('/admin/pengaduan') || navActive('/admin/add_pengaduan')}`}>
                                Pengaduan
                            </a>
                        </Link>
                    </>
                }
                
            </div>
        </div>
    )
}
export default withRouter(Sidebar);