import { AppState } from "../AppState";
import { logger } from "../utils/Logger";

class ProfilesService {

  setActiveProfile(profile) {
    AppState.activeProfile = profile
    logger.log("Active Profile", AppState.activeProfile)
  }

}

export const profilesService = new ProfilesService();