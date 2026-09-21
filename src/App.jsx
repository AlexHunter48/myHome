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
import ProtectedOwnerRoute from "./features/properties/ProtectedOwnerRoute";
import PageNotFound from "./pages/PageNotFound";
import Favorites from "./pages/Favourites";
import Messages from "./features/messages/Messages";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import MessagesPage from "./pages/MessagesPage";
import NewMessage from "./features/messages/NewMessage";
import BecomeOwner from "./profiles/BecomeOwner";
import MyListings from "./profiles/MyListings";
import ListingLayout from "./components/layout/ListingLayout";
import EditListings from "./features/listings/EditListings";
import EditPhotos from "./features/listings/EditPhotos";
import ManageListing from "./features/listings/ManageListing";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<AppLayout />} />
            <Route path="/properties" element={<Properties />} />
            <Route
              path="/properties/new"
              element={
                <ProtectedOwnerRoute>
                  <PropertyForm />
                </ProtectedOwnerRoute>
              }
            />
            <Route path="/properties/favourites" element={<Favorites />} />
            <Route path="/properties/:id/images" element={<PropertyImages />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/messages" element={<MessagesPage />} />

            <Route
              path="/messages/new"
              element={
                <ProtectedRoute>
                  <NewMessage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages/:conversationId"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route path="/profile/owner" element={<BecomeOwner />} />
            <Route path="/listings" element={<ListingLayout />}>
              <Route
                index
                element={
                  <ProtectedOwnerRoute>
                    <MyListings />
                  </ProtectedOwnerRoute>
                }
              />

              <Route
                path=":id/edit"
                element={
                  <ProtectedOwnerRoute>
                    <EditListings />
                  </ProtectedOwnerRoute>
                }
              />
              <Route
                path=":id/edit/photos"
                element={
                  <ProtectedOwnerRoute>
                    <EditPhotos />
                  </ProtectedOwnerRoute>
                }
              />
              <Route
                path=":id/manage"
                element={
                  <ProtectedOwnerRoute>
                    <ManageListing />
                  </ProtectedOwnerRoute>
                }
              />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
