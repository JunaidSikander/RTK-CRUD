import {useEffect} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {useContactsQuery, useDeleteContactMutation} from "services/contactsApi";

import 'styles/Home.css'

const Home = () => {
    const {data, isLoading, error} = useContactsQuery();
    const [deleteContact] = useDeleteContactMutation()

    useEffect(() => {
        if (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }, [error]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            await deleteContact(id);
            toast.success('Contact deleted successfully')
        }
    }

    if (isLoading) return <h3>Loading...</h3>;

    return (
        <div className='container'>
            <Link to='/addContact'>
                <button className='btn btn-add'> Add Contact</button>
            </Link>
            <br/>
            <br/>
            <table className='styled-table'>
                <thead>
                <tr>
                    <td className='text-center'>No.</td>
                    <td className='text-center'>Name</td>
                    <td className='text-center'>Email</td>
                    <td className='text-center'>Contact</td>
                    <td className='text-center'>Action</td>
                </tr>
                </thead>
                <tbody>
                {data && data.map(({name, email, contact, id}, index) => (
                    <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{contact}</td>
                        <td>
                            <Link to={`/editContact/${id}`}>
                                <button className='btn btn-edit'> Edit Contact</button>
                            </Link>
                            <button className='btn btn-delete' onClick={() => deleteHandler(id)}> Delete Contact
                            </button>
                            <Link to={`/info/${id}`}>
                                <button className='btn btn-view'> View</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;