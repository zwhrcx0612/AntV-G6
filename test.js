var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'test'
})
console.log(connection)
connection.connect()

connection.query('SELECT * from websites', function(error, results, fields) {
  if (error) throw error
  // console.log('The solution is: ', results);
})
