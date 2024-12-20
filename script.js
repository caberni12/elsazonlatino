// Función que se ejecuta cuando el usuario hace clic en el botón de pago
function redirectToPayment() {
    // Obtener el total del div 'totalAmount'
    var totalText = document.getElementById("totalAmount").innerText; // Ejemplo: "Total: $100"
    
    // Extraer solo el número (en este caso '100') del texto, eliminando "Total: $"
    var totalAmount = totalText.replace("Total: $", "").trim(); // Eliminar "Total: $"
  
    // Verificar que el monto es un número válido
    if (isNaN(totalAmount) || totalAmount === "") {
      alert("El monto no es válido.");
      return;
    }
    

    // Crear la URL de Webpay con el monto dinámico
    var paymentUrl = "https://www.webpay.cl/form-pay/237125?amount=" + totalAmount;
  
    // Redirigir al usuario a la URL con el monto
    
   
    //window.location.href = paymentUrl; // Redirige al usuario a la página de Webpay
    window.open(paymentUrl, "_blank");
    // Abrir la URL en una nueva ventana o pestaña
   
  }
  
  
// orden de pedido

  let cart = []; // Carrito de compras
  let customerInfo = {}; // Información del cliente
  
  // Función para filtrar productos
  function filterProducts() {
      const input = document.getElementById("searchInput").value.toLowerCase();
      const productCards = document.querySelectorAll(".product-card");
  
      productCards.forEach(card => {
          const title = card.querySelector("h3").textContent.toLowerCase();
          if (title.includes(input)) {
              card.style.display = "block";
          } else {
              card.style.display = "none";
          }
      });
  }
  
  // Función para añadir productos al carrito
  function addToCart(productName, price) {
      const existingProduct = cart.find(item => item.name === productName);
  
      if (existingProduct) {
          existingProduct.quantity++;
          existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
      } else {
          cart.push({ name: productName, price: price, quantity: 1, totalPrice: price });
      }
  
      updateCartDisplay(); // Actualizar la vista del carrito
  }
  
  // Función para eliminar productos del carrito
  function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartDisplay();
  }
  
  // Función para actualizar la visualización del carrito
  function updateCartDisplay() {
      const cartList = document.getElementById('cartItems');
      const cartCount = document.getElementById('cartCount');
      const totalAmount = document.getElementById('totalAmount');
      const viewCartButton = document.getElementById('viewCartButton');
  
      cartList.innerHTML = ''; // Limpiar el contenido del carrito
  
      // Mostrar los productos en el carrito
      cart.forEach((item, index) => {
          const div = document.createElement('div');
          div.classList.add('cart-item');
          div.innerHTML = `  
              <span>${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)}</span> 
              <button onclick="removeFromCart(${index})">Eliminar</button> 
          `;
          cartList.appendChild(div);
      });
  
      // Actualizar el contador de productos en el carrito
      cartCount.textContent = cart.length;
      
      // Calcular el total
      const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
      totalAmount.textContent = `Total: $${total.toFixed(2)}`;
  
      // Actualizar el contador en el botón de ver carrito
      viewCartButton.innerHTML = `Ver Carrito (<span id="cartCount">${cart.length}</span>)`;
  }
  
  // Función para vaciar el carrito
  function clearCart() {
      cart = [];
      updateCartDisplay();
      closeModal('cart');
  }
  
  // Función para mostrar un modal
  function showModal(modalId) {
      document.getElementById(modalId + 'Modal').style.display = 'flex';
      showLoading(); // Mostrar el loading al abrir el modal
  }
  
  // Función para cerrar un modal
  function closeModal(modalId) {
      document.getElementById(modalId + 'Modal').style.display = 'none';
      hideLoading(); // Ocultar el loading al cerrar el modal
  }
  
  // Función para mostrar el loading
  function showLoading() {
      document.getElementById('loading').style.display = 'flex';
      setTimeout(hideLoading, 1500); // Esperar 1,5 segundos y luego ocultar el loading
  }
  
  // Función para ocultar el loading
  function hideLoading() {
      document.getElementById('loading').style.display = 'none';
  }
  
  // Función para confirmar la entrega (entrega a domicilio)
  function clearCart() {
    cart = [];
    updateCartDisplay();
    closeModal('cart');
}

function showModal(modalId) {
    document.getElementById(modalId + 'Modal').style.display = 'flex';
    showLoading();  // Mostrar el loading al abrir un modal
}

function closeModal(modalId) {
    document.getElementById(modalId + 'Modal').style.display = 'none';
    hideLoading();  // Ocultar el loading al cerrar el modal
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    setTimeout(hideLoading, 1500);  // Esperar 1,5 segundos y luego ocultar el loading
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function confirmDelivery() {
    // Recoger la información del cliente para delivery
    customerInfo = {
        name: document.getElementById('deliveryName').value,
        address: document.getElementById('deliveryAddress').value,
        phone: document.getElementById('deliveryPhone').value,
        observaciones:document.getElementById('deliveryOservaciones').value
        
    };
    alert('Orden Confirmada Delivery favor confirmar Numero de tranferencia');
    closeModal('delivery');
}

function confirmRetira() {
    // Recoger la información del cliente para retiro
    customerInfo = {
        name: document.getElementById('retiraName').value,
        phone: document.getElementById('retiraPhone').value,
        observaciones:document.getElementById('deliveryOservaciones').value
        
    };
    alert('Orden de Pedido:');
    closeModal('retira');
}

function sendWhatsApp() {
    // Crear el mensaje para WhatsApp
    let message = "Pedido desde el carrito de compra\n\n";
    
    // Recorrer los productos del carrito y añadirlos al mensaje
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)}\n`;
    });

    // Calcular el total
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    message += `\nTotal: $${total.toFixed(2)}\n\n`;

    // Añadir los datos del cliente al mensaje
    if (customerInfo.name) {
        message += `Nombre: ${customerInfo.name}\n`;
    }
    if (customerInfo.address) {
        message += `Dirección: ${customerInfo.address}\n`;
    }
    if (customerInfo.phone) {
        message += `Teléfono: ${customerInfo.phone}\n`;
    }
    if (customerInfo.observaciones) {
        message += `Observaciones: ${customerInfo.observaciones}\n`;
    }
    
    // Codificar el mensaje para la URL de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "56974442231"; // Número de teléfono para recibir el pedido en WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(url, '_blank');
}


function viewCart() {
    showModal('cart');
}


