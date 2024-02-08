import FollowPanel from "./layout/FollowPanel";

import AppSidebar from "./layout/AppSidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen bg-black ">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full ">
          <AppSidebar />
          <div className=" col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 ">
            {children}
          </div>
          <FollowPanel />
        </div>
      </div>
    </div>
  );
};

export default Layout;
