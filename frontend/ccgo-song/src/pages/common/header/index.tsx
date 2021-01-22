/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import * as React from 'react';
import {FormEvent} from 'react';
import './header.scss';
import {apiOnSearch} from "../../../utils/api";

let routes : Array<Array<string>> = [ ["#/home", "Home"],["/", "Search"], ["#/about", "About"]];

function itemRoute(title: string, path: string, index: string, active: string) {
    return <li key={`${index}-${title}`} className={"d-f jc-c ai-c fd-c"}>
        <a href={path} className={`${active === index ? "active" : ""}`}>{title}</a>
        {
            active === index ?
                <span className={"ind-active"}>•</span> :
                []
        }
    </li>;
}

function Header(active:string, onSearchEnd:any){
    let compForm : any = null;
    return (
      <header className={"ct-header fd-r jc-sb ai-c"}>
        <div className={"item1"}>
          <div className={"ct-logo"}>
          </div>
        </div>
        <div className={"item2 d-f jc-c ai-c"}>
          <nav>
            <ul className={"ct-menu d-f fd-r jc-sb ai-c"}>
                {
                    routes.map((route, i) => itemRoute(route[1],    route[0], i.toString(), active))
                }
            </ul>
          </nav>
        </div>
        <form ref={(lm) => {compForm = lm;}} method={"get"} id={"search-form-comp"} action={"#"} className={"item3 d-f jc-c ai-c pos-r"} onSubmit={onSearch}>
            <input onKeyPress={async (e) =>{
                var keycode = (e.keyCode ? e.keyCode : e.which);
                if (keycode === 13) {
                    await onSearch(e);
                }}}  name={"field_search"} type="text" placeholder={"Search something.."}/>
            <label className={"d-f jc-c ai-c"} htmlFor="btn_on_search">
                <i className="fas fa-search pos-ab icon-search"/>
            </label>
            <input  onClick={onSearch} alt="btn_on_search" id={"btn_on_search"} hidden={true}  >
            </input>
        </form>
        <div className={"item4 d-f fd-r jc-c ai-c"}>
          <div className={"item-not"}>
            <span  className={"ind-notf"}>•</span>
            <i className="far fa-bell fa-1x c-t"/>
          </div>
          <div className={"ct-profile"}/>
          <div className={"item-name-user"}>
            <span>Hi, family LM</span>
          </div>
        </div>
      </header>
    );

    async function onSearch (e:FormEvent) {
        let text_to_search: string = compForm.elements.field_search.value;
        if(text_to_search.length < 1) {
            alert("Please search anything");
            return false;
        }
        let type_to_search: string = "";
        let elements: any = document.getElementsByName("item-filter");
        Object.values(elements).forEach((elm: any) => {
            if (elm.checked)
                type_to_search += `,${elm.id.substr(7)}`
        });
        type_to_search = type_to_search.substr(1, type_to_search.length)
        let dataBody = await apiOnSearch(text_to_search, type_to_search, 1);
        if(dataBody === undefined || dataBody["error"]) {
            alert("Try in another moment!");
        } else {
            onSearchEnd(dataBody.data);
        }
    }
}

export default Header;
