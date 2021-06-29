const btnO = document.getElementById('btn-orders');
const btnT = document.getElementById('btn-tables');
const order = document.querySelector('.order');
const table = document.getElementById('btn-tables');
const addTable = document.querySelector('.add-table');
const listTable = document.querySelector('.table-list');
let orderBtnDetails = document.querySelectorAll('.details');
let orderDetails = document.getElementById('details-order');
let orderBtnBill = document.querySelectorAll('.bill');
let orderBill = document.getElementById('bill-order');
const orderForms = document.querySelector('.forms');
const orderClose = document.querySelector('.close');
const btnQR = document.getElementById('btnQR');
const canvasQR = document.getElementById('qr');
const btnPrint = document.getElementById('print');
let tableDelete = document.querySelectorAll('.deleteTbl');
const tblOrders = document.getElementById('tblOrders');
const tblDetails = document.getElementById('tblDetails');
const tblBill = document.getElementById('tblBill');
const tblTables = document.getElementById('tblTables');
const btnAccept = document.getElementById('accept');
const btnBillPrint = document.getElementById('btnPrint');
const btnAddTable = document.getElementById('btnAddTable');
const txtTableId = document.getElementById('txtTableId');
const btnLogout = document.getElementById('btnLogout');
let orderId
let tableId



tblOrders.style.display="none";
order.style.display = 'none';
btnT.style.backgroundColor = ' white';
orderForms.style.display = 'none';
orderDetails.style.display = 'none';
orderBill.style.display = 'none';

btnLogout.addEventListener('click',function(){
    window.open('login.html','_self')
})

function loadDash(){

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange=function() {
    if(this.readyState === 4 && this.status===200) {
        let orders=JSON.parse(this.responseText);  
        if(orders=="empty"){
            return;
        }    
        tblOrders.style.display="";
        let html;
        tblOrders.innerHTML="";
        let th=document.createElement('thead')
        th.innerHTML=`<th>Order id</th>
        <th>Order date</th>
        <th>Table</th>
        <th>Order state</th>
        <th>Details</th>
        <th>Bill</th>`
        tblOrders.appendChild(th)
        orders.forEach(e => {
          html=  document.createElement('tr')
          html.innerHTML= `<tr>
            <td>${e.Id}</td>
            <td>${e.Date}</td>
            <td>${e.TableId}</td>
            <td>${e.State?"Received":"Not received yet"}</td>
            <td> <span class="details" >Details</span> </td>
            <td> <span class="bill" >Bill</span> </td>
            </tr>`
            tblOrders.appendChild(html)
        });
        clc()
    }
};
    
    xhr.open("GET", "http://localhost:64364/Orders/all",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

const deleteTable = (id) => {
    axios.delete(`http://localhost:64364/tables/delete/${id}`)
    .then(response => {
    console.log(`DELETE: user is removed`, id);
    })
    .catch(error => console.log(error));
};






btnT.addEventListener('click',function(){
    btnT.style.backgroundColor = ' white';
    btnO.style.backgroundColor = ' transparent';
    order.style.display = 'none';
    addTable.style.display = '';
    listTable.style.display = '';
    loadTables()
})
btnO.addEventListener('click',function(){
    btnO.style.backgroundColor = ' white';
    btnT.style.backgroundColor = ' transparent';
    order.style.display = '';
    addTable.style.display = 'none';
    listTable.style.display = 'none';
    loadDash()
})

orderBtnDetails.forEach((i) =>{
    i.addEventListener('click',function(e){
    orderForms.style.display = '';
    orderDetails.style.display = '';
    let prnt =  i.parentNode.parentNode;
    let id = prnt.firstElementChild.textContent;
    })
})

btnAddTable.addEventListener('click',function(){
    
    let id=parseInt(txtTableId.value);
    createTable(id)
})

const loadTables = () => {
    axios.get('http://localhost:64364/tables/all')
        .then(response => {
            const tables = response.data;
            if(tables=="empty"){
                return;
            } 
            tblTables.style.display="";
            let html;
            tblTables.innerHTML="";
            let th=document.createElement('thead')
            th.innerHTML=`<th>Table</th>
            <th>State</th>
            <th>Delete</th>`
            tblTables.appendChild(th)
            tables.forEach(e => {
            html=  document.createElement('tr')
            html.innerHTML= `<td>${e.Id}</td>
            <td>${e.state?"Reserved":"Empty"}</td>
            <td><span class="deleteTbl">Delete</span></td>`
                tblTables.appendChild(html)
            });
            tableDel()
        })
        .catch(error => console.error(error));
};

const createTable= (id) => {
    let nb=parseInt(id)
    axios.post('http://localhost:64364/tables/add/'+nb)
        .then(response => {
            const addedUser = response.data;
            loadTables();
            // console.log(addedUser);
        })
        .catch(error => console.log(error));
};

function tableDel() {
    tableDelete = document.querySelectorAll('.deleteTbl');
                        
        tableDelete.forEach((i)=>{
            i.addEventListener('click',function(e){
                let prnt = i.parentNode.parentNode;
                let id = prnt.firstElementChild.textContent;
                let intid=parseInt(id)
                deleteTable(intid)
                // loadTables()
                window.location.reload()
            })
        })
    
}


const upOrder= (id) => {
    let nb=parseInt(id)
    axios.post('http://localhost:64364/orders/up/'+nb)
        .then(response => {
            const addedUser = response.data;
            loadDash();
        })
        .catch(error => console.log(error));
};

btnAccept.addEventListener('click',function(){
   
    upOrder(orderId)

})
const upTable= (id) => {
    let nb=parseInt(id)
    axios.post('http://localhost:64364/tables/take/'+nb+'/0')
        .then(response => {
            const addedUser = response.data;
            loadTables();
        })
        .catch(error => console.log(error));
};
btnBillPrint.addEventListener('click',function(){
    upTable(tableId);
})

function clc(){
    let orderBtnDetails = document.querySelectorAll('.details');
        let orderDetails = document.getElementById('details-order');
        let orderBtnBill = document.querySelectorAll('.bill');
        let orderBill = document.getElementById('bill-order');
        orderBtnDetails.forEach((i) =>{
        i.addEventListener('click',function(e){
        orderForms.style.display = '';
        orderDetails.style.display = '';
            let prnt =  i.parentNode.parentNode;
            let nb = prnt.firstElementChild.textContent;
             orderId=parseInt(nb)
            getDetails(orderId)
        })
        })
        orderBtnBill.forEach((i) =>{
            i.addEventListener('click',function(){
            orderForms.style.display = '';
            orderBill.style.display = '';
            let prnt =  i.parentNode.parentNode;
            let nb = prnt.firstElementChild.textContent;
            tableId = prnt.children[2].textContent;
            let id=parseInt(nb);
            getBill(id)
        })
        })
}


function getDetails(id){
    var xhr = new XMLHttpRequest();
    var data = JSON.stringify(id);
    xhr.onreadystatechange=function() {
        if(this.readyState === 4 && this.status===200) {
            let orders=JSON.parse(this.responseText);
            if(orders=="empty") return
            let html;
            tblDetails.innerHTML="";
            orders.forEach(e=>{
                tblOrders.style.display="";
                html=  document.createElement('tr')
                html.innerHTML= `<tr>
                <td>${e.name}</td>
                <td>x<span>${e.qte}</span></td>
                </tr>`
                tblDetails.appendChild(html)
            });
        }
    };
            
    xhr.open("GET", "http://localhost:64364/OrderDetails/all/"+data,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function getBill(id){
    var xhr = new XMLHttpRequest();
    var data = JSON.stringify(id);
    xhr.onreadystatechange=function() {
        if(this.readyState === 4 && this.status===200) {
            let orders=JSON.parse(this.responseText);
            if(orders=="empty") return
            let html;
            tblBill.innerHTML="";
            orders.forEach(e=>{
                html=  document.createElement('tr')
                html.innerHTML= `<td>${e.Item}</td>
                <td>x<span>${e.Qte}</span></td>
                <td><span>$${e.ItemTotal}</span></td>`
                tblBill.appendChild(html)
            });
            let trr=document.createElement('tr')
            trr.innerHTML=`<tr>
            <td>Total </td>
            <td></td>
            <td><span>$${orders[0].Total}</span></td>
            </tr>`
            tblBill.appendChild(trr)
        }
    };
            
    xhr.open("GET", "http://localhost:64364/OrderDetails/bill/"+data,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}


orderClose.addEventListener('click',function(){
    orderForms.style.display = 'none';
    orderDetails.style.display = 'none';
    orderBill.style.display = 'none';
})


let qr;
(function() {
        qr  =  new QRious({
        element: canvasQR,
        size: 200,
        value: 'https://www.linkedin.com/in/redouane-alahyane-199048173/'
    });
})();
btnQR.addEventListener('click',function(){
    let qrtext  =  document.getElementById("txtTableId").value;
    if(qrtext!= ""){
        document.getElementById("nTable").innerHTML  =  "QR code for table " + qrtext +":";
        qr.set({
            foreground: 'black',
            size: 200,
            value: qrtext
        });
    }else
        alert('Add table id')
})




btnPrint.addEventListener('click',function(){

  let image  =  canvasQR.toDataURL("image/png");
  let newWin = window.open('', 'PrintWindow');
  newWin.document.open();
  newWin.document.write('<html><body onload = "window.print()"><img src = "'+image+'" width = "400px" height = "400px"/></body></html>');
  newWin.document.close();
  setTimeout(function(){newWin.close()},.1);
})

tableDelete.forEach((i) =>{
    i.addEventListener('click',function(){
    let prnt = i.parentNode.parentNode; 
    confirm('are you sure you want to delete table '+prnt.firstElementChild.textContent)
    })
})
