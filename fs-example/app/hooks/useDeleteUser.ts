import { useState } from "react";

interface UseDeleteUserResult {
    deleteUser: (userId: number) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

export function useDeleteUser(): UseDeleteUserResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteUser = async (userId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/users?user_id=${userId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            alert("User deleted successfully");
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteUser, isLoading, error };
}
