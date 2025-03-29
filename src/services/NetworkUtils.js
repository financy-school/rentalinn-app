import axios from 'axios';
import {FINANCY_ENDPOINT_URL} from '../../config';

export const handleSchoolUserSignup = async credentials => {
  credentials['role'] = 'admin';

  const url = `${FINANCY_ENDPOINT_URL}/school-user/register`;

  const signup_res = await axios.post(url, credentials);

  return signup_res.data;
};

export const handleSchoolUserLogin = async credentials => {
  const url = `${FINANCY_ENDPOINT_URL}/school-user/login`;

  const login_res = await axios.post(url, credentials);

  return login_res.data;
};
