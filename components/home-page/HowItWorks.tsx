import { cn } from "@/lib/utils";
import { Link2, MousePointerClick, Share2 } from "lucide-react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

function StepCard({ number, title, description, icon: Icon }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-2 group overflow-hidden z-10">
      
      {/* Large Watermark Number */}
      <div className="absolute -top-6 -right-4 text-[150px] font-black text-gray-50/80 group-hover:text-blue-50/40 transition-colors duration-500 pointer-events-none select-none leading-none">
        {number}
      </div>
      
      {/* Icon Circle */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm mb-6 relative z-10 rotate-3 group-hover:rotate-0">
        <Icon className="w-10 h-10" />
      </div>
      
      {/* Step Badge */}
      <div className="mb-4 relative z-10">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
          Step {number}
        </span>
      </div>
      
      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 relative z-10 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium relative z-10">
        {description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 px-6 md:px-0">
      {/* The Grey Container Wrapper */}
      <div className="max-w-7xl mx-auto bg-slate-50/50 border border-slate-100 rounded-[3rem] py-16 px-6 md:px-16 text-center">
        
        {/* Header Section */}
        <div className="relative z-10 mb-16 sm:mb-20 max-w-2xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 bg-blue-100/50 px-4 py-2 rounded-full">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mt-4">
             Create Short Links in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">3 Steps.</span>
          </h2>
        </div>

        {/* 3-Card Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
           {/* Connecting dashed line (Desktop only) */}
           <div className="hidden md:block absolute top-[5rem] left-[16%] right-[16%] h-0 border-t-[3px] border-dashed border-slate-200 z-0" />
           
           <StepCard 
             number="01" 
             icon={Link2}
             title="Paste Your Link" 
             description="To get started, take that long, messy web address from your browser and paste it into the box on our URL shortener page. Don't worry if it’s a deep link to a product or a complicated blog post. Our tool will handle it immediately." 
           />
           <StepCard 
             number="02" 
             icon={MousePointerClick}
             title="Click Shorten" 
             description="After hitting the Shorten button, you'll be able to see our system that spans the globe almost instantaneously. It will take your long link and turn it into a short, neat, and tidy link. It will take less than 5 seconds, and you’re good to go." 
           />
           <StepCard 
             number="03" 
             icon={Share2}
             title="Share Anywhere" 
             description="Copy your fresh new link and go to any platform of your choice. If it’s a post on social media or an email, or maybe even a printed flyer, the results from your URL shortener are permanent and secure and will be tracked in real time." 
           />
        </div>

      </div>
    </section>
  );
}