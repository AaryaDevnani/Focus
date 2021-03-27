import React from 'react'
import {Table,Button,InputGroup,FormControl} from 'react-bootstrap'
import { MdDelete } from 'react-icons/md';

function AddRestricted() {
    return (
        <div>

            <form className='add-form' className="addRestricted">
                <h2 className='center'><b>Add URL to be Restricted </b></h2>
            <InputGroup className="mb-3" >
                <FormControl 
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
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
            
                <tr className='tableRow'>
                <td>1</td>
                <td>www.youtube.com</td>
                <td>
                <form ><input type='submit' className='submitBtn2' value='Delete' /></form>
                </td>
                
                </tr>
                        
            </tbody>
            </Table>
            
        </div>
    )
}

export default AddRestricted
