import React from "react";
import s from "./Paginator.module.css"

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChenged }) => {

  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = [];
  for (let i = 1; i <= 10; i++) { pages.push(i) }; // вместо 10 был pagesCount

  return <div>{pages.map((p) => {
      return <span className={currentPage === p && s.selectedPage} onClick={(e) => onPageChenged(p)}>{p}</span>})}
    </div>
    
};

export default Paginator