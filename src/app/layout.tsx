import type { Metadata } from "next";
import { Hind_Siliguri, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ML গণিত গুরু — মেশিন লার্নিং-এর গণিত শিখো ঢাকাইয়া স্টাইলে",
  description:
    "মেশিন লার্নিং-এর জন্য দরকারি সব গণিত — Linear Algebra, Calculus, Probability, Information Theory, Optimization — সব ঢাকাইয়া বাংলায়, মজার গল্পে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="mathjax-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['\\\\(', '\\\\)']],
                  displayMath: [['\\\\[', '\\\\]']],
                  packages: {'[+]': ['ams']},
                },
                options: {
                  skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
                },
                startup: {
                  ready() {
                    MathJax.startup.defaultReady();
                  }
                }
              };
            `,
          }}
        />
        <Script
          id="mathjax-script"
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </head>
      <body className="min-h-full flex flex-col bg-base font-[family-name:var(--font-hind-siliguri)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
