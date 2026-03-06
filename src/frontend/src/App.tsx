import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  Apple,
  Bike,
  Clock,
  Dumbbell,
  Flame,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking, useSubmitContactMessage } from "./hooks/useQueries";

/* ─────────────────────────────────────────────
   Smooth scroll helper
───────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   Service types
───────────────────────────────────────────── */
const SERVICE_TYPES = [
  "Personal Training",
  "Group Classes",
  "Cardio Zone",
  "Strength & Weights",
  "Nutrition Coaching",
  "Recovery & Spa",
];

/* ─────────────────────────────────────────────
   Booking Modal
───────────────────────────────────────────── */
interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    serviceType: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const submitMutation = useSubmitBooking();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.serviceType) {
      toast.error("Please select a service type.");
      return;
    }
    try {
      await submitMutation.mutateAsync(form);
      setSuccess(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  function handleClose(open: boolean) {
    if (!open) {
      setTimeout(() => {
        setSuccess(false);
        setForm({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          serviceType: "",
          message: "",
        });
      }, 300);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg border-border bg-iron p-0 overflow-hidden">
        {/* Header bar */}
        <div className="relative bg-fire px-6 py-5">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 8px, oklch(0 0 0 / 0.3) 8px, oklch(0 0 0 / 0.3) 9px)",
            }}
            aria-hidden="true"
          />
          <DialogHeader className="relative z-10">
            <DialogTitle className="font-display text-xl font-black uppercase tracking-widest text-carbon">
              Book a Session
            </DialogTitle>
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-carbon/70">
              Hercules Gym · Elite Training
            </p>
          </DialogHeader>
        </div>

        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fire/15">
                  <Flame className="h-8 w-8 text-fire" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-wider text-chalk">
                  You're Booked!
                </h3>
                <p className="max-w-xs font-sans text-sm leading-relaxed text-ash">
                  Your session request has been received. Our team will confirm
                  your booking within 24 hours.
                </p>
                <Button
                  onClick={() => handleClose(false)}
                  className="mt-2 rounded-none bg-fire px-8 font-display text-xs font-bold uppercase tracking-widest text-carbon hover:bg-ember transition-all"
                >
                  Close
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash">
                      Full Name *
                    </Label>
                    <Input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={handleChange}
                      className="rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/40 focus:border-fire focus:ring-fire/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash">
                      Email *
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/40 focus:border-fire focus:ring-fire/20"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash">
                      Phone *
                    </Label>
                    <Input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/40 focus:border-fire focus:ring-fire/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash">
                      Preferred Date *
                    </Label>
                    <Input
                      name="preferredDate"
                      type="date"
                      required
                      value={form.preferredDate}
                      onChange={handleChange}
                      className="rounded-none border-border bg-carbon/60 font-sans text-chalk focus:border-fire focus:ring-fire/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash">
                    Service Type *
                  </Label>
                  <Select
                    value={form.serviceType}
                    onValueChange={(val) =>
                      setForm((prev) => ({ ...prev, serviceType: val }))
                    }
                  >
                    <SelectTrigger className="rounded-none border-border bg-carbon/60 font-sans text-chalk focus:border-fire focus:ring-fire/20 data-[placeholder]:text-ash/40">
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-border bg-iron">
                      {SERVICE_TYPES.map((s) => (
                        <SelectItem
                          key={s}
                          value={s}
                          className="font-sans text-chalk hover:bg-fire/20 focus:bg-fire/20"
                        >
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash">
                    Goals / Message
                  </Label>
                  <Textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us your goals, fitness level, and anything else we should know..."
                    value={form.message}
                    onChange={handleChange}
                    className="resize-none rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/40 focus:border-fire focus:ring-fire/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="mt-1 h-12 rounded-none bg-fire font-display text-sm font-black uppercase tracking-widest text-carbon hover:bg-ember shadow-fire transition-all duration-300 disabled:opacity-60"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking…
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────────────────────
   WhatsApp Floating Button
───────────────────────────────────────────── */
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 20 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="rounded-none bg-iron border border-border px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-chalk shadow-iron whitespace-nowrap"
          >
            Chat on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
      <a
        href="https://wa.me/15559990001?text=Hi%2C%20I%27d%20like%20to%20book%20a%20session%20at%20Hercules%20Gym"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="animate-pulse-ring flex h-14 w-14 items-center justify-center rounded-full shadow-iron transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        style={{ backgroundColor: "#25D366" }}
      >
        <span className="sr-only">Chat with us on WhatsApp</span>
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
interface NavbarProps {
  onBookNow: () => void;
}

function Navbar({ onBookNow }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
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
          ? "bg-carbon/95 shadow-iron backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-3 focus-visible:outline-none"
          aria-label="Go to home"
        >
          <img
            src="/assets/generated/hercules-logo-transparent.dim_200x200.png"
            alt="Hercules Gym logo"
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col items-start">
            <span className="font-display text-lg font-black uppercase tracking-[0.15em] leading-none text-chalk group-hover:text-fire transition-colors">
              Hercules
            </span>
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.35em] text-fire leading-none mt-0.5">
              Gym
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.target}>
              <button
                type="button"
                onClick={() => scrollTo(item.target)}
                className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ash/80 hover:text-fire transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fire"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Button
              onClick={onBookNow}
              className="rounded-none bg-fire px-5 py-2 h-auto font-sans text-xs font-black uppercase tracking-[0.2em] text-carbon hover:bg-ember shadow-fire transition-all"
            >
              Book Now
            </Button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex md:hidden text-chalk hover:text-fire transition-colors focus-visible:outline-none"
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
            className="overflow-hidden bg-carbon/98 border-b border-border md:hidden"
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
                    className="w-full py-3 text-left font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ash/80 hover:text-fire transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-3">
                <Button
                  onClick={() => {
                    onBookNow();
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-none bg-fire font-sans text-xs font-black uppercase tracking-[0.2em] text-carbon hover:bg-ember shadow-fire"
                >
                  Book Now
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
interface HeroSectionProps {
  onBookNow: () => void;
}

function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-start overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-gym.dim_1200x600.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Deep dark overlay with fire tint at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.08 0.01 260 / 0.95) 0%, oklch(0.1 0.01 260 / 0.8) 45%, oklch(0.12 0.01 260 / 0.3) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom gradient fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, oklch(0.12 0.01 260) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Diagonal texture lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, oklch(1 0 0 / 0.4) 0px, oklch(1 0 0 / 0.4) 1px, transparent 1px, transparent 60px)",
        }}
        aria-hidden="true"
      />

      {/* Content — left-aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-fire" />
            <span className="gym-label">Elite Fitness · Olympia, CA</span>
          </motion.div>

          {/* Main heading — split typographic treatment */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl font-black uppercase leading-[0.92] tracking-tight text-chalk sm:text-8xl md:text-9xl"
          >
            <span className="block">Forge</span>
            <span className="block text-fire text-shadow-glow">Your</span>
            <span className="block">Legacy</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-7 max-w-lg font-sans text-base font-light leading-relaxed text-ash/80 sm:text-lg"
          >
            Elite training. Real results. Hercules Gym is where champions are
            forged — not born.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              onClick={onBookNow}
              className="group h-14 rounded-none bg-fire px-10 font-display text-sm font-black uppercase tracking-[0.2em] text-carbon hover:bg-ember shadow-fire-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-fire"
            >
              <Zap className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Book a Session
            </Button>
            <Button
              onClick={() => scrollTo("services")}
              variant="outline"
              className="h-14 rounded-none border-chalk/30 bg-transparent px-10 font-display text-sm font-bold uppercase tracking-[0.2em] text-chalk hover:bg-chalk/8 hover:border-chalk/60 transition-all duration-300"
            >
              Explore Services
            </Button>
          </motion.div>
        </div>

        {/* Stats row — 3 highlight cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-3"
          style={{ background: "oklch(0.25 0.015 260 / 0.6)" }}
        >
          {[
            {
              icon: <Trophy className="h-5 w-5 text-fire" />,
              title: "World-Class Equipment",
              desc: "10,000 sq ft of premium machines, free weights, and functional training zones.",
            },
            {
              icon: <Shield className="h-5 w-5 text-fire" />,
              title: "Expert Coaches",
              desc: "Certified trainers with 5–15+ years experience in strength, conditioning, and nutrition.",
            },
            {
              icon: <Sparkles className="h-5 w-5 text-fire" />,
              title: "Proven Results",
              desc: "Over 2,400 members have transformed their bodies and performance at Hercules.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex items-start gap-4 bg-carbon/80 px-6 py-5 backdrop-blur-sm"
            >
              <div className="mt-0.5 flex-shrink-0">{card.icon}</div>
              <div>
                <h3 className="font-display text-sm font-black uppercase tracking-wider text-chalk">
                  {card.title}
                </h3>
                <p className="mt-1 font-sans text-xs leading-relaxed text-ash/60">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="h-8 w-px bg-gradient-to-b from-fire/60 to-transparent"
        />
        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-fire/60">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Services Section
───────────────────────────────────────────── */
const services = [
  {
    icon: <Dumbbell className="h-6 w-6" />,
    title: "Personal Training",
    description:
      "One-on-one sessions designed around your goals. Our certified coaches build custom programs for fat loss, muscle gain, athletic performance, and more.",
    badge: "Most Popular",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Group Classes",
    description:
      "High-energy HIIT, yoga, spin, and functional fitness classes led by expert instructors. 30+ weekly classes across all fitness levels.",
    badge: null,
  },
  {
    icon: <Bike className="h-6 w-6" />,
    title: "Cardio Zone",
    description:
      "100+ premium cardio machines: commercial treadmills, assault bikes, rowing ergometers, stair climbers, and ski ergs. Open 24 hours.",
    badge: null,
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Strength & Weights",
    description:
      "Full free-weight floor, Olympic lifting platforms, power racks, and 250+ weight machines. Built for serious lifters.",
    badge: null,
  },
  {
    icon: <Apple className="h-6 w-6" />,
    title: "Nutrition Coaching",
    description:
      "Personalized meal plans, macro tracking, supplement guidance, and regular check-ins. Fuel your performance the right way.",
    badge: "New",
  },
  {
    icon: <Waves className="h-6 w-6" />,
    title: "Recovery & Spa",
    description:
      "Contrast therapy with sauna, cold plunge, and ice bath. Sports massage, compression boots, and red light therapy available.",
    badge: null,
  },
];

/* ─────────────────────────────────────────────
   Stats Strip
───────────────────────────────────────────── */
const stats = [
  { value: "2,400+", label: "Active Members" },
  { value: "50+", label: "Expert Coaches" },
  { value: "30+", label: "Weekly Classes" },
  { value: "10K", label: "Sq Ft Facility" },
];

function StatsStrip() {
  return (
    <div className="bg-iron border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center py-8 px-4 gap-1"
            >
              <span className="font-display text-4xl font-black text-fire sm:text-5xl">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-ash/50">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ServicesSectionProps {
  onBookNow: () => void;
}

function ServicesSection({ onBookNow }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-background py-28"
    >
      {/* Background geometric */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.68 0.21 42) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.68 0.21 42) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-fire" />
            <span className="gym-label">What We Offer</span>
          </div>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-chalk sm:text-6xl">
            Train Like
            <br />
            <span className="text-fire">A God</span>
          </h2>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ash/60">
            Six specialized zones, each designed to push you further. Pick your
            battlefield.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex flex-col bg-iron px-7 py-8 transition-all duration-300 hover:bg-card"
            >
              {/* Fire accent line on hover */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-fire scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />

              {/* Badge */}
              {service.badge && (
                <span className="mb-4 inline-flex w-fit items-center rounded-none bg-fire/15 px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-fire">
                  {service.badge}
                </span>
              )}

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center bg-carbon text-ash transition-colors duration-300 group-hover:bg-fire group-hover:text-carbon">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-black uppercase tracking-wider text-chalk">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ash/60">
                {service.description}
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={onBookNow}
                className="mt-6 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-fire hover:gap-3 transition-all duration-200 focus-visible:outline-none"
              >
                Book This
                <span className="text-base leading-none">→</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="font-sans text-sm text-ash/50">
            Not sure where to start? Talk to one of our coaches — it's free.
          </p>
          <Button
            onClick={onBookNow}
            className="rounded-none bg-fire px-10 py-4 h-auto font-display text-sm font-black uppercase tracking-[0.2em] text-carbon hover:bg-ember shadow-fire-lg transition-all duration-300"
          >
            <Flame className="mr-2 h-4 w-4" />
            Book Your Free Consult
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Testimonials Section
───────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "I've tried six gyms in the last three years. Nothing compares to Hercules. The coaches actually know your name and your goals. Lost 28 lbs in four months.",
    name: "Marcus T.",
    role: "Member since 2023",
    initials: "MT",
  },
  {
    quote:
      "The recovery suite alone is worth the membership. Cold plunge after heavy legs changed my training completely. My squat went from 275 to 365 in six months.",
    name: "Daniela R.",
    role: "Powerlifting member",
    initials: "DR",
  },
  {
    quote:
      "Signed up for nutrition coaching as a skeptic. Three months later I'm down 18 lbs and hitting PR's every week. The coaches are next level.",
    name: "James O.",
    role: "Member since 2022",
    initials: "JO",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-iron py-24">
      {/* Subtle top light */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fire/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fire/20 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-fire" />
            <span className="gym-label">Member Results</span>
          </div>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-chalk sm:text-6xl">
            Real People.
            <br />
            <span className="text-fire">Real Gains.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative flex flex-col bg-carbon border border-border p-7 transition-all duration-300 hover:border-fire/40 hover:shadow-fire"
            >
              {/* Large opening quote mark */}
              <span
                className="absolute -top-3 left-6 font-display text-7xl font-black leading-none text-fire/20 select-none"
                aria-hidden="true"
              >
                "
              </span>

              <p className="relative z-10 font-sans text-sm leading-relaxed text-ash/80 flex-1">
                {t.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-fire/15 font-display text-sm font-black text-fire">
                  {t.initials}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-chalk">
                    {t.name}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ash/40">
                    {t.role}
                  </p>
                </div>
              </div>
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
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
      setSubmitted(true);
      toast.success("Message received!", {
        description: "We'll get back to you within 24 hours.",
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-4 w-4 text-fire" />,
      label: "Address",
      value: "123 Titan Blvd, Olympia, CA 90210",
    },
    {
      icon: <Phone className="h-4 w-4 text-fire" />,
      label: "Phone",
      value: "+1 (555) 999-0001",
    },
    {
      icon: <Mail className="h-4 w-4 text-fire" />,
      label: "Email",
      value: "info@herculesgym.com",
    },
    {
      icon: <Clock className="h-4 w-4 text-fire" />,
      label: "Hours",
      value: "Mon–Fri: 5:00 AM – 11:00 PM\nSat–Sun: 6:00 AM – 10:00 PM",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(165deg, oklch(0.14 0.012 260) 0%, oklch(0.1 0.008 260) 100%)",
      }}
    >
      {/* Decorative angled line */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-35deg, oklch(0.68 0.21 42) 0px, oklch(0.68 0.21 42) 1px, transparent 1px, transparent 80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-fire" />
            <span className="gym-label">Get In Touch</span>
          </div>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-chalk sm:text-6xl">
            Ready To
            <br />
            <span className="text-fire">Start?</span>
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-base leading-relaxed text-ash/60 mb-10">
              Walk in, call us, or drop a message. Our team is here to help you
              find the right program, book a session, or answer any questions
              about membership.
            </p>

            <ul className="flex flex-col gap-6">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-fire/30 bg-fire/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-fire">
                      {item.label}
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-ash/80 whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Motivational quote */}
            <div className="mt-12 border-l-2 border-fire pl-6">
              <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-chalk/60">
                "The iron never lies to you."
              </p>
              <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fire/50">
                — Henry Rollins
              </p>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative border border-border bg-iron/80 p-8 backdrop-blur-sm">
              {/* Corner accents */}
              <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-fire" />
              <div className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-fire" />
              <div className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-fire" />
              <div className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-fire" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <Flame className="h-10 w-10 text-fire" />
                    <h3 className="font-display text-2xl font-black uppercase tracking-wider text-chalk">
                      Message Sent!
                    </h3>
                    <p className="font-sans text-sm text-ash/60">
                      We'll be in touch within 24 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="rounded-none bg-fire/10 border border-fire/30 text-fire font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-fire/20 transition-all"
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <h3 className="font-display text-xl font-black uppercase tracking-wider text-chalk mb-2">
                      Send a Message
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash/60">
                          Name *
                        </Label>
                        <Input
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                          className="rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/30 focus:border-fire"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash/60">
                          Email *
                        </Label>
                        <Input
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={handleChange}
                          className="rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/30 focus:border-fire"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash/60">
                        Phone
                      </Label>
                      <Input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                        className="rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/30 focus:border-fire"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ash/60">
                        Message *
                      </Label>
                      <Textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your goals, ask about membership, or request more info..."
                        value={form.message}
                        onChange={handleChange}
                        className="resize-none rounded-none border-border bg-carbon/60 font-sans text-chalk placeholder:text-ash/30 focus:border-fire"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="h-12 rounded-none bg-fire font-display text-sm font-black uppercase tracking-[0.18em] text-carbon hover:bg-ember shadow-fire transition-all duration-300 disabled:opacity-60"
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
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Pre-Footer CTA Banner
───────────────────────────────────────────── */
interface CtaBannerProps {
  onBookNow: () => void;
}

function CtaBanner({ onBookNow }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-fire py-20">
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 12px, oklch(0 0 0 / 0.5) 12px, oklch(0 0 0 / 0.5) 13px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-xs font-black uppercase tracking-[0.35em] text-carbon/60 mb-4">
            First Session Free
          </p>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-carbon sm:text-6xl md:text-7xl">
            No More
            <br />
            Excuses
          </h2>
          <p className="mt-6 font-sans text-base text-carbon/70 max-w-md mx-auto">
            Join over 2,400 members who made the decision. Your first session is
            on us.
          </p>
          <Button
            onClick={onBookNow}
            className="mt-8 h-14 rounded-none bg-carbon px-12 font-display text-sm font-black uppercase tracking-[0.22em] text-fire hover:bg-carbon/90 shadow-iron transition-all duration-300 hover:-translate-y-0.5"
          >
            Claim Free Session
          </Button>
        </motion.div>
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
    <footer className="border-t border-border bg-carbon py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo mark */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/generated/hercules-logo-transparent.dim_200x200.png"
              alt="Hercules Gym"
              className="h-12 w-12 object-contain opacity-80"
            />
            <p className="font-display text-xl font-black uppercase tracking-[0.25em] text-chalk">
              Hercules Gym
            </p>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-fire">
              Elite Fitness · Olympia, CA
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-fire/40 to-transparent" />

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-8">
              {["Home", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ash/40 hover:text-fire transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="font-sans text-xs text-ash/30">
            © {year}. Built with{" "}
            <span className="text-fire" aria-label="love">
              ♥
            </span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fire underline-offset-2 hover:underline transition-colors"
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
  const [bookingOpen, setBookingOpen] = useState(false);

  // SEO meta tags
  const metaSet = useRef(false);
  useEffect(() => {
    if (metaSet.current) return;
    metaSet.current = true;

    document.title = "Hercules Gym | Elite Fitness & Personal Training";

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta(
      "description",
      "Hercules Gym offers world-class personal training, group fitness classes, nutrition coaching, and premium gym facilities. Book your session today.",
    );
    setMeta(
      "og:title",
      "Hercules Gym | Elite Fitness & Personal Training",
      true,
    );
    setMeta(
      "og:description",
      "World-class personal training, group fitness, nutrition coaching, and premium recovery facilities in Olympia, CA.",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta(
      "twitter:title",
      "Hercules Gym | Elite Fitness & Personal Training",
    );
    setMeta(
      "twitter:description",
      "Elite training. Real results. Book your session at Hercules Gym today.",
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <Navbar onBookNow={() => setBookingOpen(true)} />
      <main>
        <HeroSection onBookNow={() => setBookingOpen(true)} />
        <StatsStrip />
        <ServicesSection onBookNow={() => setBookingOpen(true)} />
        <TestimonialsSection />
        <ContactSection />
        <CtaBanner onBookNow={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <WhatsAppButton />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
