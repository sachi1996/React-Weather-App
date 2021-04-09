import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router'
import moment from 'moment'

import '../styles/ViewCard.css'
import Footer from '../components/Footer'

function ViewCard(props){
    
    const dataParams = useParams()
    const weatherDescription = dataParams.weather
    let cardColor = undefined
    let time = undefined
    let description = undefined
    let icon = undefined

    const today = new Date()
    const monthName = today.toLocaleString('default', {month: 'long'})
    const date = today.getDate()
    const hours = today.getHours()
    const minutes = today.getMinutes()

    const roundVisibility = Math.round(dataParams.visibility/100)/10

    const convertSunrise = new Date(dataParams.sunrise * 1000)
    const sunriseHour = moment(convertSunrise).format('hh')
    const sunriseMinute = moment(convertSunrise).format('mm')

    const convertSunset = new Date(dataParams.sunset * 1000)
    const sunsetHour = moment(convertSunset).format('hh')
    const sunsetMinute = moment(convertSunset).format('mm')

    function generate(){
        if((hours - 12) > 0){
            time="p.m"
        } else{
            time="a.m" 
        }
    }

    generate()

    switch(dataParams.weather){
        case 'Clouds':
            icon = "fas fa-cloud"
            cardColor = "rgba(70 151 228 / 80%)"
            description = "Few Clouds"
            break
        case 'broken clouds':
            icon = "fas fa-smog"
            cardColor = "#5d39bdcf"
            description = "Broken Clouds"
            break
        case 'Clear':
            icon = "fas fa-sun"
            cardColor = "rgb(91 189 119)"
            description = "Clear Sky"
            break
        case 'Rain':
            icon = "fas fa-cloud-rain"
            cardColor = "rgba(248, 165, 68, 0.8)"
            description = "Light Rain"
            break
        case 'mist':
            icon = "fas fa-snowflake"
            cardColor = "#ad3838d9"
            description = "Mist"
            break
        default:
            icon = "fas fa-cloud-sun"
            cardColor = "rgb(70 151 228 / 80%)"
            description = {weatherDescription}
        }

    return(
        <div className="app">
            <main>
                <div className="app-header">
                        <p className="text"><i className="fas fa-cloud-sun header-sun"></i>Weather App</p>
                </div>
                <div className="viewCard" style={{backgroundColor:cardColor}}>
                    <div className="back-icon"><Link to="/"><i className="fas fa-long-arrow-alt-left left-icon"></i></Link></div>
                    <div className="top-view">
                        <p className="city">{dataParams.cityName}, {dataParams.country}</p>
                        <p className="date">{hours}.{minutes} {time}, {monthName} {date}</p>
                    </div>
                    <div className="middle-view">
                        <Row>
                            <div className="additional-middle"></div>
                            <div className="middle-left">
                                <p className="icon"><i className={icon}></i></p>
                                <p className="name">{description}</p>
                            </div>
                            <div className="break-line"></div>
                            <div className="middle-right">
                                <p className="temp">{dataParams.temp}°c</p>
                                <p className="temp-min">Temp Min : {dataParams.minTemp}°c</p>
                                <p className="temp-max">Temp Max : {dataParams.maxTemp}°c</p>
                            </div>
                            <div className="additional-middle"></div>
                        </Row>
                    </div>
                    <div className="bottom-view">
                        <Row>
                            <div className="b-left-view">
                                <p className="b-left-text"><b>Pressure</b> : {dataParams.preasure} hPa</p>
                                <p className="b-left-text"><b>Humidity</b> : {dataParams.humidity} %</p>
                                <p className="b-left-text"><b>Visibility</b> : {roundVisibility} km</p>
                            </div>
                            <div className="break-line"></div>
                            <div className="b-mid-view">
                                <p className="arrow"><i className="fas fa-location-arrow"></i></p>
                                <p className="speed">{dataParams.speed}m/s {dataParams.degree} degree</p>
                            </div>
                            <div className="break-line"></div>
                            <div className="b-right-view">
                                <p className="sunrise"><b>Sunrise</b> : {sunriseHour} {sunriseMinute} a.m.</p>
                                <p className="sunset"><b>Sunset</b> : {sunsetHour} {sunsetMinute} p.m.</p>
                            </div>
                        </Row>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ViewCard