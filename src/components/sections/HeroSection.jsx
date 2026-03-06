import React from 'react';
import { Users, Star, MapPin, ChevronRight } from 'lucide-react';

const HeroSection = ({ onLoginClick }) => {
  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/trip.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight ">
            TRIP REVIEW
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              See Morocco through others' eyes
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Join millions of travelers sharing authentic reviews and discovering hidden gems around MOROCCO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={onLoginClick}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            >
              Start Reviewing
              <ChevronRight className="inline ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>2M+ Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>500K+ Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>150+ Cities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;