import "../css/styles.css";

export const metadata = {
  title: "Salesforce Architect Group Noida | Architecture Community",
  description:
    "Connect with Salesforce architects in Noida and Delhi NCR for community events, architecture discussions, solution design, and hands-on learning.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Salesforce Architect Group · Noida",
    description:
      "A community for Salesforce professionals in Noida and Delhi NCR to learn, share, and build scalable solutions.",
  },
  twitter: {
    card: "summary",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0176D3",
};

export default function RootLayout({ children }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Salesforce Architect Group · Noida",
    description:
      "A community for Salesforce professionals in Noida and Delhi NCR to learn, share, and build scalable solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    telephone: "+91-9211627211",
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
