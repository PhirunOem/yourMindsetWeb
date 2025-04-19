
import { getServerUser } from "@/lib/auth";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

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
