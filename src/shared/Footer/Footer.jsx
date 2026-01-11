import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Container from "../Container/Container";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 pt-16 pb-10 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo + About */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter leading-none italic text-slate-900 dark:text-white">
              Book <span className="text-emerald-600">Currier</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
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
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Explore
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              {[
                { name: "Home", path: "/" },
                { name: "All Books", path: "/all-books" },
                { name: "Contact Us", path: "/contacts" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group text-slate-500 dark:text-slate-400"
                  >
                    <span className="w-0 h-[1.5px] bg-emerald-500 group-hover:w-4 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              {["Help Center", "Privacy Policy", "Return Policy"].map(
                (policy) => (
                  <li key={policy}>
                    <div className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2 group text-slate-500 dark:text-slate-400">
                      <span className="w-0 h-[1.5px] bg-emerald-500 group-hover:w-4 transition-all"></span>
                      {policy}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Subscribe for special offers and first-look at new releases.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-slate-900 dark:bg-emerald-600 text-white px-5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all active:scale-95">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-[2px] text-slate-400 dark:text-slate-500">
          <p>© {currentYear} BookCurrier. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-emerald-600 dark:hover:text-white cursor-pointer transition-colors">
              Terms
            </span>
            <span className="hover:text-emerald-600 dark:hover:text-white cursor-pointer transition-colors">
              Cookies
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
