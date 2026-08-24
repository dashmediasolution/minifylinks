import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section className="py-10 bg-white px-6 md:px-0" id="faq">
      <div className="max-w-3xl mx-auto w-full">

        {/* --- Header --- */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500">
            Support
          </span>
          <h2 className="text-2xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Everything you <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-700">need to know.</span>
          </h2>
        </div>

        {/* --- Accordion --- */}
        <Accordion type="single" collapsible className="w-full space-y-4">

          {/* 1. Free (Removed ad mention) */}
          <AccordionItem value="item-1" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Do I need to create an account to use MinifyLinks?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              Absolutely not. You are free to use MinifyLinks tools to shorten your links and generate custom QR codes instantly without any worry about signing up, logging in, or learning a new dashboard just to use essential marketing tools.            </AccordionContent>
          </AccordionItem>

          {/* 2. Daily Limit */}
          <AccordionItem value="item-2" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Are the shortened links and QR Codes permanent?

            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              Yes. Your shortened links and generated QR codes are permanent, and they remain active indefinitely until your destination link is inaccessible, with a 99.9% uptime guarantee.                      </AccordionContent>

          </AccordionItem>

          {/* 3. Account / Dashboard */}
          <AccordionItem value="item-3" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              How do QR Code generation credits work?

            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              Every user gets free initial credits to create custom QR codes. If your credits run out, you have to watch an ad to instantly renew your credits and claim 100% free QR Code generation.
            </AccordionContent>
          </AccordionItem>

          {/* 4. Expiration Policy */}
          <AccordionItem value="item-4" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Can I customize the link back half and QR Code design?


            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              Yes. You can create short links with custom back-half slugs and add different colors, patterns, and brand logos to your QR Codes using our Custom QR Studio.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  )
}