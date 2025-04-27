
import { getServerUser } from "@/lib/auth";
import { AuthProvider } from "@/context/AuthContext";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { ToastContainer } from 'react-toastify';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Mindset",
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
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
