import { connect } from 'react-redux';
import { userRegisterAction } from '../../actions/user.actions';
import Register from '../../pages/auth/register';

export default connect(null, { userRegisterAction })(Register);