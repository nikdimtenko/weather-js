import React from 'react';
import styles from './WeatherInfo.module.css';

class TableItem extends React.Component {

    state = {
        tableItem: [
            {desc: 'Wind (m/s)', value: this.props.speed},
            {desc: 'Clouds (%)', value: this.props.clouds},
            {desc: 'Pressure(hpa)', value: this.props.pressure},
            {desc: 'Country', value: this.props.speed},
        ]
    };

    render() {
        return (
            this.state.tableItem.map(field =>
                <div className={styles.field}>
                    <div className={styles.desc}>{field.desc}</div>
                    <div>{field.value}</div>
                </div>)
        )
    }
}

export default TableItem;