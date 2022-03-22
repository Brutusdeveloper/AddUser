import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RECORDS } from '../Redux/ActionTriggered';
import {Link} from "react-router-dom";
import { Router,useNavigate } from 'react-router-dom';

const Form = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const Records = useSelector(state => state.Records)
    const [Data, setData] = useState(Records || {})
    console.log(Records, "dataaa")


    const DeletebyID = (id) => {
        const res = Data
        delete res[id] &&
        dispatch({ type: RECORDS, payload: {...res} });
        setData(Object.assign({}, res))
    }


    return (
        <Fragment>
            <div className="text-center mt-4">
                <div className="d-flex mb-4 align-items-center">
                    <h3 className="text-center m-auto">Record List</h3>
                    <Link to="/add">
                    <div className="flex-end me-5 Adduser" style={{textDecoration:"none"}}>Add User</div>
                    </Link>            
                </div>
                {Object.keys(Data).length === 0 && <div className="d-flex align-items-center justify-content-center" style={{fontWeight:"bold",height:"300px",margin:"auto"}}>No Records Found</div>}
                {Object?.keys(Data).map((keyName, key) => {
                    return (
                        <div className="Wrapper" key={key}>
                            <div className="d-flex w-100 justify-content-between">
                                <div> {Data[keyName].SelectedName}</div>
                                <div>
                                    <button className="Editbutton" onClick={() =>navigate(`/edit?id=${keyName}`, { replace: true }) }>Edit</button>
                                    <button className="Deletebutton" onClick={() => DeletebyID(keyName)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}
export default Form;