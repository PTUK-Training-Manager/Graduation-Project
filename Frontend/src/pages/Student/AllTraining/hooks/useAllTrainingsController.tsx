import { useEffect, useState } from "react";
import { getAllTrainings } from "../api";
import { AllTrainingsData } from "../api/response.dto";

const useAllTrainingsController = () => {
    const [data, setData] = useState<AllTrainingsData[]>([]);

   useEffect(() => {
        getAllTrainings()
          .then((result) => {
            setData(result.data);
            console.log(result.data);
          })
          .catch((error) => console.log(error));
      }, []);

    return {
    data
    }
};

export default useAllTrainingsController;

