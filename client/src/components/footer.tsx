import { getCurrentYear } from "@/lib/utils";
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub className="text-xl" />, href: "https://github.com", label: "GitHub" },
    { icon: <FaLinkedin className="text-xl" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaTwitter className="text-xl" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaCodepen className="text-xl" />, href: "https://codepen.io", label: "CodePen" },
  ];

  return (
    <footer className="bg-[#203a61] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-[#64FFDA] transition-colors"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm text-center">
            Designed & Built by Jane Doe &copy; {getCurrentYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
