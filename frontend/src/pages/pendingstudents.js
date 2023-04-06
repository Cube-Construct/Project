import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pendingstudents = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const unqId = location?.state?.unqId;

    const [data, setData] = useState([]);
    useEffect(() => {
        const requestData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/verification/admin/getstudents', {
                    unqId: unqId,
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.status === 200) {
                    setData(response.data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        requestData()
    }, [unqId])
    return (
        <>
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Sr no</div>
                        <div className="col col-2">Student Name</div>
                        <div className="col col-3">Status</div>
                    </li>
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" onClick={() => navigate('view', { state: { documents: data[index].documents, id: data[index]._id } })} key={index}>
                                <div className="col col-1" data-label="Sr no">{index + 1}</div>
                                <div className="col col-2" data-label="Student Name">{item.name}</div>
                                {item.status === 'pending' ? <div className="col col-3" data-label="Status" style={{ color: 'yellow' }}>{item.status}</div> : null}
                                {item.status === 'approved' ? <div className="col col-3" data-label="Status" style={{ color: 'green' }}>{item.status}</div> : null}
                                {item.status === 'rejected' ? <div className="col col-3" data-label="Status" style={{ color: 'red' }}>{item.status}</div> : null}
                            </li>
                        )
                    })}

                </ul>
            </div>
            {/* <h1>
                Pending Student
            </h1> */}
        </>
    );
};

export default Pendingstudents;