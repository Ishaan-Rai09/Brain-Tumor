import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Shield, Upload, ChevronRight, Award, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 3D Brain Animation Component
const BrainAnimation: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="relative">
        <div className="relative w-full h-80 flex items-center justify-center">
          {/* 3D Brain model using CSS */}
          <div className="relative w-64 h-64">
            <div className="absolute w-56 h-48 bg-pink-200 rounded-full left-4 top-8 animate-pulse" 
                 style={{ transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(15deg)' }}></div>
            <div className="absolute w-52 h-44 bg-pink-300 rounded-full left-6 top-10 animate-pulse" 
                 style={{ animationDelay: '0.2s', transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(15deg)' }}></div>
            <div className="absolute w-48 h-40 bg-pink-400 rounded-full left-8 top-12 animate-pulse" 
                 style={{ animationDelay: '0.4s', transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(15deg)' }}></div>
            
            {/* Brain lobes */}
            <div className="absolute w-24 h-20 bg-blue-300 rounded-full left-4 top-8 animate-pulse" 
                 style={{ transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(-25deg)' }}></div>
            <div className="absolute w-24 h-20 bg-green-300 rounded-full right-4 top-8 animate-pulse" 
                 style={{ animationDelay: '0.3s', transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(25deg)' }}></div>
            <div className="absolute w-24 h-20 bg-yellow-300 rounded-full left-20 top-28 animate-pulse" 
                 style={{ animationDelay: '0.6s', transformStyle: 'preserve-3d', transform: 'rotateX(-15deg)' }}></div>
            
            {/* Brain stem */}
            <div className="absolute w-8 h-16 bg-pink-500 rounded-b-full left-28 bottom-0 animate-pulse" 
                 style={{ animationDelay: '0.8s' }}></div>
            
            <div className="absolute w-full h-full flex items-center justify-center">
              <Brain className="h-32 w-32 text-pink-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-80"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Advanced Brain Tumor <span className="text-blue-600">Detection</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Our AI-powered platform helps detect and classify brain tumors from MRI scans with high accuracy, providing faster diagnosis and better patient outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/login" className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <BrainAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
              <p className="text-blue-100">Accuracy Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-3xl font-bold text-white mb-2">10,000+</h3>
              <p className="text-blue-100">Scans Analyzed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-blue-100">Medical Partners</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
              <p className="text-blue-100">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with a simple user interface to provide accurate brain tumor detection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font- semibold text-gray-900 mb-3">Upload MRI Scan</h3>
              <p className="text-gray-600">
                Simply upload your MRI scan image through our secure platform. We support various image formats for your convenience.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI model analyzes the scan, identifying potential tumors and classifying them with high accuracy.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed results about the detected tumor type, location, and confidence level to assist in diagnosis.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn more about our features <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              {/* 3D Brain Visualization */}
              <div className="relative w-full h-80 bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute w-56 h-48 bg-pink-200 rounded-full left-4 top-8 animate-pulse" 
                         style={{ transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(15deg)' }}></div>
                    <div className="absolute w-52 h-44 bg-pink-300 rounded-full left-6 top-10 animate-pulse" 
                         style={{ animationDelay: '0.2s', transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(15deg)' }}></div>
                    <div className="absolute w-48 h-40 bg-pink-400 rounded-full left-8 top-12 animate-pulse" 
                         style={{ animationDelay: '0.4s', transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(15deg)' }}></div>
                    
                    {/* Brain lobes */}
                    <div className="absolute w-24 h-20 bg-blue-300 rounded-full left-4 top-8 animate-pulse" 
                         style={{ transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(-25deg)' }}></div>
                    <div className="absolute w-24 h-20 bg-green-300 rounded-full right-4 top-8 animate-pulse" 
                         style={{ animationDelay: '0.3s', transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(25deg)' }}></div>
                    <div className="absolute w-24 h-20 bg-yellow-300 rounded-full left-20 top-28 animate-pulse" 
                         style={{ animationDelay: '0.6s', transformStyle: 'preserve-3d', transform: 'rotateX(-15deg)' }}></div>
                    
                    {/* Brain stem */}
                    <div className="absolute w-8 h-16 bg-pink-500 rounded-b-full left-28 bottom-0 animate-pulse" 
                         style={{ animationDelay: '0.8s' }}></div>
                    
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <Brain className="h-32 w-32 text-pink-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Platform</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">High Accuracy</h3>
                    <p className="text-gray-600">Our AI model has been trained on thousands of MRI scans to ensure high accuracy in tumor detection.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Fast Results</h3>
                    <p className="text-gray-600">Get results within seconds, helping medical professionals make quicker decisions.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Secure Platform</h3>
                    <p className="text-gray-600">Your data is encrypted and securely stored, ensuring patient privacy and confidentiality.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link to="/about" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                  Learn More About Us <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Medical Professionals Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by leading healthcare providers and medical institutions around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-yellow-500 mr-2" />
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "BrainScan AI has revolutionized how we diagnose brain tumors. The accuracy and speed of the platform have significantly improved our workflow."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-500">Neurologist, Mayo Clinic</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-yellow-500 mr-2" />
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The platform's ability to classify different types of tumors with such high accuracy has been invaluable for our diagnostic process."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Dr. Michael Chen</p>
                <p className="text-sm text-gray-500">Radiologist, Johns Hopkins Hospital</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-yellow-500 mr-2" />
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a research institution, we've found BrainScan AI to be not only clinically useful but also an excellent tool for training medical students."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Prof. Elizabeth Taylor</p>
                <p className="text-sm text-gray-500">Head of Neurology, Stanford Medical School</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Diagnostic Process?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of medical professionals who are already using BrainScan AI to improve patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              Get Started Now <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;