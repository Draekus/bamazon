const mysql = require('mysql');

const inquirer = require('inquirer');

const Table = require('cli-table');

const secret = require('./ignored/password.js');


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

connection.connect(function(err) {
    if (err) throw err;
});

function showInventory(query) {
    var table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Stock']
      , colWidths: [5, 50, 35, 9, 8]
    });
    
    connection.query(query,  function(err,res) {
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
        console.log('\n\n' + table.toString() + `\n\n\n\n`);
        
    });
}

function addInventory() {
    
    inquirer.prompt([
    
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the product you would like to update?'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units would you like to add to the inventory?'
        }
      
    ]) 
    .then(function(answers) {
        connection.query(`UPDATE bamazon.products SET stock_quantity = stock_quantity + ${answers.quantity} WHERE ?`,
        [
        {
            id: answers.id
        }
        ],
        function(err,res) {
        if (err) throw err;
            console.log('\n The Inventory has been updated.\n')
            showPrompt()
        
        });
    });
    
}

function addProduct() {
    
    inquirer.prompt([
    
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the product?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department will the product be in?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the price of the product?',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units of the product will be added?',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            }
        }
      
    ]) 
    .then(function(answers) {
        let values = {product_name: answers.name, department_name: answers.department, price: answers.price, stock_quantity: answers.quantity}
        connection.query("INSERT INTO bamazon.products SET ?", values,

        function(err,res) {
            if (err) throw err;
            console.log('\n Your product has been added.\n')
            showPrompt()
        });
    }); 
}


function showPrompt() {
    inquirer.prompt([
    
        {
            type: 'list',
            name: 'select',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }
      
    ]) 
    .then(function(answers) {
        if (answers.select === 'View Products for Sale') {
            
        }

        switch(answers.select) {
            
            case 'View Products for Sale':
                showInventory('SELECT * FROM bamazon.products');
                showPrompt();
                break;

            case 'View Low Inventory':
                showInventory('SELECT * FROM bamazon.products WHERE stock_quantity < 5')
                showPrompt();
                break;
            case 'Add to Inventory':
                showInventory('SELECT * FROM bamazon.products')
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
                
            case 'Exit':
            process.exit()
        }

    })
}

showPrompt();

