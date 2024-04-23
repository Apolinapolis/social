import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import {withAuthRedirect} from "../Hoc/WithAuthRedirect"
import { actions } from '../Redux/dialogsReducer';
import { compose } from 'redux';

let mapStateToProps = (state) => ({dialogsPage: state.dialogsPage})

let mapDispatchToProps = (dispatch) => {
    return {sendMessage: (newMessageBody) => {dispatch(actions.sendMessageCreator(newMessageBody))}}}

export default compose(connect(mapStateToProps,mapDispatchToProps),withAuthRedirect) (Dialogs)