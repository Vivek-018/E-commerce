import React, { useState, useEffect } from "react";
import { Client, Databases, ID, Permission, Role, Account } from "appwrite";
import { toast } from "react-toastify";
import conf from "../../conf/conf";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
    .setProject(conf.appwriteProjectId); // Your project ID

  const account = new Account(client);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const currentUser = await account.get();
        if (currentUser.$id === conf.adminUserId) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast.error("You do not have permission to access this page.");
        }
      } catch (error) {
        toast.error("Failed to verify user.");
      }
    };

    checkAdmin();
  }, []);

  const databases = new Databases(client);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("You do not have permission to add products.");
      return;
    }
    try {
      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteProductCollectionId,
        ID.unique(),
        {
          name,
          price,
          description,
          image,
        },
        [
          Permission.read(Role.any()), // Allow anyone to read
          Permission.update(Role.user(conf.adminUserId)), // Allow admin to update
          Permission.delete(Role.user(conf.adminUserId)), // Allow admin to delete
        ]
      );
      toast.success("Product added successfully");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
