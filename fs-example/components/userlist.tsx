import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@/app/types/user";

interface UserListProps {
    users: User[];
    onEditUser: (user: User) => void;
    onDeleteUser: (user: User) => void;
}

export default function UserList({ users, onEditUser, onDeleteUser }: UserListProps) {
    if (!Array.isArray(users) || users.length === 0) {
        return (
            <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-lg font-semibold text-gray-700">No users available</p>
                <p className="text-sm text-gray-500">Please add some users to see them listed here.</p>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Apellido Paterno</TableHead>
                    <TableHead>Apellido Materno</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.user_id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.ap_pat}</TableCell>
                        <TableCell>{user.ap_mat}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => onEditUser(user)}>
                                Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => onDeleteUser(user)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
