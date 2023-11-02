import { connect } from 'react-redux';
import Navbar from '../components/navbar';
import { userLogoutAction } from '../actions/user.actions';

const mapStateToProps = (state) => ({
    loggedIn: state.session.loggedIn,
    role: state.session.profile && state.session.profile.role
});

export default connect(mapStateToProps, { userLogoutAction })(Navbar)