import { useState } from "react";
import { User } from "@/app/types/user";

interface UseCreateUserResult {
    createUser: (user: Omit<User, "user_id">) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

export function useCreateUser(): UseCreateUserResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createUser = async (user: Omit<User, "user_id">) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            alert("User created successfully");
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { createUser, isLoading, error };
}
