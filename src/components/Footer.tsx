// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 h-[8vh] flex items-center justify-between px-5">
      {/* Left: Copyright */}
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Car Store. All rights reserved.
      </p>

      {/* Right: Social Media */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg
            className="w-5 h-5 text-blue-600 hover:text-blue-800 transition"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-2.9h2V9.8c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
          </svg>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg
            className="w-5 h-5 text-pink-500 hover:text-pink-700 transition"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4a4.6 4.6 0 011.6 1.1c.4.4.8 1 1.1 1.6.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3a4.6 4.6 0 01-1.1 1.6 4.6 4.6 0 01-1.6 1.1c-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4a4.6 4.6 0 01-1.6-1.1 4.6 4.6 0 01-1.1-1.6c-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3a4.6 4.6 0 011.1-1.6 4.6 4.6 0 011.6-1.1c.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2.3c-3.1 0-3.4 0-4.6.1-1 .1-1.6.2-2 .4-.5.2-.9.4-1.3.9-.5.5-.7.9-.9 1.3-.2.4-.3 1-.4 2-.1 1.2-.1 1.5-.1 4.6s0 3.4.1 4.6c.1 1 .2 1.6.4 2 .2.5.4.9.9 1.3.5.5.9.7 1.3.9.4.2 1 .3 2 .4 1.2.1 1.5.1 4.6.1s3.4 0 4.6-.1c1-.1 1.6-.2 2-.4.5-.2.9-.4 1.3-.9.5-.5.7-.9.9-1.3.2-.4.3-1 .4-2 .1-1.2.1-1.5.1-4.6s0-3.4-.1-4.6c-.1-1-.2-1.6-.4-2-.2-.5-.4-.9-.9-1.3-.5-.5-.9-.7-1.3-.9-.4-.2-1-.3-2-.4-1.2-.1-1.5-.1-4.6-.1zm0 3.7a5.8 5.8 0 110 11.6 5.8 5.8 0 010-11.6zm0 2.3a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.7-2.7a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z" />
          </svg>
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
        >
          <svg
            className="w-5 h-5 text-gray-700 hover:text-black transition"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.3 3H17l-4.3 6.3L8.7 3H3l7.7 10.6L3 21h3.3l4.6-6.7 4.7 6.7H21l-8.2-11.2L20.3 3z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
