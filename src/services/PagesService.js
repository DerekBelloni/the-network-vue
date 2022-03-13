import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";



class PagesService {

  async changePage(page) {
    const res = await api.get('api/posts?page=' + page)
    logger.log('older pages received', res.data)
    AppState.olderPage = res.data.posts
    // logger.log('older page', AppState.olderPage)
    AppState.posts = AppState.olderPage
  }

  async getNewerPage() {
    const res = await api.get('api/posts?page=1')
    // logger.log('newer pages retrieved', res.data)
    AppState.newerPage = res.data
    logger.log('newer page', AppState.newerPage)
    // AppState.posts = AppState.newerPage
  }

}

export const pagesService = new PagesService();