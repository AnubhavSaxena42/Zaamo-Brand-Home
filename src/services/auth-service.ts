import {Get, Put, Post, Delete} from './api.service';

class AuthService {
  _apiUrl = `https://prod.zaamo.co/mapper/fetch_store_id_by_user`;

  //Get filters(Content Format, Content Source, Content Type)
  getStoreId(userId) {
    return new Promise((resolve, reject) => {
      Get(`${this._apiUrl}`, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
        params: {
          user_id: userId,
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}
const authService = new AuthService();
Object.freeze(authService);
export default authService;
