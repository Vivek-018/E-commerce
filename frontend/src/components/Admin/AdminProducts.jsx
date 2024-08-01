import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import conf from "../../conf/conf";

const AdminProducts = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);

  if (!user || !user.isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

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
      toast.error(error.message || "Failed to fetch products");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        productId
      );
      toast.success("Product deleted successfully");
      setProducts(products.filter((product) => product.$id !== productId));
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.$id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button
              onClick={() => deleteProduct(product.$id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
