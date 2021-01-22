/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import SongApp from './pages/common/SongApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <SongApp />,
    document.getElementById('body-song-application')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
