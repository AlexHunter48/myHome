import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Properties from "./pages/properties";
import AuthProvider from "./context/AuthContext";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toaster from "./components/ui/Toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropertyForm from "./features/properties/PropertyForm";
import PropertyImages from "./features/properties/PropertyImages";
import PropertyDetail from "./pages/PropertyDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

console.log("QUERY CLIENT:", queryClient);
console.log("QUERY CLIENT:", queryClient);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<AppLayout />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/new" element={<PropertyForm />} />
            <Route path="/properties/:id/images" element={<PropertyImages />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
