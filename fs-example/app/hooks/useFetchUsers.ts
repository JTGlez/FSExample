import { useState, useEffect } from "react";
import { User } from "@/app/types/user";

interface UseFetchUsersResult {
    users: User[] | null;
    isLoading: boolean;
    error: Error | null;
}

export const useFetchUsers = (): UseFetchUsersResult => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, isLoading, error };
};

export default useFetchUsers;
