// src/hooks/useRole.js
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users?email=${user.email}`).then((res) => {
        setRole(res.data?.role);
        setLoading(false);
      });
    }
  }, [user, axiosSecure]);

  return [role, loading];
};

export default useRole;
