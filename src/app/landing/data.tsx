import {
  CalendarCheck,
  Clock,
  icons,
  MapPin,
  Package,
  ShoppingBasket,
  Sprout,
  Truck,
  WashingMachine,
} from "lucide-react";

export const greetingData = {
  thumbnail:
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "cuuci, clean Made Easy.",
  description:
    "Convenient pickup and delviery laundry service, right at your doorstep.",
};

export const reasonData = {
  title: "Why Choose Us?",
  description:
    " We offer a seamless laundry experience designed for your busy           lifestyle.",
  items: [
    {
      icon: <Clock size={50} color="#47a168" />,
      title: "On-Demand Scheduling",
      description:
        "Book a pickup anytime that works for you through our easy-to-use app.",
    },
    {
      icon: <Sprout size={50} color="#47a168" />,
      title: "Eco-Friendly Cleaning",
      description:
        "We use environmentally safe detergents to keep your clothes and the planet clean.",
    },
    {
      icon: <MapPin size={50} color="#47a168" />,
      title: "Real-Time Tracking",
      description: "Know where your laundry is at all times, from pickup to",
    },
    {
      icon: <Truck size={50} color="#47a168" />,
      title: "Next-Day Delivery",
      description: "Get your fresh, clean laundry back the very next day.",
    },
  ],
};

export const workflowData = {
  title: "How It Works",
  description:
    "Getting your laundry done has never been easier. Just four simple steps to fresh, clean clothes.",
  steps: [
    {
      icon: <CalendarCheck size={25} color="#578bc2" />,
      title: "1. Schedule a Pickup",
      description:
        "Choose a date and time that fits your schedule using our website or mobile app.",
    },
    {
      icon: <ShoppingBasket size={25} color="#578bc2" />,
      title: "2. We Collect Your Laundry",
      description:
        "Our driver will arrive at your specified time to pick up your laundry bags.",
    },
    {
      icon: <WashingMachine size={25} color="#578bc2" />,
      title: "3. We Clean & Fold",
      description:
        "Our experts professionally wash, dry, and fold your clothes with care.",
    },
    {
      icon: <Package size={25} color="#578bc2" />,
      title: "4. Fresh Laundry Delivered",
      description:
        "We deliver your fresh, clean laundry back to your doorstep, ready to wear.",
    },
  ],
};

export const outletData = {
  title: "Our Locations",
  description:
    "We bring fresh laundry to your door. Every neighborhood we serve is part of our mission to make laundry day effortless, reliable, and refreshingly simple.",
  outlets: [
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726769108225-00e0005b3415?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Tebet",
    },
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726769108225-00e0005b3415?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Kemang",
    },
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726769108225-00e0005b3415?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Kelapa Gading",
    },
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726769108225-00e0005b3415?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Puri Indah",
    },
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726769108225-00e0005b3415?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Menteng",
    },
    {
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726769108225-00e0005b3415?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Pondok Indah",
    },
  ],
};

export const bannerData = {
  title: "Ready for a hassle-free laundry day?",
  description:
    " Let us handle the laundry so you can get back to what matters most.",
};
