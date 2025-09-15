import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User,
  Phone,
  Mail,
  Edit3,
  Trash2,
  Share2,
  Download,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Tag,
  FileText,
  Globe
} from 'lucide-react';

const SubEventDetail = () => {
  const { eventId, subEventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get sub-event from state or find by ID (mock data)
  const subEvent = location.state?.subEvent || {
    id: subEventId,
    eventId: eventId,
    name: 'Technical Workshop: Advanced React Patterns',
    description: 'A comprehensive hands-on workshop covering advanced React patterns including compound components, render props, higher-order components, and custom hooks. Perfect for developers looking to level up their React skills and build more maintainable applications.',
    fullDescription: 'Join us for an intensive 3-hour workshop where you\'ll dive deep into advanced React patterns that will transform the way you build applications. Our expert instructor will guide you through practical exercises covering compound components for building flexible UI libraries, render props for sharing logic between components, higher-order components for cross-cutting concerns, and custom hooks for stateful logic reuse. You\'ll also learn about performance optimization techniques, error boundaries, and testing strategies for complex React applications. By the end of this workshop, you\'ll have built several real-world examples and gained the confidence to implement these patterns in your own projects.',
    date: '2024-12-20',
    startTime: '10:00 AM',
    endTime: '1:00 PM',
    duration: '3 hours',
    venue: 'Workshop Hall A - Building 2, Floor 3',
    address: '123 Tech Conference Center, Innovation District, San Francisco, CA 94107',
    capacity: 50,
    registrations: 42,
    availableSpots: 8,
    status: 'confirmed',
    category: 'Workshop',
    tags: ['React', 'JavaScript', 'Frontend', 'Advanced'],
    price: '$75',
    instructor: {
      name: 'Sarah Johnson',
      title: 'Senior React Engineer at TechCorp',
      bio: 'Sarah has been working with React for over 6 years and has contributed to several open-source projects. She regularly speaks at conferences and has trained over 500 developers.',
      avatar: null,
      email: 'sarah.johnson@techcorp.com',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    },
    requirements: [
      'Laptop with Node.js installed',
      'Basic React knowledge required',
      'Code editor (VS Code recommended)',
      'GitHub account for exercises'
    ],
    agenda: [
      { time: '10:00 - 10:15', topic: 'Welcome & Setup' },
      { time: '10:15 - 11:00', topic: 'Compound Components Pattern' },
      { time: '11:00 - 11:15', topic: 'Break' },
      { time: '11:15 - 12:00', topic: 'Render Props & HOCs' },
      { time: '12:00 - 12:45', topic: 'Custom Hooks Deep Dive' },
      { time: '12:45 - 13:00', topic: 'Q&A & Wrap-up' }
    ],
    organizer: {
      name: 'Tech Conference Team',
      email: 'events@techconference.com',
      phone: '+1 (555) 123-4567'
    },
    createdAt: '2024-11-15T09:30:00Z',
    updatedAt: '2024-12-10T14:45:00Z'
  };

  if (!subEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sub Event Not Found</h2>
          <p className="text-gray-600 mb-8">The requested sub-event could not be found.</p>
          <button 
            onClick={() => navigate(`/events/${eventId}/sub-events`)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Sub Events
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const registrationPercentage = (subEvent.registrations / subEvent.capacity) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(`/events/${eventId}/sub-events`)} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Sub Events</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <div className="relative">
                <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium ${getStatusColor(subEvent.status)}`}>
                  {getStatusIcon(subEvent.status)}
                  {subEvent.status}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                  {subEvent.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {subEvent.name}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {subEvent.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {subEvent.tags?.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/events/${eventId}/sub-events/${subEventId}/edit`)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Sub Event</span>
                </button>
                <button className="flex items-center space-x-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors duration-200">
                  <Users className="w-4 h-4" />
                  <span>View Registrations</span>
                </button>
                <button className="flex items-center space-x-2 border-2 border-red-300 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl font-medium transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Registration Stats */}
            <div className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-4">Registration Status</h3>
                
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-1">
                    {subEvent.registrations}
                  </div>
                  <div className="text-sm text-gray-600">
                    of {subEvent.capacity} registered
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(registrationPercentage)}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 border border-blue-200">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${registrationPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="text-lg font-bold text-green-600">
                      {subEvent.availableSpots}
                    </div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="text-lg font-bold text-blue-600">
                      {subEvent.price}
                    </div>
                    <div className="text-xs text-gray-600">Price</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Event Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Date</div>
                      <div className="text-gray-600">
                        {new Date(subEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Time</div>
                      <div className="text-gray-600">
                        {subEvent.startTime} - {subEvent.endTime}
                      </div>
                      <div className="text-sm text-gray-500">
                        Duration: {subEvent.duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Venue</div>
                      <div className="text-gray-600">{subEvent.venue}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {subEvent.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Capacity</div>
                      <div className="text-gray-600">
                        {subEvent.capacity} participants maximum
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">About This Event</h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {subEvent.fullDescription}
                </p>
              </div>
            </div>

            {/* Agenda */}
            {subEvent.agenda && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Event Agenda</h2>
                <div className="space-y-4">
                  {subEvent.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-blue-600">{item.time}</div>
                        <div className="text-gray-900">{item.topic}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {subEvent.requirements && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">What to Bring</h2>
                <ul className="space-y-3">
                  {subEvent.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            {subEvent.instructor && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Instructor</h3>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-700 font-bold text-lg">
                      {subEvent.instructor.name.split(' ').map(n => n).join('')}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {subEvent.instructor.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {subEvent.instructor.title}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {subEvent.instructor.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-2">
                    <a
                      href={`mailto:${subEvent.instructor.email}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={subEvent.instructor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Organizer Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Organizer</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{subEvent.organizer.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`mailto:${subEvent.organizer.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {subEvent.organizer.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`tel:${subEvent.organizer.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {subEvent.organizer.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">
                    {new Date(subEvent.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="text-gray-900">
                    {new Date(subEvent.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Event ID:</span>
                  <span className="text-gray-900 font-mono">{subEvent.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubEventDetail;
