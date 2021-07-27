import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
  } from "@material-ui/core";

const DetailsPage = (props) =>{

    //notes,active,confirmed,migratedother,deceased,recovered
    var [active,setActive] =useState();
    var [confirmed,setConfirmed] =useState();
    var [migratedother,setMigratedother] =useState();
    var [deceased,setDeceased] =useState();
    var [recovered,setRecovered] =useState();

    //statename and state objects
    var [stateob,setStateob] = useState([{}]);
    var [statename,setStatename] = useState([]);

    //district names and district objects
    var [distob,setDistob] = useState([{}]);
    var [distname,setDistname] = useState([]);

    //list counters
    var [num1,setNum1] = useState(0);
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

            //Data of the District
            setActive(distob[props.num2].active);
            setConfirmed(distob[props.num2].confirmed);
            setDeceased(distob[props.num2].deceased);
            setMigratedother(distob[props.num2].migratedother);
            setRecovered(distob[props.num2].recovered);
        } 
        getData();
    },[stateob]);

    var statelist = statename.map((item,i)=>{
        return(
            <option value={i}>{item}</option>
        )
    });

    var distlist = distname.map((item,i)=>{
        return(
            <option value={i}>{item}</option>
        )
    });

    return (
        <div>
            Active ={active}
            <br></br>
            Confirmed ={confirmed}
            <br></br>
            MigratedtoOther ={migratedother}
            <br></br>
            Deceased ={deceased}
            <br></br>
            Recoverd ={recovered}
            <br></br>
        </div>
    );
};


export default DetailsPage