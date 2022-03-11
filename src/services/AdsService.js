import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AdsService {
  async getAds() {
    const res = await api.get('api/ads')
    logger.log(res.data)
    AppState.ads = res.data
    logger.log('[Ads are in the AppState]', res.data)
  }
}

export const adsService = new AdsService();