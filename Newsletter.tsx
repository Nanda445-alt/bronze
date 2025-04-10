import React from 'react';

export default function Newsletter() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-serif mb-4">Join the BRONZE Society</h2>
        <p className="text-pearl-300 mb-8">
          Be the first to receive exclusive offers, early access to new collections, and personalized style recommendations.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-transparent border border-pearl-300/30 text-white placeholder-pearl-400 focus:outline-none focus:border-champagne-400"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-burgundy-600 text-white font-serif hover:bg-burgundy-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}