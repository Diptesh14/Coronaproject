import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
  } from "@material-ui/core";
  import DetailsPage from './DetailsPage';

const StatePage = (props) =>{

//statename and state objects
var [stateob,setStateob] = useState([{}]);
var [statename,setStatename] = useState([]);


//district names and district objects
var [distob,setDistob] = useState([{}]);
var [distname,setDistname] = useState([]);

var [num2,setNum2] = useState(0);

var res;
useEffect(()=>{
    //alert("hi");
    async function getData(){
        res =await axios.get(`https://api.covid19india.org/state_district_wise.json`);
        //For the States
        stateob = Object.values(res.data);
        setStateob(stateob);
        setStatename(Object.keys(res.data));
        
        //For the Districts
        distob = Object.values(stateob[props.num1].districtData);
        setDistob(distob);
        setDistname(Object.keys(stateob[props.num1].districtData));

    } 
    getData();
},[stateob]);

var distlist = distname.map((item,i)=>{
    return(
        <option value={i}>{item}</option>
    )
});


return (
    <div>
        <select 
            value={num2}
            onChange={(e) => {
                setNum2(e.target.value);
            }}>
           {distlist}
        </select>
        <DetailsPage num1={props.num1} num2={num2}/>
       
    </div>
); 
};


export default StatePage