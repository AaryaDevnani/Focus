import React from 'react'
import {Table,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

function Dashboard() {

    const dispatch = useDispatch()

    let history = useHistory()
    let location = useLocation()
    
    let { from } = location.state || { from: { pathname: "/login" } };

    const auth = useSelector(state => state.auth)
    if (!auth.loggedIn) {
        history.replace(from)
    }
    
    return (
        <div>
        <Table striped bordered hover variant="dark" className='dashboardC'>
            <thead>
                <tr className='tableHead'>
                <th>Sr. No</th>    
                <th>URL</th>
                <th>Date</th>
                <th>Time Spent</th>
                </tr>
            </thead>
            <tbody>
                <tr className='tableRow'>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                
            </tbody>
            </Table>
            </div>
    )
}

export default Dashboard