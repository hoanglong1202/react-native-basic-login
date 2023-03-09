import axios from './axiosClient';
class AuthService {
  login = async body => {
    const res = await axios.post(`/users/login`, body);
    return res?.data;
  };
}
export default new AuthService();
