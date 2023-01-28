import mainApi from "@/infrastructure/http-client-main";
import { NEW_FLOW_API } from "./constants";

class NewFlowService {
  getFlowData = ({token, textOrder}) => {
    return new Promise((resolve, reject) => {
      mainApi
        .post(NEW_FLOW_API.CREATE_FLOW, {}, {
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
}

export default new NewFlowService();
