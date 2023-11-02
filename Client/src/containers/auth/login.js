import { connect } from "react-redux";
import { userLoginAction } from "../../actions/user.actions";
import Login from "../../pages/auth/login";

export default connect(null, { userLoginAction })(Login);