import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import FilterPanel from "./components/FilterPanel";
import SearchBar from "./components/SearchBar";
import AddListingButton from "./components/AddListingButton";

const Marketplace = () => {
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
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" })
        .then((permissionStatus) => {
          setLocationPermission(permissionStatus.state);
          permissionStatus.onchange = () => {
            setLocationPermission(permissionStatus.state);
          };
        });
    }
  }, []);

  useEffect(() => {
    let result = [...products];

    // Apply filters
    if (filters.cropType !== "all") {
      result = result.filter(product => product.category === filters.cropType);
    }

    if (filters.location !== "all" && userLocation) {
      result = result.filter(product => product.location.includes(filters.location));
    }

    result = result.filter(product =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.seller.name.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [filters, searchQuery, products, userLocation]);

  const handleAddProduct = (newProduct, imagePreview) => {
    const product = {
      id: Date.now(),
      ...newProduct,
      image: imagePreview || "https://via.placeholder.com/500",
      postedDate: new Date().toISOString(),
      location: userLocation || "Location not specified",
      seller: {
        id: 999,
        name: "HARISH",
        rating: 5.0,
        verified: true,
        contact: "+91 98765 43210"
      }
    };

    setProducts(prev => [product, ...prev]);
    setFilteredProducts(prev => [product, ...prev]);
  };

  const handleProductClick = (product) => {
    navigate(`/product-detail-chat`, { state: { product } });
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
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                locationPermission={locationPermission}
                requestLocation={requestLocation}
              />
            </motion.div>
          </aside>

          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SearchBar onSearch={setSearchQuery} />
              </motion.div>
            </div>

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

            {/* Loading State */}
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
                {/* Results Header */}
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

                {/* Empty State */}
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

                {/* Product Grid */}
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

      {/* Add Listing Button */}
      <AddListingButton
        showForm={showAddForm}
        onToggle={() => setShowAddForm(!showAddForm)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

// Mock Products Data (Same as previous examples)
const mockProducts = []; // Replace with actual mock product objects as needed

export default Marketplace;