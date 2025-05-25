import React, { useState } from 'react';
import {
    FaEdit,
    FaUser,
    FaShoppingBag,
    FaCheck,
    FaClock,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt
} from 'react-icons/fa';
import './Profile.css'; 

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "Harish Reddy",
        email: "harish@example.com",
        phone: "+91 9876543210",
        address: "123 Farm Street, Agricultural Colony, Bangalore, Karnataka 560001",
        joinDate: "January 15, 2023",
        orders: {
            total: 15,
            completed: 12,
            pending: 3
        },
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userData });

    const handleEditToggle = () => {
        if (isEditing) {
            setUserData(formData);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1 className="profile-title">
                        <FaUser /> My Profile
                    </h1>
                    <button
                        className={`edit-btn ${isEditing ? 'save-mode' : ''}`}
                        onClick={handleEditToggle}
                    >
                        <FaEdit /> {isEditing ? 'Save Profile' : 'Edit Profile'}
                    </button>
                </div>

                <div className="profile-content">
                    <div className="profile-sidebar">
                        <div className="profile-pic-container">
                            <img
                                src={userData.profilePic}
                                alt="Profile"
                                className="profile-pic"
                            />
                            <h2>{userData.name}</h2>
                        </div>

                        <div className="profile-stats">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <FaShoppingBag />
                                </div>
                                <div className="stat-info">
                                    <div className="stat-value">{userData.orders.total}</div>
                                    <div className="stat-label">Total Orders</div>
                                </div>
                            </div>

                            <div className="stat-card success">
                                <div className="stat-icon">
                                    <FaCheck />
                                </div>
                                <div className="stat-info">
                                    <div className="stat-value">{userData.orders.completed}</div>
                                    <div className="stat-label">Completed</div>
                                </div>
                            </div>

                            <div className="stat-card warning">
                                <div className="stat-icon">
                                    <FaClock />
                                </div>
                                <div className="stat-info">
                                    <div className="stat-value">{userData.orders.pending}</div>
                                    <div className="stat-label">Pending</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="detail-section">
                            <h3 className="section-title">Personal Information</h3>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <FaUser />
                                </div>
                                <div className="detail-content">
                                    <div className="detail-label">Full Name</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="detail-input"
                                        />
                                    ) : (
                                        <div className="detail-value">{userData.name}</div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="detail-content">
                                    <div className="detail-label">Email Address</div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="detail-input"
                                        />
                                    ) : (
                                        <div className="detail-value">{userData.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <FaPhone />
                                </div>
                                <div className="detail-content">
                                    <div className="detail-label">Phone Number</div>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="detail-input"
                                        />
                                    ) : (
                                        <div className="detail-value">{userData.phone}</div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="detail-content">
                                    <div className="detail-label">Address</div>
                                    {isEditing ? (
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="detail-textarea"
                                            rows="3"
                                        />
                                    ) : (
                                        <div className="detail-value">{userData.address}</div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-item">
                                <div className="detail-icon">
                                    <FaCalendarAlt />
                                </div>
                                <div className="detail-content">
                                    <div className="detail-label">Member Since</div>
                                    <div className="detail-value">{userData.joinDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
