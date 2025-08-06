import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FilePlus2, Scissors, Crop, FileMinus2, FileStack } from "lucide-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import "./index.css";

export const tools = [
  {
    path: "/merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one file in seconds.",
    color: "bg-indigo-600",
    icon: FileStack,
    component: lazy(() => import("./Page/MergePDF/MergePDF")),
  },
  {
    path: "/split",
    name: "Split PDF",
    description: "Extract or split pages into separate PDFs.",
    color: "bg-emerald-600",
    icon: Scissors,
    component: lazy(() => import("./Page/SplitPdf/SplitPdf")),
  },
  {
    path: "/crop",
    name: "Crop PDF",
    description: "Trim margins manually or automatically.",
    color: "bg-fuchsia-600",
    icon: Crop,
    component: lazy(() => import("./Page/CropPdf/ManualCropPdf")),
  },
  {
    path: "/remove-pages",
    name: "Remove Pages",
    description: "Delete unwanted pages from your PDF.",
    color: "bg-rose-600",
    icon: FileMinus2,
    component: lazy(() => import("./Page/RemovePagePdf/RemovePagePdf")),
  },
  {
    path: "/compress",
    name: "Compress PDF",
    description: "Reduce file size without quality loss.",
    color: "bg-cyan-600",
    icon: FileMinus2,
    component: lazy(() => import("./Page/RemovePagePdf/RemovePagePdf")),
  },
  {
    path: "/merge-crop",
    name: "Merge & Crop",
    description: "Smart workflow that merges then auto‑crops PDFs.",
    color: "bg-purple-600",
    icon: FilePlus2,
    component: lazy(() => import("./Page/MergeAndCrop/MergeAndCrop")),
  },
];

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="bg-white shadow sticky top-0 z-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          PDFTools
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {tools.slice(0, 5).map(({ path, name }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-200 ${location.pathname === path ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"}`}
            >
              {name}
            </Link>
          ))}
        </div>

        <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          {tools.slice(0, 5).map(({ path, name }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 px-2 rounded text-sm font-medium transition ${location.pathname === path ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-6 mt-auto border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between">
        <p>© {new Date().getFullYear()} PDFTools. Built with ❤️ for productivity.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <a href="#about" className="hover:text-indigo-500">About</a>
        </div>
      </div>
    </footer>
  );
}

function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function Landing() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden text-center px-4">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/20 via-fuchsia-500/10 to-transparent" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600"
        >
          Free Online PDF Tools for Sellers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
        >
          Merge, split, crop, compress and more — no sign‑up, lightning‑fast & 100% free.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(({ path, name, description, color, icon: Icon }) => (
            <motion.div
              key={path}
              whileHover={{ y: -4 }}
              className="group border rounded-2xl p-6 bg-white/70 dark:bg-white/5 shadow-sm hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = path)}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color} text-white mb-4 shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:underline">
                {name}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-5xl mx-auto px-4 text-center text-gray-700 pb-16">
        <h2 className="text-2xl font-bold mb-4">About PDFTools</h2>
        <p>
          PDFTools is a lightweight, fast and privacy-focused toolkit built for eCommerce sellers, freelancers and students. No uploads — everything runs in your browser.
        </p>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            {tools.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  );
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}