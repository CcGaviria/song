
/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

const axios = require('axios').default;

let URL_DEV = "http://localhost:3000/dev";
//let URL_PROD = "https://lj5mnqzx37.execute-api.us-east-1.amazonaws.com/production";
let URL_BASE = URL_DEV;


export const Consumer = async (method:any, url:string, headers:object, data:string, params:object ) => {
    let final_headers : any = headers;
    let token_saved = window.localStorage.getItem("token");
    if(token_saved) {
        final_headers.Authorization = token_saved;
    }
    let petition : any = {"error": "error"};
    try{
        petition = await    axios(url, {
            headers: final_headers,
            data: data,
            method: method,
            params: params
        });
    }catch (error) {
        console.error(error);
        petition = {"error": error}
        return petition;
    }

    if(petition.data.token_bearer) {
        window.localStorage.setItem("token", petition.data.token_bearer);
    }
    console.log("petition",petition);
    return petition;
};

export const apiOnSearch = async (text_to_search:string, type_to_search:string, page:number) => {
    let {data, error} = await Consumer('get', `${URL_BASE}/search`,{}, "", {"q":text_to_search,"type":type_to_search.toLowerCase(), "page":page});
    return  data || error;
};
