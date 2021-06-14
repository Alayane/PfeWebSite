

const menuUl=document.getElementById('menuUl')
const itemsDiv=document.getElementById('itemes')
let menuLi


function loadIndex(){
    
    loadMenu()
    getItems('meat')
}


const loadMenu = () => {
    axios.get('http://localhost:64364/categories/all')
        .then(response => {
            const categories = response.data;
            menuUl.innerHTML="";
            categories.forEach(e => {
                let li=document.createElement('li')
                let liText=document.createTextNode(e.name)
                li.appendChild(liText)
                menuUl.appendChild(li)
            });
            menuUl.firstChild.className="active"
            menuLi=document.querySelectorAll('#menuUl li')
           
            menuLi.forEach((e)=>{
                    e.addEventListener('click',function(i){
                    var b = document.querySelectorAll(".active");
                    if (b){
                        b.forEach(e=>{
                            e.classList.remove("active");
                        })
                    } 
                    e.classList.add('active');
                    let trg =  e.target || e.srcElement;
                    let category = i.target.innerText;
                    getItems(category)
                })
                
            })
        })
        .catch(error => console.log(error));
};

const getItems = (cat) => {
    axios.get('http://localhost:64364/items/all/'+cat)
        .then(response => {
            const items = response.data;
            itemsDiv.innerHTML="";
            items.forEach(e => {
                let item=document.createElement('div')
                item.className='item'
                item.innerHTML+=`
                    <div class="itemPic" style="background-image: url(data:image/png;base64,${e.Image});">
                    </div>
                    <div class="itemDesc">
                        <div class="title">${e.Name}</div>
                        <dir class="info">                     
                            <div class="qnt">${e.Qte}</div>
                            <div class="price">$${e.Price}</div>
                        </dir>
                    </div>`
                    itemsDiv.appendChild(item)
                });
                
        })
        .catch(error => console.log(error));
};







          
  
 