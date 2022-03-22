import React from 'react';
import  "../style/App.css";
import { useState, useEffect } from "react";
import { countries } from './Data';
import { v4 as uuidv4 } from 'uuid';
import { RECORDS } from '../Redux/ActionTriggered';
import { useSelector,useDispatch } from "react-redux";
import { Router,useNavigate,useLocation } from 'react-router-dom';

const AddForm = (props) => {
    let navigate = useNavigate();
    const dispatch=useDispatch()
    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");


    const [Records,setRecord]= useState(useSelector(state=>state.Records))
    const RecordById = id? Records[id]:null
    console.log(RecordById,"editt")
    const [JsonData, setjsonData] = useState({ countries });
    const [States, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [userFields, setUserFields] = useState(RecordById)
    const changeCountry = (event) => {
        setUserFields({ ...userFields, selectedCountry: event.target.value });
        setStates(JsonData.countries.find(cntry => cntry.name === event.target.value).states);
    }

    const changeState = (event) => {
        setUserFields({ ...userFields, selectedState: event.target.value });
        const stats = JsonData.countries.find(cntry => cntry.name === userFields.selectedCountry).states;
        setCities(stats.find(stat => stat.name === event.target.value).cities);
    }



    const onHandlechange = (event) => {
        setUserFields({
            ...userFields,
            [event.target.name]: event.target.value,
        });
    };
    const Rendering = ({ Title, onChange, Loop, value,defaultValue }) => {
        return (
            <div >
                <label className={` mt-1 mb-2`}>{Title}</label>
                <select className="form-select" defaultValue={defaultValue} name="selectedCity" placeholder={Title} value={value} onChange={onChange}>
                    <option>{Title}</option>
                    {Loop.map((e, key) => {
                        return <option key={key}>{e.name ? e.name : e}</option>;
                    })}
                </select>
            </div>
        )
    }


    const onsubmit = () => {
        const RandomID = uuidv4()
        const Edit = id?id:[RandomID]
        dispatch({ type: RECORDS, payload: {...Records , [Edit]:userFields}});
        navigate("/", { replace: true });
    }

    return (
        <div className="container">
            <div className="row form-group mt-4">
                <h2 className='text-center'>Add User</h2>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input type="text" defaultValue={RecordById?.SelectedName} className="form-control" name="SelectedName" onChange={onHandlechange} id="exampleFormControlInput1" placeholder="Enter Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" defaultValue={RecordById?.SelectedEmail} name="SelectedEmail" onChange={onHandlechange} id="exampleFormControlInput1" placeholder="Enter Email" />
                </div><div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                    <input type="phone" className="form-control" defaultValue={RecordById?.SelectedPhone} name="SelectedPhone" onChange={onHandlechange} id="exampleFormControlInput1" placeholder="Enter phone" />
                </div>
                <Rendering Title={"Country"} defaultValue={RecordById?.selectedCountry} value={userFields?.selectedCountry} onChange={changeCountry} Loop={JsonData.countries} />
                <Rendering Title={"State"}   defaultValue={RecordById?.selectedState} value={userFields?.selectedState} onChange={changeState} Loop={States} />
                <Rendering Title={"Cities"}  defaultValue={RecordById?.selectedCity} value={userFields?.selectedCity} onChange={onHandlechange} Loop={cities} />
                <button  onClick={onsubmit} className="btn btn-success mt-3" >Submit</button>
            </div>
        </div>
    )
}
export default AddForm;