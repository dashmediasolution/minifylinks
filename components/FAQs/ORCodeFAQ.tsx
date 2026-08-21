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
                            Do I need to pay or sign up to generate a QR Code?


                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                            No. With MinifyLinks, you don't have to worry; we offer no registration or paid plan. Just paste any link you have, customize it, and download your QR code immediately with no friction.
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Daily Limit */}
                    <AccordionItem value="item-2" className="bg-white px-6 border-b rounded-none">
                        <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
                            Are the generated QR Codes free to use commercially?


                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                            Yes, MinifyLinks' QR Codes generator is 100% free to use for both standard and customized QR. Our generated QR Codes are reliable and backed by a lifetime guarantee with 99.9% uptime
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Account / Dashboard */}
                    <AccordionItem value="item-3" className="bg-white px-6 border-b rounded-none">
                        <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
                            Do these QR Codes expire over time? 

                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
No, all our standard as well as custom QR Codes are designed to remain active as long as your designated URL is accessible or live. 

                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. Expiration Policy */}
                    <AccordionItem value="item-4" className="bg-white px-6 border-b rounded-none">
                        <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
                        
Can I generate a QR Code for a customized short link?

                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
Yes, simply visit MinifyLinks.com and select QR Studio, enter your destination URL, customize the design, and add a logo (optional). Lastly, click on Download. Your custom QR Code will be available to download along with your shortened link; share both if you like                            
                              </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </section>
    )
}