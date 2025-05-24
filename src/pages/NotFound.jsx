import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Icon name="AlertTriangle" size={64} className="text-warning mx-auto" />
        </div>
        <h1 className="text-h2 font-bold text-text-primary mb-4">Page Not Found</h1>
        <p className="text-text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-primary px-6 py-3 inline-flex items-center gap-2"
        >
          <Icon name="Home" size={20} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;