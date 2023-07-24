import { useEffect, useState } from "react";
import {
  getTrainingIdForRunnigTraining,
  getRejectedEvaluations,
  getPendingEvaluations,
} from "../api";
import {
  TrainingRunningIDData,
  RejectedEvaluationData,
  PendingEvaluationData,
} from "../api/response.dto";

const useProgressController = () => {
  const [data, setData] = useState<TrainingRunningIDData>();
  const [rejectedEvaluations, setRejectedEvaluations] = useState<RejectedEvaluationData[]>([]);
  const [trainingId, setTrainingId] = useState<number>(-1);
  const [pendingEvaluations, setPendingEvaluations] = useState<PendingEvaluationData[]>([]);

  useEffect(() => {
    getTrainingIdForRunnigTraining()
      .then(result => {
        setData(result.data);
        console.log(result.data);
        setTrainingId(result.data.trainingId);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    getRejectedEvaluations({ trainingId: trainingId })
      .then(result => {
        setRejectedEvaluations(result.data);
        console.log(result.data);
      })
      .catch(error => console.log(error));
  }, [trainingId]);

  useEffect(() => {
    getPendingEvaluations({ trainingId: trainingId })
      .then(result => {
        setPendingEvaluations(result.data);
        console.log(result.data);
      })
      .catch(error => console.log(error));
  }, [trainingId]);

  return {
    data,
    rejectedEvaluations,
    pendingEvaluations,
  };
};

export default useProgressController;
