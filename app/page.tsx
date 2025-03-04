// app/page.tsx

import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Image from 'next/image'

export default function IndexPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Supply Chain with AI-Powered Intelligence
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              The only platform built on Snowflake that unifies your supply chain data, 
              optimizes operations, and delivers actionable insights in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#demo" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors duration-200">
                Request Demo
              </Link>
              <Link href="#benefits" className="px-6 py-3 bg-transparent hover:bg-indigo-800 text-white font-medium rounded-md border border-white transition-colors duration-200">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-80 w-full flex items-center justify-center">
              {/* Fallback visualization if image is not available */}
              <div className="w-full h-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 800 600" 
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple supply chain network visualization */}
                  <g fill="none" stroke="white" strokeWidth="2">
                    {/* Central node */}
                    <circle cx="400" cy="300" r="40" fill="rgba(52, 211, 153, 0.8)" />
                    <text x="400" y="300" textAnchor="middle" fill="white" dy=".3em" fontSize="14">ChainSync</text>
                    
                    {/* Surrounding nodes */}
                    <circle cx="250" cy="200" r="30" fill="rgba(255, 255, 255, 0.2)" />
                    <text x="250" y="200" textAnchor="middle" fill="white" dy=".3em" fontSize="12">Suppliers</text>
                    
                    <circle cx="550" cy="200" r="30" fill="rgba(255, 255, 255, 0.2)" />
                    <text x="550" y="200" textAnchor="middle" fill="white" dy=".3em" fontSize="12">Manufacturing</text>
                    
                    <circle cx="250" cy="400" r="30" fill="rgba(255, 255, 255, 0.2)" />
                    <text x="250" y="400" textAnchor="middle" fill="white" dy=".3em" fontSize="12">Inventory</text>
                    
                    <circle cx="550" cy="400" r="30" fill="rgba(255, 255, 255, 0.2)" />
                    <text x="550" y="400" textAnchor="middle" fill="white" dy=".3em" fontSize="12">Distribution</text>
                    
                    {/* Connecting lines */}
                    <line x1="280" y1="200" x2="360" y2="300" />
                    <line x1="440" y1="300" x2="520" y2="200" />
                    <line x1="280" y1="400" x2="360" y2="300" />
                    <line x1="440" y1="300" x2="520" y2="400" />
                    
                    {/* Data flow animation */}
                    <circle className="animate-pulse" cx="320" cy="250" r="5" fill="rgba(52, 211, 153, 0.8)" />
                    <circle className="animate-pulse" cx="480" cy="250" r="5" fill="rgba(52, 211, 153, 0.8)" />
                    <circle className="animate-pulse" cx="320" cy="350" r="5" fill="rgba(52, 211, 153, 0.8)" />
                    <circle className="animate-pulse" cx="480" cy="350" r="5" fill="rgba(52, 211, 153, 0.8)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-indigo-900">
            Supply Chain Complexity Solved
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <p className="text-xl text-slate-700 mb-8">
              Today's global supply chains generate massive amounts of data across disparate systems, 
              making it nearly impossible to:
            </p>
            <ul className="space-y-4">
              {[
                "Access accurate, real-time information when you need it",
                "Maintain consistent product data across your organization",
                "Adapt quickly to changing market conditions",
                "Make data-driven decisions with confidence"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="ml-3 text-lg text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl text-slate-700 mt-8 font-medium">
              ChainSync eliminates these challenges with a unified platform that brings clarity to complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-900">
            Why Industry Leaders Choose ChainSync
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Our platform delivers unmatched capabilities that transform how you manage your supply chain.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Unified Data Intelligence",
                description: "See your entire supply chain in one place with our Snowflake-powered data platform that connects all your critical systems.",
                icon: "🔄"
              },
              {
                title: "Dynamic Hierarchical Management",
                description: "Maintain complex product relationships and parameters at any level of granularity, from individual SKUs to entire product lines.",
                icon: "🌳"
              },
              {
                title: "Time-Phased Planning",
                description: "Future-proof your operations with effective date ranges for all parameters, ensuring you're always working with the right data.",
                icon: "⏱️"
              },
              {
                title: "Location-Specific Optimization",
                description: "Fine-tune operations with location-specific parameters that override global defaults when needed.",
                icon: "📍"
              },
              {
                title: "Complete Audit Trail",
                description: "Maintain compliance and accountability with comprehensive tracking of all data changes.",
                icon: "📋"
              },
              {
                title: "Seamless Integration",
                description: "Connect with your existing systems through our flexible APIs and native Snowflake integration.",
                icon: "🔌"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-indigo-800">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="demo" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-900">
            Request a Demo
          </h2>
          <p className="text-xl text-center text-slate-600 mb-10">
            Fill out the form below and our team will get in touch to schedule your personalized demo.
          </p>
          
          <form 
            className="bg-white rounded-xl shadow-lg p-8"
            action="/api/submit-demo-request" 
            method="POST"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors duration-200"
              >
                Request Your Demo
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              By submitting this form, you agree to our <a href="/privacy" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold mb-4">ChainSync</h3>
              <p className="text-slate-300 mb-4">
                Transforming supply chains with AI-powered intelligence and Snowflake integration.
              </p>
              <p className="text-slate-300">
                A product by <span className="font-semibold">Accel4</span>
              </p>
            </div>
            
            <div className="col-span-1">
              <h4 className="text-lg font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-slate-300 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="text-slate-300 hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="/roadmap" className="text-slate-300 hover:text-white transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/documentation" className="text-slate-300 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/case-studies" className="text-slate-300 hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/support" className="text-slate-300 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="text-slate-300 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Accel4. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://twitter.com/accel4" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/accel4" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://github.com/accel4" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* We'll add more sections in the next steps */}
    </main>
  )
}