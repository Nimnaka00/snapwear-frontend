import React from "react";
import deliveryIcon from "../assets/home/Fast-Delivery.png";
import customerIcon from "../assets/home/Customer-service.png";
import returnIcon from "../assets/home/Easy-returns.png";

const services = [
  {
    icon: deliveryIcon,
    title: "Free Delivery",
    description:
      "Get your fashion fix shipped fast — for free, no minimum required.",
  },
  {
    icon: customerIcon,
    title: "24/7 Customer Service",
    description:
      "We’re here for you anytime, anywhere — style help is just a message away.",
  },
  {
    icon: returnIcon,
    title: "Easy Returns",
    description: "Not the perfect fit? No worries — enjoy hassle-free returns.",
  },
];

const OurServices = () => {
  return (
    <section
      className="bg-bgColor px-6 md:px-20 flex flex-col justify-center"
      style={{ height: "518px" }}
    >
      <div
        className="w-full flex flex-col md:flex-row items-start justify-between mt-auto mb-auto"
        style={{ height: "218px" }}
      >
        {services.map(({ icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-start text-snow max-w-[350px] transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={icon}
              alt={title}
              className="w-[68px] h-[68px] object-contain mb-0"
            />
            <p className="text-[28px] font-normal leading-[40px] mt-0 mb-1 font-poppins">
              {title}
            </p>
            <div className="w-[350px] h-[2px] bg-snow mb-[30px]" />
            <p className="text-[16px] font-medium leading-[24px] font-poppins">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
