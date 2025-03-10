import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define the features for each plan
const basicFeatures = [
  "Unified Data Intelligence",
  "Basic Hierarchical Management",
  "Time-Phased Planning",
  "Location-Specific Parameters",
  "Basic Audit Trail",
  "Standard Support",
  "Up to 5 users"
];

const proFeatures = [
  "Everything in Basic, plus:",
  "Advanced Hierarchical Management",
  "AI-Powered Forecasting",
  "What-If Scenario Analysis",
  "Advanced Audit & Compliance",
  "Custom Integrations",
  "Priority Support",
  "Unlimited users"
];

const enterpriseFeatures = [
  "Everything in Pro, plus:",
  "Dedicated Account Manager",
  "Custom AI Models",
  "Advanced Analytics",
  "White-Glove Onboarding",
  "24/7 Premium Support",
  "Custom SLAs",
  "Enterprise SSO"
];

export default function PricingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-indigo-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Choose the plan that's right for your business. All plans include access to our Snowflake-powered platform.
          </p>
        </div>
      </header>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-2 border-slate-200 shadow-lg transition-all duration-200 hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-indigo-900">Basic</CardTitle>
                <CardDescription className="text-slate-600 mt-2">For small teams getting started</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-indigo-900">$49</span>
                  <span className="text-slate-600 ml-2">/ user / month</span>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pb-8">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-indigo-600 shadow-xl relative transition-all duration-200 hover:shadow-2xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-indigo-600 text-white px-3 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-indigo-900">Pro</CardTitle>
                <CardDescription className="text-slate-600 mt-2">For growing businesses</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-indigo-900">$99</span>
                  <span className="text-slate-600 ml-2">/ user / month</span>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pb-8">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-slate-200 shadow-lg transition-all duration-200 hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-indigo-900">Enterprise</CardTitle>
                <CardDescription className="text-slate-600 mt-2">For large organizations</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-indigo-900">Custom</span>
                </div>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {enterpriseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center pb-8">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            {[
              {
                question: "How does billing work?",
                answer: "We bill monthly based on the number of active users in your account. You can add or remove users at any time, and your bill will be prorated accordingly."
              },
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to the new features. When you downgrade, the changes will take effect at the end of your current billing cycle."
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes, we offer a 14-day free trial of our Pro plan. No credit card required. You can try all the features and decide if ChainSync is right for your business."
              },
              {
                question: "What kind of support do you offer?",
                answer: "All plans include standard email support. Pro plans include priority support with faster response times. Enterprise plans include 24/7 premium support with dedicated account managers."
              },
              {
                question: "How does the Snowflake integration work?",
                answer: "ChainSync is built on Snowflake, which means your data stays in your Snowflake account. We provide a secure connection to your data warehouse, and you maintain complete control over your data."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-slate-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-800">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Join the leading companies that are using ChainSync to optimize their operations and drive growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#demo" 
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors duration-200"
            >
              Request Demo
            </Link>
            <Link 
              href="/" 
              className="px-6 py-3 bg-transparent hover:bg-indigo-800 text-white font-medium rounded-md border border-white transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
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
    </main>
  );
} 