import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class PostsService {

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
    logger.log(AppState.posts.body)
  }

  async changePage(page) {
    const res = await api.get(page)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
  }

  async createPost(postData) {
    logger.log('post data', postData)
    const res = await api.post('api/posts', postData)
    AppState.posts.unshift(res.data)
  }

  async removePost(id) {
    logger.log('post to be removed', id)
    const res = await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(p => p.id != id)
    AppState.profilePosts = AppState.posts.filter(p => p.id != id)
  }

  async getAll(query = {}) {
    const res = await api.get('api/posts', { params: query })
    logger.log('searching posts for', res.data)
    AppState.posts = res.data.posts
  }

  async likePost(id) {
    logger.log('post to be liked', id)
    const res = await api.post('api/posts/' + id + '/like')
    logger.log('[post has been liked!]', res.data.likes)
    AppState.posts = res.data.likes
    AppState.activeProfile = res.data.like

  }

  async converTimeStamp(timeStamp) {
    logger.log('timestamp to be converted!!!', timeStamp)
  }


}

export const postsService = new PostsService();