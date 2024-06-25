import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method
                // Instant Login after Create New Account
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            return error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }
    async updatePassword({ oldPassword, newPassword }) {
        try {
            return await this.account.updatePassword(newPassword, oldPassword)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const result = await this.account.get();
            if (result) {
                return result
            }
        } catch (error) {
            // console.log("Appwrite service :: getCurrentUser :: error", error);
            return false;
        }

        return null;
    }


    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error :: ", error)
        }
    }
}

const authService = new AuthService();

export default authService;