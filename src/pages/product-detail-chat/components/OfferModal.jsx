import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const OfferModal = ({ product, onClose, isOnline }) => {
  const [offerAmount, setOfferAmount] = useState(product.price * 0.9); // Start at 90% of price
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const minOffer = product.price * 0.7; // 70% of price
  const maxOffer = product.price * 1.1; // 110% of price

  const handleSliderChange = (e) => {
    setOfferAmount(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isOnline) {
      alert("You're offline. Please try again when you're connected.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Close modal after showing success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  // Calculate percentage of original price
  const percentage = Math.round((offerAmount / product.price) * 100);
  
  // Determine color based on percentage
  const getPercentageColor = () => {
    if (percentage < 85) return "text-danger";
    if (percentage < 95) return "text-warning";
    return "text-success";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
      >
        {showSuccess ? (
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="Check" size={32} color="white" />
            </motion.div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">Offer Sent!</h3>
            <p className="text-text-secondary mb-4">
              Your offer of ₹{offerAmount.toFixed(0)} has been sent to the seller. You'll be notified when they respond.
            </p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-h4 font-semibold text-text-primary">Make an Offer</h3>
              <button
                onClick={onClose}
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="Close modal"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-secondary">Original Price</span>
                  <span className="font-medium">₹{product.price}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary">Your Offer</span>
                  <motion.span
                    key={offerAmount}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="font-bold text-h4 text-primary"
                  >
                    ₹{offerAmount.toFixed(0)}
                  </motion.span>
                </div>
                
                <div className="mb-2">
                  <motion.div
                    className={`text-right font-medium ${getPercentageColor()}`}
                    key={percentage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {percentage}% of original price
                  </motion.div>
                </div>
                
                <div className="relative pt-1">
                  <input
                    type="range"
                    min={minOffer}
                    max={maxOffer}
                    step={10}
                    value={offerAmount}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-text-tertiary mt-2">
                    <span>₹{minOffer.toFixed(0)}</span>
                    <span>₹{product.price}</span>
                    <span>₹{maxOffer.toFixed(0)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="note" className="block text-text-secondary mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Explain why you're making this offer..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary px-4 py-2"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-2 flex items-center gap-2"
                  disabled={isSubmitting || !isOnline}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader" size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} />
                      Send Offer
                    </>
                  )}
                </button>
              </div>
              
              {!isOnline && (
                <p className="text-xs text-warning mt-4 flex items-center justify-center">
                  <Icon name="WifiOff" size={14} className="mr-1" />
                  You're offline. Please connect to the internet to send an offer.
                </p>
              )}
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OfferModal;