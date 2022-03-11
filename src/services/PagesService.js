import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

const baseQuery = {
  page: 1,
  query: ''
}

class PagesService {
  async getNewerPage() {
    const res = await api.get('api/posts?page=newer')
    logger.log('pages retrieved', res.data)
    AppState.newerPage = res.data
    logger.log(AppState.newerPage)
  }
}

export const pagesService = new PagesService();