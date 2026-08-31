"use client";

import axios from "axios";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post("/api/contact", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.error ||
            "Failed to submit message. Please try again."
        );
      } else {
        setErrorMessage("An unexpected network error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-orange-50/20 px-4 py-12 text-gray-800 lg:py-20">
      {/* Background Decorative Ambient Elements */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8F3E13]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B1102]/10 text-[#3B1102] shadow-inner ring-1 ring-[#3B1102]/15 transition-transform hover:scale-105">
            <MessageSquare size={26} />
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Get in <span className="text-[#8F3E13]">Touch</span>
          </h1>
          <p className="mx-auto max-w-lg text-sm text-gray-600 sm:text-base">
            Have questions regarding our AI Candidate Evaluation platform,
            subscription tiers, or API access? Reach out to us below.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Contact Info Sidebar */}
          <div className="space-y-6 md:col-span-5">
            <div className="rounded-3xl border border-gray-100 bg-white/80 p-7 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
              <h2 className="mb-6 text-base font-bold tracking-tight text-gray-900">
                Contact Information
              </h2>
              <div className="space-y-6 text-sm">
                <div className="group flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-100/80 text-gray-700 shadow-sm transition-all duration-300 group-hover:bg-[#3B1102] group-hover:text-[#F6C98F]">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Operating Entity
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      RozgaarAI
                    </p>
                    <p className="text-xs text-gray-400">
                      Operated by Sumit Chauhan
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-100/80 text-gray-700 shadow-sm transition-all duration-300 group-hover:bg-[#3B1102] group-hover:text-[#F6C98F]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <a
                      href="mailto:sumit.chauhan.code@gmail.com"
                      className="text-xs font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                      sumit.chauhan.code@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-100/80 text-gray-700 shadow-sm transition-all duration-300 group-hover:bg-[#3B1102] group-hover:text-[#F6C98F]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone Support</p>
                    <a
                      href="tel:+919826787350"
                      className="text-xs font-medium text-gray-600 transition hover:text-gray-900 hover:underline"
                    >
                      +91 98267 87350
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-100/80 text-gray-700 shadow-sm transition-all duration-300 group-hover:bg-[#3B1102] group-hover:text-[#F6C98F]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Support Hours</p>
                    <p className="text-xs text-gray-600">
                      Mon – Sat: 9:00 AM – 6:00 PM IST
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400">
                      Typical response time: Within 24–48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Desk Box */}
            <div className="relative overflow-hidden rounded-3xl border border-[#3B1102]/15 bg-gradient-to-br from-[#3B1102]/10 via-[#3B1102]/5 to-transparent p-6 text-xs leading-relaxed text-gray-700 backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2 font-bold text-[#3B1102]">
                <Sparkles size={16} className="text-[#8F3E13]" />
                <span>Support Desk</span>
              </div>
              For credit inquiries, billing questions, or software guidance,
              submit your message here and our support team will review your
              request.
            </div>
          </div>

          {/* Form Container */}
          <div className="rounded-3xl border border-gray-100 bg-white/90 p-7 shadow-xl shadow-gray-200/50 backdrop-blur-xl md:col-span-7 lg:p-9">
            {submitted ? (
              <div className="animate-in fade-in zoom-in-95 flex h-full min-h-[360px] flex-col items-center justify-center p-6 text-center duration-300">
                {/* Success Icon Badge */}
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100/70 shadow-sm ring-8 ring-emerald-50">
                  <CheckCircle2
                    size={44}
                    className="text-emerald-600 drop-shadow-sm"
                  />
                </div>

                {/* Main Heading */}
                <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Message Received!
                </h3>

                {/* Readable Body Text */}
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed font-medium text-gray-700">
                  Thank you for reaching out. We have logged your request and
                  our support team will reply to your email address shortly.
                </p>

                {/* Theme-aligned CTA Button */}
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3B1102] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#3B1102]/20 transition-all duration-200 hover:bg-[#501803] hover:shadow-lg active:scale-95"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                <h2 className="text-lg font-bold text-gray-900">
                  Send a Message
                </h2>

                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs font-medium text-red-600 backdrop-blur-sm">
                    <AlertCircle size={18} className="shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[#3B1102] focus:bg-white focus:ring-2 focus:ring-[#3B1102]/15 focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[#3B1102] focus:bg-white focus:ring-2 focus:ring-[#3B1102]/15 focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={e =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 focus:border-[#3B1102] focus:bg-white focus:ring-2 focus:ring-[#3B1102]/15 focus:outline-none"
                  >
                    <option>General Inquiry</option>
                    <option>Billing & Credit Packages</option>
                    <option>Technical Support</option>
                    <option>API & Custom Integration</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Message Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[#3B1102] focus:bg-white focus:ring-2 focus:ring-[#3B1102]/15 focus:outline-none"
                    placeholder="Describe your inquiry or support issue..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3B1102] py-3.5 font-semibold text-white shadow-lg shadow-[#3B1102]/20 transition-all duration-200 hover:bg-[#501803] hover:shadow-xl hover:shadow-[#3B1102]/25 active:scale-[0.99] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
