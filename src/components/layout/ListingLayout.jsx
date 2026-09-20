import { Outlet } from "react-router-dom";

export default function ListingLayout() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <main className="mt-10 md:mt-18">
        <Outlet />
      </main>
    </div>
  );
}
