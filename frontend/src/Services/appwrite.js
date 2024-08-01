import { Client, Account, Databases, Query } from "appwrite";
import conf from "../conf/conf.js";

const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

const databases = new Databases(client);

const account = new Account(client);

export { client, databases, account, Query };
