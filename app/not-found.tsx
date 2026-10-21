
import Link from "next/link";
import { Link2 } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-4 text-slate-900">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl" />

            <div className="relative z-10 flex max-h-full w-full max-w-xl flex-col items-center justify-center text-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="mb-4 inline-flex shrink-0 items-center gap-2.5"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <Link2 size={21} />
                    </span>

                    <span className="text-xl font-extrabold tracking-tight text-slate-900">
                        Minify<span className="text-blue-600">Links</span>
                    </span>
                </Link>

                {/* Illustration */}
                <Image
                    src="/images/not-found.svg"
                    alt="404 page not found illustration"
                    width={520}
                    height={360}
                    priority
                    className="mb-3 h-auto max-h-[52dvh] w-auto max-w-full object-contain"
                />

                {/* Error message */}
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
                    Error 404
                </p>

                <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                    Oops! This link leads nowhere.
                </h1>

                <p className="mx-auto max-w-lg text-sm leading-6 text-slate-500">
                    The page you&apos;re looking for doesn&apos;t exist or may have
                    been moved. Check the URL or head back to MinifyLinks
                    to create your next short link.
                </p>

                {/* Footer */}
                <div className="mt-5 border-t border-slate-200 pt-3">
                    <p className="text-xs text-slate-400">
                        Make every link shorter and smarter.
                    </p>

                    <Link
                        href="/"
                        className="mt-1 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                        MinifyLinks.com
                    </Link>
                </div>
            </div>
        </main>
    );
}
