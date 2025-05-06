import { PageLayout } from "@/components/layout/page-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ | হাওয়াবদল - Hawabodol",
  description: "Frequently asked questions about হাওয়াবদল (Hawabodol) travel and tour packages.",
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book a tour package?",
      answer:
        "Booking a tour package on হাওয়াবদল is simple. Browse our available packages, select the one you're interested in, choose your preferred dates and category, and complete the booking form. You'll receive a confirmation email once your booking is processed.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking, but cancellation policies vary depending on the tour operator and package. Generally, cancellations made 7 days or more before the tour start date are eligible for a full refund. Please check the specific refund policy for your package on the booking page.",
    },
    {
      question: "How do I pay for my booking?",
      answer:
        "We offer multiple payment options including credit/debit cards, mobile banking (bKash, Nagad), and bank transfers. You can choose your preferred payment method during the checkout process.",
    },
    {
      question: "Are the prices per person or for the entire group?",
      answer:
        "Unless otherwise stated, all prices are per person. The total cost will be calculated based on the number of travelers in your group and the package category you select.",
    },
    {
      question: "What should I pack for my tour?",
      answer:
        "Packing requirements vary depending on your destination and the type of tour. Generally, we recommend comfortable clothing, walking shoes, sunscreen, insect repellent, and any personal medications. Specific packing recommendations will be provided in your booking confirmation email.",
    },
    {
      question: "Are meals included in the tour packages?",
      answer:
        "Meal inclusions vary by package and category. The package details page will specify which meals are included. Most packages include at least breakfast, while premium categories often include all meals.",
    },
    {
      question: "Is transportation included in the packages?",
      answer:
        "Yes, most packages include transportation from a designated meeting point to all destinations included in the itinerary. Some packages also offer pick-up services from specific locations. Check the package details for specific transportation information.",
    },
    {
      question: "How can I become a tour operator on হাওয়াবদল?",
      answer:
        "To become a tour operator on our platform, you need to register for an operator account, provide your company details, and go through our verification process. Once approved, you can start listing your tour packages.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No, we believe in transparent pricing. The price you see is the price you pay, with all included services clearly listed. Any optional activities or services that require additional payment will be clearly marked.",
    },
    {
      question: "What if I have special dietary requirements?",
      answer:
        "You can mention any dietary requirements or restrictions in the 'Special Requests' section when booking. We'll do our best to accommodate your needs, though options may be limited in some remote areas.",
    },
  ]

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>

          <p className="text-muted-foreground mb-8">
            Find answers to common questions about হাওয়াবদল's services, booking process, and policies. If you can't find
            what you're looking for, please{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact us
            </a>
            .
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  )
}
