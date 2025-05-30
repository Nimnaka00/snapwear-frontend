// src/components/Footer.jsx
import React from 'react';
import logo from '../assets/navbar/logo-white.png';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-footerBg px-6 md:px-20 pt-10 pb-6 text-snow font-poppins">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        {/* Logo & Newsletter */}
        <div className="md:w-1/2">
          <img src={logo} alt="SnapWear Logo" className="w-[117px] h-[81.47px] mb-4" />
          <p className="mb-4 text-[16px] font-medium max-w-md">
            Join our news letter to stay up to date on features and releases.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[380px] h-[48px] px-4 bg-transparent border border-snow text-snow rounded-[8px]"
            />
            <button className="w-[153px] h-[48px] bg-russianViolet rounded-[8px] text-snow font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-[12px] text-[#B0B0B0] mt-3 max-w-md">
            By subscribing you agree to with our <span className="underline">Privacy Policy</span> and provide consent to receive updates from our company.
          </p>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:w-1/2">
          <div>
            <h4 className="text-[16px] font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-[14px]">
              <li>About us</li>
              <li>Contact us</li>
              <li>Size chat</li>
              <li>Shop</li>
              <li>Collection</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold mb-3">Useful links</h4>
            <ul className="space-y-2 text-[14px]">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Support</li>
              <li>FAQs</li>
              <li>Shipping details</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold mb-3">Follow Us</h4>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-center gap-3"><FaFacebookF /> Facebook</li>
              <li className="flex items-center gap-3"><FaInstagram /> Instagram</li>
              <li className="flex items-center gap-3"><FaXTwitter /> X</li>
              <li className="flex items-center gap-3"><FaLinkedinIn /> LinkedIn</li>
              <li className="flex items-center gap-3"><FaYoutube /> Youtube</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-6 border-[#3D3D3D]" />

      <div className="flex flex-col md:flex-row justify-between text-[14px] text-[#B0B0B0]">
        <p>©All rights reserved. SNAPWEAR 2025</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <span className="underline">Privacy Policy</span>
          <span className="underline">Terms of Service</span>
          <span className="underline">Cookies Settings</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
