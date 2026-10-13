import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./components/layout/AppLayout";
import Properties from "./pages/properties";
import AuthProvider from "./context/AuthContext";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toaster from "./components/ui/Toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropertyImages from "./features/properties/PropertyImages";
import PageNotFound from "./pages/PageNotFound";
import ProtectedOwnerRoute from "./features/properties/ProtectedOwnerRoute";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Loader from "./components/ui/Loader";
const PropertyForm = lazy(() => import("./features/properties/PropertyForm"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Favorites = lazy(() => import("./pages/Favourites"));

const Messages = lazy(() => import("./features/messages/Messages"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const NewMessage = lazy(() => import("./features/messages/NewMessage"));
const BecomeOwner = lazy(() => import("./profiles/BecomeOwner"));
const MyListings = lazy(() => import("./profiles/MyListings"));
const ListingLayout = lazy(() => import("./components/layout/ListingLayout"));
const EditListings = lazy(() => import("./features/listings/EditListings"));
const EditPhotos = lazy(() => import("./features/listings/EditPhotos"));
const ManageListing = lazy(() => import("./features/listings/ManageListing"));
const SettingsLayout = lazy(() => import("./components/layout/SettingsLayout"));
const PersonalInformation = lazy(
  () => import("./features/settings/PersonalInformation"),
);
const LoginSecurity = lazy(() => import("./features/settings/LoginSecurity"));
const Notifications = lazy(() => import("./features/settings/Notifications"));
const Preferences = lazy(() => import("./features/settings/Preferences"));
const AllProperties = lazy(() => import("./features/properties/AllProperties"));
const CategoryListings = lazy(() => import("./features/listings/Category"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loader />}>
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
              <Route path="/properties/all" element={<AllProperties />} />
              <Route path="/listings/category" element={<CategoryListings />} />
              <Route
                path="/properties/:id/images"
                element={<PropertyImages />}
              />
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
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PersonalInformation />} />
                <Route path="personal" element={<PersonalInformation />} />
                <Route path="login-security" element={<LoginSecurity />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="preferences" element={<Preferences />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
