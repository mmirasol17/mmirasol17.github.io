import React, { useCallback, useMemo, useState } from "react";
import { AnimatedSection } from "../../AnimatedSection";
import { SocialMediaIcon } from "../../Icons/SocialMediaIcon";
import { cn } from "../../../utils/cn";

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function ContactSection() {
  const accessKey = useMemo(() => {
    return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  }, []);

  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  // Honeypot: bots fill every field they find, real people never see this one.
  const [botcheck, setBotcheck] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error when user starts typing
      if (errors[name as keyof ContactForm]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
      // Any edit after a send means the old result no longer describes the form
      setStatus("idle");
      setStatusMessage("");
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (status === "sending") return;
      if (!validateForm()) return;

      if (!accessKey) {
        setStatus("error");
        setStatusMessage("The contact form isn't configured right now. Please reach out on LinkedIn or GitHub instead.");
        return;
      }

      setStatus("sending");
      setStatusMessage("");

      try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Portfolio contact from ${formData.name.trim()}`,
            from_name: "marinmirasol.com",
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            botcheck,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result?.message || "Web3Forms rejected the submission");
        }

        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
        setStatusMessage("Thank you for your message! I'll get back to you soon.");
      } catch (error) {
        console.error("Contact form submission failed:", error);
        setStatus("error");
        setStatusMessage("Something went wrong sending your message. Please try again, or reach out on LinkedIn or GitHub.");
      }
    },
    [accessKey, botcheck, formData, status, validateForm]
  );

  const isSending = status === "sending";

  return (
    <AnimatedSection
      id='contact'
      className='py-16 px-4 bg-gray-800'
    >
      <div className='mx-auto flex justify-center items-center'>
        <div className='w-full max-w-3xl'>
          <h2 className='text-5xl font-bold mb-4 text-blue-400 text-center'>Contact Me</h2>

          <div className='flex items-center gap-3 justify-center mb-8'>
            <SocialMediaIcon
              icon='github'
              className='w-12 h-12'
            />
            <SocialMediaIcon
              icon='linkedin'
              className='w-12 h-12'
            />
            <SocialMediaIcon
              icon='discord'
              className='w-12 h-12'
            />
            <SocialMediaIcon
              icon='instagram'
              className='w-12 h-12'
            />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className='flex flex-col gap-6'
          >
            {/* Honeypot, hidden from people and screen readers alike */}
            <input
              type='checkbox'
              name='botcheck'
              tabIndex={-1}
              autoComplete='off'
              aria-hidden='true'
              checked={botcheck === "true"}
              onChange={(e) => setBotcheck(e.target.checked ? "true" : "")}
              className='hidden'
            />

            <div className='flex flex-col'>
              <label
                className='text-white font-bold mb-2'
                htmlFor='name'
              >
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                value={formData.name}
                onChange={handleChange}
                disabled={isSending}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder='John Doe'
                className={cn(
                  "rounded-3xl p-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60",
                  errors.name && "ring-2 ring-red-500"
                )}
              />
              {errors.name && (
                <span
                  id='name-error'
                  className='text-red-500 text-sm mt-1 italic'
                >
                  {errors.name}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                className='text-white font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={formData.email}
                onChange={handleChange}
                disabled={isSending}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder='johndoe@example.com'
                className={cn(
                  "rounded-3xl p-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60",
                  errors.email && "ring-2 ring-red-500"
                )}
              />
              {errors.email && (
                <span
                  id='email-error'
                  className='text-red-500 text-sm mt-1 italic'
                >
                  {errors.email}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label
                className='text-white font-bold mb-2'
                htmlFor='message'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={10}
                value={formData.message}
                onChange={handleChange}
                disabled={isSending}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder='Hello there Marin! My name is John, and I would love to discuss a project that I am working on!'
                className={cn(
                  "rounded-3xl p-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 resize-vertical disabled:opacity-60",
                  errors.message && "ring-2 ring-red-500"
                )}
              />
              {errors.message && (
                <span
                  id='message-error'
                  className='text-red-500 text-sm mt-1 italic'
                >
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type='submit'
              disabled={isSending}
              className='bg-blue-400 text-white font-bold rounded-2xl py-4 transition hover:scale-[102%] hover:bg-blue-600 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:bg-blue-400 disabled:cursor-not-allowed'
            >
              {isSending ? "Sending..." : "Submit"}
            </button>

            {statusMessage && (
              <p
                role='status'
                aria-live='polite'
                className={cn("text-center font-bold", status === "success" ? "text-green-400" : "text-red-500")}
              >
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
