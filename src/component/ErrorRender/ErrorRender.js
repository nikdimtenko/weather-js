import React from 'react';
import styles from './ErrorRender.module.css'

const ErrorRender = (props) => {
        return (
            <div className={styles.error}>
                  <span>Oops, {props.error}</span>
            </div>
        )
    };

export default ErrorRender;