import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#fff",
          color: "#262626",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "16px",
          padding: "14px 16px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 12px 35px rgba(0,0,0,0.10)",
        },
        success: {
          iconTheme: {
            primary: "#1b3b2b",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#b42318",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
