import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import slug from "slug";
import { PiInstagramLogo } from "react-icons/pi";
import { PiFacebookLogo } from "react-icons/pi";
import { PiLinkedinLogoLight } from "react-icons/pi";

const Footer = () => {
  const menu = ["Men", "Women", "Children", "Brand", "New", "Popular"];
  const support = [
    "Shipping and Returns",
    "FAQs",
    "Help & Conditions",
    "About",
    "Contact",
  ];

  const socialLinks = [
    {
      icon: <PiInstagramLogo />,
      link: "/instagram",
    },
    {
      icon: <PiFacebookLogo />,
      link: "/facebook",
    },
    {
      icon: <PiLinkedinLogoLight />,
      link: "/linkedin",
    },
  ];
  return (
    <div className="p-4">
      <div className="bg-gray-100 rounded-2xl">
        <div className="grid grid-cols-2 p-10">
          <div className="space-y-10 mr-50">
            <p className="text-3xl">
              SUBSCRIBE TO OUR NEWSLETTER AND BE THE FIRST TO KNOW ABOUT THE
              LATEST RELEASES, OFFERS AND NEWS FROM BAGSTORE.COM
            </p>

            <div className="space-y-3">
              <p className="border-2 rounded-full px-6 py-3 flex items-center justify-between">
                <input
                  type="email"
                  className="focus:outline-none text-lg w-full"
                  placeholder="Enter your email here"
                />
                <GoArrowRight className="text-xl" />
              </p>

              <p className="ml-2 flex items-center gap-2 text-lg">
                <input type="checkbox" id="privacyPolicy" className="w-5 h-5" />
                <label htmlFor="privacyPolicy">
                  I have read and agree to the bagstore privacy policy
                </label>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-2xl">Menu</h2>
              <div className="flex flex-col gap-2 text-lg">
                {menu.map((link, idx) => {
                  let redirectLink = slug(link, "-");
                  return (
                    <Link
                      key={idx}
                      to={`/${redirectLink}`}
                      className="text-black no-underline"
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl">Support</h2>
              <div className="flex flex-col text-lg gap-2">
                {support.map((link, idx) => {
                  let redirectLink = slug(link, "-");
                  return (
                    <Link
                      key={idx}
                      to={`/${redirectLink}`}
                      className="text-black no-underline"
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-10">
          <div>
            <img className="w-50" src="/Images/payments.png" alt="" />
          </div>

          <div className="flex gap-3 text-3xl">
            {socialLinks.map((item, idx) => {
              return (
                <span key={idx} className="cursor-pointer">
                  <Link to={item.link} className="text-black no-underline">
                    {item.icon}
                  </Link>
                </span>
              );
            })}
          </div>

          <div>
            <button className="border-2 px-8 py-4 text-lg rounded-2xl cursor-pointer hover:bg-black hover:text-white">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
