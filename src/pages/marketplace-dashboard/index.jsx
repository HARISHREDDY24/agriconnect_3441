import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";

import ProductGrid from "./components/ProductGrid";
import FilterPanel from "./components/FilterPanel";
import SearchBar from "./components/SearchBar";
import AddListingButton from "./components/AddListingButton";
import Header from "./components/Header";

const MarketplaceDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    cropType: "all",
    location: "all",
    priceRange: [0, 10000],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("prompt");

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    // Check for geolocation permission
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          setLocationPermission(permissionStatus.state);
          permissionStatus.onchange = () => {
            setLocationPermission(permissionStatus.state);
          };
        });
    }
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...products];

    // Apply crop type filter
    if (filters.cropType !== "all") {
      result = result.filter((product) => product.category === filters.cropType);
    }

    // Apply location filter
    if (filters.location !== "all" && userLocation) {
      // This would be a more complex calculation in a real app
      // For now, we'll just filter by the location name
      result = result.filter((product) =>
        product.location.includes(filters.location)
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.seller.name.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [filters, searchQuery, products, userLocation]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddListing = () => {
    setShowAddForm(!showAddForm);
  };

  const handleProductClick = (productId) => {
    // In a real app, this would navigate to the product detail page
    navigate(`/product-detail-chat?id=${productId}`);
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationPermission("granted");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationPermission("denied");
        }
      );
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Simulate API fetch retry
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with filters */}
          <aside className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                locationPermission={locationPermission}
                requestLocation={requestLocation}
              />
            </motion.div>
          </aside>

          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SearchBar onSearch={handleSearch} />
              </motion.div>
            </div>

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center">
                  <Icon name="AlertCircle" className="text-danger mr-2" size={20} />
                  <p className="text-danger">{error}</p>
                </div>
                <button
                  onClick={handleRetry}
                  className="mt-2 btn btn-danger py-2 px-4 text-sm"
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Retry
                </button>
              </motion.div>
            )}

            {/* Loading state */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Icon name="Loader" size={40} className="text-primary mb-4" />
                </motion.div>
                <p className="text-text-secondary">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Results summary */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-h4 text-text-primary">
                    {filteredProducts.length} Products Available
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary text-sm">Sort by:</span>
                    <select className="input py-1 px-2 h-auto text-sm">
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest First</option>
                      <option>Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* Empty state */}
                {filteredProducts.length === 0 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-surface border border-border rounded-lg p-8 text-center"
                  >
                    <Icon name="Search" size={48} className="text-text-tertiary mx-auto mb-4" />
                    <h3 className="text-h4 text-text-primary mb-2">No products found</h3>
                    <p className="text-text-secondary mb-4">
                      Try adjusting your filters or search query
                    </p>
                    <button
                      onClick={() => {
                        setFilters({
                          cropType: "all",
                          location: "all",
                          priceRange: [0, 10000],
                        });
                        setSearchQuery("");
                      }}
                      className="btn btn-primary py-2 px-4"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}

                {/* Product grid */}
                {filteredProducts.length > 0 && (
                  <ProductGrid
                    products={filteredProducts}
                    onProductClick={handleProductClick}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Add listing button */}
      <AddListingButton
        showForm={showAddForm}
        onToggle={handleAddListing}
      />

      {/* Navigation links */}
      <div className="fixed bottom-4 left-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow-lg rounded-full p-2 flex gap-2"
        >
          <Link
            to="/landing-page-with-login-signup"
            className="p-2 rounded-full hover:bg-surface transition-colors"
            title="Home"
          >
            <Icon name="Home" size={20} />
          </Link>
          <Link
            to="/crop-doctor-ai-analysis"
            className="p-2 rounded-full hover:bg-surface transition-colors"
            title="Crop Doctor"
          >
            <Icon name="Microscope" size={20} />
          </Link>
          <div className="p-2 rounded-full bg-primary text-white">
            <Icon name="ShoppingBag" size={20} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Organic Rice",
    description: "Premium quality organic rice grown without pesticides",
    price: 1200,
    unit: "quintal",
    quantity: 5,
    category: "grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    location: "Punjab, India",
    seller: {
      id: 101,
      name: "Rajinder Singh",
      rating: 4.8,
      verified: true,
    },
    postedDate: "2023-06-15",
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    description: "Vine-ripened tomatoes, perfect for salads and cooking",
    price: 40,
    unit: "kg",
    quantity: 100,
    category: "vegetables",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Maharashtra, India",
    seller: {
      id: 102,
      name: "Priya Patil",
      rating: 4.6,
      verified: true,
    },
    postedDate: "2023-06-18",
  },
  {
    id: 3,
    name: "Alphonso Mangoes",
    description: "Sweet and aromatic Alphonso mangoes from Ratnagiri",
    price: 800,
    unit: "dozen",
    quantity: 20,
    category: "fruits",
    image: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Maharashtra, India",
    seller: {
      id: 103,
      name: "Anand Desai",
      rating: 4.9,
      verified: true,
    },
    postedDate: "2023-06-10",
  },
  {
    id: 4,
    name: "Organic Wheat",
    description: "Pesticide-free wheat grown using traditional methods",
    price: 3200,
    unit: "quintal",
    quantity: 10,
    category: "grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    location: "Madhya Pradesh, India",
    seller: {
      id: 104,
      name: "Vikram Sharma",
      rating: 4.7,
      verified: true,
    },
    postedDate: "2023-06-12",
  },
  {
    id: 5,
    name: "Fresh Potatoes",
    description: "Farm-fresh potatoes, perfect for all cooking needs",
    price: 25,
    unit: "kg",
    quantity: 200,
    category: "vegetables",
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Uttar Pradesh, India",
    seller: {
      id: 105,
      name: "Ramesh Yadav",
      rating: 4.5,
      verified: false,
    },
    postedDate: "2023-06-17",
  },
  {
    id: 6,
    name: "Basmati Rice",
    description: "Premium long-grain aromatic basmati rice",
    price: 150,
    unit: "kg",
    quantity: 50,
    category: "grains",
    image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Haryana, India",
    seller: {
      id: 106,
      name: "Gurpreet Kaur",
      rating: 4.8,
      verified: true,
    },
    postedDate: "2023-06-14",
  },
  {
    id: 7,
    name: "Fresh Apples",
    description: "Crisp and juicy apples from the hills of Himachal",
    price: 180,
    unit: "kg",
    quantity: 80,
    category: "fruits",
    image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Himachal Pradesh, India",
    seller: {
      id: 107,
      name: "Sanjay Thakur",
      rating: 4.7,
      verified: true,
    },
    postedDate: "2023-06-16",
  },
  {
    id: 8,
    name: "Organic Turmeric",
    description: "High-quality organic turmeric with rich color and aroma",
    price: 250,
    unit: "kg",
    quantity: 30,
    category: "spices",
    image: "https://images.pexels.com/photos/4198714/pexels-photo-4198714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Tamil Nadu, India",
    seller: {
      id: 108,
      name: "Lakshmi Raman",
      rating: 4.9,
      verified: true,
    },
    postedDate: "2023-06-11",
  },
  {
    id: 9,
    name: "Fresh Onions",
    description: "Premium quality red onions with excellent shelf life",
    price: 35,
    unit: "kg",
    quantity: 150,
    category: "vegetables",
    image: "https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Maharashtra, India",
    seller: {
      id: 109,
      name: "Suresh Patil",
      rating: 4.6,
      verified: false,
    },
    postedDate: "2023-06-19",
  },
  {
    id: 10,
    name: "Organic Honey",
    description: "Pure, unprocessed honey from wildflower fields",
    price: 450,
    unit: "liter",
    quantity: 15,
    category: "other",
    image: "https://images.pexels.com/photos/9397323/pexels-photo-9397323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Uttarakhand, India",
    seller: {
      id: 110,
      name: "Deepak Joshi",
      rating: 4.8,
      verified: true,
    },
    postedDate: "2023-06-13",
  },
  {
    id: 11,
    name: "Fresh Coconuts",
    description: "Sweet tender coconuts, perfect for refreshing drinks",
    price: 60,
    unit: "piece",
    quantity: 100,
    category: "fruits",
    image: "https://images.pexels.com/photos/1030970/pexels-photo-1030970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    location: "Kerala, India",
    seller: {
      id: 111,
      name: "Thomas Kurien",
      rating: 4.7,
      verified: true,
    },
    postedDate: "2023-06-15",
  },
  {
    id: 12,
    name: "Organic Lentils",
    description: "Nutritious organic lentils, high in protein and fiber",
    price: 120,
    unit: "kg",
    quantity: 40,
    category: "pulses",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    location: "Rajasthan, India",
    seller: {
      id: 112,
      name: "Mahesh Choudhary",
      rating: 4.5,
      verified: true,
    },
    postedDate: "2023-06-17",
  },
];

export default MarketplaceDashboard;