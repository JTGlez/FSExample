import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from "@/app/types/user"

interface EditUserProps {
    user: User;
    onSave: (user: User) => void;
    onCancel: () => void;
}

export default function EditUser({ user, onSave, onCancel }: EditUserProps) {
    const [formData, setFormData] = useState<User>(user);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, gender: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={true} onOpenChange={onCancel}>
            <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit User</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Make changes to the user information below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="edit-username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="col-span-3 bg-gray-100"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-ap_pat" className="text-right">
                                Apellido Paterno
                            </Label>
                            <Input
                                id="edit-ap_pat"
                                name="ap_pat"
                                value={formData.ap_pat}
                                onChange={handleInputChange}
                                className="col-span-3 bg-gray-100"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-ap_mat" className="text-right">
                                Apellido Materno
                            </Label>
                            <Input
                                id="edit-ap_mat"
                                name="ap_mat"
                                value={formData.ap_mat || ""}
                                onChange={handleInputChange}
                                className="col-span-3 bg-gray-100"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-age" className="text-right">
                                Age
                            </Label>
                            <Input
                                id="edit-age"
                                name="age"
                                type="number"
                                value={formData.age || ""}
                                onChange={handleInputChange}
                                className="col-span-3 bg-gray-100"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="col-span-3 bg-gray-100"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-gender" className="text-right">
                                Gender
                            </Label>
                            <Select onValueChange={handleSelectChange} value={formData.gender || ""}>
                                <SelectTrigger className="col-span-3 bg-gray-100">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-end space-x-2">
                        <Button type="button" variant="secondary" onClick={onCancel} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
