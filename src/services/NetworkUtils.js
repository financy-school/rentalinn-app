import axios from 'axios';
import {FINANCY_ENDPOINT_URL} from '../../config';

export const handleSchoolUserSignup = async credentials => {
  const url = `${FINANCY_ENDPOINT_URL}/property/property-user/register`;

  const signup_res = await axios.post(url, credentials);

  return signup_res.data;
};

export const handleSchoolUserLogin = async credentials => {
  const url = `${FINANCY_ENDPOINT_URL}/property/property-user/login`;

  console.log('Login URL:', url);
  console.log('Login Credentials:', credentials);
  const login_res = await axios.post(url, credentials);

  return login_res.data;
};
