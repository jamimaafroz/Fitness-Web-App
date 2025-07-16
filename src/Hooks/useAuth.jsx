import { useContext } from "react";
import { AuthContexts } from "../contexts/AuthContexts/AuthContexts";

const useAuth = () => {
  const authInfo = useContext(AuthContexts);
  return authInfo;
};

export default useAuth;
