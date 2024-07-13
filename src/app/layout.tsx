import './styles/globals.css'; 
import { ChatProvider } from './store';
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export const metadata = {
  title: 'My Chat App',
  description: 'A simple chat application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
