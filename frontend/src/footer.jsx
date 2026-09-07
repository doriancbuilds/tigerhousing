import React from 'react';
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 gap-4">

                <div> 
                    <ul className="font-bold">
                        <li>
                        <a href="/"></a>
                        </li>
                    </ul>
                </div>

                <div> 
                    <h3 className="mx-auto text-center font-bold mb-4">Feel Free to Reach Out</h3>

                    <div className="flex justify-center">
                        <a href="https://www.linkedin.com/in/dorianvcole/">
                            <FaLinkedin className="text-gray-400 hover:text-white
                            transition-colors duration-200 text-2xl cursor-pointer"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;