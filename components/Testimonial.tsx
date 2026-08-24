'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Assuming these are your custom UI components:
import { Button } from '@/components/ui/button'; 
import { Card, CardContent } from '@/components/ui/card';

export default function TestimonialSection({ testimonials }:any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Fallback if no testimonials are provided
  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-500 via-orange-500 to-orange-400 px-6 py-20">
      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-30 border-white/10" />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-40 border-white/10" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
          
          {/* Heading & Navigation */}
          <div className="text-white">
            <div className="mb-4 text-4xl font-bold">“</div>
            <h2 className="max-w-xs text-3xl font-bold leading-tight">
              What our customers are saying
            </h2>
            
            <div className="mt-8 flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={prevTestimonial}
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white hover:text-orange-500"
               >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={nextTestimonial}
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white hover:text-orange-500"
               >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Dynamic Testimonial Card */}
          <Card className="border-0 bg-white shadow-2xl">
            <CardContent className="p-8">
              <div className="flex gap-5">
                {/* Avatar */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-slate-200 to-slate-400 text-lg font-bold text-white">
                  {current.initials}
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-600">
                    {current.quote}
                  </p>
                  <div className="mt-5">
                    <p className="text-sm font-bold text-slate-900">
                      {current.author}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {current.role}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}