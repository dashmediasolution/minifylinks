import React from "react";
import {
  Link as LinkIcon,
  Pencil,
  Share2,
  BarChart3,
  Rocket,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Globe,
  Zap,
  Slack,
} from "lucide-react";

// --- Types ---
interface StepItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
  preview: React.ReactNode;
}

interface FeatureItem {
  number: string;
  tagline: string;
  title: string;
  description: string;
  highlights: string[];
  imageSide: "left" | "right";
  previewUI: React.ReactNode;
}

// --- Top Steps Data ---
const STEPS: StepItem[] = [
  {
    id: 1,
    title: "Create",
    description: "Shorten your long URLs in seconds.",
    icon: LinkIcon,
    colorClass: "bg-blue-600 text-white shadow-blue-200",
    badgeBg: "bg-blue-600",
    badgeText: "text-white",
    preview: (
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm">
        linkora.co/your-link <span className="ml-1 text-slate-400">▾</span>
      </div>
    ),
  },
  {
    id: 2,
    title: "Customize",
    description: "Brand it your way with custom links & domains.",
    icon: Pencil,
    colorClass: "bg-amber-500 text-white shadow-amber-100",
    badgeBg: "bg-amber-500",
    badgeText: "text-white",
    preview: (
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm">
        yourbrand.link/offer <span className="ml-1 text-slate-400">▾</span>
      </div>
    ),
  },
  {
    id: 3,
    title: "Share",
    description: "Share anywhere, connect everywhere.",
    icon: Share2,
    colorClass: "bg-emerald-500 text-white shadow-emerald-100",
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    preview: (
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm text-slate-600">
        <Facebook size={14} className="text-blue-600" />
        <Twitter size={14} className="text-sky-500" />
        <Linkedin size={14} className="text-blue-700" />
        <Instagram size={14} className="text-pink-600" />
      </div>
    ),
  },
  {
    id: 4,
    title: "Track",
    description: "Real-time analytics that matter.",
    icon: BarChart3,
    colorClass: "bg-purple-600 text-white shadow-purple-100",
    badgeBg: "bg-purple-600",
    badgeText: "text-white",
    preview: (
      <div className="flex h-8 w-24 items-end gap-1 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
        <div className="h-2 w-full rounded-sm bg-purple-200"></div>
        <div className="h-4 w-full rounded-sm bg-purple-300"></div>
        <div className="h-6 w-full rounded-sm bg-purple-500"></div>
        <div className="h-3 w-full rounded-sm bg-purple-300"></div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Grow",
    description: "Optimize, improve and grow your audience.",
    icon: Rocket,
    colorClass: "bg-rose-500 text-white shadow-rose-100",
    badgeBg: "bg-rose-500",
    badgeText: "text-white",
    preview: (
      <div className="flex h-8 w-24 items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-rose-300 to-rose-500"></div>
      </div>
    ),
  },
];

// --- Feature Cards Data ---
const FEATURES: FeatureItem[] = [
  {
    number: "01",
    tagline: "ANALYTICS",
    title: "Real-time insights that drive decisions",
    description:
      "Know your audience better with in-depth analytics. Track clicks, location, devices and more.",
    highlights: [
      "Real-time click tracking",
      "Audience geography",
      "Device & browser insights",
    ],
    imageSide: "left",
    previewUI: (
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold text-slate-400">Analytics Overview</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <span className="text-xs text-slate-400">Total Clicks</span>
            <p className="text-lg font-bold text-slate-800">24.8K <span className="text-xs text-emerald-500">+18.2%</span></p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <span className="text-xs text-slate-400">Engagement</span>
            <p className="text-lg font-bold text-slate-800">12.4K <span className="text-xs text-emerald-500">+10.2%</span></p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <span className="text-xs text-slate-400">Conversion</span>
            <p className="text-lg font-bold text-slate-800">3.2K <span className="text-xs text-emerald-500">+5.3%</span></p>
          </div>
        </div>
        <div className="mt-4 flex h-24 items-end gap-2 pt-4 border-t border-slate-100">
          {[40, 65, 30, 85, 95, 50, 70, 60, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-blue-500" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "02",
    tagline: "CUSTOM LINKS",
    title: "Your link, your brand",
    description:
      "Create branded short links that build trust and strengthen your identity.",
    highlights: ["Custom slugs", "Branded domains", "Link expiration"],
    imageSide: "right",
    previewUI: (
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold text-slate-400">Custom Domain</p>
        <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-slate-700 flex justify-between items-center">
          <span>yourbrand.link</span>
          <span className="text-emerald-500 text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Active</span>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-400">Preview</p>
        <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-500">
          yourbrand.link/summer-sale
        </div>
        <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    ),
  },
  {
    number: "03",
    tagline: "TEAMWORK",
    title: "Built for teams and collaboration",
    description:
      "Collaborate with your team, manage permissions and organize links effortlessly.",
    highlights: ["Team members", "Role management", "Shared workspaces"],
    imageSide: "left",
    previewUI: (
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 mb-3">Team Collaboration</p>
        <div className="space-y-3">
          {[
            { name: "Alex Rivera", role: "Admin" },
            { name: "Sarah Chen", role: "Editor" },
            { name: "David Kim", role: "Viewer" },
          ].map((user, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-slate-200 text-xs font-bold flex items-center justify-center text-slate-600">
                  {user.name[0]}
                </div>
                <span className="text-xs font-medium text-slate-700">{user.name}</span>
              </div>
              <span className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "04",
    tagline: "INTEGRATIONS",
    title: "Connect your favorite tools and apps",
    description:
      "Integrate Linkora with tools you already use and automate your workflow.",
    highlights: ["Zapier integration", "Google Analytics", "API access"],
    imageSide: "right",
    previewUI: (
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 mb-4">Integrations</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Google Analytics", icon: Globe, color: "text-amber-500" },
            { name: "Zapier", icon: Zap, color: "text-orange-500" },
            { name: "Slack", icon: Slack, color: "text-purple-600" },
            { name: "Custom API", icon: LinkIcon, color: "text-blue-500" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-xl bg-slate-50/50">
              <item.icon className={`h-6 w-6 ${item.color} mb-1`} />
              <span className="text-[11px] font-medium text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ProcessAndFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50/50 to-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Simple steps. <span className="text-blue-600">Powerful impact.</span>
          </h2>
        </div>

        {/* --- Top 5-Step Process Section --- */}
        <div className="relative mb-24">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-slate-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  {/* Icon Container with Badge */}
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 rounded-full ${step.colorClass} flex items-center justify-center shadow-lg transition-transform hover:scale-105`}>
                      <Icon size={26} />
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${step.badgeBg} ${step.badgeText} text-xs font-semibold flex items-center justify-center ring-2 ring-white`}>
                      {step.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 px-2 leading-relaxed">
                    {step.description}
                  </p>

                  {/* UI Preview Box */}
                  <div className="mt-auto">{step.preview}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Features Alternating Grid --- */}
        <div className="space-y-16 lg:space-y-24">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                feature.imageSide === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Feature Visual / Preview UI */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md rounded-3xl bg-gradient-to-tr from-slate-100 to-blue-50/50 p-4 sm:p-6 shadow-inner">
                  {feature.previewUI}
                </div>
              </div>

              {/* Feature Text Content */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-orange-500 tracking-wider uppercase">
                    {feature.number} {feature.tagline}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-2 pt-2">
                  {feature.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
}