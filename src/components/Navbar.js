export default function NavBar({ children }) {
  return (
    <nav className="nav-bar fixed top-0 left-0 right-0 w-full flex flex-row justify-between items-center h-[80px] p-4  bg-[#E35E44]">
      {children}
    </nav>
  );
}
