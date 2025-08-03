import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Wonder of Chhattisgarh</h3>
            <p className="text-gray-300 mb-4">
              Discover the hidden gems, ancient temples, lush forests, and
              vibrant culture of India's heart. Your gateway to authentic
              Chhattisgarh experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Be Inspired
                </Link>
              </li>
              <li>
                <Link
                  to="/places"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Places To Go
                </Link>
              </li>
              <li>
                <Link
                  to="/things-to-do"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Things To Do
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          {/* Social Icons */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Connect With Us</h2>
            <div className="flex justify-center md:justify-start space-x-6 text-green-400 text-2xl">
              <a
                href="https://www.linkedin.com/in/krishna-kumar-rathore-47104022a/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=916263612174&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://github.com/Krishna-Kumar-Rathore"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.instagram.com/krishna_rathore2835?utm_source=qr&igsh=MWw4NmZ6cXd2NmZ0ag=="
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-125"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex justify-center items-center">
          <p className="text-center text-sm text-gray-500 ">
            &copy; 2025{" "}
            <span
              className="
         hover:text-green-400"
            >
              <a
                href="https://krishna-kumar-rathore.github.io/Portfolio/"
                target="_blank"
              >
                Krishna Kumar Rathore
              </a>
            </span>{" "}
            | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
