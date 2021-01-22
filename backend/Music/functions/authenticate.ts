/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

'use strict';
import {getToken, tOf, token_basic} from "../utils";

interface event {
    body: string
}

module.exports.main = async (event:event) => {
    const timestamp = new Date()
    const data = JSON.parse(event.body);
    if(tOf(data, 'object') && tOf(token_basic, 'string')) {

        let data = await getToken(`${token_basic}`);
        if(tOf(data.access_token, 'string')) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': 'https://music.gaviria.org',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(
                    {
                        message: 'Authenticate! Your function executed successfully!',
                        date : timestamp,
                        token_bearer: data.access_token
                    },
                    null,
                    2
                ),
            };
        }

    }
    return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': 'https://music.gaviria.org',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            {
                message: 'Authenticate! Your function executed failed!',
                date : timestamp,
            },
            null,
            2
        ),
    };
};
