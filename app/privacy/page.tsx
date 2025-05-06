import { PageLayout } from "@/components/layout/page-layout"

export const metadata = {
  title: "Privacy Policy | হাওয়াবদল - Hawabodol",
  description: "Privacy policy for হাওয়াবদল (Hawabodol) travel and tour package services.",
}

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              At হাওয়াবদল (Hawabodol), we are committed to protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <h3>1.1. Personal Information</h3>
            <ul>
              <li>Name, email address, phone number, and mailing address</li>
              <li>Payment information (processed securely through our payment processors)</li>
              <li>Account login credentials</li>
              <li>Profile information (such as profile pictures)</li>
              <li>Emergency contact information</li>
            </ul>

            <h3>1.2. Non-Personal Information</h3>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>Processing and confirming your bookings</li>
              <li>Providing customer support</li>
              <li>Sending you booking confirmations and updates</li>
              <li>Sending promotional emails about new offers or other information (you can opt out at any time)</li>
              <li>Improving our website and services</li>
              <li>Conducting research and analysis</li>
              <li>Preventing fraudulent transactions</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Tour operators to fulfill your bookings</li>
              <li>Payment processors to complete transactions</li>
              <li>Service providers who assist us in operating our website and conducting business</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties
              except as described above.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We have no control over and assume no
              responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
              information from children under 18. If we become aware that we have collected personal information from a
              child under 18, we will take steps to delete that information.
            </p>

            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@hawabodol.com.</p>

            <p className="text-sm text-muted-foreground mt-8">Last updated: May 1, 2023</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
