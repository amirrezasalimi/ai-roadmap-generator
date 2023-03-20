import { HOME_API } from "./constants";
import mainApi from "@/infrastructure/http-client-main";

class HomeService {
  createRoadmap = ({token, textOrder}) => {
    return new Promise((resolve, reject) => {
      mainApi
        .post(HOME_API.CREATE_ROADMAP, {}, {
          params:{
            token: token, 
            title: textOrder
          }
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  getRecentRoadmapList = () => {
    return new Promise((resolve, reject) => {
      mainApi
          .post(HOME_API.GET_RECENT_ROADMAP_LIST)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
    });
  };
}

export default new HomeService();
