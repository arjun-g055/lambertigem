'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card flex w-full max-w-[600px] flex-col gap-5 font-sans relative p-8 rounded-2xl"
    >
      {/* Hidden fields */}
      <input
        type="hidden"
        name="access_key"
        value="922be75a-4d49-48ff-9152-b44efb612782"
      />
      <input
        type="hidden"
        name="subject"
        value="New Contact Form Submission"
      />
      <input
        type="hidden"
        name="from_name"
        value="LambertiGEM.org Contact Form"
      />

      {/* Row 1: Name and Email */}
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <div className="relative w-full">
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-[14px] border border-white/[0.12] bg-transparent px-5 py-[14px] text-sm text-[#F5F0EB] placeholder-[#7A6E63] font-light focus:border-[#D4A853]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A853]/30 transition-colors"
          />
          <span className="text-[#C92C2A] absolute top-[14px] right-4 text-xs font-bold leading-none">*</span>
        </div>

        <div className="relative w-full">
          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="w-full rounded-[14px] border border-white/[0.12] bg-transparent px-5 py-[14px] text-sm text-[#F5F0EB] placeholder-[#7A6E63] font-light focus:border-[#D4A853]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A853]/30 transition-colors"
          />
          <span className="text-[#C92C2A] absolute -bottom-2 right-2 text-sm font-bold leading-none">*</span>
        </div>
      </div>


      {/* Message */}
      <div className="relative w-full mt-1">
        <textarea
          name="message"
          required
          placeholder="How can we help?"
          rows={7}
          className="w-full resize-none rounded-[16px] border border-white/[0.12] bg-transparent px-5 py-5 text-sm text-[#F5F0EB] placeholder-[#7A6E63] font-light focus:border-[#D4A853]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A853]/30 transition-colors"
        />
        <span className="text-[#C92C2A] absolute right-3 mt-1/2 translate-y-24 text-sm font-bold leading-none">*</span>
      </div>

      {/* Submit button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-apple rounded-xl border border-transparent bg-[#D4A853] px-7 py-[10px] text-[15px] tracking-wide text-[#0D0608] transition-colors hover:bg-[#E0BB6E] focus:outline-none focus:ring-2 focus:ring-[#D4A853]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[170px]"
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0D0608]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isSubmitting ? 'Sending...' : 'Send your message'}
        </button>
      </div>

      {/* Status banners */}
      {status === 'success' && (
        <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/[0.06] text-[#F5F0EB] px-6 py-4 rounded-[14px] shadow-2xl font-sans font-semibold text-[15px] opacity-100 mt-2 w-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#10B981" />
            <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Successfully submitted!
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center gap-3 bg-[#C92C2A]/20 backdrop-blur-xl border border-[#C92C2A]/30 text-[#F5F0EB] px-6 py-4 rounded-[14px] shadow-2xl font-sans font-semibold text-[15px] opacity-100 mt-2 w-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FFA5A5" />
            <path d="M12 8V12M12 16H12.01" stroke="#C92C2A" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
