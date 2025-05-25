import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";

const LoginModal = ({ isOpen, onClose, activeTab, setActiveTab, onLogin, onSignup }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "farmer",
  });

  useEffect(() => {
    const name = localStorage.getItem("signupName");
    if (name) {
      setSignupForm((prev) => ({ ...prev, name }));
    }
  }, []);
  
  
  // Error states
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  
  // Loading states
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  
  // Handle login form change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (loginError) setLoginError("");
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle signup form change
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (signupError) setSignupError("");
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate login form
  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginForm.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!loginForm.password) {
      errors.password = "Password is required";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Validate signup form
  const validateSignupForm = () => {
    const errors = {};
    
    if (!signupForm.name) {
      errors.name = "Name is required";
    }
    
    if (!signupForm.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!signupForm.password) {
      errors.password = "Password is required";
    } else if (signupForm.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    if (!signupForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoggingIn(true);
    
    try {
      // In a real app, this would call Firebase authentication
      const result = onLogin(loginForm);
      
      if (!result.success) {
        setLoginError(result.error || "Invalid email or password");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // Handle signup submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    setIsSigningUp(true);
    
    try {
      // In a real app, this would call Firebase authentication
      const result = onSignup(signupForm);
      
      if (!result.success) {
        setSignupError(result.error || "Failed to create account");
      }
    } catch (error) {
      setSignupError("An error occurred during signup. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsSigningUp(false);
    }
  };
  
  // Modal animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="relative">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </button>
              
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    activeTab === "login" ?"text-primary border-b-2 border-primary" :"text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    activeTab === "signup" ?"text-primary border-b-2 border-primary" :"text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            {/* Modal body */}
            <div className="p-6">
              {activeTab === "login" ? (
                <LoginForm
                  form={loginForm}
                  handleChange={handleLoginChange}
                  handleSubmit={handleLoginSubmit}
                  isLoggingIn={isLoggingIn}
                  error={loginError}
                  fieldErrors={fieldErrors}
                />
              ) : (
                <SignupForm
                  form={signupForm}
                  handleChange={handleSignupChange}
                  handleSubmit={handleSignupSubmit}
                  isSigningUp={isSigningUp}
                  error={signupError}
                  fieldErrors={fieldErrors}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Login Form Component
const LoginForm = ({ form, handleChange, handleSubmit, isLoggingIn, error, fieldErrors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-h3 font-bold text-text-primary mb-6">Welcome Back</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-danger bg-opacity-10 border border-danger border-opacity-20 rounded-md text-danger text-sm">
          <div className="flex items-start">
            <Icon name="AlertCircle" size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`input w-full ${fieldErrors.email ? "border-danger focus:ring-danger" : ""}`}
            placeholder="your@email.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-danger">{fieldErrors.email}</p>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
              Password
            </label>
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`input w-full ${fieldErrors.password ? "border-danger focus:ring-danger" : ""}`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-danger">{fieldErrors.password}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-text-secondary">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full py-3"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <span className="flex items-center justify-center">
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-text-tertiary">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="btn py-2 border border-border bg-white text-text-primary hover:bg-surface"
          >
            <Icon name="Github" size={18} className="mr-2" />
            Google
          </button>
          <button
            type="button"
            className="btn py-2 border border-border bg-white text-text-primary hover:bg-surface"
          >
            <Icon name="Facebook" size={18} className="mr-2" />
            Facebook
          </button>
        </div>
      </div>
    </form>
  );
};

// Signup Form Component
const SignupForm = ({ form, handleChange, handleSubmit, isSigningUp, error, fieldErrors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-h3 font-bold text-text-primary mb-6">Create an Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-danger bg-opacity-10 border border-danger border-opacity-20 rounded-md text-danger text-sm">
          <div className="flex items-start">
            <Icon name="AlertCircle" size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`input w-full ${fieldErrors.name ? "border-danger focus:ring-danger" : ""}`}
            placeholder="John Doe"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-danger">{fieldErrors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-text-secondary mb-1">
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`input w-full ${fieldErrors.email ? "border-danger focus:ring-danger" : ""}`}
            placeholder="your@email.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-danger">{fieldErrors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-text-secondary mb-1">
            Password
          </label>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`input w-full ${fieldErrors.password ? "border-danger focus:ring-danger" : ""}`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-danger">{fieldErrors.password}</p>
          )}
          {!fieldErrors.password && (
            <p className="mt-1 text-xs text-text-tertiary">
              Must be at least 8 characters
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`input w-full ${fieldErrors.confirmPassword ? "border-danger focus:ring-danger" : ""}`}
            placeholder="••••••••"
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-danger">{fieldErrors.confirmPassword}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
              form.userType === "farmer" ?"border-primary bg-primary bg-opacity-5" :"border-border hover:border-primary hover:bg-primary hover:bg-opacity-5"
            }`}>
              <input
                type="radio"
                name="userType"
                value="farmer"
                checked={form.userType === "farmer"}
                onChange={handleChange}
                className="sr-only"
              />
              <Icon name="Wheat" size={20} className={form.userType === "farmer" ? "text-primary" : "text-text-tertiary"} />
              <span className={`ml-2 ${form.userType === "farmer" ? "text-primary font-medium" : "text-text-secondary"}`}>
                Farmer
              </span>
            </label>
            
            <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
              form.userType === "buyer" ?"border-primary bg-primary bg-opacity-5" :"border-border hover:border-primary hover:bg-primary hover:bg-opacity-5"
            }`}>
              <input
                type="radio"
                name="userType"
                value="buyer"
                checked={form.userType === "buyer"}
                onChange={handleChange}
                className="sr-only"
              />
              <Icon name="ShoppingCart" size={20} className={form.userType === "buyer" ? "text-primary" : "text-text-tertiary"} />
              <span className={`ml-2 ${form.userType === "buyer" ? "text-primary font-medium" : "text-text-secondary"}`}>
                Buyer
              </span>
            </label>
          </div>
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="h-4 w-4 mt-1 text-primary border-border rounded focus:ring-primary"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full py-3"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <span className="flex items-center justify-center">
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginModal;














// import React, { useState, useEffect } from "react";
//  import { motion, AnimatePresence } from "framer-motion";
//  import Icon from "../../../components/AppIcon";
// const LoginModal = ({ isOpen, onClose, activeTab, setActiveTab, onLogin, onSignup }) => {
//   // Initialize form state from localStorage
//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [signupForm, setSignupForm] = useState({
//     name: localStorage.getItem("signupName") || "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: localStorage.getItem("signupUserType") || "farmer",
//   });

//   // Error states
//   const [loginError, setLoginError] = useState("");
//   const [signupError, setSignupError] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({});

//   // Loading states
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [isSigningUp, setIsSigningUp] = useState(false);

//   // Close modal on escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") onClose();
//     };

//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   // Handle login form change
//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm((prev) => ({ ...prev, [name]: value }));

//     if (loginError) setLoginError("");
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // Handle signup form change with localStorage
//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupForm((prev) => ({ ...prev, [name]: value }));

//     // Save to localStorage for specific fields
//     if (name === "name") {
//       localStorage.setItem("signupName", value);
//     }
//     if (name === "userType") {
//       localStorage.setItem("signupUserType", value);
//     }

//     if (signupError) setSignupError("");
//     if (fieldErrors[name]) {
//       setFieldErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // Validate forms (same as before)
//   const validateLoginForm = () => {/* ... */ };
//   const validateSignupForm = () => {/* ... */ };

//   // Handle login submission (same as before)
//   const handleLoginSubmit = async (e) => {/* ... */ };

//   // Handle signup submission with localStorage cleanup
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateSignupForm()) return;

//     setIsSigningUp(true);

//     try {
//       const result = await onSignup(signupForm);

//       if (result.success) {
//         // Clear stored values after successful signup
//         localStorage.removeItem("signupName");
//         localStorage.removeItem("signupUserType");
//       } else {
//         setSignupError(result.error || "Failed to create account");
//       }
//     } catch (error) {
//       setSignupError("An error occurred during signup. Please try again.");
//       console.error("Signup error:", error);
//     } finally {
//       setIsSigningUp(false);
//     }
//   };

//   // Rest of the component remains the same
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
//           variants={backdropVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           onClick={onClose}
//         >
//           {/* ... rest of the modal JSX ... */}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // Signup Form Component with persisted values
// const SignupForm = ({ form, handleChange, handleSubmit, isSigningUp, error, fieldErrors }) => {
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2 className="text-h3 font-bold text-text-primary mb-6">Create an Account</h2>

//       {/* Error message */}
//       {error && (
//         <div className="mb-4 p-3 bg-danger bg-opacity-10 border border-danger border-opacity-20 rounded-md text-danger text-sm">
//           <div className="flex items-start">
//             <Icon name="AlertCircle" size={16} className="mr-2 mt-0.5 flex-shrink-0" />
//             <span>{error}</span>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {/* Name input with persisted value */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className={`input w-full ${fieldErrors.name ? "border-danger focus:ring-danger" : ""}`}
//             placeholder="John Doe"
//           />
//           {fieldErrors.name && (
//             <p className="mt-1 text-sm text-danger">{fieldErrors.name}</p>
//           )}
//         </div>

//         {/* Other fields remain the same */}

//         {/* User type selection with persisted value */}
//         <div>
//           <label className="block text-sm font-medium text-text-secondary mb-1">
//             I am a
//           </label>
//           <div className="grid grid-cols-2 gap-3">
//             <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${form.userType === "farmer" ? "border-primary bg-primary bg-opacity-5" : "border-border hover:border-primary hover:bg-primary hover:bg-opacity-5"
//               }`}>
//               <input
//                 type="radio"
//                 name="userType"
//                 value="farmer"
//                 checked={form.userType === "farmer"}
//                 onChange={handleChange}
//                 className="sr-only"
//               />
//               <Icon name="Wheat" size={20} className={form.userType === "farmer" ? "text-primary" : "text-text-tertiary"} />
//               <span className={`ml-2 ${form.userType === "farmer" ? "text-primary font-medium" : "text-text-secondary"}`}>
//                 Farmer
//               </span>
//             </label>

//             <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${form.userType === "buyer" ? "border-primary bg-primary bg-opacity-5" : "border-border hover:border-primary hover:bg-primary hover:bg-opacity-5"
//               }`}>
//               <input
//                 type="radio"
//                 name="userType"
//                 value="buyer"
//                 checked={form.userType === "buyer"}
//                 onChange={handleChange}
//                 className="sr-only"
//               />
//               <Icon name="ShoppingCart" size={20} className={form.userType === "buyer" ? "text-primary" : "text-text-tertiary"} />
//               <span className={`ml-2 ${form.userType === "buyer" ? "text-primary font-medium" : "text-text-secondary"}`}>
//                 Buyer
//               </span>
//             </label>
//           </div>
//         </div>

//         {/* Rest of the signup form */}
//       </div>
//     </form>
//   );
// };

// export default LoginModal;