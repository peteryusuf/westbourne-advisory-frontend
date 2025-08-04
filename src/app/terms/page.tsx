import { NavigationBar } from '@/components/navigation-bar';
import { Footer } from '@/components/footer';
import { strapiAPI, LegalPage } from '@/lib/api';

async function getTermsPage(): Promise<LegalPage | null> {
  try {
    const page = await strapiAPI.getLegalPage('terms-and-conditions');
    return page;
  } catch (error) {
    console.error('Error fetching terms page:', error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getTermsPage();
  
  if (!page) {
    return {
      title: 'Terms and Conditions | Westbourne Advisory',
      description: 'Terms and conditions for Westbourne Advisory legal services.'
    };
  }

  return {
    title: page.attributes.metaTitle || `${page.attributes.title} | Westbourne Advisory`,
    description: page.attributes.metaDescription || 'Terms and conditions for Westbourne Advisory legal services.',
  };
}

// Convert Strapi rich text to HTML (basic implementation)
const renderContent = (content: unknown): string => {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map(renderContent).join('');
  }
  if (typeof content === 'object' && content !== null) {
    const obj = content as { 
      type?: string; 
      level?: number; 
      children?: Array<{ text?: string }>; 
      text?: string 
    };
    
    if (obj.type === 'paragraph') {
      const text = obj.children?.map((child) => child.text || '').join('') || '';
      return `<p class="mb-4 leading-relaxed">${text}</p>`;
    }
    if (obj.type === 'heading') {
      const level = obj.level || 2;
      const text = obj.children?.map((child) => child.text || '').join('') || '';
      const className = level === 1 ? 'text-3xl font-bold mb-6 mt-8' : 
                      level === 2 ? 'text-2xl font-semibold mb-4 mt-6' : 
                      'text-xl font-medium mb-3 mt-4';
      return `<h${level} class="${className}">${text}</h${level}>`;
    }
    if (obj.text) {
      return obj.text;
    }
  }
  return '';
};

const defaultTermsContent = `
<h1 class="text-3xl font-bold mb-6">Terms and Conditions</h1>

<p class="mb-4 leading-relaxed text-gray-600"><strong>Last updated:</strong> January 2025</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">1. Introduction</h2>
<p class="mb-4 leading-relaxed">Welcome to Westbourne Advisory. These terms and conditions ("Terms") govern your use of our website and services. By accessing our website or using our services, you agree to be bound by these Terms.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">2. About Our Services</h2>
<p class="mb-4 leading-relaxed">Westbourne Advisory provides expert legal services specializing in surrogacy law for intended parents across the UK. Our services include legal consultation, document preparation, and guidance through the surrogacy process.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">3. Professional Relationship</h2>
<p class="mb-4 leading-relaxed">A solicitor-client relationship is only established when:</p>
<ul class="list-disc pl-6 mb-4">
  <li class="mb-2">You have entered into a formal retainer agreement with us</li>
  <li class="mb-2">We have confirmed our engagement in writing</li>
  <li class="mb-2">Any applicable fees have been discussed and agreed upon</li>
</ul>

<h2 class="text-2xl font-semibold mb-4 mt-6">4. Website Use</h2>
<p class="mb-4 leading-relaxed">Information on this website is provided for general informational purposes only and does not constitute legal advice. You should not rely on website content for making legal decisions without consulting with a qualified solicitor.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">5. Confidentiality</h2>
<p class="mb-4 leading-relaxed">We are committed to maintaining the confidentiality of all client information in accordance with professional standards and applicable law. Information you provide through our contact forms will be treated confidentially.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">6. Limitation of Liability</h2>
<p class="mb-4 leading-relaxed">To the fullest extent permitted by law, Westbourne Advisory shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">7. Intellectual Property</h2>
<p class="mb-4 leading-relaxed">All content on this website, including text, graphics, logos, and images, is the property of Westbourne Advisory and is protected by copyright and other intellectual property laws.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">8. Changes to Terms</h2>
<p class="mb-4 leading-relaxed">We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified Terms.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">9. Contact Information</h2>
<p class="mb-4 leading-relaxed">If you have any questions about these Terms, please contact us through our website contact form.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">10. Governing Law</h2>
<p class="mb-4 leading-relaxed">These Terms shall be governed by and construed in accordance with the laws of England and Wales.</p>
`;

export default async function TermsPage() {
  const page = await getTermsPage();

  let htmlContent = defaultTermsContent;
  let lastUpdated = 'January 2025';

  if (page) {
    htmlContent = Array.isArray(page.attributes.content) 
      ? page.attributes.content.map(renderContent).join('')
      : page.attributes.content ? String(page.attributes.content) : defaultTermsContent;
    
    lastUpdated = new Date(page.attributes.lastUpdated).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {page ? (
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{page.attributes.title}</h1>
                <p className="text-gray-600 mb-8">
                  <strong>Last updated:</strong> {lastUpdated}
                </p>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </>
            ) : (
              <div 
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: defaultTermsContent }}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}