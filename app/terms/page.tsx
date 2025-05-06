import { PageLayout } from "@/components/layout/page-layout"

export const metadata = {
  title: "Terms & Conditions | হাওয়াবদল - Hawabodol",
  description: "Terms and conditions for using হাওয়াবদল (Hawabodol) travel and tour package services.",
}

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Terms & Conditions</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to হাওয়াবদল (Hawabodol). By accessing or using our website and services, you agree to be bound by
              these Terms and Conditions. Please read them carefully before using our platform.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using হাওয়াবদল, you agree to be bound by these Terms and Conditions, our Privacy Policy, and
              any other terms or policies referenced herein. If you do not agree with any part of these terms, you may
              not use our services.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              2.1. To use certain features of our platform, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>
            <p>
              2.2. You are responsible for all activities that occur under your account. Please notify us immediately of
              any unauthorized use of your account.
            </p>
            <p>
              2.3. We reserve the right to suspend or terminate accounts that violate these Terms and Conditions or for
              any other reason at our discretion.
            </p>

            <h2>3. Booking and Payments</h2>
            <p>3.1. All bookings are subject to availability and confirmation.</p>
            <p>3.2. Prices are subject to change without notice until a booking is confirmed.</p>
            <p>
              3.3. Payment methods accepted are specified during the checkout process. All payments must be made in
              Bangladeshi Taka (BDT).
            </p>
            <p>
              3.4. We use secure payment processing systems, but we are not responsible for any issues arising from
              payment gateway failures.
            </p>

            <h2>4. Cancellations and Refunds</h2>
            <p>
              4.1. Cancellation policies vary by tour operator and package. Please refer to the specific package details
              for the applicable cancellation policy.
            </p>
            <p>
              4.2. Refunds, when applicable, will be processed within 7-14 business days and will be issued using the
              original payment method.
            </p>
            <p>
              4.3. We reserve the right to cancel tours due to unforeseen circumstances, in which case a full refund
              will be provided.
            </p>

            <h2>5. User Conduct</h2>
            <p>
              5.1. You agree not to use our platform for any unlawful purpose or in any way that could damage, disable,
              or impair our services.
            </p>
            <p>5.2. You agree not to attempt to gain unauthorized access to any part of our platform or systems.</p>
            <p>
              5.3. You agree not to post or transmit any content that is defamatory, offensive, or otherwise
              objectionable.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              6.1. All content on হাওয়াবদল, including text, graphics, logos, and software, is the property of হাওয়াবদল or
              its content suppliers and is protected by copyright laws.
            </p>
            <p>
              6.2. You may not reproduce, distribute, modify, or create derivative works from any content without our
              express written permission.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              7.1. হাওয়াবদল is not liable for any direct, indirect, incidental, consequential, or punitive damages arising
              from your use of our platform or services.
            </p>
            <p>
              7.2. We do not guarantee the accuracy, completeness, or reliability of any content or information on our
              platform.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of Bangladesh. Any disputes arising from these terms
              shall be subject to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting on our website. Your continued use of our platform after any changes indicates
              your acceptance of the modified terms.
            </p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at info@hawabodol.com.</p>

            <p className="text-sm text-muted-foreground mt-8">Last updated: May 1, 2023</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
