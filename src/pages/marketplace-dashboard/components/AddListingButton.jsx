import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AddListingButton = ({ showForm, onToggle, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "kg",
    quantity: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!imagePreview) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors(prev => ({ ...prev, image: "Please upload an image file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "File size should be less than 5MB" }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setErrors(prev => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProduct = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    onAddProduct(newProduct, imagePreview);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      unit: "kg",
      quantity: "",
      description: "",
    });
    setImagePreview(null);
    setErrors({});
    onToggle();
  };

  return (
    <>
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

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />

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
                  <button onClick={resetForm} className="p-2 rounded-full hover:bg-surface">
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4 max-h-[80vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Product Name*</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input w-full ${errors.name ? "border-danger" : ""}`}
                        placeholder="Organic Basmati Rice"
                      />
                      {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Category Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Category*</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`input w-full ${errors.category ? "border-danger" : ""}`}
                      >
                        <option value="">Select category</option>
                        <option value="grains">Grains</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="pulses">Pulses</option>
                        <option value="spices">Spices</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.category && <p className="text-danger text-xs mt-1">{errors.category}</p>}
                    </div>

                    {/* Price Field */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Price (₹)*</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`input w-full ${errors.price ? "border-danger" : ""}`}
                        placeholder="1200"
                        min="1"
                      />
                      {errors.price && <p className="text-danger text-xs mt-1">{errors.price}</p>}
                    </div>

                    {/* Quantity & Unit Fields */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Quantity*</label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className={`input w-full ${errors.quantity ? "border-danger" : ""}`}
                          placeholder="50"
                          min="1"
                        />
                        {errors.quantity && <p className="text-danger text-xs mt-1">{errors.quantity}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Unit*</label>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
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

                    {/* Description Field */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Description*</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`input w-full ${errors.description ? "border-danger" : ""}`}
                        rows="3"
                        placeholder="Describe your product..."
                      />
                      {errors.description && <p className="text-danger text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Product Image*</label>
                      <div className={`border-2 border-dashed rounded-lg p-4 ${errors.image ? "border-danger" : "border-border"
                        }`}>
                        {imagePreview ? (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="h-48 mx-auto object-contain" />
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
                      {errors.image && <p className="text-danger text-xs mt-1">{errors.image}</p>}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={resetForm}
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