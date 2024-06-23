import './styles/globals.css'; 
import { ChatProvider } from './store';

export const metadata = {
  title: 'My Chat App',
  description: 'A simple chat application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
