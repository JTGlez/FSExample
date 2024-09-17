import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/app/types/user"

interface DeleteUserProps {
    user: User;
    onConfirm: (userId: number) => void;
    onCancel: () => void;
}

export default function DeleteUser({ user, onConfirm, onCancel }: DeleteUserProps) {
    const handleConfirm = () => {
        onConfirm(user.user_id);
    };

    return (
        <AlertDialog open={true} onOpenChange={onCancel}>
            <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the user
                        account and remove their data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-4 py-2"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-red-600 text-white hover:bg-red-700 rounded-md px-4 py-2"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
