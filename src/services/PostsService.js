import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class PostsService {

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts
    logger.log(AppState.posts.body)
  }

  async createPost(postData) {
    logger.log('post data', postData)
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(res.data)
  }


}

export const postsService = new PostsService();