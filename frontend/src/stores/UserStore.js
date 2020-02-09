import { observable, action } from "mobx";
import Axios from "axios";

class UserStore {
  user = observable({});
  getUser = action(username => {
    Axios.get("api/users", { params: { username } }).then(data => {
      console.log(data);

      this.user = data.data;
    });
  });
}
export const userStore = new UserStore();
userStore.getUser("test1");
