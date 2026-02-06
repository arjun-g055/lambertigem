'use client';

export default function ContactForm() {
  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="relative flex w-full max-w-lg flex-col gap-4 rounded-xl p-6 shadow-lg items-center mx-auto"
    >
      {/* Hidden fields */}
      <input
        type="hidden"
        name="access_key"
        value="922be75a-4d49-48ff-9152-b44efb612782"
      />
      <input
        type="hidden"
        name="redirect"
        value="http://localhost:4321/contact"
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

      {/* Name */}
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-[#670000] focus:outline-none focus:ring-2 focus:ring-[#670000]"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-[#670000] focus:outline-none focus:ring-2 focus:ring-[#670000]"
      />

      {/* Message */}
      <textarea
        name="message"
        required
        placeholder="Your message"
        rows={5}
        className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-[#670000] focus:outline-none focus:ring-2 focus:ring-[#670000]"
      />

      {/* Submit button */}
      <button
        type="submit"
        className="mt-2 rounded-md bg-[#670000] px-6 py-2 text-white transition hover:bg-[#670000] focus:outline-none focus:ring-2 focus:ring-[#670000] focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}
