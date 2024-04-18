// const usersDbController = require("./dbapp/controllers/users-DBcontroller.js");
const usersControllers = require("../controllers/users-controllers");

// db.sequelize.sync();

const createManyUsers = async users => {
  return users.map(async user => {
    const current = await usersControllers.register(user);
    // console.log(current.toJSON());
  });
};

// const usersArr = [
//   {
//     name: "Charlize Theron",
//     email: "test1@test.com",
//     password: "123456",
//     isAdmin: false
//   },
//   {
//     name: "Scarlett Johanson",
//     email: "test2@test.com",
//     password: "123456",
//     isAdmin: false
//   },
//   {
//     name: "Emma Watson",
//     email: "test3@test.com",
//     password: "123456",
//     isAdmin: false
//   },
//   {
//     name: "Nicole Kidman",
//     email: "test4@test.com",
//     password: "123456",
//     isAdmin: false
//   },
//   {
//     name: "Margot Robbie",
//     email: "test5@test.com",
//     password: "123456",
//     isAdmin: false
//   },
//   ,
//   {
//     name: "Eva Green",
//     email: "test6@test.com",
//     password: "123456",
//     isAdmin: false
//   },
//   {
//     name: "Natalie Portman",
//     email: "test7@test.com",
//     password: "123456",
//     isAdmin: false
//   }
// ];

const usersArr = [
  // {
  //   firstName: "Jenna",
  //   lastName: "Ortega",
  //   email: "test11@test.com",
  //   password: "123456"
  // },
  // {
  //   firstName: "Jennifer",
  //   lastName: "Lawrence",
  //   email: "test13@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Emma",
  //   lastName: "Stone",
  //   email: "test14@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Keira",
  //   lastName: "Knightley",
  //   email: "test15@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Emilia",
  //   lastName: "Clarke",
  //   email: "test16@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  //
  // {
  //   firstName: "Olivia",
  //   lastName: "Wilde",
  //   email: "test17@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Liv",
  //   lastName: "Tyler",
  //   email: "test18@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Diane",
  //   lastName: "Kruger",
  //   email: "test19@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Eva",
  //   lastName: "Mendes",
  //   email: "test20@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Rachel",
  //   lastName: "McAdams",
  //   email: "test21@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Michelle",
  //   lastName: "Monaghan",
  //   email: "test22@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Aubrey",
  //   lastName: "Plaza",
  //   email: "test23@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Jennifer",
  //   lastName: "Anniston",
  //   email: "test24@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Rashida",
  //   lastName: "Jones",
  //   email: "test25@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Alicia",
  //   lastName: "Vicander",
  //   email: "test26@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Kate",
  //   lastName: "Beckinsale",
  //   email: "test27@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Ana",
  //   lastName: "de Armas",
  //   email: "test28@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Jessica",
  //   lastName: "Alba",
  //   email: "test29@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Emily",
  //   lastName: "Blunt",
  //   email: "test30@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Anna",
  //   lastName: "Kendrick",
  //   email: "test31@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Blake",
  //   lastName: "Lively",
  //   email: "test32@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Naomi",
  //   lastName: "Watts",
  //   email: "test33@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Christina",
  //   lastName: "Hendricks",
  //   email: "test34@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Jessica",
  //   lastName: "Biel",
  //   email: "test35@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Sienna",
  //   lastName: "Miller",
  //   email: "test36@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Rosario",
  //   lastName: "Dawson",
  //   email: "test37@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Taylor",
  //   lastName: "Swift",
  //   email: "test38@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Lucy",
  //   lastName: "Liu",
  //   email: "test39@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Robin",
  //   lastName: "Tunney",
  //   email: "test40@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Kat",
  //   lastName: "Dennings",
  //   email: "test41@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Beth",
  //   lastName: "Behrs",
  //   email: "test42@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Kate",
  //   lastName: "Upton",
  //   email: "test43@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Dilyana",
  //   lastName: "Popova",
  //   email: "test44@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Teodora",
  //   lastName: "Duhovnikova",
  //   email: "test45@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Nina",
  //   lastName: "Dobrev",
  //   email: "test46@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Oona",
  //   lastName: "Chaplin",
  //   email: "test47@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Nathalie",
  //   lastName: "Emmanuel",
  //   email: "test48@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Yana",
  //   lastName: "Marinova",
  //   email: "test49@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Maria",
  //   lastName: "Ignatova",
  //   email: "test50@test.com",
  //   password: "123456",
  //   isAdmin: false
  // },
  // {
  //   firstName: "Luiza",
  //   lastName: "Grigorova",
  //   email: "test51@test.com",
  //   password: "123456",
  //   isAdmin: false
  // }
];

createManyUsers(usersArr);
