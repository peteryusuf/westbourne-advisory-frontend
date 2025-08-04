import { NavigationBar } from '@/components/navigation-bar';
import { Footer } from '@/components/footer';
import { strapiAPI, LegalPage } from '@/lib/api';

async function getPrivacyPage(): Promise<LegalPage | null> {
  try {
    const page = await strapiAPI.getLegalPage('privacy-policy');
    return page;
  } catch (error) {
    console.error('Error fetching privacy page:', error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getPrivacyPage();
  
  if (!page) {
    return {
      title: 'Privacy Policy | Westbourne Advisory',
      description: 'Privacy policy for Westbourne Advisory legal services.'
    };
  }

  return {
    title: page.attributes.metaTitle || `${page.attributes.title} | Westbourne Advisory`,
    description: page.attributes.metaDescription || 'Privacy policy for Westbourne Advisory legal services.',
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

const defaultPrivacyContent = `
<h1 class="text-3xl font-bold mb-6">Privacy Policy</h1>

<p class="mb-4 leading-relaxed text-gray-600"><strong>Last updated:</strong> January 2025</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">1. Introduction</h2>
<p class="mb-4 leading-relaxed">Westbourne Advisory is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">2. Information We Collect</h2>
<p class="mb-4 leading-relaxed">We may collect the following types of information:</p>
<ul class="list-disc pl-6 mb-4">
  <li class="mb-2"><strong>Personal Information:</strong> Name, email address, phone number, and address when you contact us or use our services</li>
  <li class="mb-2"><strong>Case Information:</strong> Details about your legal matter provided during consultations</li>
  <li class="mb-2"><strong>Website Usage:</strong> IP address, browser type, pages visited, and time spent on our site</li>
  <li class="mb-2"><strong>Communication Records:</strong> Records of our communications with you</li>
</ul>

<h2 class="text-2xl font-semibold mb-4 mt-6">3. How We Use Your Information</h2>
<p class="mb-4 leading-relaxed">We use your information to:</p>
<ul class="list-disc pl-6 mb-4">
  <li class="mb-2">Provide legal services and advice</li>
  <li class="mb-2">Communicate with you about your case</li>
  <li class="mb-2">Respond to your inquiries</li>
  <li class="mb-2">Improve our website and services</li>
  <li class="mb-2">Comply with legal and regulatory requirements</li>
</ul>

<h2 class="text-2xl font-semibold mb-4 mt-6">4. Legal Basis for Processing</h2>
<p class="mb-4 leading-relaxed">We process your personal data based on:</p>
<ul class="list-disc pl-6 mb-4">
  <li class="mb-2"><strong>Consent:</strong> When you voluntarily provide information through our contact forms</li>
  <li class="mb-2"><strong>Contract:</strong> When necessary to provide legal services you've requested</li>
  <li class="mb-2"><strong>Legitimate Interest:</strong> To improve our services and communicate with potential clients</li>
  <li class="mb-2"><strong>Legal Obligation:</strong> To comply with professional and legal requirements</li>
</ul>

<h2 class="text-2xl font-semibold mb-4 mt-6">5. Professional Confidentiality</h2>
<p class="mb-4 leading-relaxed">As solicitors, we are bound by strict professional confidentiality rules. Information about your legal matter is protected by legal professional privilege and will not be disclosed without your consent, except as required by law.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">6. Data Sharing</h2>
<p class="mb-4 leading-relaxed">We may share your information with:</p>
<ul class="list-disc pl-6 mb-4">
  <li class="mb-2">Trusted third-party service providers who assist us in providing our services</li>
  <li class="mb-2">Other legal professionals involved in your case (with your consent)</li>
  <li class="mb-2">Regulatory authorities when required by law</li>
</ul>

<h2 class="text-2xl font-semiborder mb-4 mt-6">7. Data Security</h2>
<p class="mb-4 leading-relaxed">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">8. Data Retention</h2>
<p class="mb-4 leading-relaxed">We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Client files are typically retained for at least 6 years after the matter concludes.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">9. Your Rights</h2>
<p class="mb-4 leading-relaxed">Under data protection law, you have the right to:</p>
<ul class="list-disc pl-6 mb-4">
  <li class="mb-2">Access your personal data</li>
  <li class="mb-2">Correct inaccurate data</li>
  <li class="mb-2">Request deletion of your data</li>
  <li class="mb-2">Object to processing</li>
  <li class="mb-2">Data portability</li>
  <li class="mb-2">Withdraw consent</li>
</ul>

<h2 class="text-2xl font-semibold mb-4 mt-6">10. Cookies</h2>
<p class="mb-4 leading-relaxed">Our website uses cookies to improve your browsing experience. You can control cookie settings through your browser preferences.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">11. Contact Us</h2>
<p class="mb-4 leading-relaxed">If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us through our website contact form.</p>

<h2 class="text-2xl font-semibold mb-4 mt-6">12. Changes to This Policy</h2>
<p class="mb-4 leading-relaxed">We may update this Privacy Policy from time to time. Changes will be posted on our website with the updated date.</p>
`;

export default async function PrivacyPage() {
  const page = await getPrivacyPage();

  let htmlContent = defaultPrivacyContent;
  let lastUpdated = 'January 2025';

  if (page) {
    htmlContent = Array.isArray(page.attributes.content) 
      ? page.attributes.content.map(renderContent).join('')
      : page.attributes.content ? String(page.attributes.content) : defaultPrivacyContent;
    
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
                dangerouslySetInnerHTML={{ __html: defaultPrivacyContent }}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}