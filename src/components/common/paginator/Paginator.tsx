import React, {useState} from "react";
import s from "./Paginator.module.css"

type propsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChenged: (pageNumber: number) => void
    portionSize?: number
}
let Paginator: React.FC<propsType> = ({totalItemsCount, pageSize, currentPage, onPageChenged, portionSize = 12}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    };

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginator}> {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}

            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={currentPage === p && s.selectedPage} key={p}
                                 onClick={(e) => onPageChenged(p)}>{p}</span>
                })}

            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}
        </div>
    )
}

export default Paginator