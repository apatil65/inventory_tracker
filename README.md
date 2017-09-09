# inventory_tracker
inventory_tracker REST API

Make sure MongoDB is installed.
Create collection hotel
Create document food_and_bev

Run npm install to install the dependencies mentioned under package.json
Hit "http://localhost:3001/import_data" rest API to import dummy data into your database. Or you can insert each inventory by calling below API
"http://localhost:3001/food_and_bev/add". Use POST MAN to POST the data set in Body.

System will provide REST api to get following data.
1. Add items to inventory
2. Record sold item.
3. No. of items sold by date and city ( example : items sold on 10th sep 2017 in bangalore)
4. No. of items sold by kind of item and item ( example: how many "food" items are sold on 10th sep)
5. Total no. of items sold by name ( how many cofee are sold till now , how many cofee are sold on 10th sep)
6. Total items sold till now with pagination with filter on name, kind of item and city.



