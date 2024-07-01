import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query } from "appwrite"


export class Service {
    client = new Client();
    databases
    storage

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({ title, slug, content, featured_Image, status, user_Id }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_Image,
                    status,
                    user_Id,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error :: ", error)
        }
    }

    async updatePost(slug, { title, content, featured_Image, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_Image,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error :: ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )

            return true
        } catch (error) {

            console.log("Appwrite Service :: deletePost :: error :: ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error :: ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
                // [Query.equal("status", "active")]
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error :: ", error)
            return false
        }
    }

    async uploadFile(file) {
        try {
            // console.log(file);
            return await this.storage.createFile(
                conf.appWriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            // console.log("Appwrite Service :: uploadFile :: error :: ", error)
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appWriteStorageId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error :: ", error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appWriteStorageId,
            fileId,
        )
    }

}

const service = new Service()

export default service