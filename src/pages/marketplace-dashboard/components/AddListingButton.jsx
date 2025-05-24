import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AddListingButton = ({ showForm, onToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "kg",
    quantity: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the form data to an API
    console.log("Form submitted:", formData);
    
    // Reset form
    setFormData({
      name: "",
      category: "",
      price: "",
      unit: "kg",
      quantity: "",
      description: "",
    });
    setImagePreview(null);
    onToggle();
  };

  return (
    <>
      {/* Floating action button */}
      <motion.button
        className="fixed bottom-20 right-6 z-20 bg-primary text-white rounded-full shadow-lg p-4 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: { 
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        }}
      >
        <Icon name={showForm ? "X" : "Plus"} size={24} />
      </motion.button>

      {/* Pulsing effect behind the button */}
      <AnimatePresence>
        {!showForm && (
          <motion.div
            className="fixed bottom-20 right-6 z-10 bg-primary rounded-full"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
              transition: { 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="w-12 h-12"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add listing form */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />

            {/* Form panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-40 overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-4 border-b border-border">
                <div className="flex justify-between items-center">
                  <h2 className="text-h4 font-medium">Add New Listing</h2>
                  <button
                    onClick={onToggle}
                    className="p-2 rounded-full hover:bg-surface transition-colors"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4 max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                        Product Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input w-full"
                        placeholder="e.g. Organic Basmati Rice"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">
                        Category*
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="input w-full"
                      >
                        <option value="">Select a category</option>
                        <option value="grains">Grains</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="pulses">Pulses</option>
                        <option value="spices">Spices</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-text-secondary mb-1">
                        Price (₹)*
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        className="input w-full"
                        placeholder="e.g. 1200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-text-secondary mb-1">
                          Quantity*
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          min="1"
                          className="input w-full"
                          placeholder="e.g. 50"
                        />
                      </div>

                      <div>
                        <label htmlFor="unit" className="block text-sm font-medium text-text-secondary mb-1">
                          Unit*
                        </label>
                        <select
                          id="unit"
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          required
                          className="input w-full"
                        >
                          <option value="kg">Kilogram (kg)</option>
                          <option value="quintal">Quintal</option>
                          <option value="ton">Ton</option>
                          <option value="piece">Piece</option>
                          <option value="dozen">Dozen</option>
                          <option value="liter">Liter</option>
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="input w-full"
                        placeholder="Describe your product, including quality, origin, etc."
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Product Image
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-48 mx-auto object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => setImagePreview(null)}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                            >
                              <Icon name="X" size={16} />
                            </button>
                          </div>
                        ) : (
                          <div
                            className="h-48 flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => document.getElementById("image-upload").click()}
                          >
                            <Icon name="Image" size={40} className="text-text-tertiary mb-2" />
                            <p className="text-text-secondary">Click to upload an image</p>
                            <p className="text-text-tertiary text-sm">PNG, JPG, WEBP up to 5MB</p>
                          </div>
                        )}
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={onToggle}
                      className="btn btn-secondary py-2 px-6"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary py-2 px-6"
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      Add Listing
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddListingButton;