/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import { useState } from "react";

function returnStorageValue(key:string) {
    let value : string | null = window.localStorage.getItem(key);
    return value ? JSON.parse(value): null;
}

export default function UseStorage(key:string, value:any) {

    const [storage, setStorage] = useState(returnStorageValue(key) || value);

    const saveValue = (value:any) => {
        try {
            setStorage(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error(error)
        }
    }

}
