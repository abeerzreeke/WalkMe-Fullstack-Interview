import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './OrgPage.css';
import EmployeeNode from "../EmployeeNode";
import { useLocation } from 'react-router-dom';


export default function OrgHierarchyPage() {
    const [treeData, setTreeData] = useState([])

    const { state } = useLocation()

    useEffect(() => {
        fetch('http://localhost:5000/api/org_hir')
            .then(response => response.json())
            .then(data => {
                setTreeData(data.users);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function hide_popup(e) {
        if(e.target.className == 'tree-node') return;
        document.getElementsByClassName('employee-data')[0].classList.remove('active');
    }


    return (
        <div onClick={hide_popup} className='profile-page'>
            <h2>Welcome {state.firstName + " " + state.lastName}</h2>
            <Link to="/">
                <button>Log Out</button>
            </Link>
            <EmployeeNode tree_data={treeData} />
            <div className="hidden employee-data">
            </div>
        </div>
    )

}
