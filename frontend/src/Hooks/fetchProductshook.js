import { useState, useEffect } from "react";
import { Client, Databases } from "appwrite";
import conf from "../conf/conf";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    const databases = new Databases(client);

    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteProductCollectionId
        );
        setProducts(response.documents);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError(error.message || "An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
};

export default useFetchProducts;
