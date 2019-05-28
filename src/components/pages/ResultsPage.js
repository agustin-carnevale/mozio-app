import React from 'react';
import withQueryParams from '../hocs/withQueryParams'

const ResultsPage = (props)=>{
    return (
        <div>
            <p>Origin: {props.query.origin}</p>
            <p>Destination: {props.query.destination}</p>
            <h2>DISTANCE: {props.query.distance}</h2>
            <p>Date: {props.query.date}</p>
            <p>Amount of Travellers: {props.query.people}</p>
        </div>
    )
}

export default withQueryParams(ResultsPage)