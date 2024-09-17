import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User } from "@/app/types/user"


interface CreateUserProps {
    onCreateUser: (user: Omit<User, "user_id">) => void
    isLoading: boolean
    error: Error | null
}

export default function CreateUser({ onCreateUser, isLoading, error }: CreateUserProps) {
    const [formData, setFormData] = useState<Omit<User, "user_id">>({
        username: "",
        ap_pat: "",
        ap_mat: "",
        age: null,
        email: "",
        gender: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, gender: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreateUser(formData)
        setFormData({
            username: "",
            ap_pat: "",
            ap_mat: "",
            age: null,
            email: "",
            gender: "",
        })
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            )}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className={"font-semibold"} htmlFor="username">Username</Label>
                    <Input id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label className={"font-semibold"} htmlFor="ap_pat">Apellido Paterno</Label>
                    <Input id="ap_pat" name="ap_pat" value={formData.ap_pat} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label className={"font-semibold"} htmlFor="ap_mat">Apellido Materno</Label>
                    <Input id="ap_mat" name="ap_mat" value={formData.ap_mat || ""} onChange={handleInputChange} />
                </div>
                <div>
                    <Label className={"font-semibold"} htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" value={formData.age || ""} onChange={handleInputChange} />
                </div>
                <div>
                    <Label className={"font-semibold"} htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label className={"font-semibold"} htmlFor="gender">Gender</Label>
                    <Select onValueChange={handleSelectChange} value={formData.gender || ""}>
                        <SelectTrigger>
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
            <div className="mt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create"}
                </Button>
            </div>
        </form>
    )
}