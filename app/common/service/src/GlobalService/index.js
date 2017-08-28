import BaseApiService from '../BaseApiService'

class GlobalService extends BaseApiService {
  getUserInfo({ userId }) {
    return this.fetch('getUserInfo', { userId });
  }
}

export default new GlobalService();
