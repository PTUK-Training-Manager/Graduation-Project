import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import verifyAccessToken from "src/api/verifyAccessToken";
import useAccountContext from "./useAccountContext";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";
import useSnackbar from "src/hooks/useSnackbar";

const useVerifyAccessToken = () => {

    const {onLogin, onLogout} = useAccountContext();

    const {showSnackbar} = useSnackbar();

    const [isVerifying, setIsVerifying] = useState(true);

    // if (localStorage.getItem("access-token") === null) {
    //     return {
    //         isVerifying: true
    //     }
    // }

    const {data} = useQuery(
        ["verifyAccessToken"],
        verifyAccessToken, {
            retry: false, // don't retry if the API call fails
            onSuccess: ({data}) => {
                // console.log(data);
                onLogin(data);
            },
            onError: (error: AxiosBaseError) => {
                // console.log(error);
                onLogout();
                const errorMessage = extractErrorMessage(error);
                if (window.location.pathname !== "/login")
                    showSnackbar({severity: "error", message: errorMessage ?? "Invalid Access Token"});
            },
            onSettled: () => {
                setIsVerifying(false);
            },
            // enabled: localStorage.getItem("access-token") === null
        });

    return {isVerifying};
};

export default useVerifyAccessToken;
