export default function Navbar() {

  return (
    <header className="w-full bg-zinc-950 border-b border-zinc-800 p-5 flex items-center justify-between">

      <h2 className="text-2xl font-bold text-white">
        TaskHub Admin
      </h2>

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

      </div>

    </header>
  );
}