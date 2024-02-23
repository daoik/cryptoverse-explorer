import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-1">
      <div className="container mx-auto px-4">
        <div className="flex w-full justify-center items-center">
          <div className="flex flex-col w-full justify-end items-center">
            {/* <h3 className="text-lg font-bold mb-4">About</h3> */}
            <p>
              Made with ❤️ by{" "}
              <a href="https://github.com/daoik">Dimitris Oikonomou </a>
            </p>
            <p>
              using the <a href="https://www.coingecko.com/en/api">CoinGecko</a>{" "}
              API
            </p>
          </div>
          {/* <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Address: 123 Main St, City, Country</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Instagram
              </a> 
            </div>
          </div>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
