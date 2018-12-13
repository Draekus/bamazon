const mysql = require('mysql');

const inquirer = require('inquirer');

const Table = require('cli-table');

const secret = require('./password');

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: secret.password,
    database: "bamazon"
});

stock = 0;

connection.connect(function(err) {
    if (err) throw err;
});

function showInventory() {
    var table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Stock']
      , colWidths: [5, 50, 35, 9, 8]
    });
    
    connection.query('SELECT * FROM bamazon.products',  function(err,res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            let id = res[i].id;
            let product = res[i].product_name;
            let department = res[i].department_name;
            let price = res[i].price;
            let stock = res[i].stock_quantity;

            table.push(
                [id, product, department, `$${price}`, stock]
            );

        }
        console.log('\n\n' + table.toString());
    });
}

function updateQuantity(id, amount) {
    connection.query(
        `UPDATE bamazon.products SET stock_quantity = stock_quantity - ${amount} WHERE ?`,
        [
        {
            id: id
        }],
        function(err,res) {
        if (err) throw err;
        
        })
}

function purchaseProduct(id, amount) {
    connection.query('SELECT product_name, price, stock_quantity FROM bamazon.products WHERE id=?', [id], function(err,res) {
        if (err) throw err;
        
        if (amount <= res[0].stock_quantity) {
            
            updateQuantity(id, amount);
            console.log('\n\n Your purchase was successful.');
            let purchase = new Table({
                head: ['Product', 'Price', 'Quantity', 'Total']
              , colWidths: [40, 9, 12, 10]
            });
            let product = res[0].product_name;
            let price = res[0].price;
            let total = amount * price;
            purchase.push(
                [product, `$${price}`, amount, `$${total}`]
            );
            console.log('\n  Invoice:\n' + purchase.toString());
        }

        else {
            console.log("\nSorry we are unable to process that purchase. Try ordering a lower quantity.")
        }
    });
    
    
}


showInventory();
inquirer.prompt([
    
    {
        type: 'input',
        name: 'select',
        message: 'What product would you like to purchase? (Enter product ID number)'
    },
    {
        type: 'input',
        name: 'amount',
        message: 'How many units of this product would you like to purchase?'
    }
  
]) 
.then(function(answers) {
    purchaseProduct(answers.select, answers.amount)
    
})


