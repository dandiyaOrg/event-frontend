// components/ProfilePage.jsx
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3, 
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Key,
  Activity,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user data - replace with actual data from your state/API
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: 'Mumbai, Maharashtra, India',
    joinDate: '2024-01-15',
    role: 'Admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    department: 'Event Management',
    bio: 'Experienced event manager with 5+ years in the industry.'
  });

  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    // Add API call to save data
    console.log('Saving user data:', formData);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Profile Avatar */}
                  <div className="relative group">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/30 shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {userData.name}
                    </h1>
                    <p className="text-blue-100 text-lg font-semibold mt-1">
                      {userData.role} • {userData.department}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-semibold">Active</span>
                      </div>
                      <div className="text-blue-100 text-sm font-medium">
                        Member since {new Date(userData.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 ${
                    isEditing 
                      ? 'bg-red-500/90 hover:bg-red-600 text-white' 
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white'
                  }`}
                >
                  <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                  </div>
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-800 mb-4">Settings</h3>
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 group ${
                          activeTab === tab.id
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                            : 'hover:bg-blue-50 text-slate-700'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${
                          activeTab === tab.id 
                            ? 'bg-white/20' 
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-semibold">{tab.label}</span>
                        <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                          activeTab === tab.id ? 'rotate-90' : 'group-hover:translate-x-1'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Tab Content Header */}
              <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || User, { 
                        className: "w-6 h-6 text-white" 
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                      </h3>
                      <p className="text-slate-300 font-medium">
                        Manage your {activeTab} settings
                      </p>
                    </div>
                  </div>

                  {isEditing && activeTab === 'personal' && (
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'personal' && (
                  <div className="space-y-8">
                    {/* Personal Information Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                          <User className="w-4 h-4 text-blue-500" />
                          <span>Full Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                            isEditing 
                              ? 'border-blue-300 focus:border-blue-500 bg-white' 
                              : 'border-slate-200 bg-slate-50'
                          } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span>Email Address</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                            isEditing 
                              ? 'border-blue-300 focus:border-blue-500 bg-white' 
                              : 'border-slate-200 bg-slate-50'
                          } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <span>Phone Number</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                            isEditing 
                              ? 'border-blue-300 focus:border-blue-500 bg-white' 
                              : 'border-slate-200 bg-slate-50'
                          } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                        />
                      </div>

                      {/* Department */}
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                          <Settings className="w-4 h-4 text-blue-500" />
                          <span>Department</span>
                        </label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                            isEditing 
                              ? 'border-blue-300 focus:border-blue-500 bg-white' 
                              : 'border-slate-200 bg-slate-50'
                          } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>Address</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                          isEditing 
                            ? 'border-blue-300 focus:border-blue-500 bg-white' 
                            : 'border-slate-200 bg-slate-50'
                        } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                      />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                        <Edit3 className="w-4 h-4 text-blue-500" />
                        <span>Bio</span>
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 resize-none ${
                          isEditing 
                            ? 'border-blue-300 focus:border-blue-500 bg-white' 
                            : 'border-slate-200 bg-slate-50'
                        } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    {/* Password Section */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                      <h4 className="text-lg font-bold text-slate-800 mb-4">Change Password</h4>
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Current Password"
                            className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                        />
                        
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                        />
                        
                        <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300">
                          <Key className="w-5 h-5" />
                          <span>Update Password</span>
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-slate-800">Two-Factor Authentication</h4>
                          <p className="text-slate-600 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-300">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <h4 className="text-lg font-bold text-slate-800 mb-4">Email Notifications</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'Event Updates', desc: 'Get notified about event changes' },
                          { label: 'User Activities', desc: 'Notifications about user registrations' },
                          { label: 'System Alerts', desc: 'Important system notifications' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl">
                            <div>
                              <p className="font-semibold text-slate-800">{item.label}</p>
                              <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked={index === 0} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    {/* Recent Activity */}
                    <div className="space-y-4">
                      {[
                        { action: 'Updated profile information', time: '2 hours ago', type: 'profile' },
                        { action: 'Created new event "Summer Festival"', time: '1 day ago', type: 'event' },
                        { action: 'Logged in from Mumbai', time: '2 days ago', type: 'login' },
                        { action: 'Changed password', time: '1 week ago', type: 'security' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                          <div className={`p-2 rounded-xl ${
                            activity.type === 'profile' ? 'bg-blue-100 text-blue-600' :
                            activity.type === 'event' ? 'bg-green-100 text-green-600' :
                            activity.type === 'login' ? 'bg-purple-100 text-purple-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            <Activity className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{activity.action}</p>
                            <p className="text-sm text-slate-600">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
