import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from './Logo';

const Footer = () => {
  return (
    <>
      {/* Footer Section */}
      <footer className="bg-slate-900 text-white px-10 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-sm">

          {/* About Section */}
          <div>
            <div className="mb-4">
              <Logo className="h-10" />
            </div>
            <p className="mb-4">
              Bytwise offers comprehensive online learning experiences with expert instructors.
              Transform your career with our industry-relevant courses and hands-on projects.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 text-purple-400 text-xl">
              <FaFacebookF className="hover:text-purple-300 cursor-pointer transition-colors" />
              <FaTwitter className="hover:text-purple-300 cursor-pointer transition-colors" />
              <FaInstagram className="hover:text-purple-300 cursor-pointer transition-colors" />
              <FaLinkedinIn className="hover:text-purple-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Learning Section */}
          <div className="text-center">
            <h3 className="font-bold mb-4 text-lg text-purple-400">LEARNING PATHS</h3>
            <p className="mb-2 hover:text-purple-300 cursor-pointer transition-colors">Web Development</p>
            <p className="mb-2 hover:text-purple-300 cursor-pointer transition-colors">Data Science</p>
            <p className="mb-2 hover:text-purple-300 cursor-pointer transition-colors">UI/UX Design</p>
            <p className="hover:text-purple-300 cursor-pointer transition-colors">Mobile Development</p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-4 text-lg text-purple-400">CONTACT</h3>
            <p className="mb-2">123 Learning Street, Tech City, USA</p>
            <p className="mb-2">+1 (555) 123-4567</p>
            <p className="mb-2">hello@bytwise.com</p>
            <p>www.bytwise.com</p>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-slate-900 text-center text-gray-400 text-xs py-4 border-t border-slate-800">
        © 2025 Bytwise. All rights reserved. | Privacy Policy | Terms of Service
      </div>
    </>
  );
};

export default Footer;