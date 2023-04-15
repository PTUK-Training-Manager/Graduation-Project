import {useContext} from "react";
import {AccountContext, AccountContextValues} from "src/context/AccountContext";

const useAccountContext = (): AccountContextValues => {
    const context = useContext(AccountContext);

    if (!context)
        throw new Error("useAccountContext must be used within an AuthProvider");

    return useContext(AccountContext);
}

export default useAccountContext;
