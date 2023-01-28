import mainApi from "@/infrastructure/http-client-main";
import { NEW_FLOW_API } from "./constants";

class NewFlowService {
  createFlow = ({tocken, textOrder}) => {
    return new Promise((resolve, reject) => {
      mainApi
        .post(NEW_FLOW_API.CREATE_FLOW, 
          {
            tocken: tocken, 
            text: textOrder
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
