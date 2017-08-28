import BaseApiService from '../BaseApiService'

class ContentService extends BaseApiService {

  MODULE = 'content'

  getContentList() {
    return this.fetch('getContentList')
  }

  createUnit({ unitName }) {
    return this.fetch('createUnit', null, { method: 'POST', body: { unitName } })
  }
}

export default new ContentService();
