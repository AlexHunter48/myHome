import { Outlet } from "react-router-dom";

export default function ListingLayout() {
  return (
    <div className="min-h-screen">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
