import { User } from "firebase/auth"
import { UserCredential } from "firebase/auth"

export type AuthContextType = {
    currentUser: User | null,
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    updateemail: (email: string) => void
    updatepassword: (password: string) => void
}