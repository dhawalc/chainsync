'use client';

interface MdmPageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function MdmPageTemplate({
  title,
  description,
  children,
}: MdmPageTemplateProps) {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
} 