import React from 'react';
import { Brain, Award, BookOpen, Users, Globe, ChevronRight, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BrainScan AI</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            We're on a mission to revolutionize brain tumor diagnosis through artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          BrainScan AI leverages advanced machine learning and deep learning techniques to detect and diagnose brain tumors with unprecedented accuracy.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <Brain className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Diagnosis</h3>
            <p className="text-gray-600">Utilizing cutting-edge deep learning models to enhance medical imaging analysis.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <Award className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Accuracy & Efficiency</h3>
            <p className="text-gray-600">Providing highly accurate results, reducing diagnosis time significantly.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <BookOpen className="text-blue-600 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Research-Driven</h3>
            <p className="text-gray-600">Backed by rigorous scientific research and collaborations with medical institutions.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us in Advancing Medical AI</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          Help us shape the future of AI-driven healthcare by supporting our mission.
        </p>
        <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
          Get in Touch <ChevronRight className="inline-block w-5 h-5 ml-2" />
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
