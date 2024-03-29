import api from "../api";
import { StudentDetail } from "../types/StudentDetail";

export default class StudentService {
  getStudentByUsername = (): StudentDetail | null => {
    api
      .get(`student/current/${localStorage.getItem("currentUsername")}`)
      .then((res) => {
        return res.data.responseData;
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  };
}
