import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ProfilesService {

  setActiveProfile(profile) {
    AppState.activeProfile = profile
    logger.log("Active Profile", AppState.activeProfile)
  }

  async getProfilePostsById(creatorId) {
    const res = await api.get('api/profiles/' + creatorId + '/posts')
    logger.log('all posts from active profile', res.data.posts)
    AppState.profilePosts = res.data.posts
  }

}

export const profilesService = new ProfilesService();