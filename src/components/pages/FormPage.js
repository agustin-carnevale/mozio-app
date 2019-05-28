import React, {Component} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import DistanceCalculator from '../DistanceCalculator';
import withQueryParams from '../hocs/withQueryParams'

class FormPage extends Component{

    state={
        origin: '',
        destination: '',
        date: '',
        amountOfPeople: 0,
        calculateDistance: false,
    }

    componentDidMount(){
        if (!!this.props.query['origin']){
            this.setState({origin: this.props.query['origin']})
        }
        if (!!this.props.query['destination']){
            this.setState({destination: this.props.query['destination']})
        }
        if (!!this.props.query['date']){
            this.setState({date: this.props.query['date']})
        }
        if (!!this.props.query['people']){
            this.setState({amountOfPeople: parseInt(this.props.query['people'])})
        }
    }

    handleDateChange =(event)=>{
        this.setState({date: event.target.value})
    }

    handleAmountOfPeopleChange =(event)=>{
        this.setState({amountOfPeople: event.target.value})
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        if(!this.state.origin || !this.state.destination || !this.state.date || !this.state.amountOfPeople ){
            alert('All Fields are required!!')
        }else {
            this.setState({calculateDistance:true}) 
        }
    }

    render() {
        if (this.state.calculateDistance){
           return <DistanceCalculator 
                origin={this.state.origin} 
                destination={this.state.destination} 
                date={this.state.date}
                people={this.state.amountOfPeople}
            />
        }
        return (
            <div>
                <h3>SEARCH FORM</h3>
            
                <form onSubmit={this.handleSubmit}>

                    <label>Origin</label><br/><br/>
                    <GooglePlacesAutocomplete
                        initialValue={this.state.origin}
                        onSelect={({description})=>{this.setState({origin:description})}}
                    /><br/>

                    <label>Destination</label><br/><br/>
                    <GooglePlacesAutocomplete
                        initialValue={this.state.destination}
                        onSelect={({description})=>{this.setState({destination:description})}}
                    /><br/>

                    <label>Date</label><br/><br/>
                    <input  name='date' type='date' value={this.state.date}
                            onChange={this.handleDateChange} /><br/><br/>

                    <label>Amount of Travellers</label><br/><br/>
                    <input  name='amountOfPeople' type='number' 
                            value={this.state.amountOfPeople} 
                            onChange={this.handleAmountOfPeopleChange} /><br/><br/>

                    <button type="submit">
                       CALCULATE
                    </button>
                </form>
        
            </div>
        );
    }
}

export default withQueryParams(FormPage)

