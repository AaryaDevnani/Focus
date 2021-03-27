import React, {useState, useEffect} from 'react'
import {Table,Button,InputGroup,FormControl} from 'react-bootstrap'
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

function AddRestricted() {
    let sr_no = 1

    const dispatch = useDispatch()

    let history = useHistory()
    let location = useLocation()
    
    let { from } = location.state || { from: { pathname: "/login" } };

    const auth = useSelector(state => state.auth)
    if (!auth.loggedIn) {
        history.replace(from)
    }
    
    const [userInput, setUserInput] = useState({
		url: '',
		user_id: auth.user.id,
	})

    const handleOnChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value })
	}

    const handleOnSubmit = (e) => {
		e.preventDefault()
		add_url()
	}

    const add_url_options = {
		method: 'POST',
		body: JSON.stringify(userInput),
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const add_url = async () => {
		const response = await fetch(`/api/restricted_url/${auth.user.id}`, add_url_options)
		const data = await response.json()
		if (data.error_message === "") {
			setUserInput({
				url: '',
		        user_id: auth.user.id,
			})
            get_restricted_urls()
		} else {
			alert(data.error_message)
		}
	}

    const [restricted_urls, setRestricted_urls] = useState([])
    
    const get_restricted_urls = async () => {
		const response = await fetch(`/api/restricted_url/${auth.user.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		if (data.error_message === "") {
			setRestricted_urls(data.restricted_urls)
		}
	}

    const handleDelete = (e) => {
        e.preventDefault()
        const delete_url_options = {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const delete_url = async () => {
            const response = await fetch(`/api/restricted_url/${e.target.id}`, delete_url_options)
            const data = await response.json()
            if (data.error_message === "") {
                get_restricted_urls()
            } else {
                alert(data.error_message)
            }
        }
        delete_url()
	}
    
    useEffect(() => {
        get_restricted_urls()
    }, [])
    
    return (
        <div>
            <form className='add-form addRestricted' onSubmit={handleOnSubmit}>
                <h3 className='center'>Add URL to be Restricted </h3>
                <InputGroup className="mb-3" >
                    <FormControl 
                    placeholder="Enter URL to be restricted"
                    aria-label="Enter URL to be restricted"
                    aria-describedby="basic-addon2"
                    name="url"
                    value={userInput.url}
                    onChange={handleOnChange}
                    />
                    <InputGroup.Append>
                    <input type='submit' className='submitBtn' value='Add'/>
                    </InputGroup.Append>
                </InputGroup>
            </form>
            <Table striped bordered hover variant="dark" className='dashboardC'>
            <thead>
                <tr className='tableHead'>
                <th>Sr No.</th>    
                <th>URL</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {restricted_urls.map((restricted_url) => (
                    <React.Fragment key={restricted_url.id}>
                        <tr className='tableRow'>
                        <td>{sr_no++}</td>
                        <td>{restricted_url.url}</td>
                        <td>
                        <form ><button type='submit' className='submitBtn2' onClick={handleDelete} id={restricted_url.id}>Delete</button></form>
                        </td>
                        
                        </tr>
                    </React.Fragment>
                ))}
            
            </tbody>
            </Table>
            
        </div>
    )
}

export default AddRestricted
