import {
  FaShippingFast,
  FaBookOpen,
  FaShieldAlt,
  FaSmile,
} from "react-icons/fa";
import Container from "../../../shared/Container/Container";

const WhyChooseBookCourier = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Fast & Safe Delivery",
      desc: "Your books arrive quickly and securely, right at your doorstep.",
    },
    {
      icon: <FaBookOpen />,
      title: "Wide Collection",
      desc: "Thousands of books from all genres — choose your next read easily.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Service",
      desc: "Safe payment, verified books, and authentic quality — always.",
    },
    {
      icon: <FaSmile />,
      title: "Customer Satisfaction",
      desc: "Our support team ensures a smooth and satisfying experience.",
    },
  ];

  return (
    <div className="bg-white">
      <Container>
        <section>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-[0.2em]">
              Our Values
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">
              Why Choose <span className="text-emerald-600">BookCourier?</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
              We deliver more than just books — we deliver trust, quality, and a
              seamless reading experience for every book lover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl text-emerald-600 shadow-sm mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default WhyChooseBookCourier;
