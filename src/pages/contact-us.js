import { Input, Textarea, Button, Select, Checkbox } from "rizzui";
import { motion } from "framer-motion";
import { IoMdMailOpen } from "react-icons/io";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";


export default function ContactUs() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <motion.div
        className="max-w-4xl w-full grid md:grid-cols-2 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-50 flex flex-col justify-center p-8 mx-4 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-black mb-4">Contact us</h2>
          <p className="text-gray-600 mb-6">
            Reach out and we'll get in touch within 24 hours.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First name"
                className="w-full"
                required
              />
              <Input
                type="text"
                placeholder="Last name"
                className="w-full"
                required
              />
            </div>
            <Input
              type="email"
              placeholder="Email address"
              className="w-full"
              required
            />
            <Textarea
              placeholder="Leave us a message..."
              className="w-full"
              required
              rows={4}
            />
            <Checkbox
              label="You agree to our friendly privacy policy."
              className="text-gray-600"
            />
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Send message
            </Button>
          </form>
        </div>
        <div className="bg-gray-700 text-white flex flex-col justify-between p-8 rounded-3xl shadow-lg">
          <h3 className="text-xl font-semibold">Stay Connected</h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3 text-gray-300">
              <IoMdMailOpen className="w-5 h-5 text-white" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaPhone className="w-5 h-5" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaMapMarkerAlt className="w-5 h-5 text-red-500" />
              <span>123 Main St, City, Country</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
