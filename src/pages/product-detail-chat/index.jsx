import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import ImageCarousel from "./components/ImageCarousel";
import PriceChart from "./components/PriceChart";
import ChatInterface from "./components/ChatInterface";
import OfferModal from "./components/OfferModal";

const ProductDetailChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNegotiationTools, setShowNegotiationTools] = useState(false);
  const chatRef = useRef(null);

  // Mock product data
  const product = {
    id: "prod-12345",
    name: "Premium Organic Rice Seeds",
    description: `These premium organic rice seeds are perfect for sustainable farming practices. Grown without pesticides and carefully selected for optimal yield, these seeds are ideal for farmers looking to transition to organic farming methods.

The seeds have been tested for germination rates exceeding 95% and are resistant to common rice diseases. Each package contains enough seeds to plant approximately one acre of land.`,
    price: 2500,
    unit: "per 5kg bag",
    stock: 50,
    location: "Karnataka, India",
    seller: {
      id: "seller-789",
      name: "Rajesh Kumar",
      rating: 4.8,
      reviews: 124,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
      responseTime: "Usually responds within 2 hours"
    },
    category: "Seeds",
    subcategory: "Rice",
    certification: "Organic Certified",
    harvestDate: "2023-10-15",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e8c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.pexels.com/photos/4911711/pexels-photo-4911711.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pixabay.com/photo/2018/11/29/20/01/rice-3846631_1280.jpg",
      "https://images.unsplash.com/photo-1626594995085-b2b9bec1f394?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    specifications: [
      { name: "Variety", value: "Basmati" },
      { name: "Growing Season", value: "Kharif" },
      { name: "Germination Rate", value: "95%" },
      { name: "Yield Potential", value: "25-30 quintals/acre" },
      { name: "Duration", value: "120-130 days" }
    ],
    priceHistory: [
      { date: "Jan", price: 2300 },
      { date: "Feb", price: 2350 },
      { date: "Mar", price: 2400 },
      { date: "Apr", price: 2450 },
      { date: "May", price: 2500 },
      { date: "Jun", price: 2500 }
    ],
    tags: ["Organic", "Rice", "Seeds", "Basmati", "Premium"]
  };

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  // Scroll to chat when opened
  useEffect(() => {
    if (showChat && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showChat]);

  const handleContactSeller = () => {
    setShowChat(true);
  };

  const handleMakeOffer = () => {
    setShowOfferModal(true);
  };

  const toggleNegotiationTools = () => {
    setShowNegotiationTools(!showNegotiationTools);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Offline notification */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-warning text-white p-2 z-50 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon name="WifiOff" size={18} />
              <span>You're offline. Messages will be sent when you're back online.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/marketplace-dashboard" className="flex items-center text-primary">
              <Icon name="ArrowLeft" size={24} />
              <span className="ml-2 font-medium">Back to Marketplace</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-tertiary flex items-center gap-1">
              <Icon name="Share2" size={20} />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="btn-tertiary flex items-center gap-1">
              <Icon name="Heart" size={20} />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Product images and details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageCarousel images={product.images} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-h3 font-semibold text-text-primary mb-2">Specifications</h2>
              <div className="bg-surface rounded-lg p-4">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col">
                      <dt className="text-text-secondary text-sm">{spec.name}</dt>
                      <dd className="text-text-primary font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-h3 font-semibold text-text-primary mb-2">Price History</h2>
              <div className="bg-surface rounded-lg p-4 h-64">
                <PriceChart data={product.priceHistory} />
              </div>
            </motion.div>
          </div>

          {/* Right column - Product info and chat */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-border"
            >
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-h2 font-semibold text-text-primary">{product.name}</h1>
                <span className="bg-success bg-opacity-10 text-success px-3 py-1 rounded-full text-sm font-medium">
                  {product.certification}
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-baseline mb-2">
                  <span className="text-h3 font-bold text-text-primary">₹{product.price}</span>
                  <span className="ml-2 text-text-secondary">{product.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Icon name="MapPin" size={16} />
                  <span>{product.location}</span>
                  <span className="mx-2">•</span>
                  <span>{product.stock} available</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <h2 className="text-h4 font-semibold text-text-primary mb-2">Description</h2>
                <p className="text-text-secondary whitespace-pre-line">{product.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <h2 className="text-h4 font-semibold text-text-primary mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-surface px-3 py-1 rounded-full text-sm text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="border-t border-border pt-4 mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {product.seller.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                        <Icon name="CheckCircle" size={16} color="white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{product.seller.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="flex items-center text-warning">
                        <Icon name="Star" size={14} className="fill-current" />
                        <span className="ml-1">{product.seller.rating}</span>
                      </div>
                      <span className="text-text-tertiary">
                        ({product.seller.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      {product.seller.responseTime}
                    </p>
                  </div>
                </div>
              </motion.div>

              {!showChat ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary w-full py-3 text-base font-medium mb-3"
                    onClick={handleContactSeller}
                    animate={{ 
                      boxShadow: ["0px 0px 0px rgba(22, 163, 74, 0.3)", "0px 0px 15px rgba(22, 163, 74, 0.5)", "0px 0px 0px rgba(22, 163, 74, 0.3)"] 
                    }}
                    transition={{ 
                      boxShadow: { 
                        repeat: Infinity, 
                        duration: 2 
                      } 
                    }}
                  >
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Contact Seller
                  </motion.button>
                </motion.div>
              ) : null}
            </motion.div>

            {/* Chat Interface */}
            <AnimatePresence>
              {showChat && (
                <motion.div
                  ref={chatRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 bg-white rounded-lg shadow-sm border border-border overflow-hidden"
                >
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-text-primary">{product.seller.name}</h3>
                        <p className="text-xs text-text-secondary">
                          Discussing: {product.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleNegotiationTools}
                      className="text-primary flex items-center gap-1"
                    >
                      <span>Negotiation Tools</span>
                      <Icon
                        name={showNegotiationTools ? "ChevronUp" : "ChevronDown"}
                        size={18}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showNegotiationTools && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-surface p-4 border-b border-border"
                      >
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={handleMakeOffer}
                            className="btn btn-secondary flex items-center gap-1"
                          >
                            <Icon name="Tag" size={16} />
                            Make Offer
                          </button>
                          <button className="btn btn-secondary flex items-center gap-1">
                            <Icon name="Calendar" size={16} />
                            Schedule Pickup
                          </button>
                          <button className="btn btn-secondary flex items-center gap-1">
                            <Icon name="Truck" size={16} />
                            Request Delivery
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <ChatInterface
                    productId={product.id}
                    sellerId={product.seller.id}
                    isOnline={isOnline}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Offer Modal */}
      <AnimatePresence>
        {showOfferModal && (
          <OfferModal
            product={product}
            onClose={() => setShowOfferModal(false)}
            isOnline={isOnline}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailChat;