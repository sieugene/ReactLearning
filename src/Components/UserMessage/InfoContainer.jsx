import Info from "./Info";
import {addMessageActionCreator} from "../../redux/infoPage-Reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        Users: state.infoPage.Users
    }
}
const InfoContainer = connect(mapStateToProps, {
    NewAddMessage: addMessageActionCreator
})(Info);
export default InfoContainer;