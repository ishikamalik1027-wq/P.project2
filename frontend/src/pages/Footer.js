import { Link } from "react-router-dom";

function Footer() {
    return (
    <footer className="bg-gray-200 mt-10">
        <div className="text-center p-4 space-y-3">

        <div className="flex justify-center gap-4 text-xl">
            <i className="fa-brands fa-square-facebook hover:text-blue-600"></i>
            <i className="fa-brands fa-square-instagram hover:text-blue-600"></i>
            <i className="fa-brands fa-twitter hover:text-blue-600"></i>
        </div>

        <div className="text-gray-700">
            &copy; A Project Management Tool for Freelancers Private Limited
        </div>

        <div className="flex justify-center gap-4 text-blue-500">
            <Link to="/services">Terms of Service</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
        </div>

    </div>
    </footer>
);
}

export default Footer;
