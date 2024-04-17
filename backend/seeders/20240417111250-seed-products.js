"use strict";

const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      {
        name: "Airpods Wireless Bluetooth Headphones",
        // image: "/home/node/app/backend/seeders/images/phone.jpg",
        description:
          "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        brand: "Apple",
        category: "Electronics",
        price: 89.99,
        countInStock: 10,
        imageType: path.basename("/home/node/app/backend/seeders/images/airpods.jpg"),
        imageName: path.extname("/home/node/app/backend/seeders/images/airpods.jpg").slice(1),
        imageData: fs.readFileSync("/home/node/app/backend/seeders/images/airpods.jpg")
      },
      {
        name: "iPhone 11 Pro 256GB Memory",
        // image: "/home/node/app/backend/seeders/images/phone.jpg",
        description:
          "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
        brand: "Apple",
        category: "Electronics",
        price: 599.99,
        countInStock: 7,
        imageType: path.basename("/home/node/app/backend/seeders/images/phone.jpg"),
        imageName: path.extname("/home/node/app/backend/seeders/images/phone.jpg").slice(1),
        imageData: fs.readFileSync("/home/node/app/backend/seeders/images/phone.jpg")
      },
      {
        name: "Cannon EOS 80D DSLR Camera",
        // image: "/home/node/app/backend/seeders/images/camera.jpg",
        description:
          "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
        brand: "Cannon",
        category: "Electronics",
        price: 929.99,
        countInStock: 5,
        imageType: path.basename("/home/node/app/backend/seeders/images/camera.jpg"),
        imageName: path.extname("/home/node/app/backend/seeders/images/camera.jpg").slice(1),
        imageData: fs.readFileSync("/home/node/app/backend/seeders/images/camera.jpg")
      },
      {
        name: "Sony Playstation 4 Pro White Version",
        // image: "/home/node/app/backend/seeders/images/playstation.jpg",
        description:
          "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
        brand: "Sony",
        category: "Electronics",
        price: 399.99,
        countInStock: 11,
        imageType: path.basename("/home/node/app/backend/seeders/images/playstation.jpg"),
        imageName: path.extname("/home/node/app/backend/seeders/images/playstation.jpg").slice(1),
        imageData: fs.readFileSync("/home/node/app/backend/seeders/images/playstation.jpg")
      },
      {
        name: "Logitech G-Series Gaming Mouse",
        // image: "/home/node/app/backend/seeders/images/mouse.jpg",
        description:
          "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
        brand: "Logitech",
        category: "Electronics",
        price: 49.99,
        countInStock: 7,
        imageType: path.basename("/home/node/app/backend/seeders/images/mouse.jpg"),
        imageName: path.extname("/home/node/app/backend/seeders/images/mouse.jpg").slice(1),
        imageData: fs.readFileSync("/home/node/app/backend/seeders/images/mouse.jpg")
      },
      {
        name: "Amazon Echo Dot 3rd Generation",
        // image: "/home/node/app/backend/seeders/images/alexa.jpg",
        description:
          "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
        brand: "Amazon",
        category: "Electronics",
        price: 29.99,
        countInStock: 0,
        imageType: path.basename("/home/node/app/backend/seeders/images/alexa.jpg"),
        imageName: path.extname("/home/node/app/backend/seeders/images/alexa.jpg").slice(1),
        imageData: fs.readFileSync("/home/node/app/backend/seeders/images/alexa.jpg")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  }
};
