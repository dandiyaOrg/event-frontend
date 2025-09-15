import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Download, 
  Share2,
  CreditCard,
  Calendar,
  Clock,
  User,
  Building,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Receipt,
  RefreshCw,
  Shield,
  Hash,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import mockData from '../Data/MockData.json';

const { transactionsData } = mockData;

const TransactionDetail = () => {
  const { transactionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get transaction from state or find by ID
  const transaction = location.state?.transaction || 
    transactionsData.find(t => t.id === transactionId);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Not Found</h2>
          <p className="text-gray-600 mb-8">The requested transaction could not be found in our records.</p>
          <button 
            onClick={() => navigate('/transactions')} 
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
      case 'cancelled':
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'failed':
      case 'cancelled':
      case 'declined':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/transactions')} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Transactions</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Transaction Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Transaction ID and Status */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Transaction #{transaction.id}</h1>
                  <p className="text-gray-600">Transaction Reference Number</p>
                </div>
              </div>
              
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(transaction.status)}`}>
                {getStatusIcon(transaction.status)}
                <span className="font-medium">{transaction.status || 'Unknown'}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-center lg:text-right">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${transaction.amount?.toLocaleString() || '0.00'}
              </div>
              <p className="text-gray-600">Total Amount</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Transaction Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transaction Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Hash className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Transaction Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="font-medium text-gray-900">{transaction.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Reference Number</p>
                  <p className="font-medium text-gray-900">{transaction.reference || 'REF' + transaction.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Transaction Type</p>
                  <p className="font-medium text-gray-900">{transaction.type || 'Payment'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{transaction.paymentMethod || 'Credit Card'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Payment Breakdown</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${(transaction.amount * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium text-gray-900">${(transaction.amount * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">${(transaction.amount * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900">${transaction.amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Transaction Timeline</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { status: 'Transaction Initiated', time: '2:30 PM', date: 'Today', completed: true },
                  { status: 'Payment Processing', time: '2:31 PM', date: 'Today', completed: true },
                  { status: 'Payment Verified', time: '2:33 PM', date: 'Today', completed: true },
                  { status: 'Transaction Completed', time: '2:35 PM', date: 'Today', completed: transaction.status === 'Success' },
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      step.completed ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-gray-500">{step.time} • {step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Customer Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-medium text-gray-900">{transaction.customerName || 'John Doe'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Transaction Date</p>
                    <p className="font-medium text-gray-900">{transaction.date || 'Dec 15, 2024'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Transaction Time</p>
                    <p className="font-medium text-gray-900">{transaction.time || '2:35 PM EST'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Security Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Encryption</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">256-bit SSL</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Authentication</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">3D Secure</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">IP Address</span>
                  <span className="text-sm font-medium text-gray-900">192.168.1.1</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200">
                <Receipt className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-colors duration-200">
                <RefreshCw className="w-4 h-4" />
                <span>Refund Transaction</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Transactions */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Related Transactions</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Transaction #{transaction.id + item}</p>
                    <p className="text-sm text-gray-600">Dec {15 - item}, 2024 • $1,250.00</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
