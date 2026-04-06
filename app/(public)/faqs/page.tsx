import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | MinifyLinks",
  description: "Answers to common questions about MinifyLinks and URL shortening.",
  alternates: {
    canonical: "/faqs",
  },
};

const faqs = [
  {
    question: "Which URL shortener is most popular?",
    answer: "With its history and enterprise outreach, Bitly is the market captain. However, TinyURL and Rebrandly continue to be the top contenders for link shortening and link branding, respectively. Clearing the clutter from legacy systems, Minifylinks is also 2026 people's favorite future star."
  },
  {
    question: "What is the need for a URL shortener?",
    answer: "Long links can be an eyesore as well as breaking the flow in marketing. In addition, they use up character limits. URL shorteners can provide you with clean and professional-looking links that will help you to track the data for who clicked, when they clicked, and what the locations of the users are to build the future marketing strategy."
  },
  {
    question: "What are the benefits of Minifylinks?",
    answer: "Minifylinks offers a \"no-signup\" experience that respects your time. It provides high-end features like enterprise-grade encryption, a global edge network, smooth performance, and 99.9% uptime for free. It’s built for the 2026 web, focusing on speed, deep analytics, and privacy-first link management that actually helps your brand grow."
  },
  {
    question: "Is a free URL shortener safe?",
    answer: "Minifylinks and other premier free URL shorteners take advantage of advanced encryption and malware detection technologies to protect you and other URL shortener users. For the protection of both your information and your audience's devices, you can use URL shorteners with clear privacy policies."
  },
  {
    question: "What is the best free URL shortener service?",
    answer: "For most, Minifylinks is the winner because it balances speed with advanced features like encryption and global networks. TinyURL is great for simple, \"forever\" links, while Bitly’s free tier works for very light users. If you need open-source flexibility, Dub.co is a fantastic alternative for tech-savvy creators."
  }
];

export default function FaqsPage() {
  return (
    <div className="py-16 md:py-24 px-6 max-w-3xl mx-auto min-h-[70vh]">
      
      {/* --- Header --- */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 bg-blue-100/50 px-4 py-2 rounded-full">
          Support
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mt-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">Questions</span>
        </h1>
      </div>

      {/* --- Accordion --- */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md md:text-lg font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}