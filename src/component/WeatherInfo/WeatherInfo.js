import React from 'react';
import styles from './WeatherInfo.module.css'
import {connect} from "react-redux";
import ErrorRender from "../ErrorRender/ErrorRender";
import TableItem from "./TableItem";

const URL_ICON = 'http://openweathermap.org/img/wn/';
const URL_COUNTRY = 'http://openweathermap.org/images/flags/';

class WeatherInfo extends React.Component {
    render() {
        if (this.props.error)
            return <ErrorRender error={this.props.error}/>
        return this.props.cityData.hasOwnProperty('name') ?
            <div className={styles.city}>
                <div className={styles.iconWeather}>
                    <img height='100' src={URL_ICON + this.props.cityData.icon + '@2x.png'}/>
                </div>
                <div className={styles.cityName}>
                        <span className={styles.name}>
                            {this.props.cityData.name}
                            <img height='15' src={URL_COUNTRY + this.props.cityData.country + '.png'} alt=""/>
                        </span>
                    <span className={styles.temp}> {this.props.cityData.temp}°С</span>
                    <span className={styles.clouds}>{this.props.cityData.description}</span>
                </div>
                <div className={styles.otherInfo}>
                    <div className={styles.table}>
                        <TableItem speed={this.props.cityData.speed}
                                   clouds={this.props.cityData.clouds}
                                   pressure={this.props.cityData.pressure}
                                   country={this.props.cityData.speed}/>
                    </div>
                </div>
            </div>
            : null;

    }
}

const mapStateToProps = (state) => {
    return ({
        cityData: state.reducer.cityData,
        error: state.reducer.error,
    })
};

export default connect(mapStateToProps, {})(WeatherInfo);