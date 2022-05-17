import React, { Component } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './OrgPage/OrgPage.css';
import { useLocation } from 'react-router-dom';




export default function EmployeeNode(props) {

    const { tree_data } = props
    const { state } = useLocation()
    const loggedinUser = state

    function showUserDetails(userDetails) {
        document.getElementsByClassName('employee-data')[0].innerHTML = `
            <table>
                <h1>${userDetails.firstName} ${userDetails.lastName}</h1>
                <tr><td>Id</td><td>${userDetails.id}</td></tr>
                <tr><td>First Name</td><td>${userDetails.firstName}</td></tr>
                <tr><td>Last Name</td><td>${userDetails.lastName}</td></tr>
                <tr><td>E-mail</td><td>${userDetails.email}</td></tr>
                <tr><td>Password</td><td>${userDetails.password}</td></tr>
                <tr><td>Start Date</td><td>${userDetails.startDate}</td></tr>
                <tr><td>Manager Id</td><td>${userDetails.managerId}</td></tr>
                <tr><td>Role</td><td>${userDetails.role}</td></tr>
            </table>
        `;
        document.getElementsByClassName('employee-data')[0].classList.add('active');
    }


    return (
        <>
        {tree_data && tree_data.map((employee, i) => (
            <div className="tree_wrapper" key={i}>
                <Tree
                    lineWidth={'2px'}
                    lineBorderRadius={'10px'}>
                    <TreeNode label={<div className="tree-node" style={{ background: loggedinUser.id == employee.id ? "#3294d1" : 'white' }} onClick={() => { showUserDetails(employee) }}>{employee.firstName + " " + employee.lastName}</div>}>
                        <TreeNode label={<div> {employee.children && <EmployeeNode tree_data={employee.children} />}</div>} />
                    </TreeNode>
                </Tree>
            </div>))}
        
        </>
    )
}


