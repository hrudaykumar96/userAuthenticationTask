import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
            A
          </div>
          <span className="font-semibold text-lg">Acme</span>
        </div>

        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-white">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="hover:text-white">
            <FaGithub size={18} />
          </a>
        </div>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Acme Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
