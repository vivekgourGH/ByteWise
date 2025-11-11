import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaLock, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
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
        title: 'Payment Successful!',
        html: `
          <div class="text-center">
            <div class="text-green-500 text-6xl mb-4">✓</div>
            <p>You have successfully enrolled in <strong>"${course.title}"</strong></p>
            <p class="text-sm text-gray-600 mt-2">Check your email for course access details</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#22c55e',
        confirmButtonText: 'Go to My Courses'
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Complete Your Enrollment</h1>
          <p className="text-slate-600">Secure payment for your course enrollment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-8 border border-white/20">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Course Summary</h3>
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
                  <span className="line-through text-gray-500">${course.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-green-600">-${course.originalPrice - course.price}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-purple-600 font-bold">${course.price}</span>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center ${
                      paymentMethod === 'card' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FaCreditCard className="mr-2" />
                    Credit/Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center ${
                      paymentMethod === 'paypal' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FaPaypal className="mr-2" />
                    PayPal
                  </button>
                </div>
              </div>

              <form onSubmit={handlePayment}>
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
                    `Complete Payment - $${course.price}`
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