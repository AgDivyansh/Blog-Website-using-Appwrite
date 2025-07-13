import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthService {

    client = new Client;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);


    }

    async createAccoount({ email, password, name }) {
        try {
            const userAccount = await this.account.createAccoount(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                // call another metnod 
                // if user is already exists then nevigate to login page 

                return this.login({ email, password });

            } else {
                return userAccount;
            }

        } catch (error) {
            // throw error;
            console.log("Appwrite service :: createAccount :: error", error);

        }
    }

    async login({ email, password }) {
        try {

            return await this.account.createEmailPasswordSession(
                email,
                password
            )

        } catch (error) {
            // throw error ;
            console.log("Appwrite :: service :: login :: error", error);

        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // throw error
            console.log("Appwrite service :: getCurrentUser :: error :", error);

        }
        return null ;
    }

    async logout ()
    {
        try {
            await this.account.deleteSessions() ;
        } catch (error) {
            console.log("Appwrite :: service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;