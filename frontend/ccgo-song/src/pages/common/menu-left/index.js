/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import React, {useState} from 'react';
import './menu-left.scss';

function ItemMenu(pag, index, pageActive, setPageActive) {
  return <li key={`${index}-${pag["title"]}`} onClick={(e) => {
    setPageActive(index);
  }}><a href={"#/"} className={pageActive === index ? "active" : ""}><i
    className={pag["icon"]}/>{pag["title"]}</a></li>;
}

function MenuLeft() {

  const [pageActive, setPageActive] = useState(0);

  let pages = [
    {"title": "Overview", "icon": "fas fa-tachometer-alt"},
    {"title": "Sell my song", "icon": "fas fa-globe"},
    {"title": "Trending", "icon": "fas fa-chart-line"},
    {"title": "Sales", "icon": "fas fa-bullhorn"},
  ];

  let contentMenu = pages.map((pag, i) => ItemMenu(pag, i, pageActive,setPageActive));

  return (
    <section className={"ct-menuleft d-f fd-c jc-sb ai-fs f-1"}>
      <nav>
        <ul>
          {contentMenu}
        </ul>
      </nav>
      <div className={"ct-sect2 d-f fd-c ai-fs"}>

        <div className={"ct-marketplace"}>
        </div>
        <div className={"ct-submenu"}>

          <div>

            <h6 className={"tx-sop d-f jc-c ai-c"}>
              <div className={"ct-icon-sop d-f jc-c ai-c"}><i className="far fa-comments"/></div>
              Soporte
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuLeft;
