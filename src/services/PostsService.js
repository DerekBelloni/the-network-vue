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

  async removePost(id) {
    logger.log('post to be removed', id)
    const res = await api.delete('api/posts/' + id)
    AppState.activeProfile = {}
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }

  async getAll(query = {}) {
    const res = await api.get('api/posts', { params: query })
    logger.log('searching posts for', res.data)
    AppState.posts = res.data.posts
  }


}

export const postsService = new PostsService();