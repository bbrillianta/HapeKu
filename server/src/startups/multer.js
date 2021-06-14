const multer = require('multer');

exports.products = multer({ dest: 'public/images/products' });
exports.transactions = multer({ dest: 'public/images/transactions' });
