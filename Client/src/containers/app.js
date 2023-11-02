import { connect } from "react-redux";
import App from "../App";

const mapStateToPRops = (state) => ({
    loggedIn: state.session.loggedIn,
    loading: state.session.loading
});

export default connect(mapStateToPRops)(App)