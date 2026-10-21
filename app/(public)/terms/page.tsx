import React from 'react';
import { Scale, Calendar, Mail, AlertTriangle, ShieldAlert } from 'lucide-react';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MinifyLinks",
  description:
    "Read the MinifyLinks Terms of Service to understand the rules, responsibilities, and conditions for using our URL shortening and QR code generation tools.",
  alternates: {
    canonical: "https://minifylinks.com/terms",
  },
 
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-12 relative top-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Scale className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <p className="text-sm font-medium">Last Updated: 20 August 2026</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 space-y-10">

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Introduction
            </h2>
            <p className="leading-7">
              Welcome to MinifyLinks ("we," "us," "our," or "Company"). These Terms of Service ("Terms") create a legal agreement between you and MinifyLinks governing your use of our website, services, and tools for URL shortening and QR code generation.
            </p>
            <p className="leading-7">
              Please read these Terms carefully. By accessing or using MinifyLinks, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must stop using our services immediately.
            </p>
          </section>

          {/* Your Use of MinifyLinks */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Your Use of MinifyLinks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What You Get</h3>
                <p className="leading-7 text-muted-foreground">MinifyLinks is a free service that allows you to:</p>
                <ul className="my-6 ml-6 list-disc space-y-2">
                  <li>Create shortened URLs that redirect to longer web addresses</li>
                  <li>Generate QR codes for easy sharing and scanning</li>
                  <li>Add custom aliases to your shortened links</li>
                  <li>Upload custom logos to personalize QR codes</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What This Service Is Not</h3>
                <p className="leading-7 text-muted-foreground">MinifyLinks is a utility tool, not a hosting platform. We do not:</p>
                <ul className="my-6 ml-6 list-disc space-y-2">
                  <li>Store or host the content of websites you link to</li>
                  <li>Endorse, verify, or validate the legitimacy of destination URLs</li>
                  <li>Monitor what external websites contain</li>
                  <li>Provide hosting, email, or web development services</li>
                  <li>Guarantee that links will function exactly as you expect</li>
                </ul>
              </div>
            </div>
    
            <div className="space-y-3 bg-muted p-4 rounded-lg mt-4">
              <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">No Account Required</h3>
              <p className="leading-7">You do not need to create an account to use MinifyLinks. However:</p>
              <ul className="my-2 ml-6 list-disc space-y-1 text-muted-foreground">
                <li>You can create shortened links anonymously without any registration</li>
                <li>For certain features (newsletter), you may choose to provide an email address</li>
                <li>Any contact information you provide must be accurate and current</li>
              </ul>
            </div>
          </section>

          {/* Your Responsibilities */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Your Responsibilities
            </h2>
            <p className="leading-7">When you use MinifyLinks, you agree to:</p>

            <div className="space-y-6 pl-4 border-l-2 border-primary/20">
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Follow the Law</h3>
                <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>Only create links to content that is legal in your jurisdiction</li>
                  <li>Comply with all applicable laws, regulations, and industry standards</li>
                  <li>Not use MinifyLinks to violate anyone's rights</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Respect Others</h3>
                <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>Do not impersonate or misrepresent your identity or affiliation</li>
                  <li>Do not mislead users about where a shortened link leads</li>
                  <li>Do not create links designed to trick or deceive people</li>
                  <li>Do not use MinifyLinks to harass, threaten, or defame anyone</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 border-b pb-2">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Prohibited Uses
              </h2>
            </div>
            <p className="leading-7 font-medium">You absolutely cannot use MinifyLinks to:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight text-destructive">Harmful & Illegal Content</h3>
                <ul className="my-2 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                  <li>Create links to sexual abuse material or any content sexualizing minors</li>
                  <li>Link to content that promotes violence, terrorism, or hate crimes</li>
                  <li>Distribute malware, spyware, ransomware, or other harmful software</li>
                  <li>Create links for human trafficking, forced labor, or exploitation</li>
                  <li>Link to content that violates any applicable laws</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight text-destructive">Fraud & Deception</h3>
                <ul className="my-2 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                  <li>Create phishing links or fake websites designed to steal credentials or information</li>
                  <li>Launch scams, financial fraud, or identity theft schemes</li>
                  <li>Create misleading links that don't go where users expect ("clickbait redirection")</li>
                  <li>Impersonate legitimate brands or organizations to deceive users</li>
                  <li>Use shortened links to bypass security measures or filters</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight text-destructive">Spam & Abuse</h3>
                <ul className="my-2 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                  <li>Send unsolicited bulk links (spam) to people who didn't ask for them</li>
                  <li>Use automated tools to mass-generate links without legitimate purpose</li>
                  <li>Bypass our systems or attempt to overload our servers</li>
                  <li>Use MinifyLinks to distribute spam emails or unwanted messages</li>
                  <li>Create deceptive links with misleading anchor text or descriptions</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight text-destructive">Intellectual Property Violations</h3>
                <ul className="my-2 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                  <li>Link to pirated content, cracked software, or illegal downloads</li>
                  <li>Create links designed to infringe copyrights, trademarks, or patents</li>
                  <li>Link to content that violates someone else's intellectual property rights</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="scroll-m-20 text-lg font-semibold tracking-tight text-destructive">Other Abuse</h3>
              <ul className="my-2 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                <li>Use MinifyLinks as part of a botnet, malware distribution network, or hacking campaign</li>
                <li>Attempt to reverse engineer, hack, or gain unauthorized access to our systems</li>
                <li>Sell, trade, or transfer shortened links to others without legitimate business purpose</li>
                <li>Create patterns of behavior that suggest coordinated abuse or manipulation</li>
              </ul>
            </div>
          </section>

          {/* What Happens If You Violate These Rules */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              What Happens If You Violate These Rules
            </h2>
            <p className="leading-7">If we determine you've violated these Terms:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">We May Deactivate Your Links</h3>
                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Delete shortened URLs that violate these Terms</li>
                  <li>Disable QR codes linked to prohibited content</li>
                  <li>Remove any associated analytics or custom logos</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">We May Ban You</h3>
                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Suspend your ability to create new shortened links</li>
                  <li>Block access to any accounts or IP addresses associated with abuse</li>
                  <li>Delete all your data if violations are serious or repeated</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">We May Report You</h3>
                <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Share information about violations with law enforcement if the content is illegal</li>
                  <li>Report phishing, malware, or fraud to relevant authorities and organizations</li>
                  <li>Work with ISPs and platforms to prevent further abuse</li>
                </ul>
              </div>
            </div>
            <p className="leading-7 font-medium text-destructive">
              No Refunds (Since It's Free): Since MinifyLinks is free, there are no refunds or credits to issue. We simply remove access.
            </p>
          </section>

          {/* Intellectual Property & Your Content */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Intellectual Property & Content
            </h2>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Our Intellectual Property</h3>
              <p className="leading-7 text-muted-foreground">
                MinifyLinks, our logo, design, and technology are protected by copyright and trademark law. You may use our service, but you do not own or have rights to our platform, code, or brand.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Your Content</h3>
              <p className="leading-7">When you create a shortened URL or upload a logo:</p>
              <ul className="my-2 ml-6 list-disc space-y-2">
                <li>You retain ownership of the original URL and logos you create</li>
                <li>You give us permission to store, process, and display them to make our service work</li>
                <li>You confirm you have the right to shorten the URL you provide</li>
                <li>We do not claim ownership of your shortened links or logos</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Logos You Upload</h3>
              <ul className="my-2 ml-6 list-disc space-y-2">
                <li>Your logos stay yours—we don't use them for marketing or sell them</li>
                <li>We store them only to display on your QR codes</li>
                <li>If you ask us to delete your logo, we remove it immediately</li>
                <li>After your link expires (5 years), we delete your logo automatically</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Websites & Content */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Third-Party Websites & Content
            </h2>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">We're Not Responsible for External Sites</h3>
              <p className="leading-7">MinifyLinks is not responsible for the content, accuracy, or legality of any website you link to. Here's what that means:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>We don't review where your shortened links point to</li>
                <li>We don't verify that external websites are safe, secure, or legitimate</li>
                <li>We don't monitor what those sites do with user data</li>
                <li>You use linked content at your own risk</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What Users See When They Click</h3>
              <p className="leading-7">When someone clicks a MinifyLinks link:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>They see a brief "redirect" page (showing the destination)</li>
                <li>Then they're taken to the actual website</li>
                <li>That website's privacy policy and terms apply, not ours</li>
              </ul>
              <p className="leading-7 italic border-l-4 border-muted pl-4">We recommend users check where a link goes before clicking, just like any link on the internet.</p>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">External Website Changes</h3>
              <p className="leading-7">Websites change all the time—they might move, change owners, or disappear. If a link you created stops working:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>This is your responsibility to monitor and fix</li>
                <li>You can recreate the link before it expires (2-year lifetime)</li>
                <li>We don't notify you if destination websites go down</li>
              </ul>
            </div>
          </section>

          {/* Liability Limitations */}
          <section className="space-y-6 border-2 border-primary/20 rounded-xl p-6 bg-primary/5">
            <div className="flex items-center space-x-3">
              <ShieldAlert className="w-8 h-8 text-primary" />
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Our Liability Limitations
              </h2>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">What We're Not Liable For</h3>
              <p className="leading-7">To the fullest extent allowed by law, MinifyLinks is not liable for:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Loss of data, money, or earnings</li>
                <li>Interrupted or unavailable service</li>
                <li>Shortened links that don't work as expected</li>
                <li>Content on external websites you link to</li>
                <li>Viruses, malware, or security issues on linked websites</li>
                <li>Hacking, data breaches, or unauthorized access to your links (except due to our negligence)</li>
                <li>Third-party services we use (analytics tools, CDNs, etc.)</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-primary/20">
              <p className="leading-7">
                <strong>This Means:</strong> If you lose money, data, or have other problems because of MinifyLinks or a link you created, we're not responsible for compensating you—with the exception of direct damages caused by our gross negligence or illegal actions.
              </p>
              <p className="leading-7">
                <strong>Why This Matters:</strong> We're a free URL shortening service. We can't cover every possible problem or liability. These limitations help us stay operational and free.
              </p>
            </div>
          </section>

          {/* Service Availability, Changes & Termination */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Service Operations & Termination
            </h2>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Uptime (No Guarantees)</h3>
              <p className="leading-7">We aim to keep MinifyLinks running 24/7, but:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>We don't guarantee 100% uptime or availability</li>
                <li>Service interruptions may happen for maintenance, updates, or emergencies</li>
                <li>We'll try to notify you of planned maintenance, but we don't always can</li>
                <li>If service is down, links may not redirect temporarily—but they usually come back</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">We Can Change Things</h3>
              <p className="leading-7">We may update, modify, or discontinue features at any time:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>We may change how shortened links work</li>
                <li>We may add or remove analytics features</li>
                <li>We may update our technology or infrastructure</li>
                <li>We may restrict who can use certain features</li>
                <li>We're not liable if changes affect your links or workflow</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">You Can Stop Anytime</h3>
                <p className="leading-7 text-muted-foreground">
                  You can stop using MinifyLinks whenever you want. Just stop creating links and we have no further obligations to you.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">We Can Terminate You</h3>
                <p className="leading-7 text-muted-foreground">
                  We may suspend or terminate your access if you violate these Terms, engage in abuse, your activity harms us, or we decide to shut down our service entirely.
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Upon termination:</h4>
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                <li>Your shortened links may be deleted</li>
                <li>Your analytics and data may be removed</li>
                <li>You lose access to any premium features (if applicable)</li>
                <li>This does not affect links you already created (they stay active until the 2-year expiration)</li>
              </ul>
            </div>
          </section>

          {/* Account Suspension & Appeals */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              Account Suspension & Appeals
            </h2>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">If We Suspend Your Account</h3>
              <p className="leading-7">If we believe you've violated these Terms:</p>
              <ul className="my-2 ml-6 list-disc space-y-2">
                <li>We may immediately disable your ability to create new links</li>
                <li>We may delete shortened links associated with the violation</li>
                <li>We may delete your account and associated data</li>
                <li>We may block your IP address from using MinifyLinks</li>
              </ul>
              <p className="leading-7 text-muted-foreground italic">You'll typically receive notice of suspension, but in cases of serious abuse, we may suspend first and explain later.</p>
            </div>
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Appeal Process</h3>
              <p className="leading-7">If you believe your suspension was a mistake:</p>
              <ul className="my-2 ml-6 list-disc space-y-2">
                <li>Email us at <a href="mailto:support@MinifyLinks.com" className="text-primary hover:underline">support@MinifyLinks.com</a> with details</li>
                <li>Explain why you think the suspension was wrong</li>
                <li>We'll review your case and respond within 15 business days</li>
                <li>Our decision is final</li>
              </ul>
            </div>
          </section>

          {/* Indemnification & Warranties */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                Indemnification
              </h2>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">You Protect Us</h3>
              <p className="leading-7">You agree to defend, indemnify, and hold harmless MinifyLinks from any claims, damages, costs, or expenses (including legal fees) arising from:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Your use of MinifyLinks</li>
                <li>Your shortened links and QR codes</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of anyone's rights</li>
                <li>Your illegal activity</li>
              </ul>
              <p className="leading-7 font-medium">In other words, if someone sues us because of something you did on our platform, you're responsible for covering our costs, not us.</p>
            </div>

            <div className="space-y-4 pt-6">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                Warranties & Disclaimers
              </h2>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">We Provide MinifyLinks "As-Is"</h3>
              <p className="leading-7">MinifyLinks is provided "as-is" and "as-available" without any warranties. Specifically:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>We don't guarantee that our service is error-free or always works perfectly</li>
                <li>We don't guarantee that links will function forever or as expected</li>
                <li>We don't guarantee that your data is completely secure</li>
                <li>We don't warrant that the service will meet your specific needs</li>
                <li>We don't guarantee any particular performance or uptime level</li>
              </ul>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">No Technical Support Guarantee</h3>
              <p className="leading-7">While we try to help with support requests. We:</p>
              <ul className="my-2 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Aim to respond within 15 business days</li>
                <li>May take longer during high-volume periods</li>
                <li>Cannot guarantee we'll fix every technical issue</li>
                <li>May not support older browsers or unusual configurations</li>
              </ul>
            </div>
          </section>

          {/* Legal Misc (Privacy, Payment, Governing Law) */}
          <section className="space-y-6">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              General Provisions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Privacy, Data & Cookies</h3>
                <p className="leading-7 text-sm text-muted-foreground">
                  For details on how we collect, use, and protect your data, please see our Privacy Policy. We retain technical data for 90 days and shortened links for up to 5 years. We do not sell your data. By using MinifyLinks, you consent to our use of cookies and tracking technologies.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Payment & Free Service</h3>
                <p className="leading-7 text-sm text-muted-foreground">
                  MinifyLinks is completely free with no hidden charges. If we ever introduce paid premium features, a separate agreement will govern payment terms, and you will need to explicitly opt-in.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Links & Affiliates</h3>
                <p className="leading-7 text-sm text-muted-foreground">
                  We are not responsible for the content or legality of third-party websites linked through our platform. If MinifyLinks is acquired or enters affiliate relationships, we will update this section and notify you.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Governing Law</h3>
                <p className="leading-7 text-sm text-muted-foreground">
                  These Terms are governed by the laws of California, USA. Disputes will initially be attempted to be resolved informally within 30 days. To the extent allowed by law, you agree to resolve disputes individually, not as part of a class action lawsuit.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Severability & Agreement</h3>
                <p className="leading-7 text-sm text-muted-foreground">
                  If any part of these Terms is unenforceable, it will be modified or removed, and the rest remains in effect. These Terms, our Privacy Policy, and Acceptable Use Policy make up the entire legal agreement between us.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Changes to These Terms</h3>
                <p className="leading-7 text-sm text-muted-foreground">
                  We may update these Terms at any time by posting the updated version and modifying the "Last Updated" date. Continued use constitutes acceptance.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className="bg-primary/5 p-6 rounded-xl border border-primary/10 mt-8">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="leading-7 mb-6 text-muted-foreground">
              If you have questions about these Terms of Service, please contact the MinifyLinks Legal Team:
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:support@MinifyLinks.com" className="text-primary hover:underline font-medium">
                  support@MinifyLinks.com
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Response Time:</strong> We aim to respond to all inquiries within 15 business days. For urgent matters, please use the email above.
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
