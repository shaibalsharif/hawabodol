import { PageLayout } from "@/components/layout/page-layout"

export const metadata = {
  title: "Refund Policy | হাওয়াবদল - Hawabodol",
  description: "Refund policy for হাওয়াবদল (Hawabodol) travel and tour package services.",
}

export default function RefundPolicyPage() {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Refund Policy</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              At হাওয়াবদল (Hawabodol), we strive to ensure your satisfaction with our services. This Refund Policy
              outlines the terms and conditions for refunds on bookings made through our platform.
            </p>

            <h2>1. General Refund Policy</h2>
            <p>
              Our refund policy varies depending on the tour operator and the specific package you have booked. Each
              tour package will clearly state its refund policy on the package details page before you complete your
              booking.
            </p>

            <h2>2. Cancellation by Customer</h2>
            <h3>2.1. Standard Cancellation Policy</h3>
            <p>
              Unless otherwise specified in the package details, the following standard cancellation policy applies:
            </p>
            <ul>
              <li>
                <strong>More than 14 days before the tour start date:</strong> Full refund minus a 5% processing fee
              </li>
              <li>
                <strong>7-14 days before the tour start date:</strong> 75% refund
              </li>
              <li>
                <strong>3-6 days before the tour start date:</strong> 50% refund
              </li>
              <li>
                <strong>Less than 3 days before the tour start date:</strong> No refund
              </li>
            </ul>

            <h3>2.2. Non-Refundable Bookings</h3>
            <p>
              Some packages may be marked as "non-refundable" or have special promotional rates that do not qualify for
              refunds. These conditions will be clearly stated during the booking process.
            </p>

            <h2>3. Cancellation by Tour Operator or হাওয়াবদল</h2>
            <p>
              If a tour is cancelled by the tour operator or হাওয়াবদল due to unforeseen circumstances, weather conditions,
              safety concerns, or insufficient participants, you will be offered one of the following options:
            </p>
            <ul>
              <li>A full refund of the amount paid</li>
              <li>Rebooking for an alternative date at no additional cost (subject to availability)</li>
              <li>Credit for a future booking valid for 12 months</li>
            </ul>

            <h2>4. Partial Cancellation or Changes</h2>
            <p>
              4.1. If you need to reduce the number of participants in your booking, the refund policy will apply to the
              cancelled portion.
            </p>
            <p>
              4.2. Changes to booking dates or package categories are subject to availability and may incur additional
              charges or partial refunds based on price differences.
            </p>

            <h2>5. Refund Process</h2>
            <p>
              5.1. To request a refund, you must submit a refund request through your account dashboard or by contacting
              our customer support team.
            </p>
            <p>5.2. All approved refunds will be processed using the original payment method.</p>
            <p>5.3. Refunds typically take 7-14 business days to process, depending on your payment provider.</p>

            <h2>6. Special Circumstances</h2>
            <h3>6.1. Medical Emergencies</h3>
            <p>
              In case of medical emergencies preventing you from participating in a tour, we may offer a more flexible
              refund policy upon presentation of valid medical documentation.
            </p>

            <h3>6.2. Natural Disasters and Force Majeure</h3>
            <p>
              In the event of natural disasters, political unrest, or other force majeure events, we will work with tour
              operators to provide the most favorable resolution possible, which may include full or partial refunds or
              rebooking options.
            </p>

            <h2>7. No-Show Policy</h2>
            <p>If you fail to show up for your tour without prior notice, you will not be eligible for a refund.</p>

            <h2>8. Exceptions</h2>
            <p>We reserve the right to make exceptions to this policy on a case-by-case basis at our discretion.</p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about our Refund Policy, please contact our customer support team at
              refunds@hawabodol.com or call +880 1XXXXXXXXX.
            </p>

            <p className="text-sm text-muted-foreground mt-8">Last updated: May 1, 2023</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
