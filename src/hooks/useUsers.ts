import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      userService
        .getAllUsers()
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return {users, error, isLoading, setUsers, setError}
}

export default useUsers;