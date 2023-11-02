import { connect } from 'react-redux';
import AppRouter from '../components/app-router';

const mapStateToProps = (state) => ({
    loggedIn: state.session.loggedIn,
    role: state.session.profile && state.session.profile.role,
});

export default connect(mapStateToProps)(AppRouter)