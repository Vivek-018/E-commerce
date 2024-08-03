import { Client, Account, Databases, Query } from "appwrite";
import conf from "../conf/conf.js";

const client = new Client();

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

const databases = new Databases(client);

const account = new Account(client);

export { client, databases, account, Query };

// cart service
export const saveCartToAppwrite = async (userId, cartItems) => {
  try {
    await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCartCollectionId,
      userId,
      {
        items: cartItems,
      }
    );
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

export const fetchCartFromAppwrite = async (userId) => {
  try {
    const document = await databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCartCollectionId,
      userId
    );
    return document.items;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
};

// export const saveOrderToAppwrite = async (order) => {
//   try {
//     await databases.createDocument(
//       conf.appwriteDatabaseId,
//       conf.appwriteOrderCollectionId,
//       order.userId,
//       order
//     );
//   } catch (error) {
//     console.error("Failed to save order:", error);
//   }
// };

// order services
export const saveOrderToAppwrite = async (orderData) => {
  try {
    const response = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteOrderCollectionId,
      "unique()",
      orderData
    );
    console.log("Order saved successfully!", response);
  } catch (error) {
    console.error("Failed to save order:", error);
  }
};

export const fetchOrdersFromAppwrite = async (userId) => {
  try {
    const response = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteOrderCollectionId,
      [`equal("userId", "${userId}")`]
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};
