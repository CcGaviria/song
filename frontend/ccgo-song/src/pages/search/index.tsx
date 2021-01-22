/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import React, {useState} from 'react';
import './search.scss';
import Header from '../common/header';
import MenuLeft from '../common/menu-left';
import {apiOnSearch} from "../../utils/api";

export default function Search() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);

    let setContent : any = [];
    let countResults : number = 0;
    data.forEach((setType:any) => {
      countResults += setType.total;
      setType.items.forEach((itemdata:any, i:number) => {
        setContent.push(itemTypeOne(`${itemdata.name} ${itemdata.popularity ? `☆${itemdata.popularity}` : itemdata.release_date}`,<div className={"d-f fd-c jc-c ai-c expand"}>
          {
            itemdata.preview_url ?
                <audio controls src={itemdata.preview_url}/> : ""
          }
          {
            itemdata.artists &&  <div className={"d-f"}>
              <span className={"m-a"}>Artists</span>
              <ul>
                {itemdata.artists.map((genre:any) => <li>{genre.name}</li>)}
              </ul>
            </div>
          }
          {
            itemdata.genres &&  <div className={"d-f"}>
              <span className={"m-a"}>Genres</span>
              <ul>
                {itemdata.genres.map((genre:any) => <li>{genre}</li>)}
              </ul>
            </div>
          }
          <a target={'_blank'} rel="noreferrer" href={itemdata.external_urls.spotify}><h6>View on Spotify</h6></a>
         </div>,itemdata.images && itemdata.images.length>0 ? itemdata.images[0].url : "", itemdata.type.toUpperCase(), i));
      });

    });
    function onScrollResultSection() {

    return async function (p1: React.UIEvent<HTMLElement> | any) {
      var element = p1.target;
      if (element.scrollHeight - element.scrollTop < element.clientHeight + 50) {
        let form: HTMLElement | null = document.getElementById("search-form-comp");
        await onSearch(form);
      }
    };
  }

  async function onSearch (targetIn: HTMLElement | null) {
    let body: EventTarget | any = targetIn;
    let text_to_search: string = body.elements.field_search.value;
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
    let dataBody = await apiOnSearch(text_to_search, type_to_search, page);
    if(dataBody === undefined || dataBody["error"]) {

        alert("Try in another moment!");

    }else {
      let final_data = data;
      final_data  = data.concat(dataBody.data.map((iteem:any) => iteem));
      setData(final_data);
      setPage(page+1);
    }

    }

  console.info("%c ♥ CRISTIAN CAMILO GAVIRIA OVALLE ♥ %c Test Javascript", "background: #d81f1f;\n" +
      "    color: #FFF;\n" +
      "    padding: 1em;\n" +
      "    line-height: 31px;\n" +
      "    border-radius: 1em;\n" +
      "    font-size: 2em;\n" +
      "    font-style: italic;", "");

  return (
      <div className={"ct-search  d-f fd-c"}>
        {Header("1", (data:any) => {setData(data);})}
        <section className={"body-search d-f fd-r"}>
          <MenuLeft />
          <article className={"info-search f-5"}>
            {titleSection("Filters", "")}
            <section className={"sect-def fd-r d-f ai-c"}>
              {filterElement("Track", `item-filter-1`, true, true)}
              {filterElement("Album", "item-filter-2",  false, false)}
              {filterElement("Artist", "item-filter-3", false, false)}
            </section>
            {titleSection("Result", setContent === false ? "0" : setContent.length.toString()+`/${countResults} results`)}
            <section onScroll={onScrollResultSection()} className={"sect-result-search"}>
              {countResults === 0 ?
                  <div className = {" image_back"}> <span className={"text-initial"}>  SEARCH..</span></div> :
                  setContent}
            </section>
          </article>
        </section>
      </div>
    );


}

function filterElement(title : String, image: String, initialState:boolean, disable:boolean) {
  return <label className={`cur-p ${disable ? "pe-none" : ""}`} htmlFor={"filter-"+title}>
    <div className={`ct-item-def ${image}`}>
      <div className={"shdw-itdef"}/>
      {image ==="item-filter-1"? <div className={"shadow-texture"}/> : []}
      <h5 className={"title-def"}>{title}</h5>
      <label className="switch">
        <input defaultChecked={initialState} name={"item-filter"} id={"filter-"+title} type="checkbox" />
        <span className="slider round"/>
      </label>
    </div>
  </label>

}

function itemTypeOne(title : String, desc : JSX.Element | String, image : String | HTMLAudioElement, auxTx :String, index:number) {

  return <div id={`item-${title}-${index}`} className={"ct-item-type1"}>
    <div className={"col1-typ1 d-f jc-sb fd-c ai-c"}>
      <div className={"d-f fd-r f-1 jc-sb ai-c expand"}>
        {titleItem(title, null)}
        <i onClick={(e)=>{
          let elem:any = document.getElementById(`item-${title}-${index}`);
          elem.className = elem.className === "ct-item-type1" ? "ct-item-active ct-item-type1" : "ct-item-type1";
        }} className="fas fa-angle-double-right fa-2x cur-p"/>
      </div>
      {image !== "" ? <div className={"d-f fd-c f-1 expand"}>
            <div className={"ct-image-type1"} style={{backgroundImage: `url(${image})`}}>
            </div>
          </div>
          : []}
    </div>
    {titleItem(<small className={`card-text ${auxTx === "ARTIST" ? "aux-type3" : auxTx === "ALBUM" ? "aux-type2" : ""}`}>{auxTx}</small>, desc)}
  </div>
}



function titleItem(title : JSX.Element | String, desc : JSX.Element | String | null) {
  return <div className={"ct-title-item d-f jc-sb fd-c jc-c ai-c expand"}>
    <h3>{title}</h3>
    {!desc ? [] : typeof desc =='string' ? <h5>{desc}</h5> : desc}
  </div>
}

function titleSection(title : String, description : JSX.Element | String) {
  return <div className={"ct-item-sect d-f jc-sb fd-c"}>
    <h3>{title}</h3>
    {typeof description =='string' ? <h5>{description}</h5> : description}
  </div>
}

