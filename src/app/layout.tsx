
import { getServerUser } from "@/lib/auth";
import { AuthProvider } from "@/context/AuthContext";
import { Poppins } from 'next/font/google';
import "./globals.css";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Your Mindset",
  description: "Show you about the motivation.",
  icons: {
    icon: "/logo.svg",
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
