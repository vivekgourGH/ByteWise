import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMobile, FaLock, FaCheckCircle, FaQrcode } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (location.state?.course) {
      setCourse(location.state.course);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      const username = sessionStorage.getItem('username');
      
      const enrollment = {
        id: Date.now(),
        courseId: course.id,
        courseName: course.title,
        instructor: course.instructor,
        enrolledBy: username,
        enrollmentDate: new Date().toISOString(),
        status: 'enrolled',
        progress: 0,
        paymentAmount: course.price,
        paymentMethod: paymentMethod,
        paymentDate: new Date().toISOString()
      };
      
      const existingEnrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
      existingEnrollments.push(enrollment);
      localStorage.setItem('courseEnrollments', JSON.stringify(existingEnrollments));
      
      setProcessing(false);
      
      Swal.fire({
        title: 'Welcome to Your Coding Adventure! 🎉',
        html: `
          <div class="text-center">
            <div class="text-green-500 text-6xl mb-4">🚀</div>
            <p>Awesome! You're now enrolled in <strong>"${course.title}"</strong></p>
            <p class="text-sm text-gray-600 mt-2">Get ready to code, create, and have fun! Check your email for login details.</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#22c55e',
        confirmButtonText: 'Start Coding! 🎮'
      }).then(() => {
        navigate('/my-courses');
      });
    }, 2000);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Complete Your Coding Adventure! 🚀</h1>
          <p className="text-slate-600">Safe and secure payment for your coding course</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-8 border border-white/20">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Coding Adventure 🎮</h3>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
              <p className="text-gray-600 text-sm mb-2">by {course.instructor}</p>
              <p className="text-gray-600 text-sm mb-4">Duration: {course.duration}</p>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Course Price:</span>
                  <span className="line-through text-gray-500">₹{course.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Special Discount:</span>
                  <span className="text-green-600">-₹{course.originalPrice - course.price}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-purple-600 font-bold">₹{course.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <FaLock className="text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Secure SSL encrypted payment</span>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method 💳</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                      paymentMethod === 'upi' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FaQrcode className="mb-2 text-2xl" />
                    <span className="font-medium">UPI Payment</span>
                    <span className="text-xs text-gray-500">GPay, PhonePe, Paytm</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                      paymentMethod === 'card' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FaCreditCard className="mb-2 text-2xl" />
                    <span className="font-medium">Card Payment</span>
                    <span className="text-xs text-gray-500">Debit/Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                      paymentMethod === 'netbanking' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FaMobile className="mb-2 text-2xl" />
                    <span className="font-medium">Net Banking</span>
                    <span className="text-xs text-gray-500">All Banks</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handlePayment}>
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-purple-700 mb-2">🚀 Quick UPI Payment</h4>
                      <p className="text-sm text-gray-600 mb-2">Pay instantly using your UPI ID or scan QR code</p>
                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <p className="text-xs text-gray-500 mb-1">Pay to:</p>
                        <p className="font-mono text-sm font-semibold text-purple-700">7389110171@ptyes</p>
                        <p className="text-xs text-gray-500 mt-1">ByteWise Coding Platform</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@paytm / yourname@gpay"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter your UPI ID to confirm payment</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="text-2xl mb-1">📱</div>
                        <div className="text-xs font-medium">Google Pay</div>
                      </div>
                      <div className="text-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="text-2xl mb-1">💜</div>
                        <div className="text-xs font-medium">PhonePe</div>
                      </div>
                      <div className="text-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="text-2xl mb-1">💙</div>
                        <div className="text-xs font-medium">Paytm</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-green-700 mb-2">🏦 Net Banking</h4>
                      <p className="text-sm text-gray-600">Pay securely through your bank's website</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Your Bank
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required>
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {processing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Start Learning - ₹${course.price} 🚀`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePayment;