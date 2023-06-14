import {useQuery} from "@tanstack/react-query";
import {UseProgressFormProps} from "../types";


const useProgressForm = ({trainingId}: UseProgressFormProps) => {


    // const {data, isLoading} = useQuery({
    //     queryKey: ["ProgressForm", trainingId],
    //     queryFn: () => getProgressForm(id),
    //     // onSuccess: (data) => {}
    // });
    //
    // return {
    //     data: data ?? [],
    // };

    return null;
};

export default useProgressForm;
