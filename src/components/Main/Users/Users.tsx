import React, {useEffect} from "react";
import style from './Users.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentPage, selectFilter, selectFollowingInProgress,
    selectIsFetching,
    selectPageSize,
    selectTotalUsersCount,
    selectUsers
} from "../../../redux/users-selectors";
import {useHistory, useLocation} from "react-router-dom";
import {FilterType, follow, requestUsers, unfollow} from "../../../redux/users-reducer";
import Preloader from "../../../common/Preloader/Preloader";
import Paginator from "../../../common/Paginator/Paginator";
import UsersSearchForm from "./UsersSearchForm";
import User from "./User";
import queryString from 'querystring';

type QueryParamsType = {term?: string, friend?: string, page?: string}

const Users: React.FC = () => {

    const users = useSelector(selectUsers);
    const totalUsersCount = useSelector(selectTotalUsersCount);
    const currentPage = useSelector(selectCurrentPage);
    const pageSize = useSelector(selectPageSize);
    const isFetching = useSelector(selectIsFetching);
    const followingInProgress = useSelector(selectFollowingInProgress);
    const filter = useSelector(selectFilter);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {

        const parsed: QueryParamsType = queryString.parse(location.search.substr(1));

        let actualFilter = filter;
        let actualPage = currentPage;

        if(!!parsed.page) actualPage = Number(parsed.page);
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term};
        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null};
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true};
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false};
        }

        dispatch(requestUsers(pageSize, actualPage, actualFilter));

    }, [])

    useEffect(() => {

        const query: QueryParamsType = {};

        if(currentPage !== 1) query.page = String(currentPage);
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })

    }, [currentPage, filter])

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(pageSize, 1, filter));
    };

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageSize, pageNumber, filter));
    };

    const useFollow = (userId: number) => {
        dispatch(follow(userId));
    };

    const useUnfollow = (userId: number) => {
        dispatch(unfollow(userId));
    };

    return (
        <div className={style.wrapper}>
            {isFetching && <Preloader />}
            <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged} />
            <Paginator pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} />
            <div className={style.users}>
                {users.map((u) => <User key={u.id} user={u} followingInProgress={followingInProgress} follow={useFollow} unfollow={useUnfollow} />)}
            </div>
        </div>
    )
};

export default Users;