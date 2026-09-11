"use client";

import React, { useState } from "react";

export default function Contactform() {
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: "",
        address: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="w-full bg-burgundy py-16 sm:py-24 text-ivory">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Form Title & Subtitle */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-astoria text-3xl sm:text-4xl md:text-5xl text-ivory font-normal tracking-wide">
            How Can We Help You Shine?
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-ivory/70 font-light leading-relaxed tracking-wide max-w-xl mx-auto">
            Whether you need personalized guidance on our formulations or have inquiries about your order, our dedicated skincare specialists are here to assist you.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-black/20 border border-ivory/20 rounded-sm px-4 py-3.5 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-ivory/70 focus:bg-black/30 transition-all font-light"
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formState.address}
              onChange={handleChange}
              className="w-full bg-black/20 border border-ivory/20 rounded-sm px-4 py-3.5 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-ivory/70 focus:bg-black/30 transition-all font-light"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-black/20 border border-ivory/20 rounded-sm px-4 py-3.5 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-ivory/70 focus:bg-black/30 transition-all font-light"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formState.phone}
              onChange={handleChange}
              className="w-full bg-black/20 border border-ivory/20 rounded-sm px-4 py-3.5 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-ivory/70 focus:bg-black/30 transition-all font-light"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full bg-black/20 border border-ivory/20 rounded-sm px-4 py-3.5 text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-ivory/70 focus:bg-black/30 transition-all font-light resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="cursor-pointer px-10 py-3 bg-ivory text-near-black hover:bg-rose-mist hover:text-black font-medium text-xs sm:text-sm tracking-[0.15em] uppercase rounded-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {submitted ? "Message Sent" : "Send Message"}
            </button>
          </div>
        </form>

        {/* Connect With Us Section */}
        <div className="mt-20 text-center flex flex-col items-center">
          <h3 className="font-astoria text-2xl sm:text-3xl text-ivory font-normal tracking-wide mb-6">
            Connect with us
          </h3>

          <div className="flex items-center justify-center gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 bg-ivory hover:bg-rose-mist text-near-black flex items-center justify-center rounded-sm transition-transform hover:-translate-y-0.5 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 bg-ivory hover:bg-rose-mist text-near-black flex items-center justify-center rounded-sm transition-transform hover:-translate-y-0.5 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.26 6.26 0 0 0 1.87-4.49V8.62a8.28 8.28 0 0 0 4.9 1.57V6.75a4.86 4.86 0 0 1-1-.06z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 bg-ivory hover:bg-rose-mist text-near-black flex items-center justify-center rounded-sm transition-transform hover:-translate-y-0.5 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-10 h-10 bg-ivory hover:bg-rose-mist text-near-black flex items-center justify-center rounded-sm transition-transform hover:-translate-y-0.5 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4.5 h-4.5"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
