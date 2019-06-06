db.Book.createIndex({keywords:'text'})
db.Book.createIndex({ISBN: 1}, {unique: true})
db.Book.createIndex({'borrowed.returnDate':1})