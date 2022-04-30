import axios from 'axios';

const API_URL = 'http://localhost:8080/rest/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        userName: user.userName,
        password: user.password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
          localStorage.setItem('last_userName', user.userName);
        }
        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      name: user.name,
      surName: user.surName,
      userName: user.userName,
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('last_userName', user.userName);
      }
      return response;
    });
  }
}

export default new AuthService();