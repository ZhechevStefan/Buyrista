const usersDbController = require("./dbapp/controllers/users-DBcontroller.js");

// db.sequelize.sync();

const createManyUsers = async users => {
  return users.map(async user => {
    const current = await usersDbController.createUser(user);
    console.log(current.toJSON());
  });
};

const usersArr = [
  {
    name: "Charlize Theron",
    email: "test1@test.com",
    password: "123456",
    isAdmin: false
  },
  {
    name: "Scarlett Johanson",
    email: "test2@test.com",
    password: "123456",
    isAdmin: false
  },
  {
    name: "Megan Fox",
    email: "test3@test.com",
    password: "123456",
    isAdmin: false
  },
  {
    name: "Nicole Kidman",
    email: "test4@test.com",
    password: "123456",
    isAdmin: false
  },
  {
    name: "Margot Robbie",
    email: "test5@test.com",
    password: "123456",
    isAdmin: false
  },
  ,
  {
    name: "Eva Green",
    email: "test6@test.com",
    password: "123456",
    isAdmin: false
  }
];

createManyUsers(usersArr);
