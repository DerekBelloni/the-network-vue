import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class PostsService {

  async getAllPosts() {
    const res = await api.get('posts')
    logger.log(res.data)
    AppState.posts = res.data.posts
    logger.log(AppState.posts.body)
  }


}

export const postsService = new PostsService();