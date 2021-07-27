import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
  } from "@material-ui/core";
  import DistPage from './DistPage'
  import  './State.css'

const StatePage = () =>{

    //statename and state objects
    var [stateob,setStateob] = useState([{}]);
    var [statename,setStatename] = useState([]);


    //list counters
    var [num1,setNum1] = useState(0);


    var res;
    useEffect(()=>{
        async function getData(){
            res =await axios.get(`https://api.covid19india.org/state_district_wise.json`);
            //For the States
            stateob = Object.values(res.data);
            setStateob(stateob);
            setStatename(Object.keys(res.data));

        } 
        getData();
    },[stateob]);

    var statelist = statename.map((item,i)=>{
        return(
            <option value={i}>{item}</option>
        )
    });

    return (
        <div className="myDiv">
 
            <select 
                value={num1}
                onChange={(e) => {
                    setNum1(e.target.value)
                }}>
               {statelist}
            </select>
            {num1!=0?<DistPage num1={num1}/>:null}
        </div>
    );
};


export default StatePage