import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-8">
            <div className=" w-10/12 mx-auto bg-white shadow-lg rounded-lg p-6 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
                        <p className="text-gray-600 mt-4">
                            Fill out the form and our team will reach out to you within 1-2 business days.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Click the button below to schedule a meeting with us.
                        </p>

                        <a className='py-2 px-4 xl:w-4/12 text-center bg-primaryColor hover:bg-secondaryColor block text-white font-semibold  rounded-lg mt-6' href="https://wa.me/8801879094880?text=Hello%2C%20I%20would%20like%20to%20contact%20you."
                            target="_blank"
                            rel="noopener noreferrer">

                            Talk with us

                        </a>


                        <div className="mt-8">
                            <h3 className="text-gray-800 font-semibold">Email</h3>
                            <p className="text-gray-600">jgiasuddin2000@gmail.com</p>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-gray-800 font-semibold">Social</h3>
                            <div className="flex space-x-4 mt-4">
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-[#E20935] text-xl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-[#E20935] text-xl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedinIn />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-[#E20935] text-xl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-[#E20935] text-xl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring focus:ring-secondaryColor"
                                />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-secondaryColor"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Subject (optional)"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-secondaryColor"
                            />
                            <textarea
                                placeholder="Enter Your Message . . ."
                                rows="6"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-secondaryColor"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-primaryColor hover:bg-secondaryColor text-white font-semibold py-3 rounded-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;