import { useState } from "react";
import { User } from "@/app/types/user";

interface UseEditUserResult {
    editUser: (user: User) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

export function useEditUser(): UseEditUserResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const editUser = async (user: User) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/users`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            alert("User updated successfully");
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { editUser, isLoading, error };
}
