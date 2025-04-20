
import { getServerUser } from "@/lib/auth";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

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
    <html lang="en">
      <body>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
