"use client"
import { useState } from "react";
import CreateUser from "@/components/createuser";
import UserList from "@/components/userlist";
import DeleteUser from "@/components/deleteuser";
import EditUser from "@/components/edituser";
import { useCreateUser } from "@/app/hooks/useCreateUser";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { useDeleteUser } from "@/app/hooks/useDeleteUser";
import { useEditUser } from "@/app/hooks/useEditUser";
import { User } from "@/app/types/user"


export default function Home() {
    const { users, isLoading: isFetching, error: fetchError } = useFetchUsers();
    const { createUser, isLoading: isCreating, error: createError } = useCreateUser();
    const { deleteUser, isLoading: isDeleting, error: deleteError } = useDeleteUser();
    const { editUser, isLoading: isEditing, error: editError } = useEditUser();

    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleEditUser = (user: User) => {
        setUserToEdit(user);
    };

    const handleSaveEdit = async (user: User) => {
        await editUser(user);
        setUserToEdit(null);
    };

    const handleCancelEdit = () => {
        setUserToEdit(null);
    };

    const handleDeleteUser = (user: User) => {
        setUserToDelete(user);
    };

    const handleConfirmDelete = async (userId: number) => {
        await deleteUser(userId);
        setUserToDelete(null);
    };

    const handleCancelDelete = () => {
        setUserToDelete(null);
    };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">User Management API</h1>
        <CreateUser
            onCreateUser={createUser}
            isLoading={isCreating}
            error={createError}
        />
          {users &&
              <UserList
                  users={users}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
              />
          }
          {userToEdit && (
              <EditUser
                  user={userToEdit}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
              />
          )}
          {userToDelete && (
              <DeleteUser
                  user={userToDelete}
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancelDelete}
              />
          )}
      </div>
  );
}