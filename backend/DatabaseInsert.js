const bcrypt = require('bcrypt');

let pswrd = bcrypt.hashSync('A123456', 9);
console.log(bcrypt.compareSync('a123456', pswrd));
console.log(pswrd);