/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

'use strict';

import * as axios from "axios";
import {stringify} from "querystring";

enum client {
    id="id-spotify-f936e6220974351376",
    secret="secret-spotiify-0c51803cf6695c5bb3"
}

var credentials = `${client.id}:${client.secret}`;
let buff = new Buffer(credentials);

export const consumer = async (method:any, url:string, headers:object, data:string, params:object, ) => {return await axios.default(url, {headers:headers, data: data, method: method, params: params})};
export const tOf = (value:any, type:any) => {return typeof value === type;};
export const getToken = async (token_basic:string) => {
    console.log("token_basic", token_basic);
    const {data} = await consumer('post', 'https://accounts.spotify.com/api/token', {'Authorization': `Basic ${token_basic}`, 'Content-Type': 'application/x-www-form-urlencoded'}, stringify({'grant_type': 'client_credentials'}), {});
    return data;
};
export const token_basic = buff.toString('base64');
