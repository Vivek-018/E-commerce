// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // Assuming you have a ProductCard component. If not, I'll provide a simple one below.
// import { ProductCard } from '../components';

// const Home = () => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   useEffect(() => {
//     // Fetch featured products
//     // This is a placeholder. Replace with your actual API call.
//     const fetchFeaturedProducts = async () => {
//       const response = await fetch('https://fakestoreapi.com/products?limit=3');
//       const data = await response.json();
//       setFeaturedProducts(data);
//       // setFeaturedProducts([
//       //   { id: 1, name: 'Featured Product 1', price: 99.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 2, name: 'Featured Product 2', price: 149.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 3, name: 'Featured Product 3', price: 199.99, imageUrl: 'https://via.placeholder.com/300' },
//       // ]);
//     };

//     // Fetch all products
//     // This is a placeholder. Replace with your actual API call.
//     const fetchAllProducts = async () => {
//       const response = await fetch('https://fakestoreapi.com/products');
//       const data = await response.json();
//       setAllProducts(data);
//       // setAllProducts([
//       //   { id: 1, name: 'Product 1', price: 29.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 2, name: 'Product 2', price: 39.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 3, name: 'Product 3', price: 49.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 4, name: 'Product 4', price: 59.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 5, name: 'Product 5', price: 69.99, imageUrl: 'https://via.placeholder.com/300' },
//       //   { id: 6, name: 'Product 6', price: 79.99, imageUrl: 'https://via.placeholder.com/300' },
//       // ]);
//     };

//     fetchFeaturedProducts();
//     fetchAllProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hero Section */}
//       <section className="bg-gray-100 rounded-lg p-8 mb-12">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
//         <p className="text-xl mb-6">Discover amazing products at great prices!</p>
//         <Link to="/products" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
//           Shop Now
//         </Link>
//       </section>

//       {/* Featured Products */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredProducts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>

//       {/* All Products */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-6">All Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {allProducts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// Update home component to use custome hook
import React from "react";
import { Link } from "react-router-dom";
import useFetchProducts from "../Hooks/fetchProductshook";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products = [],  } = useFetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gray-100 rounded-lg p-8 mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-xl mb-6">
          Discover amazing products at great prices!
        </p>
        <Link
          to="/products"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.$id} product={product} />
            ))
          ) : (
            <p>No featured products available.</p>
          )}
        </div>
      </section>

      {/* All Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.$id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
