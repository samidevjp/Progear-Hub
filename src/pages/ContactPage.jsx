import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="mb-8">
          <SectionHeading>Contact Us</SectionHeading>
        </div>
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-[#EF4444] text-5xl mb-4">✓</div>
              <p className="text-[#171717] font-montserrat text-lg font-bold">
                Thank you for your message!
              </p>
              <p className="text-[#171717] font-montserrat mt-2">
                We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#171717] font-montserrat font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg font-montserrat focus:outline-none focus:border-[#EF4444]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#171717] font-montserrat font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg font-montserrat focus:outline-none focus:border-[#EF4444]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#171717] font-montserrat font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg font-montserrat focus:outline-none focus:border-[#EF4444] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#EF4444] text-white py-3 rounded-full font-bold font-montserrat hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
        <div className="mt-8 text-center text-[#171717] font-montserrat">
          <p className="mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:sample@sample.com" className="text-[#EF4444] hover:underline">
              sample@sample.com
            </a>
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> 0400 000 000
          </p>
          <p>
            <strong>Address:</strong> 123 Business Street St Kilda, Melbourne VIC 3182
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

