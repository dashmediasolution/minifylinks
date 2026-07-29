    'use client'

    import { Card, CardContent } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Checkbox } from "@/components/ui/checkbox";
    import { ArrowRight, Link2, QrCode, Loader2 } from 'lucide-react';

    interface UrlShortnerProps {
    url: string;
    setUrl: (value: string) => void;
    customUrl: string;
    setCustomUrl: (value: string) => void;

    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    }

    export default function UrlShortner({
    url,
    setUrl,
    customUrl,
    setCustomUrl,
      loading,
    handleSubmit
    }: UrlShortnerProps) {
    return (
        <Card className="w-full md:w-[70%] mx-auto bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl shadow-blue-500/5 rounded-3xl overflow-hidden mt-8 text-left">
        <CardContent className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSubmit} id="generateURL" className="space-y-5">

            {/* Long URL Input */}
            <div className="space-y-2">
                <Label htmlFor="long-url" className="text-sm font-semibold text-slate-700">
                Destination URL <span className="text-red-500">*</span>
                </Label>
                <div className="relative flex items-center">
                <Link2 className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <Input
                    id="long-url"
                    type="url"
                    required
                    placeholder="https://example.com/my-very-long-link-path"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-11 h-12 text-base border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl"
                />
                </div>
            </div>

            {/* Custom Alias & Domain Container */}
            <div className="space-y-2">
                <Label htmlFor="custom-alias" className="text-sm font-semibold text-slate-700">
                Customize your link <span className="text-slate-400 font-normal">(Optional)</span>
                </Label>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="flex items-center px-3.5 h-12 bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl select-none sm:w-1/2">
                    minifylinks.com/
                </div>
                <Input
                    id="custom-alias"
                    type="text"
                    placeholder="custom-alias"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value.trim())}
                    className="h-12 text-base border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl sm:w-1/2"
                />
                </div>
            </div>

            {/* Options / Checkboxes */}
           

            {/* Submit Action Button */}
            <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
                {loading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Shortening...
                </>
                ) : (
                <>
                    Shorten URL
                    <ArrowRight className="w-5 h-5" />
                </>
                )}
            </Button>

            </form>

            <p className="text-xs text-center text-slate-400 font-medium pt-2">
            By clicking Shorten URL, you agree to our Terms of Service & Privacy Policy.
            </p>
        </CardContent>
        </Card>
    );
    }