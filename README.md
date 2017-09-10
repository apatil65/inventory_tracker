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


Below are the API details. PUT, POST and DELETE operations are tested using POSTMAN.

1) ADD ITEMS TO INVENTORY
OPERATION : POST
API       : http://localhost:3001/food_and_bev/add  
Send below in REST BODY using POSTMAN.
{"type": "food", "item": "pizza", "sold_date": "", "city_sold": "Blor", "total_sold": 0}

2) RECORD SOLD ITEM
OPERATION : PUT
API       : http://localhost:3001/update/:type/:item   
Pass type(food/beverage) and item as params in the API and send the below details in the BODY. Use POSTMAN.
{ "sold_date": 20170908, "$inc": {"total_sold": 5}, "city_sold": "Bangalore" }

3) No OF ITEMS SOLD BY DATE & CITY ( example : items sold on 10th sep 2017 in bangalore)
OPERATION : GET
API       : http://localhost:3001/food_and_bev/sold?findType=byItemDate&date=2017-08-10&item=dosa 
Pass item name and date as query param in the API. This will give you the total number of X item sold on that date.

4) No IF ITEMS SOLD BY KIND ON DATE ( example: how many "food" items are sold on 10th sep)
OPERATION : GET
API       : http://localhost:3001/food_and_bev/sold?findType=byTypeDate&date=2017-08-10&type=food
Pass type(food/beverage) and date as query param in the API. 

5) Total no. of items sold by name ( how many cofee are sold till now , how many cofee are sold on 10th sep)
OPERATION : GET
API       : http://localhost:3001/food_and_bev/sold?findType=byItemDate&date=2017-08-10&item=samosa
Pass item and date in API param.

6) PAGINATION - AND FILTER BY ITEM/CITY
OPERATION : GET
API       : http://localhost:3001/food_and_bev?page=1&size=5&city=Blor
Pass page No and data size in API Param. OPTIONAL -> Pass filter(city/item)

7) LIST ALL DATA FROM DB
OPERATION : GET
API       : http://localhost:3001/food_and_bev

8) DELETE BY ID
OPERATION : DELETE
API       : http://localhost:3001/food_and_bev/delete/:id
