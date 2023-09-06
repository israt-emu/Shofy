import {FaFacebook, FaInstagram, FaPinterest, FaTwitter} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 mt-auto border-t border-gray-300">
      <div className="container flex flex-col p-4 mx-auto md:p-12 lg:flex-row divide-gray-600">
        <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
          <li>Shop</li>
          <li>About</li>
          <li>Blog</li>
          <li>Pricing</li>
          <li>Contact</li>
        </ul>
        {/* //social icons  */}
        <div className="flex flex-col justify-center pt-6 lg:pt-0 ">
          <div className="flex justify-center space-x-4">
            <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary text-gray-50">
              <FaInstagram />
            </a>
            <a rel="noopener noreferrer" href="#" title="Pinterest" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary text-gray-50">
              <FaPinterest />
            </a>
            <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary text-gray-50">
              <FaTwitter />
            </a>
            <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary text-gray-50">
              <FaFacebook />
            </a>
            <a rel="noopener noreferrer" href="#" title="Gmail" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary text-gray-50">
              <MdEmail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
