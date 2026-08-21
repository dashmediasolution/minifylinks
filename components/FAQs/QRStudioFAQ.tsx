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
                            How can I create a link and QR Code with MinifyLinks?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                            Visit MinifyLinks.com. Scroll down to the hero section and choose QR Studio. Paste your destination link in the first field and choose color, style, and corner shapes, then add your logo. Preview your QR code and click the "Download Custom QR" button. Lastly, save the QR PNG on your device and share it online.
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Daily Limit */}
                    <AccordionItem value="item-2" className="bg-white px-6 border-b rounded-none">
                        <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
                            What types of content can I link to with a MinifyLinks QR Code?


                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                            The MinifyLinks QR Code can be linked to anything posted online. This means you can use custom QR Codes to link all your web addresses, including web pages, blogs, products, PDFs hosted on websites, and other promotional content online or on social media.
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Account / Dashboard */}
                    <AccordionItem value="item-3" className="bg-white px-6 border-b rounded-none">
                        <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">
                            Can I customize QR Code design?

                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                            Yes! You can customize your QR Code design on MinifyLinks' QR Code Generator. Here is the list of features it offers: colors, patterns (standard, dots, rounded, and classy), and corners (square, circle, and rounded). Additionally, you can add your own brand logos (or custom images).

                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. Expiration Policy */}
                    <AccordionItem value="item-4" className="bg-white px-6 border-b rounded-none">
                        <AccordionTrigger className="text-md font-semibold text-gray-800 hover:text-blue-600 hover:no-underline py-6 text-left">

                            How many times is a QR Code scannable?

                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-6">
                            There is no limit to that, as many times as your audience wants to scan! MinifyLinks is a free platform that features no registration or subscription plans. You can generate and scan an unlimited number of QR Codes and short links.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </section>
    )
}