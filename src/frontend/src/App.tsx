import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactMessage } from "./hooks/useQueries";

/* ─────────────────────────────────────────────
   Smooth scroll helper
───────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   WhatsApp floating button
───────────────────────────────────────────── */
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="rounded-full bg-espresso px-3 py-1.5 text-sm font-sans text-cream shadow-warm-lg whitespace-nowrap"
          >
            Chat with us on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
      <a
        href="https://wa.me/15550123456"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-warm-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-espresso/95 shadow-warm backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="group flex flex-col items-start focus-visible:outline-none"
          aria-label="Go to home"
        >
          <span
            className={`font-display text-2xl font-semibold leading-none tracking-tight transition-colors ${
              scrolled ? "text-cream" : "text-cream"
            }`}
          >
            Bella Cucina
          </span>
          <span
            className={`mt-0.5 text-xs font-sans tracking-[0.18em] uppercase transition-colors ${
              scrolled ? "text-gold" : "text-gold"
            }`}
          >
            Ristorante Italiano
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.target}>
              <button
                type="button"
                onClick={() => scrollTo(item.target)}
                className={`font-sans text-sm tracking-wide uppercase transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                  scrolled ? "text-cream/80" : "text-cream/90"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Button
              onClick={() => scrollTo("contact")}
              className="rounded-none border border-gold bg-transparent font-sans text-xs tracking-[0.15em] uppercase text-gold hover:bg-gold hover:text-espresso transition-all px-5 py-2 h-auto"
            >
              Reserve
            </Button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex md:hidden text-cream focus-visible:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-espresso/97 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {navItems.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollTo(item.target);
                      setMobileOpen(false);
                    }}
                    className="w-full py-3 text-left font-sans text-base uppercase tracking-wide text-cream/80 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  onClick={() => {
                    scrollTo("contact");
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-none border border-gold bg-transparent font-sans text-xs tracking-[0.15em] uppercase text-gold hover:bg-gold hover:text-espresso transition-all"
                >
                  Reserve a Table
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x800.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.1 0.04 40 / 0.65) 0%, oklch(0.08 0.03 38 / 0.75) 60%, oklch(0.05 0.02 35 / 0.9) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Ornamental top line */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-5 font-sans text-xs tracking-[0.3em] uppercase text-gold"
        >
          Est. 1987 · Roma, Italia
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl font-light leading-[1.05] tracking-tight text-cream sm:text-7xl md:text-8xl"
        >
          Bella
          <br />
          <span className="italic">Cucina</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 max-w-md font-body text-lg font-light leading-relaxed text-cream/80 sm:text-xl"
        >
          Authentic Flavors, Timeless Tradition
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-7 flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-base">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            onClick={() => scrollTo("contact")}
            className="rounded-none bg-terracotta px-8 py-3 h-auto font-sans text-sm tracking-[0.12em] uppercase text-cream shadow-warm-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-warm hover:-translate-y-0.5"
          >
            Reserve a Table
          </Button>
          <Button
            onClick={() => scrollTo("services")}
            variant="outline"
            className="rounded-none border-cream/50 bg-transparent px-8 py-3 h-auto font-sans text-sm tracking-[0.12em] uppercase text-cream hover:bg-cream/10 hover:border-cream transition-all duration-300"
          >
            Our Menu
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-cream/50">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="h-6 w-px bg-gradient-to-b from-cream/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Services / Menu Section
───────────────────────────────────────────── */
const dishes = [
  {
    title: "Signature Pasta",
    image: "/assets/generated/dish-pasta.dim_600x450.jpg",
    description:
      "Hand-rolled tagliatelle bathed in our slow-simmered Bolognese ragù, crowned with aged Parmigiano-Reggiano and fresh basil.",
    detail: "Seasonal ingredients · House-made daily",
  },
  {
    title: "Wood-Fired Pizza",
    image: "/assets/generated/dish-pizza.dim_600x450.jpg",
    description:
      "Neapolitan-style pizza kissed by our 900°F wood-burning oven — San Marzano tomatoes, buffalo mozzarella, fresh basil.",
    detail: "72-hour fermented dough · Imported DOP ingredients",
  },
  {
    title: "Decadent Desserts",
    image: "/assets/generated/dish-dessert.dim_600x450.jpg",
    description:
      "Pillowy mascarpone Tiramisu layered with espresso-soaked savoiardi, dusted with the finest single-origin cocoa.",
    detail: "Crafted fresh each morning · Serves two",
  },
];

const experiences = [
  {
    icon: "🕯️",
    title: "Dine-In",
    description:
      "An intimate dining room with candlelit tables, warm stone walls, and the aromas of the kitchen drifting through the air.",
  },
  {
    icon: "🥂",
    title: "Private Events",
    description:
      "Host your anniversary, birthday, or corporate dinner in our exclusive private dining room for up to 30 guests.",
  },
  {
    icon: "🛵",
    title: "Takeaway",
    description:
      "Bring Bella Cucina home. Our takeaway menu features all of your favourites, packaged to arrive just as the chef intended.",
  },
];

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-sand/30 py-24 overflow-hidden"
    >
      {/* Decorative grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-sans text-xs tracking-[0.3em] uppercase text-terracotta">
            La Nostra Cucina
          </p>
          <h2 className="font-display text-4xl font-light text-espresso sm:text-5xl">
            Our Signature Dishes
          </h2>
          <div className="ornament-divider mx-auto mt-5 max-w-xs">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Curated with passion
            </span>
          </div>
        </motion.div>

        {/* Dish cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden bg-cream shadow-warm transition-all duration-500 hover:shadow-warm-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/20" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 bg-terracotta/90 px-4 py-2">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-cream">
                    View Menu
                  </p>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-espresso">
                  {dish.title}
                </h3>
                <p className="mt-2 font-body text-base leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>
                <p className="mt-3 font-sans text-xs tracking-wide text-terracotta">
                  {dish.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dining experiences */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-24 text-center"
        >
          <p className="mb-3 font-sans text-xs tracking-[0.3em] uppercase text-terracotta">
            L'Esperienza
          </p>
          <h2 className="font-display text-4xl font-light text-espresso sm:text-5xl">
            How We Serve You
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative border border-border bg-cream/50 p-8 text-center transition-colors duration-300 hover:bg-cream"
            >
              {/* Decorative corner */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/50" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/50" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-gold/50" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-gold/50" />

              <span className="text-3xl" role="img" aria-label={exp.title}>
                {exp.icon}
              </span>
              <h3 className="mt-4 font-display text-xl font-medium text-espresso">
                {exp.title}
              </h3>
              <p className="mt-2 font-body text-base leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Contact Section
───────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submitMutation = useSubmitContactMessage();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(form);
      toast.success("Message sent! We'll be in touch soon.", {
        description: "A confirmation will arrive at your email.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const contactInfo = [
    {
      icon: <MapPin size={18} className="text-terracotta" />,
      label: "Address",
      value: "123 Trattoria Lane, Rome District",
    },
    {
      icon: <Phone size={18} className="text-terracotta" />,
      label: "Phone",
      value: "+1 (555) 012-3456",
    },
    {
      icon: <Mail size={18} className="text-terracotta" />,
      label: "Email",
      value: "hello@bellacucina.com",
    },
    {
      icon: <Clock size={18} className="text-terracotta" />,
      label: "Hours",
      value: "Mon–Sun: 11:00 AM – 10:00 PM",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.15 0.04 42) 0%, oklch(0.22 0.06 44) 100%)",
      }}
    >
      {/* Decorative top edge */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.97 0.012 72 / 0.12), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-sans text-xs tracking-[0.3em] uppercase text-gold">
            Vieni a Trovarci
          </p>
          <h2 className="font-display text-4xl font-light text-cream sm:text-5xl">
            Find Us & Reserve
          </h2>
          <div className="ornament-divider mx-auto mt-5 max-w-xs">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
              We'd love to hear from you
            </span>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display text-2xl font-light text-cream">
                Come Visit Us
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-cream/60">
                Nestled in the heart of the Rome District, Bella Cucina welcomes
                you with warm hospitality and the irresistible scents of
                traditional Italian cooking.
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gold/30 bg-cream/5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold/70">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-body text-base text-cream/80">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Decorative quote */}
            <blockquote className="border-l-2 border-gold/40 pl-5">
              <p className="font-display text-lg italic font-light text-cream/60 leading-relaxed">
                "La cucina è l'anima di una casa."
              </p>
              <cite className="mt-2 block font-sans text-xs tracking-wide uppercase text-gold/50 not-italic">
                — The kitchen is the soul of a home
              </cite>
            </blockquote>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative border border-gold/20 bg-cream/5 p-8 backdrop-blur-sm">
              {/* Corner decorations */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/40" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/40" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-gold/40" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-gold/40" />

              <h3 className="font-display text-2xl font-light text-cream mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="name"
                      className="font-sans text-xs tracking-[0.15em] uppercase text-cream/60"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Marco Rossi"
                      value={form.name}
                      onChange={handleChange}
                      className="rounded-none border-gold/20 bg-cream/5 text-cream placeholder:text-cream/30 focus:border-gold/60 focus:ring-gold/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="font-sans text-xs tracking-[0.15em] uppercase text-cream/60"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="marco@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-none border-gold/20 bg-cream/5 text-cream placeholder:text-cream/30 focus:border-gold/60 focus:ring-gold/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="message"
                    className="font-sans text-xs tracking-[0.15em] uppercase text-cream/60"
                  >
                    Message / Reservation Request
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="I'd like to reserve a table for two on Friday evening..."
                    value={form.message}
                    onChange={handleChange}
                    className="rounded-none border-gold/20 bg-cream/5 text-cream placeholder:text-cream/30 focus:border-gold/60 focus:ring-gold/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="mt-2 rounded-none bg-terracotta px-8 py-3 h-auto font-sans text-sm tracking-[0.12em] uppercase text-cream hover:bg-primary/90 transition-all disabled:opacity-60"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div>
            <p className="font-display text-2xl font-light text-cream">
              Bella Cucina
            </p>
            <p className="mt-1 font-sans text-xs tracking-[0.2em] uppercase text-gold/60">
              Ristorante Italiano
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {["Home", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="font-sans text-xs tracking-[0.15em] uppercase text-cream/50 hover:text-gold transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="font-sans text-xs text-cream/30">
            © {year}. Built with{" "}
            <span className="text-terracotta" aria-label="love">
              ♥
            </span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold underline-offset-2 hover:underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Root App
───────────────────────────────────────────── */
export default function App() {
  // Update page title
  const titleRef = useRef(false);
  useEffect(() => {
    if (!titleRef.current) {
      document.title = "Bella Cucina — Authentic Italian Restaurant";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          "content",
          "Bella Cucina — Authentic Italian restaurant serving handmade pasta, wood-fired pizza, and decadent desserts. Reserve your table today.",
        );
      } else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content =
          "Bella Cucina — Authentic Italian restaurant serving handmade pasta, wood-fired pizza, and decadent desserts. Reserve your table today.";
        document.head.appendChild(m);
      }
      titleRef.current = true;
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
