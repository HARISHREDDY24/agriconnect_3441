import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../components/AppIcon";
import NavigationBar from "./components/NavigationBar";
import AnimatedHero from "./components/AnimatedHero";
import LoginModal from "./components/LoginModal";
import BackgroundAnimations from "./components/BackgroundAnimations";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    console.log("Login attempt with:", credentials);
    
    if (credentials.email === "farmer@example.com" && credentials.password === "Password123") {
      setUser({
        name: "John Farmer",
        email: credentials.email,
        userType: "farmer"
      });
      setIsAuthenticated(true);
      setShowModal(false);
      
      setTimeout(() => {
        navigate("/marketplace-dashboard");
      }, 1000);
      
      return { success: true };
    }
    
    return { 
      success: false, 
      error: "Invalid email or password. Try farmer@example.com / Password123" 
    };
  };

  const handleSignup = (userData) => {
    console.log("Signup attempt with:", userData);
    
    setUser({
      name: userData.name,
      email: userData.email,
      userType: userData.userType
    });
    setIsAuthenticated(true);
    setShowModal(false);
    
    setTimeout(() => {
      navigate("/marketplace-dashboard");
    }, 1000);
    
    return { success: true };
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <BackgroundAnimations />
      
      <NavigationBar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogin={() => {
          setActiveTab("login");
          setShowModal(true);
        }} 
        onSignup={() => {
          setActiveTab("signup");
          setShowModal(true);
        }}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 pt-16 pb-24 relative z-10">
        <AnimatedHero 
          onLogin={() => {
            setActiveTab("login");
            setShowModal(true);
          }} 
          onSignup={() => {
            setActiveTab("signup");
            setShowModal(true);
          }}
        />
        
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-h2 font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Empowering Farmers with Technology
            </motion.h2>
            <motion.p 
              className="text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              AgriConnect brings innovative solutions to modern farming challenges
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </section>
        
        <section id="how-it-works" className="py-16">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-h2 font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              How AgriConnect Works
            </motion.h2>
            <motion.p 
              className="text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Simple steps to revolutionize your farming experience
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </section>
        
        <section id="testimonials" className="py-16">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-h2 font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What Farmers Say
            </motion.h2>
            <motion.p 
              className="text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Success stories from our growing community
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </section>
        
        <section className="py-16">
          <motion.div 
            className="bg-primary rounded-xl p-8 md:p-12 text-white text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h3 font-bold mb-4">Ready to Transform Your Farming?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgriConnect to improve yields, 
              diagnose crop diseases, and connect with buyers directly.
            </p>
            <button 
              onClick={() => {
                setActiveTab("signup");
                setShowModal(true);
              }}
              className="btn px-8 py-3 bg-white text-primary hover:bg-opacity-90 font-medium rounded-md"
            >
              Get Started Now
            </button>
          </motion.div>
        </section>
      </main>
      
      <footer className="bg-surface py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AgriConnect</h3>
              <p className="text-text-secondary mb-4">
                Empowering farmers with AI technology and marketplace solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-text-secondary hover:text-primary">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-primary">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-primary">
                  <Icon name="Instagram" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-primary">Crop Doctor AI</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Marketplace</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Weather Forecasts</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Farming Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-text-secondary hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-text-secondary hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-text-secondary">
            <p>&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <AnimatePresence>
        {showModal && (
          <LoginModal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-primary bg-opacity-10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        <Icon name={feature.icon} size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-text-secondary">{feature.description}</p>
    </motion.div>
  );
};

const StepItem = ({ step, index }) => {
  return (
    <motion.div 
      className="flex items-start mb-8 last:mb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
        {index + 1}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-text-secondary">{step.description}</p>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-md border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.target.src = "/assets/images/no_image.png";
          }}
        />
        <div className="ml-3">
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-text-tertiary text-sm">{testimonial.location}</p>
        </div>
      </div>
      <div className="mb-3 flex">
        {[...Array(5)].map((_, i) => (
          <Icon 
            key={i} 
            name="Star" 
            size={16} 
            className={i < testimonial.rating ? "text-warning" : "text-text-tertiary"} 
          />
        ))}
      </div>
      <p className="text-text-secondary">{testimonial.text}</p>
    </motion.div>
  );
};

const features = [
  {
    icon: "Leaf",
    title: "AI Crop Disease Detection",
    description: "Upload photos of your crops and get instant AI-powered diagnosis of diseases and treatment recommendations."
  },
  {
    icon: "ShoppingBag",
    title: "Farmer Marketplace",
    description: "Connect directly with buyers, cutting out middlemen and increasing your profits while selling fresh produce."
  },
  {
    icon: "CloudSun",
    title: "Weather Forecasts",
    description: "Access hyperlocal weather predictions to plan your farming activities with confidence."
  },
  {
    icon: "BookOpen",
    title: "Knowledge Hub",
    description: "Learn modern farming techniques, crop rotation strategies, and sustainable practices from experts."
  },
  {
    icon: "BarChart2",
    title: "Yield Analytics",
    description: "Track your farm\'s performance over time with detailed analytics and actionable insights."
  },
  {
    icon: "Users",
    title: "Farmer Community",
    description: "Join a community of like-minded farmers to share experiences, tips, and support each other."
  }
];

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up as a farmer or buyer in just a few minutes with your basic information."
  },
  {
    title: "Set Up Your Profile",
    description: "Add details about your farm, crops you grow, or products you\'re looking to buy."
  },
  {
    title: "Use Crop Doctor AI",
    description: "Upload photos of your crops to diagnose diseases and get treatment recommendations."
  },
  {
    title: "Connect with Buyers/Sellers",
    description: "Browse listings or post your own to start making direct connections in the marketplace."
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Punjab, India",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "AgriConnect helped me identify a fungal infection in my wheat crop before it spread. The AI diagnosis was spot on, and I saved nearly 70% of my harvest!"
  },
  {
    name: "Anita Sharma",
    location: "Gujarat, India",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "I\'ve been able to sell my organic vegetables directly to restaurants through the marketplace. My profits have increased by 40% since cutting out middlemen."
  },
  {
    name: "Vijay Patel",
    location: "Maharashtra, India",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    text: "The weather forecasts are incredibly accurate. I\'ve optimized my irrigation schedule and reduced water usage by 30% while improving crop health."
  }
];

export default LandingPage;