// 3.變數宣告
const menu = document.getElementById('menu')
const cart = document.getElementById('cart')
const totalAmount = document.getElementById('total-amount')
const button = document.getElementById('submit-button')

const productData = [];
let cartItems = []
let total = 0

// 4.GET API 菜單產品資料

axios.get("https://ac-w3-dom-pos.firebaseio.com/products.json").then((response)=>{

    for(let item of response.data){

        productData.push(item);
    }
    console.log(productData);

    displayProduct(productData);




}).catch((err)=>console.log(err));


// 5.將產品資料加入菜單區塊
function displayProduct(products) {
products.forEach(product => menu.innerHTML += `
    <div class="col-3">
    <div class="card">
        <img src=${product.imgUrl} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <a href="#" class="btn btn-primary btn-addtocart" data-key="${product.id}">加入購物車</a>
        </div>
        </div>
    </div>
`)
}


// 6.加入購物車
function addToCart(event) {
  // 找到觸發event的node元素，並得到其產品id
  const targetID=event.target.dataset.key;
  
  // 在productData的資料裡，找到點擊的產品資訊，加入 cartItems
  const newItem=productData.find(product=>product.id === targetID);

  // 加入購物車變數cartItems 分：有按過、沒按過
  const targetItem=cartItems.find(item=>item.id === targetID)

  if(targetItem){
    targetItem.quantity+=1;
    targetItem.price+=newItem.price;
  }
  else{
    cartItems.push({
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        quantity: 1,
    });
  }

  // 畫面顯示購物車清單
  cart.innerHTML="";
  for (let item of cartItems){

    cart.innerHTML+=`<li class="list-group-item">${item.name} X ${item.quantity} 小計：${item.price}</li>`;
  }

  // 計算總金額
  total = cartItems.reduce((total, item)=>(total+item.price),0);
  totalAmount.textContent=total;

}

// 7.計算總金額

// 8.送出訂單
function submit() {
}

// 9.重置資料
function reset() {
}

// 10. 加入事件監聽
menu.addEventListener("click", addToCart);

