const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const db = require("../dbapp/models/index.js");
const productsArr = require("./seeds.js").products;
const usersArr = require("./seeds.js").users;

const User = db.users;
const Product = db.products;

const createUsers = async users => {
  return users.map(async user => {
    try {
      let oldUser = await User.findOne({
        where: {
          email: user.email
        }
      });
      console.log(oldUser);
      if (!oldUser) {
        let hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashedPassword };
        await User.create(newUser);
        console.log(newUser);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const createProducts = async products => {
  return products.map(async product => {
    try {
      const filename = path.basename(product.image);
      const fileType = path.extname(product.image).slice(1);
      const image = fs.readFileSync(product.image);

      await Product.create({
        name: product.name,
        image: product.image,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        countInStock: product.countInStock,
        imageType: fileType,
        imageName: filename,
        imageData: image
      });
      console.log(`Added ${product.name}`);
    } catch (err) {
      console.log(err);
    }
  });
};

async function seedData() {
  try {
    await db.sequelize.sync();
    console.log("Connection has been established successfully.");

    await db.sequelize.authenticate();

    if (usersArr.length > 0) {
      await createUsers(usersArr);
    }
    if (productsArr.length > 0) {
      await createProducts(productsArr);
    }

    console.log("Data seeding completed successfully.");

    await db.sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seedData();
