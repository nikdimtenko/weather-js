import React from 'react';
import './App.module.css';
import styles from './App.module.css';
import InputField from "./component/InputField/InputField";
import WeatherInfo from "./component/WeatherInfo/WeatherInfo";

function App() {
  return (
    <div className={styles.wrapper}>
        <InputField/>
        <WeatherInfo/>
    </div>
  );
}

export default App;
