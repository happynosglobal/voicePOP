import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useUserStore from "../stores/user";


//DefaultLayout.jsx
const DefaultLayout = () => {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const {user} = useUserStore();

    useEffect(()=>{
        if(user) {
            setMounted(true);
        } else if (!user){
            navigate('/login');
        }
    },[user])



    return (
        <>
            {mounted && (
                <div className="min-h-screen bg-gray-100">
                    <Topbar />
                    <Sidebar />
                    <Outlet />
                </div>
            )}
        </>
    )

}

export default DefaultLayout;