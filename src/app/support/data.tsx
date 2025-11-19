import { Mail, Phone } from "lucide-react";

export const supportData = {
  title: "Hi, how can we help?",
  description:
    "Find answers to your questions or get in touch with our support team.",
  faq: [
    {
      q: "How do I schedule a pickup?",
      a: "You can schedule a pickup directly through the 'My Orders' section of the app. Just select your preferred date and time, and our team will come to collect your items.",
    },
    {
      q: "What are your operating hours?",
      a: "Our pickup and delivery services are available from 8:00 AM to 8:00 PM, Monday to Saturday. Orders placed on Sunday will be handled the next business day.",
    },
    {
      q: "How is pricing determined?",
      a: "Pricing depends on the type and quantity of items, as well as any special services requested. You can see the estimated cost in the app before confirming your order.",
    },
    {
      q: "Can I track my order status?",
      a: "Yes! You can track the real-time status of your order in the 'My Orders' section of the app. You’ll see updates from pickup to delivery.",
    },
    {
      q: "What if I need to reschedule my pickup?",
      a: "No problem! You can reschedule your pickup anytime through the app as long as it’s at least 2 hours before the original pickup time.",
    },
    {
      q: "Do you offer express service?",
      a: "Yes, we offer express pickup and delivery for an additional fee. You can select this option when placing your order.",
    },
    {
      q: "What happens if my items get damaged?",
      a: "We handle all items with care, but in the rare case of damage, please contact our support team immediately. We will work with you to resolve the issue.",
    },
    {
      q: "How do I contact support?",
      a: "You can reach our support team via the 'Support' section in the app, by email, or through our customer service hotline. We’re happy to help!",
    },
  ],
  contact: {
    title: "Still need help?",
    description: "Get in touch with our friendly support team,",
    data: [
      {
        icon: <Mail className="text-primary" />,
        title: "Email Support",
        detail: "support@cuuci.com",
      },
      {
        icon: <Phone className="text-primary" />,
        title: "Phone Support",
        detail: "+62 851 1725 3887",
      },
    ],
  },
};
