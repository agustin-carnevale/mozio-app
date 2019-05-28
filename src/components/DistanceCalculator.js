import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {GoogleApiWrapper} from 'google-maps-react'

const GOOGLE_MAPS_API_KEY = 'AIzaSyBVWnNnoEQNKN2zHL-jk0ml3BZZrSaU3gw'
const TRAVEL_MODE = 'DRIVING'

class DistanceCalculator extends Component{
    state={
        status: 'LOADING',
        response: null,
    }
    componentDidMount=()=>{
        const service = new this.props.google.maps.DistanceMatrixService()
        service.getDistanceMatrix({
                origins: [this.props.origin],
                destinations: [this.props.destination],
                travelMode: TRAVEL_MODE,
            },(response, status) =>{
                if (status !== 'OK') {
                    this.setState({status:'ERROR'})
                } else {
                    const origin = response.originAddresses[0];
                    const destination = response.destinationAddresses[0];
                    const distance = response.rows[0].elements[0].distance 
                        ? response.rows[0].elements[0].distance.text 
                        : null
                    if (!distance){
                        this.setState({status:'DISTANCE_ERROR'})
                    }else{
                        this.setState({
                            status: 'SUCCESS',
                            response:{origin,destination,distance},
                        })
                    }
                }
        })
    }

    render(){
        if (this.state.status==='LOADING')
            return <h1>LOADING...</h1>
        else if (this.state.status==='ERROR')
            return <h1>ERROR OCCURED WHILE PROCESSING DATA</h1>
        else if (this.state.status==='DISTANCE_ERROR')
            return <h1>{`DRIVING DISTANCE IMPOSSIBLE TO CALCULATE FROM: ${this.props.origin} TO: ${this.props.destination}`}</h1>
        else
            return <Redirect
            to={{
              pathname: "/results",
              search: `?origin=${this.state.response.origin}&destination=${this.state.response.destination}&distance=${this.state.response.distance}&date=${this.props.date}&people=${this.props.people}`,
            }}
          />
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
})(DistanceCalculator)