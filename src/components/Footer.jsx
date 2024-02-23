import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-1">
      <div className="container mx-auto px-4">
        <div className="flex w-full justify-center items-center">
          <div className="flex flex-col w-full justify-end items-center">
            <p>
              Made with ❤️ by{" "}
              <a href="https://github.com/daoik">Dimitris Oikonomou </a>
            </p>
            <p>
              using the <a href="https://www.coingecko.com/en/api">CoinGecko</a>{" "}
              API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
