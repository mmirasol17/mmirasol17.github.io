import React, { useCallback, useState } from "react";
import { AnimatedSection } from "../../AnimatedSection";
import { SocialMediaIcon } from "../../Icons/SocialMediaIcon";

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

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
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        // Handle contact form submission
        console.log("Form submitted:", formData);
        setFormData({ name: "", email: "", message: "" });
        alert("Thank you for your message! I'll get back to you soon.");
      }
    },
    [formData, validateForm]
  );

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

          <div className='flex flex-col gap-6'>
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
                value={formData.name}
                onChange={handleChange}
                placeholder='John Doe'
                className={`rounded-3xl p-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "ring-2 ring-red-500" : ""
                }`}
              />
              {errors.name && <span className='text-red-500 text-sm mt-1 italic'>{errors.name}</span>}
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
                value={formData.email}
                onChange={handleChange}
                placeholder='johndoe@example.com'
                className={`rounded-3xl p-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email ? "ring-2 ring-red-500" : ""
                }`}
              />
              {errors.email && <span className='text-red-500 text-sm mt-1 italic'>{errors.email}</span>}
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
                placeholder='Hello there Marin! My name is John, and I would love to discuss a project that I am working on!'
                className={`rounded-3xl p-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 resize-vertical ${
                  errors.message ? "ring-2 ring-red-500" : ""
                }`}
              />
              {errors.message && <span className='text-red-500 text-sm mt-1 italic'>{errors.message}</span>}
            </div>

            <button
              onClick={handleSubmit}
              className='bg-blue-400 text-white font-bold rounded-2xl py-4 transition hover:scale-[102%] hover:bg-blue-600'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
