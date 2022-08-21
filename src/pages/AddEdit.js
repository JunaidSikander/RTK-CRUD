import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import 'styles/AddEdit.css'
import {toast} from "react-toastify";
import {useAddContactMutation, useContactQuery, useUpdateContactMutation} from "services/contactsApi";

const initialState = {
    name: '',
    email: '',
    contact: '',
}

const AddEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [addContact] = useAddContactMutation();
    const [updateContact] = useUpdateContactMutation();
    const {data, error} = useContactQuery(id)

    const [formValues, setFormValues] = useState(initialState)
    const [editMode, setEditMode] = useState(false);
    const {name, email, contact} = formValues;

    useEffect(() => {
        if (error && id) {
            toast.error('Something went wrong');
        }
    }, [error,id]);

    useEffect(() => {
        if (!id) return;

        if (data) {
            setEditMode(true)
            setFormValues({...data});
        } else {
            setEditMode(false)
            setFormValues({...initialState})
        }

    }, [id, data])

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setFormValues(prevState => ({...prevState, [name]: value}))
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name && !email && !contact)
            return toast.error('Please Provide value into each field');

        if (editMode) {
            try {
                await updateContact(formValues);
                navigate('/');
                toast.success('Contact updated successfully');
            } catch (error) {
                toast.error('Something went wrong');
                console.error(error);
            }
        } else {
            try {
                await addContact(formValues);
                navigate('/');
                toast.success('Contact added successfully');
            } catch (error) {
                toast.error('Something went wrong');
                console.error(error);
            }
        }
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={submitHandler}>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' name='name' value={name} placeholder='Enter name ...'
                       onChange={onChangeHandler}/>

                <label htmlFor='email'>Email</label>
                <input id='email' type='email' name='email' value={email} placeholder='Enter email ...'
                       onChange={onChangeHandler}/>

                <label htmlFor='contact'>Contact</label>
                <input id='contact' type='number' name='contact' value={contact} placeholder='Enter contact ...'
                       onChange={onChangeHandler}/>

                <input type='submit' value={editMode ? 'Update' : 'Add'}/>
                <Link to='/'>
                    <button className='go-back'>Go Back</button>
                </Link>
            </form>
        </div>
    )
}

export default AddEdit;