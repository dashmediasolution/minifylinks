import React from 'react';
import { ShieldCheck, Calendar, Mail } from 'lucide-react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MinifyLinks",
  description:
    "Read the MinifyLinks Privacy Policy to learn how we collect, use, store, and protect your information.",
  alternates: {
    canonical: "/privacy",
  },
};
export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background py-12 relative top-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <p className="text-sm font-medium">Last Updated: 20 August 2026</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="   p-6 sm:p-10 space-y-10">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Introduction
            </h2>
            <p className="leading-7">
              MinifyLinks ("we," "us," "our," or "company") is fully committed to protecting your privacy. However, please read this Privacy Policy carefully before accessing or using MinifyLinks. If you do not agree with any part of our policies or practices, we urge you not to use our services.
            </p>
            <p className="leading-7">
              This privacy policy explains how we gather, use, disclose, and protect your information when you visit our website and use our services (URL shortening and QR code services).
            </p>
          </section>

          {/* Data Collection */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Data Collection
            </h2>
            
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What data we collect</h3>
              <p className="leading-7 text-muted-foreground">
                As you don't need an account to use MinifyLinks fully, we collect some basic technical info:
              </p>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li><strong>IP Address:</strong> Internet Protocol (IP) addresses for network management and to identify you as a real person, not a bot.</li>
                <li><strong>Device & Browser Info:</strong> What device you're using, model number, operating system, and browser type.</li>
                <li><strong>Location Data:</strong> Using your IP, we know your region/country. Note: We don't track your exact coordinates.</li>
                <li><strong>Referrer Information:</strong> The website or platform that led you to MinifyLinks, such as Google, social media sites or shared referral links.</li>
                <li><strong>Timestamps:</strong> When you create a short URL or QR code.</li>
                <li><strong>Usage Data:</strong> Features and pages you use and visit the most.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Why we collect this data</h3>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li><strong>Service Work:</strong> We use shared data to create short links and QR codes.</li>
                <li><strong>Keeping You Safe:</strong> To identify spammers and people who are trying to abuse the system.</li>
                <li><strong>Making it better:</strong> Understanding how people interact with MinifyLinks to improve services and design.</li>
                <li><strong>Comply with Law:</strong> To fulfill legal obligations, respond to valid court orders, subpoenas, or lawful requests from government authorities.</li>
                <li><strong>Services Quality:</strong> To inspect, resolve technical issues, and monitor performance.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Cookies & tracking</h3>
              <p className="leading-7">We use cookies and tracking technologies to improve the user experience:</p>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li><strong>Essential Cookies:</strong> Essential for basic functionality and security.</li>
                <li><strong>Analytical Cookies:</strong> To deeply understand users' interaction patterns with our services.</li>
                <li><strong>Preference Cookies:</strong> To save your settings and customization choices.</li>
              </ul>
              <p className="leading-7 text-muted-foreground italic">
                You can turn off all non-essential cookies in your browser. However, doing this may affect feature functionality.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">How long do we keep this data</h3>
              <p className="leading-7">
                We delete your technical data, such as IP address, device info, and timestamps, after 90 days. Once that period is over, all stored data is permanently deleted or anonymized.
              </p>
            </div>
          </section>

          {/* URL Storage & Access Logs */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              URL Storage & Access Logs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What we keep on file</h3>
                <p className="leading-7">When you create a shortened URL, we store:</p>
                <ul className="my-6 ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>The original destination URL you provide</li>
                  <li>Your custom alias (if added)</li>
                  <li>When you made it</li>
                  <li>The created short URL</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">We track who clicks your links</h3>
                <p className="leading-7">Every time someone clicks your short link or scans your QR code, we log:</p>
                <ul className="my-6 ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>When it happened</li>
                  <li>Their IP address (city level)</li>
                  <li>What device and browser they used</li>
                  <li>Where they came from</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">How long do your links last</h3>
              <p className="leading-7">
                Shortened links created on our platform are backed by a lifetime guarantee that lasts up to 5 years from the date you created them. After that, the link is deleted and stops redirecting to the destination. We do this because:
              </p>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li>To regulate server costs because we can't keep links forever for free.</li>
                <li>5 years is plenty of time for most links (social media, online campaigns, etc.).</li>
                <li>If you have an important link you want to keep live, you can contact us or simply recreate it before it expires.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Who can see your data</h3>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li><strong>Our team:</strong> If there's a problem with spam, abuse, or technical issues.</li>
                <li><strong>Law Enforcement:</strong> If a judicial body requires data by valid court order or subpoena.</li>
              </ul>
              <p className="leading-7 font-medium text-foreground">
                We never sell or share your data (URLs, short links, or other content) with third parties without your consent, except as required by law.
              </p>
            </div>
          </section>

          {/* QR Code Scanning Data */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              QR Code Scanning Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">How QR scan tracking works</h3>
                <ul className="my-6 ml-6 list-disc space-y-2">
                  <li>When they scanned it</li>
                  <li>Where they are (city level, not exact location)</li>
                  <li>What device and browser they used</li>
                  <li>Where they came from before scanning</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">How long do your QR codes last</h3>
                <ul className="my-6 ml-6 list-disc space-y-2">
                  <li><strong>Lifetime Guarantee:</strong> Works smoothly for up to 5 years from creation</li>
                  <li><strong>Scan Analytics Retention:</strong> Scan data will last for 1-3 months on our servers</li>
                  <li><strong>Aggregated Data:</strong> We may keep basic counts, such as total QR scans</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3 bg-muted p-4 rounded-lg">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">We don't sell your scan data</h3>
              <p className="leading-7 text-muted-foreground">
                We do not give or sell scan data to marketers, advertisers, or anyone else. Your scan data stays safe between you and us. However, we might use completely anonymized stats overall to improve our services.
              </p>
            </div>
          </section>

          {/* Custom Logos & Uploads */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Custom Logos & Uploads
            </h2>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What happens to your logo</h3>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li>Store it on our secure servers.</li>
                <li>Only use it for your CUSTOM QR Code.</li>
                <li>Keep it as long as your QR code or destination URL is accessible.</li>
                <li>Delete it after 5 years or upon request for removal.</li>
              </ul>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">Your logo stays yours</h3>
              <p className="leading-7">
                We do not sell your logos or share them for marketing purposes with other third-party services. It's just for your QR code only. We'll never use it in our ads, show it on our website, share it with other companies, or claim ownership of it.
              </p>
            </div>
          </section>

          {/* User Rights & Data Control */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              User Rights & Data Control
            </h2>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Rights you can access</h3>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li>Contact us with details of your created short URL or QR code. Request access to associated data and analytics.</li>
                <li>Review your uploaded logos and customizations.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Right to Deletion</h3>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li><strong>Specific URL/QR Code:</strong> We immediately deactivate/delete a link or a QR code and all related data to it.</li>
                <li><strong>All your data:</strong> Request complete data removal of your link, analytics, and other related information.</li>
              </ul>
              <p className="leading-7 text-sm text-muted-foreground border-l-4 border-primary pl-4 my-4">
                <strong>Verification Requirement:</strong> Because MinifyLinks does not require user accounts, you must provide proof of ownership when submitting a deletion request. Please include a screenshot showing your creation session, the original destination link, or the specific short link details in your email. Deletion usually takes up to 30 days.
              </p>
            </div>
          </section>

          {/* Security & Data Protection */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Security & Data Protection
            </h2>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">How we protect your data</h3>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li><strong>In transit:</strong> Everything we offer is secured using industry-standard TLS 1.2+ encryption (HTTPS)</li>
                <li><strong>At Rest:</strong> Our databases are encrypted to ensure complete online security</li>
                <li><strong>Access Controls:</strong> Only authorized staff with legitimate business needs can access personal data</li>
                <li><strong>Regular Audits:</strong> We conduct quarterly security audits and penetration testing</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Data Breach Notification & Incident Response</h3>
              <p className="leading-7">If a data breach occurs concerning personal data, we will, within 30 days:</p>
              <ul className="my-6 ml-6 list-disc space-y-2">
                <li>Identify and notify affected users</li>
                <li>Provide clear details of the breach and its scope of action</li>
                <li>Recommend protective action (delete, recreate resources)</li>
                <li>Notify relevant regulatory authorities as the law instructs</li>
              </ul>
              <p className="leading-7 text-muted-foreground">
                We maintain an active security incident response plan and have a Data Protection Protocol to oversee all compliance.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Children's Privacy
            </h2>
            <p className="leading-7">
              MinifyLinks is not directed to children under 13. We do not knowingly collect information from children under 13. However, if we become aware that a child has provided us with personal information, we will immediately delete such information and terminate the child's use of our service. Parents/guardians concerned about their child's privacy by using MinifyLinks should immediately contact us.
            </p>
          </section>

          {/* Policy Changes */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Policy Changes
            </h2>
            <p className="leading-7">
              We may update this Privacy Policy at any time to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by:
            </p>
            <ul className="my-6 ml-6 list-disc space-y-2">
              <li>Posting the updated policy on our website</li>
              <li>Updating the "last updated" date</li>
              <li>Notifying you by email or website pop-up (if email is provided)</li>
            </ul>
            <p className="leading-7 text-muted-foreground">
              Your continued use of MinifyLinks following the posting of any changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-primary/5 p-6 rounded-xl border border-primary/10 mt-8">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="leading-7 mb-6">
              If you have any questions, concerns, or requests related to this Privacy Policy, please feel free to reach out to us.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:support@MinifyLinks.com" className="text-primary hover:underline font-medium">
                  support@MinifyLinks.com
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 15 business days. For urgent security concerns, please use the email above.
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}