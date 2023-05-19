import { useEffect, useState } from "react";
import { getAllTrainings } from "../api";
import { AllTrainingsData } from "../api/response.dto";

const useAllTrainingsController = () => {
    const [trainingData, setTrainingData] = useState<AllTrainingsData[]>([]);

   useEffect(() => {
        getAllTrainings()
          .then((result) => {
            setTrainingData(result.data);
            console.log(result.data);
          })
          .catch((error) => console.log(error));
      }, []);

    return {
    trainingData
    }
};

export default useAllTrainingsController;

