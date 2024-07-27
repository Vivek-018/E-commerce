// import React from 'react';

// function Profile(){
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold">Profile</h1>
//       <p>User profile information...</p>
//     </div>
//   );
// }
// export default Profile;

import React, { useEffect, useState } from "react";
import { Client, Account } from "appwrite";
import conf from "../../conf/conf";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
    .setProject(conf.appwriteProjectId); // Your project ID

  const account = new Account(client);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        setError(error.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-semibold mb-4">Profile</h1>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg mb-2"><strong>Username:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
