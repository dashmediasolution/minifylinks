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
            Everything you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">need to know.</span>
          </h2>
        </div>

        {/* --- Accordion --- */}
        <Accordion type="single" collapsible className="w-full space-y-4">

          {/* 1. Free (Removed ad mention) */}
          <AccordionItem value="item-1" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Do I need an account to shorten a URL with MinifyLinks?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              No account is required. You can simply paste your URL, set a custom alias, and generate a shortened link immediately without a dashboard or plan purchase.
            </AccordionContent>
          </AccordionItem>

          {/* 2. Daily Limit */}
          <AccordionItem value="item-2" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Can I create custom short links with my own branding?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              Yes. MinifyLinks lets you create custom short links with personalized aliases that match your brand name or tagline. Add something memorable to the alias of your URLs to make them more recognizable and trustworthy for your audience.             </AccordionContent>
          </AccordionItem>

          {/* 3. Account / Dashboard */}
          <AccordionItem value="item-3" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Do your shortened links expire or stop working?

            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              No, MinifyLinks-generated shortened links are backed by a lifetime guarantee. They will remain active indefinitely, redirecting users to your desired destination URL.
            </AccordionContent>
          </AccordionItem>

          {/* 4. Expiration Policy */}
          <AccordionItem value="item-4" className="bg-white px-6 border-b rounded-none">
            <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
              Is MinifyLinks Free? Are there any hidden charges?

            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
              MinifyLinks is completely free with no hidden fees or even sign-ups. Simply create unlimited custom short URLs and QR Codes with branding. We only offer custom features that are free to use for all, and there are no advanced plans that charge.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  )
}