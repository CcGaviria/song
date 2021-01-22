/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista Tualy | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

'use strict';

import {consumer, getToken, tOf, token_basic} from "../utils";

interface parameter {
    q: string,
    type: string,
    page: number
}
interface headers {
    Authorization: string
}
interface event {
    queryStringParameters: parameter
    headers: headers
}

module.exports.main = async (event : event) => {

    console.log("EVENT", event)
    const {q, type, page} =  event.queryStringParameters || null;
    const {Authorization} =  event.headers;
    if(!q) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'https://music.gaviria.org',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(
                {
                    message: `Search! Your function executed failed! => Searching: '${q}' `,
                },
                null,
                2
            ),
        };
    }
    let token_bearer : string = "";
    let type_search : string = type || "track";
    if (tOf(q, 'string')) {

        if(tOf(Authorization, 'string')){
            token_bearer = Authorization;
        } else {
            let data = await getToken(`${token_basic}`);
            token_bearer = data.access_token;

        }
        const {data} = await consumer('get','https://api.spotify.com/v1/search', {'Authorization': `Bearer ${token_bearer}`, 'Content-Type':'application/json'}, "",  {"q": q, "type":type_search, "offset":page*20});
        const dataTest : any[] = Object.values(data).filter((item:any) => item.items.length > 0);
        let bodyResponse : any = {
            message: 'Search! Your function executed successfully!',
            data: dataTest
            // input: event,
        };
        if(!tOf(Authorization, 'string')) {
            bodyResponse["token_bearer"] = token_bearer;
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://music.gaviria.org',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(
                bodyResponse,
                null,
                2
            ),
        };

    }

    return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': 'https://music.gaviria.org',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            {
                message: 'Search! Your function executed failed!',
               // input: event,
            },
            null,
            2
        ),
    };
};
