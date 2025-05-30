// src/components/ContactUsMessage.jsx
import React from 'react';
import contactImg from '../assets/home/Contact.png';
import emailIcon from '../assets/home/Email.png';
import phoneIcon from '../assets/home/Phone.png';

const ContactUsMessage = () => {
  return (
    <section
      className="bg-bgColor px-6 md:px-20 py-[70px] h-[700px] flex justify-center items-center text-snow font-poppins"
    >
      <div className="w-[790.28px] h-[557.06px] flex relative">
        {/* Message Box - Vertically Centered */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[537px] h-[394px] bg-bgColor/40 rounded-l-[8px] flex flex-col justify-center items-center z-10 transition-transform duration-500 ease-in-out hover:scale-105">
          <h2 className="text-[67px] font-normal leading-[124px] text-center">
            Message Of Us
          </h2>

          {/* Description */}
          <p className="text-[16px] font-light leading-[24px] text-center w-full px-4 transition-opacity duration-500 ease-in-out hover:opacity-90">
            We're here to assist you every step of the way. Whether you have a question,
            need technical support, or simply want to share your feedback, our
            dedicated team is ready to listen and provide prompt assistance.
          </p>

          {/* Contact Info */}
          <div className="mt-8 flex justify-around w-full px-4">
            <div className="flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-110">
              <img
                src={emailIcon}
                alt="Email Icon"
                className="w-[36px] h-[36px] mb-2"
              />
              <p className="text-[16px] font-medium">Email</p>
              <p className="text-[16px] font-light mt-1">info@snapwear.com</p>
            </div>
            <div className="flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-110">
              <img
                src={phoneIcon}
                alt="Phone Icon"
                className="w-[36px] h-[36px] mb-2"
              />
              <p className="text-[16px] font-medium">Phone</p>
              <p className="text-[16px] font-light mt-1">+94 74 100 1000</p>
            </div>
          </div>
        </div>

        {/* Contact Image */}
        <img
          src={contactImg}
          alt="Contact Us"
          className="w-[371.28px] h-[557.06px] object-cover absolute right-0 top-0 z-0"
        />
      </div>
    </section>
  );
};

export default ContactUsMessage;
