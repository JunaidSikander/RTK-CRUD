import {Link, useParams} from "react-router-dom";
import {useContactQuery} from "../services/contactsApi";

import "styles/Info.css"
import {useEffect} from "react";
import {toast} from "react-toastify";

const Info = () => {
    const {id} = useParams();

    const {data, error} = useContactQuery(id);

    useEffect(() => {
        if (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }, [error]);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="card-body">
                    <div className='data'>
                        <strong>ID:</strong>
                        <span>{id}</span>
                    </div>
                    <div className='data'>
                        <strong>Name:</strong>
                        <span>{data?.name}</span>
                    </div>
                    <div className='data'>
                        <strong>Email:</strong>
                        <span>{data?.email}</span>
                    </div>
                    <div className='data'>
                        <strong>Contact:</strong>
                        <span>{data?.contact}</span>
                    </div>
                    <Link to='/'>
                        <button className='btn btn-edit'>
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Info;