import Link from 'next/link';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">Thank You!</h1>
        
        <p className="text-lg text-slate-600 mb-6">
          We've received your demo request and will be in touch shortly. A member of our team will contact you at the email address you provided.
        </p>
        
        <p className="text-md text-slate-500 mb-8">
          If you have any immediate questions, please email us at support@accel4.com
        </p>
        
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
