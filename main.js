// get Total 
// create product save localStorage
// clear inputs
// read
// delete
// count 
// update
// search
// clean data

// ---------------------- access all inputs--------------
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'creat';
let tmp;
// -------------------------get Total----------------------- 

function getTotal(){
    if(price.value != '' ){
        let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#008000';  
    } else {
        total.innerHTML = '';
        total.style.background= '#a80510';
    }
    

}

// -----------------------------------create product-------------------
let dataProducts;

if (localStorage.products != null) {
    const storedData = JSON.parse(localStorage.products);
    if (Array.isArray(storedData)) {
        dataProducts = storedData;
    } else {
        // If the stored data is not an array, initialize dataProducts as an empty array
        dataProducts = [];
    }
}else {
    dataProducts = [];
}

submit.onclick = function(){
    
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };

    //  count --------------------------------------
    if(title.value !='' && price.value !='' && category.value!='' && newPro.count < 100){
        if (mood === 'creat'){


           if(newPro.count > 1){  
            for(let i = 0; i < newPro.count; i++ ){
              dataProducts.push(newPro);
            }
  
           }
           else{
           dataProducts.push(newPro);
           } 

        }else{
          dataProducts[tmp] = newPro;
          mood = 'creat';
          count.style.display = 'block'; 
          submit.innerHTML='Creat';
        }
        
        cleanData();
    }
    
    
    

    // save localStorage----------------------------------
    
    localStorage.setItem("products", JSON.stringify(dataProducts));
    
    showData();
    deletAllFun();
}

// clear inputs------------------------------------

function cleanData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read ----------------------------------------------------

function showData(){

    let table = '';
    for (let i = 0; i < dataProducts.length; i++) { // Corrected typo and loop condition
        // const product = dataProducts[i]; // Get the product at the current index
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td> 
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delet">Delete</button></td>
            </tr>
        `;
    }
    
    // Assuming you have a tbody element with id 'tbody'
    document.getElementById('tbody').innerHTML = table;


}
showData();

// delete data ----------------------------------------

function deleteProduct(i) {
    // Find the product index by id
   // dataProducts = ["title","price","taxes","ads","discount","total","category"]
  
   
     // Use splice to remove the product at the specified index
    dataProducts.splice(i, 1);
    localStorage.products = JSON.stringify(dataProducts);
    
    showData();
    deletAllFun();
}


// Delete All 
/*
first I'll creat a buton Delete All if there are a data in tabel the button should To appear 
if not The button should be hidden
*/

let btndeletAll = document.getElementById('deletAll');
function deletAllFun(){

    if (localStorage.products  && JSON.parse(localStorage.products).length > 0  ){
        // Show the "Delete All" button
        deletAll.style.display = 'block'; 
        btndeletAll.innerHTML=`
        <td><button id = "btndelet" >Delete All (${dataProducts.length}) </button></td>
        ` ;
    }
    else{       
        // Hide the "Delete All" button
        deletAll.style.display = 'none';
        
    }
    getTotal ();
}
deletAllFun();

function deletAllData(){
   
    dataProducts.splice(0,dataProducts.length);
    tbody.innerHTML='';
    localStorage.products = JSON.stringify(dataProducts);
    deletAllFun();
}

// let update = document.getElementById('update');
function updateProduct(i){
   
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    category.value = dataProducts[i].category;
    count.style.display = 'none'; 
    getTotal(); 
    submit.textContent='Update';
    mood = 'update';
    tmp = i;
    scroll({top: 0, behavior: 'smooth' });
}


// -------------------- search -----------------------------------

let searchMood = 'text'

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'text';
    }
    else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
    
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataProducts.length; i++){
        if (searchMood == 'text'){
        
       

            if(dataProducts[i].title.toLowerCase().includes(value.toLowerCase())){
                
                
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProducts[i].title}</td>
                        <td>${dataProducts[i].price}</td>
                        <td>${dataProducts[i].taxes}</td>
                        <td>${dataProducts[i].ads}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td> 
                        <td>${dataProducts[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delet">Delete</button></td>
                    </tr>
                `;
                
                
            }
    
            
    
        }else{
            
    
            if(dataProducts[i].category.toLowerCase().includes(value.toLowerCase())){
                
                
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProducts[i].title}</td>
                        <td>${dataProducts[i].price}</td>
                        <td>${dataProducts[i].taxes}</td>
                        <td>${dataProducts[i].ads}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td> 
                        <td>${dataProducts[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delet">Delete</button></td>
                    </tr>
                `;
                
                
            }
    
            
    
        }
        document.getElementById('tbody').innerHTML = table;
    }
    
    
}