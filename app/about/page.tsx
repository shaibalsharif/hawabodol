import { PageLayout } from "@/components/layout/page-layout"

export const metadata = {
  title: "About Us | হাওয়াবদল - Hawabodol",
  description: "Learn more about হাওয়াবদল (Hawabodol) and our mission to provide the best travel experiences.",
}

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">About হাওয়াবদল</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              হাওয়াবদল (Hawabodol) is Bangladesh's premier travel and tour package platform, connecting travelers with the
              best tour operators across the country. Our mission is to make travel accessible, enjoyable, and memorable
              for everyone.
            </p>

            <h2>Our Story</h2>
            <p>
              Founded in 2023, হাওয়াবদল was born from a passion for showcasing the natural beauty and cultural richness of
              Bangladesh. Our founders, avid travelers themselves, recognized the need for a platform that could connect
              tourists with reliable tour operators while providing a seamless booking experience.
            </p>

            <h2>Our Mission</h2>
            <p>We aim to promote sustainable tourism in Bangladesh by:</p>
            <ul>
              <li>Connecting travelers with verified and trusted tour operators</li>
              <li>Showcasing the diverse destinations and experiences Bangladesh has to offer</li>
              <li>Supporting local communities through responsible tourism practices</li>
              <li>Providing a transparent and secure booking platform</li>
              <li>Ensuring exceptional customer service at every step of the journey</li>
            </ul>

            <h2>Our Team</h2>
            <p>
              Our team consists of travel enthusiasts, technology experts, and customer service professionals who are
              dedicated to making your travel experience exceptional. With our combined expertise, we strive to offer
              the best travel solutions tailored to your needs.
            </p>

            <h2>Why Choose হাওয়াবদল?</h2>
            <ul>
              <li>
                <strong>Verified Operators:</strong> All tour operators on our platform undergo a strict verification
                process.
              </li>
              <li>
                <strong>Diverse Packages:</strong> From beach getaways to mountain treks, we offer a wide range of tour
                packages.
              </li>
              <li>
                <strong>Secure Booking:</strong> Our platform ensures secure transactions and booking confirmations.
              </li>
              <li>
                <strong>Customer Support:</strong> Our dedicated support team is available to assist you at every step.
              </li>
              <li>
                <strong>Local Expertise:</strong> Benefit from the local knowledge and expertise of our tour operators.
              </li>
            </ul>

            <p>Join us in exploring the beauty of Bangladesh and creating unforgettable travel memories with হাওয়াবদল.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
