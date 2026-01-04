import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-8 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo + About */}
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none italic">
              Book Currier
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your trusted online book delivery service. We bring stories,
              knowledge, and inspiration right to your doorstep with care and
              speed.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Navigation
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-books"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all"></span>
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all"></span>
                Help Center
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all"></span>
                Privacy Policy
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-emerald-400 group-hover:w-4 transition-all"></span>
                Return Policy
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get special offers and first-look at new books.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-emerald-600 text-white px-4 rounded-lg text-xs font-bold hover:bg-emerald-500 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-slate-500">
          <p>© {currentYear} BookCourier. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Cookies Settings
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
