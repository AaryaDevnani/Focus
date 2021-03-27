import React from 'react'
import {Table,Button} from 'react-bootstrap'

function Dashboard() {
    return (
        <div>
        <Table striped bordered hover variant="dark" className='dashboardC'>
            <thead>
                <tr className='tableHead'>
                <th>Device Name</th>    
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