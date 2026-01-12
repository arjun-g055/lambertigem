'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // REQUIRED: Web3Forms access key
    formData.append("access_key", "922be75a-4d49-48ff-9152-b44efb612782");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error("Web3Forms error:", data);
        setResult(data.message || "Something went wrong.");
        return;
      }

      setResult("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      setResult("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Email metadata for Web3Forms */}
      <input
        type="hidden"
        name="subject"
        value="New Contact Form Submission"
      />
      <input
        type="hidden"
        name="from_name"
        value="My Website Contact Form"
      />

      {/* User inputs */}
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
      />
      <textarea
        name="message"
        placeholder="Your message"
        required
      />

      <button type="submit">Submit</button>

      {result && <p>{result}</p>}
    </form>
  );
}
