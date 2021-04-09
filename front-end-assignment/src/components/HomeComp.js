import React, {Component} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Container} from 'react-bootstrap'
import Cookies from 'js-cookie'

import '../styles/HomeComp.css'
import WetherData from '../JSON-Data/cities.json'
import WhetherCard from '../components/WhetherCard'
import Footer from './Footer'

const apiKey = "7052ba87241aee6dae21f6cfbb560667"

class Home extends Component{

    constructor(){
        super()
        this.state = {
            cityWhether : WetherData.List,
            query: "",
            API_Data: []
        }
    }

    //fetch Api  Data
    componentDidMount(){
        const cityCode = this.state.cityWhether.map(item => item.CityCode)

        cityCode.map(code =>
            fetch(`http://api.openweathermap.org/data/2.5/group?id=${code}&units=metric&appid=${apiKey}`)
               .then(res => res.json())
               .then(result => {
                   let stateCopy = Object.assign({}, this.state)
                   stateCopy.API_Data.push(result.list[0])
                   this.setState(stateCopy)
                }))

        //Add APi data into cookie with expire time 5 minutes
        const ApiReqData = this.state.API_Data
        const minute = 5
        Cookies.set('WeatherData', JSON.stringify(ApiReqData), { expires:  (minute+330)/(60*24)})
    }

    //Function of Remove Card 
    closeComponent = (id) => {
        console.log("Country Code : " + id)
        this.setState({
            API_Data : [...this.state.API_Data.filter((card => card.id !== id))]
        })
    }

    render(){
        return(
            <div className="app">
                <main>
                    <div className="app-header">
                        <p className="text"><i className="fas fa-cloud-sun header-sun"></i>Weather App</p>
                    </div>
                    <div className="search-bar">
                        <input 
                           className="search"
                           placeholder="Enter a city"
                           onChange={e => this.setState({query: e.target.value})}
                        />
                    </div>
                    <div>
                    <Container>
                        <Row className="row-margin">
                            {this.state.API_Data.filter((val) => {
                                if(this.state.query === ""){
                                    return val
                                } else if(val.name.toLowerCase().includes(this.state.query)){
                                    return val
                                } else {
                                    return null
                            }}).map((item, index) => {
                                    return (
                                        <div key={index} className="main-weather">
                                            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                <WhetherCard
                                                    close={this.closeComponent}
                                                    country={item.sys.country}
                                                    temp={item.main.temp}
                                                    minTemp={item.main.temp_min}
                                                    maxTemp={item.main.temp_max}
                                                    weather={item.weather[0].main}
                                                    city={item.name}
                                                    preasure={item.main.pressure}
                                                    humidity={item.main.humidity}
                                                    visibility={item.visibility}
                                                    speed={item.wind.speed}
                                                    degree={item.wind.deg}
                                                    sunrise={item.sys.sunrise}
                                                    sunset={item.sys.sunset}
                                                    id={item.id}/>
                                                <div className="bottom-row" style={{height:"40px"}}></div>
                                            </Col>
                                        </div>)})}
                        </Row>         
                    </Container>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

export default Home