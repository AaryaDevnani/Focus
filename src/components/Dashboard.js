import React, {useState, useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

function Dashboard() {
    let count = 1

    let history = useHistory()
    let location = useLocation()
    
    let { from } = location.state || { from: { pathname: "/login" } };

    const auth = useSelector(state => state.auth)
    if (!auth.loggedIn) {
        history.replace(from)
    }

    const [urls, setUrls] = useState([])

    const getMessages = async () => {
		const response = await fetch(`/api/history`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		if (data.error_message === "") {
            console.log(data)
			setUrls(data.urls)
		}
	}

    useEffect(() => {
        getMessages()
    }, [])
    
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
                {urls.map((url) => (
                    <React.Fragment>
                        {
                            url.restricted == "true"
                            ?
                                <tr className='tableRow'>
                                    <td>{count++}</td>
                                    <td className="redFont"> {url.url} </td>
                                    <td> {url.updated_timestamp} </td>
                                    <td> {url.time_spent}s </td>
                                </tr>
                            :
                                <tr className='tableRow'>
                                    <td>{count++}</td>
                                    <td className="blank"> {url.url} </td>
                                    <td> {url.updated_timestamp} </td>
                                    <td> {url.time_spent}s </td>
                                </tr>
                        }
                    </React.Fragment>
                ))}
            </tbody>
            </Table>
            </div>
    )
}

export default Dashboard