import {useState} from 'react'
import {useEffect} from 'react'

export default function Die(props) {

    return (
        <div className="die" id={props.id} onClick={() => props.handleSelect(props.id)} style={props.selectedDice.includes(props.id) ? {backgroundColor: "#59E391"} : {backgroundColor: "#FFFFFF"}}>
            {props.value}
        </div>
    )
}