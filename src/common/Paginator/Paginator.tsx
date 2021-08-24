import React, {useState} from "react";
import style from './Paginator.module.css';
import classNames from "classnames";

type PropsType = {
    currentPage?: number,
    onPageChanged?: (pageNumber: number) => void,
    pageSize: number,
    totalItemsCount: number,
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({currentPage = 1, onPageChanged = x => x, pageSize, totalItemsCount, portionSize = 10}) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: number[] = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionsCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={style.wrapper}>
            <div className={style.prev}>
                {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
            </div>

            <div className={style.pages}>
                {pages.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => <button key={p} onClick={() => {onPageChanged(p)}} className={classNames(style.pageNumber, {[style.activePage]: p === currentPage})}>{p}</button>)}
            </div>

            <div className={style.next}>
                {portionNumber < portionsCount && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
            </div>

        </div>
    )

};

export default Paginator;