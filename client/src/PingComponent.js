//import React, { Component } from 'react'
import React,{useState,useEffect} from 'react'
import axios from 'axios';

function PingComponent(){
    const [lastname,setLastName] = useState('');

    useEffect(()=>{
        setLastName('pending')
        
        axios.get('person').then((res)=>{
            setLastName(res.data.persons[0].last_name)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    return(
        <h1>LastName: {lastname}</h1>
    )
}
/*class PingComponent extends Component {

    constructor() {
        super();
        this.state = {
            pong: 'pending'
        }
    }

    componentWillMount() {
        axios.get('person')
            .then((response) => {
                this.setState(() => {
                    //return { pong: response.data.message }
                    return {pong: response.data.persons[0].last_name}
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return <h1>Ping {this.state.pong}</h1>;
    }
}*/

export default PingComponent; 