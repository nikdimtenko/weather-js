import React from 'react';
import styles from './InputField.module.css'
import {connect} from "react-redux";
import {getHistoryCities, sendRequest} from "../../redux/simpleReducer";
import {MdSearch} from 'react-icons/md';

class InputField extends React.Component {

    state = {
        onChangeCity: '',
        editMode: false,
        listHistoryCities: [],
    };

    componentWillMount() {
        this.props.getHistoryCities()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.historyСities.length !== 0 && prevProps !== this.props)
            this.setState({listHistoryCities: this.props.historyСities})
    }

    onChange = (e) => {
        this.setState({onChangeCity: e.target.value});
    };
    onClick = (cityName) => {
        this.props.sendRequest(cityName.type || cityName.type === "13" ? this.state.onChangeCity : cityName);
        this.setState({onChangeCity: '', editMode: false})
    };
    onClickEnter = (e) => {
        e.keyCode === 13 && this.onClick(e)
    };
    changeEditMode = (mode) => {
        this.state.editMode !== mode &&
        this.setState({editMode: mode})
    };

    render() {
        return (
            <div className={styles.inputField} onBlur={() => setTimeout(() => this.changeEditMode(false), 200)}>
                <div className={styles.inputBorder}>
                    <input className={styles.input} type="text" value={this.state.onChangeCity} list={"cityname"}
                           onChange={this.onChange}
                           onFocus={() => this.changeEditMode(true)}
                           onKeyDown={(e) => this.onClickEnter(e)}/>
                    <MdSearch className={styles.icon} onClick={this.onClick} color='#EC2D01' size='30'/>
                </div>
                <div className={styles.listCities}>
                    {this.state.editMode
                        ? this.state.listHistoryCities
                            .filter(cityFilter => {
                                if (!cityFilter.indexOf(this.state.onChangeCity)
                                    && this.state.onChangeCity !== cityFilter) {
                                    return true;
                                } else
                                    return false
                            }).map(cityNames => <li key={cityNames}
                                                    onClick={() => this.onClick(cityNames)}>{cityNames}</li>)
                        : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        historyСities: state.reducer.historyСities
    })
};

export default connect(mapStateToProps, {sendRequest, getHistoryCities})(InputField);