import '../styles/WeatherCard.css'
import blue from '../Assets/Cloud_Images/blue_cloud.png'
import green from '../Assets/Cloud_Images/green_cloud.png'
import orange from '../Assets/Cloud_Images/orange_cloud.png'
import purple from '../Assets/Cloud_Images/purple_cloud.png'
import red from '../Assets/Cloud_Images/red_cloud.png'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { Container } from 'react-bootstrap'

function WhetherCard(props){

    let icon = undefined
    let image = undefined
    let time = undefined
    let description = undefined
    const weatherDescription = props.weather
    const countryCode = props.id 

    const today = new Date()
    const monthName = today.toLocaleString('default', {month: 'long'})
    const date = today.getDate()
    const hours = today.getHours()
    const minutes = today.getMinutes()

    const roundVisibility = Math.round(props.visibility/100)/10

    const convertSunrise = new Date(props.sunrise * 1000)
    const sunriseHour = moment(convertSunrise).format('hh')
    const sunriseMinute = moment(convertSunrise).format('mm')

    const convertSunset = new Date(props.sunset * 1000)
    const sunsetHour = moment(convertSunset).format('hh')
    const sunsetMinute = moment(convertSunset).format('mm')

    function timeGenerattion(){
        if((hours - 12) > 0){
            time="p.m"
        } else{
            time="a.m" 
        }
    }

    timeGenerattion()

    switch(props.weather){
        case 'Clouds':
            icon = "fas fa-cloud"
            image = blue
            description = "Few Clouds"
            break
        case 'broken clouds':
            icon = "fas fa-smog"
            image = purple
            description = "Broken Clouds"
            break
        case 'Clear':
            icon = "fas fa-sun"
            image = green
            description = "Clear Sky"
            break
        case 'Rain':
            icon = "fas fa-cloud-rain"
            image = orange
            description = "Light Rain"
            break
        case 'mist':
            icon = "fas fa-snowflake"
            image = red
            description = "Mist"
            break
        default:
            icon = "fas fa-cloud-sun"
            image = purple
            description = {weatherDescription}
    }

    return(
            <div>
                <div className="whetherCard">
                        <div className="card-img-top" style={{backgroundImage:`url(${image})`}}>
                            <Container>
                                <Row>
                                    <div className="cross-icon">
                                        <p className="cross"><i className="fas fa-times" onClick={props.close.bind(this, countryCode)}></i></p>
                                    </div>
                                </Row>
                                <Link to={`/view/${props.country}/${props.city}/${props.weather}/${props.temp}/${props.minTemp}/${props.maxTemp}/${props.humidity}/${props.preasure}/${props.visibility}/${props.speed}/${props.degree}/${props.sunrise}/${props.sunset}`}>
                                    <Row>
                                        <Col>
                                            <div className="top-left">
                                               <p className="city">{props.city}, {props.country}</p>
                                               <p className="time">{hours}.{minutes} {time}, {monthName} {date}</p>
                                               <p className="weather"><i className={icon} style={{marginRight:"10px"}}></i>{description}</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="top-right">
                                               <p className="temp">{props.temp}°c</p>
                                                <p className="temp-min"><b>Temp Min</b> : {props.minTemp}°c</p>
                                               <p className="temp-max"><b>Temp Max</b> : {props.maxTemp}°c</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Link>
                            </Container>
                        </div>
                        <Link to={`/view/${props.country}/${props.city}/${props.weather}/${props.temp}/${props.minTemp}/${props.maxTemp}/${props.humidity}/${props.preasure}/${props.visibility}/${props.speed}/${props.degree}/${props.sunrise}/${props.sunset}`}>
                            <div className="card-bottom">
                                <div className="bottom-left">
                                    <p><b>Pressure</b> : {props.preasure} hPa</p>
                                    <p><b>Humidity</b> : {props.humidity} %</p>
                                    <p><b>Visibility</b> : {roundVisibility} km</p>
                                </div>
                                <div className="break-line"></div>
                                <div className="bottom-mid">
                                    <p style={{textAlign:"center"}}><i className="fas fa-location-arrow"></i> </p>
                                    <p className="bottom-mid-degree">{props.speed}m/s {props.degree} Degree</p>
                                </div>
                                <div className="break-line"></div>
                                <div className="bottom-right">
                                    <p><b>Sunrise</b> : {sunriseHour}.{sunriseMinute} a.m</p>
                                    <p><b>Sunset</b> : {sunsetHour}.{sunsetMinute} p.m</p>
                                </div>
                            </div>
                        </Link>
                </div>    
            </div>
    )
}

export default WhetherCard