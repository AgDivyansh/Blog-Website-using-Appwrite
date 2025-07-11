import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatanaseId,
                conf.qppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatanaseId,
                conf.qppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite :: services :: updatePost :: error", error);

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatanaseId,
                conf.qppwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: services :: deletePost :: error", error);

            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatanaseId,
                conf.qppwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Apprite :: services :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatanaseId,
                conf.qppwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite :: services :: getPosts :: error", error);
            return false;
        }
    }


    // file upload services 

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: services :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: services :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {

        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }
}

const service = new Service()

export default service;
