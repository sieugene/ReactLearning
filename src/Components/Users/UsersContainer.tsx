import { connect } from "react-redux";
import Users from "./Users";
import {
	followUserThunkCreator,
	getUsersThunkCreator,
	setCurrentPageThunkCreator,
	setSearchTermTextThunkCreator,
	unFollowUserThunkCreator
} from "../../redux/UsersPage-Reducer";
import React from "react";
import Preloader from "../../assets/preloader/Preloader";
import { compose } from "redux";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getSearchTerm,
	getTotalUsers,
	getUsersList,
} from "../../redux/users-selectors";
import { UserType } from "../../Types/UsersTypes";
import { AppStateType } from "../../redux/store-redux";


type MapStatePropsType = {
	isFetching: boolean,
	searchTerm: string | null,
	totalUsers: number,
    pageSize: number,
	currentPage: number,
	UsersList: UserType[],
	followingInProgress: Array<Number>
}
type MapDispatchPropsType = {
	followUserThunk: (userId: number) => void,
    unFollowUserThunk: (userId: number) => void,
	getUsersThunk: (pageSize: number, currentPage: number) => void,
	setCurrentPageThunk: (pageSize: number, pageNumber: number) => void,
	setSearchTermTextThunk: (pageSize: number, text: string) => void
}
//делим типы пропсов, если же мы получаем напрямую через передачу другой компоненты
//то делаем тип, то есть три типа: MapState, MapDispatch, OwnProps(этот если через компоненту)
type PropsTypes = MapStatePropsType & MapDispatchPropsType //& OwnProps

class UsersContainerClass extends React.Component<PropsTypes> {
	componentDidMount() {
		this.props.getUsersThunk(this.props.pageSize, this.props.currentPage)
	}

	//новый запрос, на изменение выбранной страницы
	onPageCurrentChange = (pageNumber: number) => {
		this.props.setCurrentPageThunk(this.props.pageSize, pageNumber)
	}
	//поиск по пользователям метод
	onSearchChange = (text: string) => {
		this.props.setSearchTermTextThunk(this.props.pageSize, text)
	}

	render() {
		return (<>
			{this.props.isFetching ? < Preloader /> : null}
			<Users totalUsers={this.props.totalUsers}
				pageSize={this.props.pageSize}
				searchTerm={this.props.searchTerm}
				onSearchChange={this.onSearchChange}
				currentPage={this.props.currentPage}
				onPageCurrentChange={this.onPageCurrentChange}
				UsersList={this.props.UsersList}
				followingInProgress={this.props.followingInProgress}
				unFollowUserThunk={this.props.unFollowUserThunk}
				followUserThunk={this.props.followUserThunk} />
		</>
		)
	}
}

//указываем наш глобальный тип, а также тип mapstate
let mapStateToProps = (state: AppStateType):MapStatePropsType => {
	return {
		UsersList: getUsersList(state),
		pageSize: getPageSize(state),
		totalUsers: getTotalUsers(state),
		currentPage: getCurrentPage(state),
		searchTerm: getSearchTerm(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}
//типы также указываем где connect ctrl click для просмотра подробно, 4 параметра, если 
//в типах не указана подробная информация(в случае санок) могут возникнуть ошибки
//обязательно указывать все параметры
export default compose(
	//тут
connect<MapStatePropsType, MapDispatchPropsType,null,AppStateType>
	//generic
(mapStateToProps, {
		getUsersThunk: getUsersThunkCreator,
		setCurrentPageThunk: setCurrentPageThunkCreator,
		setSearchTermTextThunk: setSearchTermTextThunkCreator,
		unFollowUserThunk: unFollowUserThunkCreator,
		followUserThunk: followUserThunkCreator
	})
)(UsersContainerClass)







//old method mdtp
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (UsersList) => {
//             dispatch(setUsersAC(UsersList))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setUsersTotal: (totalUsers) => {
//             dispatch(setUsersTotalCount(totalUsers))
//         },
//         setSearchTermText: (text) => {
//             dispatch(setSearchTermAC(text))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

//none compose
// const UsersContainer = connect(mapStateToProps,
//     {
//         follow: followAC,
//         unFollow: unFollowAC,
//         toggleFollowingInProgress: toggleFollowingInProgressAC,
//         getUsersThunk: getUsersThunkCreator,
//         setCurrentPageThunk: setCurrentPageThunkCreator,
//         setSearchTermTextThunk: setSearchTermTextThunkCreator,
//         unFollowUserThunk: unFollowUserThunkCreator,
//         followUserThunk: followUserThunkCreator
//     }
// )(UsersContainerClass);
// export default UsersContainer;
