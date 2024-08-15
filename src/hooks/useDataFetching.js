import { useQuery } from "react-query";
import axios from "axios";

const getData = () => {
    return axios.get("http://localhost:3000/api/v1/lectures")
  }

  export const useQueryData = (onSuccess , onError ) => {

    return useQuery('data', getData , {
        onSuccess, 
        onError
    })
  }