const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteProductCollectionId: String(
    import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID
  ),
  adminUserId: String(import.meta.env.VITE_APPWRITE_ADMIN_USER_ID),
  appwriteCartCollectionId: String(
    import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID
  ),
  appwriteOrderCollectionId: String(
    import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID
  ),
};
export default conf;
