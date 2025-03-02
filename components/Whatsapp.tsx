"use client";
import { useState } from "react";
import Image from "next/image";

const PHONE_NUMBER = "351962792062";

const WhatsAppWidget = ({
  title,
  botMessage,
  placeholder,
  send,
}: {
  title: string;
  botMessage: string;
  placeholder: string;
  send: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: 
    React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (message.trim()) {
      const url = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {isOpen && (
        <div className="flex h-96 w-80 flex-col rounded-lg bg-white shadow-lg">
          <div className="bg-rootsgreen flex items-center justify-between rounded-t-lg p-4 text-white">
            <div className="relative flex items-center">
              <Image
                src="/images/about-us/team/francisco.png"
                alt="Francisco"
                width={60}
                height={60}
                className="h-10 w-10 rounded-full border-1 border-white"
              />
              <div className="ml-3">
                <p className="font-semibold">{title}</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="cursor-pointer text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-gray-700">{botMessage}</p>
          </div>
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder={placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
              >
                {send}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className={`mt-4 flex w-full justify-end`}>
        <button
          onClick={toggleChat}
          className="relative cursor-pointer rounded-full bg-green-500 p-4 text-white shadow-lg transition duration-300 hover:bg-green-600"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.002 0C5.37 0 0 5.372 0 12.004c0 2.114.554 4.13 1.61 5.897L.038 23.804a.75.75 0 00.957.956l5.905-1.572A11.948 11.948 0 0012.002 24c6.632 0 12.004-5.372 12.004-11.996C24.006 5.372 18.634 0 12.002 0zm5.844 16.51c-.244.69-1.405 1.348-1.94 1.415-.522.07-1.183.1-3.89-1.32-3.278-1.706-5.396-4.784-5.56-5.008-.163-.224-1.327-1.767-1.327-3.367s.84-2.39 1.14-2.717c.3-.327.656-.409.873-.409.218 0 .436.002.625.012.204.011.47-.077.735.56.27.652.92 2.258.997 2.423.08.163.133.355.024.578-.108.224-.163.355-.325.544-.163.19-.342.425-.487.572-.163.162-.332.338-.144.654.188.316.84 1.379 1.798 2.235 1.24 1.097 2.28 1.43 2.616 1.582.338.153.524.125.72-.076.198-.202.832-.972 1.05-1.31.217-.338.434-.28.72-.163.286.118 1.842.867 2.157 1.027.315.162.524.244.6.379.08.134.08.774-.163 1.464z"
              fill={'#fff'}
            />
          </svg>

          <span className="absolute -top-2 -right-2 flex h-5 w-5 animate-ping items-center justify-center rounded-full bg-red-500 text-xs text-white"></span>
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            1
          </span>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
