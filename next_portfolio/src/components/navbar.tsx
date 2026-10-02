export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 py-5 bg-[#131314]/70 backdrop-blur-xl border-b border-transparent transition-all duration-300">
      <div className="text-lg font-bold tracking-tight text-slate-50">
        Shashank Singh<span className="text-blue-500">.</span>
      </div>
      <ul className="flex gap-4 list-none m-0 p-0 items-center">
        <li>
          <a href="#about" className="text-slate-400 text-sm font-medium py-2 px-4 rounded-full transition-colors hover:text-slate-50 hover:bg-slate-800">
            About
          </a>
        </li>
        <li>
          <a href="#skills" className="text-slate-400 text-sm font-medium py-2 px-4 rounded-full transition-colors hover:text-slate-50 hover:bg-slate-800">
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" className="text-slate-400 text-sm font-medium py-2 px-4 rounded-full transition-colors hover:text-slate-50 hover:bg-slate-800">
            Projects
          </a>
        </li>
        <li>
          <a href="#experience" className="text-slate-400 text-sm font-medium py-2 px-4 rounded-full transition-colors hover:text-slate-50 hover:bg-slate-800">
            Experience
          </a>
        </li>
      </ul>
    </nav>
  );
}
