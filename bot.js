const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6281625013:AAFlOOWRbaQuwsdKkcv3vEV96tym88lYQT8', { polling: true });

// Create an empty shopping cart object to store the user's selections
let shoppingCart = {};

const products = [
  {
    id: 'product_a',
    name: 'Butter Milk',
    price: 20,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.indianexpress.com%2F2022%2F02%2Fbuttermilk-1200.jpg&tbnid=Piw2eRIWOWMiIM&vet=12ahUKEwj-xrPr7Ob-AhXwnNgFHWnnAkYQMygGegUIARCHAg..i&imgrefurl=https%3A%2F%2Findianexpress.com%2Farticle%2Flifestyle%2Fhealth%2Fnectar-on-earth-buttermilk-health-benefits-quick-easy-recipe-ayurveda-7784011%2F&docid=aU4cZY1T4fEYiM&w=1200&h=667&q=butter%20milk&ved=2ahUKEwj-xrPr7Ob-AhXwnNgFHWnnAkYQMygGegUIARCHAg'
  },
  {
    id: 'product_b',
    name: 'Tea',
    price: 10,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.siasat.com%2Fwp-content%2Fuploads%2F2022%2F08%2FTea.jpg&tbnid=RNMM8XfZPUIDuM&vet=12ahUKEwjFppb27Ob-AhXThuYKHe8tD60QMygIegUIARCAAg..i&imgrefurl=https%3A%2F%2Fwww.siasat.com%2Fdrinking-2-cups-of-tea-daily-may-help-you-live-longer-2402658%2F&docid=z653_c2EhzXz4M&w=1200&h=900&q=tea&ved=2ahUKEwjFppb27Ob-AhXThuYKHe8tD60QMygIegUIARCAAg'
  },
  {
    id: 'product_c',
    name: 'Aalu Paratha',
    price: 20,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.spiceupthecurry.com%2Fwp-content%2Fuploads%2F2014%2F05%2Faloo-paratha-1-500x375.jpg&tbnid=ScUADchf-0972M&vet=12ahUKEwj-pImC7eb-AhUSyXMBHRSnC7gQMygVegUIARDIAg..i&imgrefurl=https%3A%2F%2Fwww.spiceupthecurry.com%2Faloo-paratha-recipe%2F&docid=N3UWKks9yuShhM&w=500&h=375&q=aalu%20paratha&ved=2ahUKEwj-pImC7eb-AhUSyXMBHRSnC7gQMygVegUIARDIAg'
  },
  {
    id: 'product_d',
    name: 'panner Paratha',
    price: 25,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fvegecravings.com%2Fwp-content%2Fuploads%2F2022%2F03%2FPaneer-Broccoli-Paratha-Recipe-Step-By-Step-Instructions-scaled.jpg&tbnid=HLv2mavyirLKYM&vet=12ahUKEwig6MGT7eb-AhVF1HMBHYPlAPYQMygLegUIARCRAg..i&imgrefurl=https%3A%2F%2Fvegecravings.com%2Fbroccoli-paratha-recipe%2F&docid=gyHbmSu1FNxm0M&w=2560&h=1809&q=panner%20paratha&ved=2ahUKEwig6MGT7eb-AhVF1HMBHYPlAPYQMygLegUIARCRAg'
  },
  {
    id: 'product_e',
    name: 'Egg thaali',
    price: 70,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F0e%2F98%2Fa3%2Ff6%2Fegg-masala-thali.jpg&tbnid=G6flW9OmwQLtWM&vet=12ahUKEwjbkoCf7eb-AhUl03MBHQV7DHYQMygEegUIARDZAQ..i&imgrefurl=https%3A%2F%2Fwww.tripadvisor.in%2FLocationPhotoDirectLink-g737166-d11190034-i244884470-Chittus_Rasoi-Kolhapur_Kolhapur_District_Maharashtra.html&docid=NZ48RSB6dnxe3M&w=550&h=310&q=egg%20thali&ved=2ahUKEwjbkoCf7eb-AhUl03MBHQV7DHYQMygEegUIARDZAQ'
  },
  {
    id: 'product_f',
    name: 'normal thaali',
    price: 60,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg-global.cpcdn.com%2Frecipes%2Fce884d070a8abf57%2F680x482cq70%2Fsimple-veg-thali-recipe-main-photo.jpg&tbnid=lSgQl_rsRpk4yM&vet=12ahUKEwjdsKat7eb-AhVBnNgFHTl3B9wQMygOegUIARCBAg..i&imgrefurl=https%3A%2F%2Fcookpad.com%2Fin%2Frecipes%2F12732008-simple-veg-thali&docid=mKXknYRz7t4XlM&w=680&h=482&q=normal%20thali&ved=2ahUKEwjdsKat7eb-AhVBnNgFHTl3B9wQMygOegUIARCBAg'
  },
  {
    id: 'product_g',
    name: 'Chicken thaali',
    price: 110,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimgstaticcontent.lbb.in%2Flbbnew%2Fwp-content%2Fuploads%2F2017%2F08%2F23123431%2F23082017_kolhapurithali_02.jpg&tbnid=ll5pZzJhOAD0WM&vet=12ahUKEwjXuq287eb-AhVbitgFHdULCR4QMygKegUIARCCAg..i&imgrefurl=https%3A%2F%2Flbb.in%2Fpune%2Fbest-kolhapuri-thalis-must-try-pune%2F&docid=_nf3JtPtWqSBGM&w=750&h=500&q=chicken%20thali&ved=2ahUKEwjXuq287eb-AhVbitgFHdULCR4QMygKegUIARCCAg'
  },
  {
    id: 'product_h',
    name: 'tawa roti',
    price: 5,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fbfoodale.com%2Fuploads%2F2021%2F12%2FTawa-Roti.jpg&tbnid=0CNEqdWaKQNpEM&vet=12ahUKEwiJ1ofJ7eb-AhXEgeYKHUiQDtUQMygCegUIARD1AQ..i&imgrefurl=https%3A%2F%2Fbfoodale.com%2Findex.php%2Fproduct%2Ftawa-roti-chapati%2F&docid=eojyuj5Xk1okPM&w=701&h=501&q=tawa%20roti&ved=2ahUKEwiJ1ofJ7eb-AhXEgeYKHUiQDtUQMygCegUIARD1AQ'
  },
  {
    id: 'product_i',
    name: 'butter roti',
    price: 10,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg-global.cpcdn.com%2Frecipes%2F1c7def9d7352f9ea%2F1200x630cq70%2Fphoto.jpg&tbnid=-Swtxe6PA-w4iM&vet=12ahUKEwilz73X7eb-AhVjSnwKHc9LDNkQMygTegUIARCqAg..i&imgrefurl=https%3A%2F%2Fcookpad.com%2Fin%2Frecipes%2F15382045-butter-tandoori-roti&docid=JvXZvQJ0EkTueM&w=1200&h=630&q=butter%20roti&ved=2ahUKEwilz73X7eb-AhVjSnwKHc9LDNkQMygTegUIARCqAg'
  },
  {
    id: 'product_j',
    name: 'butter naan',
    price: 20,
    photoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg-global.cpcdn.com%2Frecipes%2Fbb9eadfe04e501bf%2F1200x630cq70%2Fphoto.jpg&tbnid=-mK0waQt0g05gM&vet=12ahUKEwi648nj7eb-AhUIi9gFHdseDRAQMygKegUIARCjAg..i&imgrefurl=https%3A%2F%2Fcookpad.com%2Fin%2Frecipes%2F11196247-butter-naan&docid=OSG4N3A09KEEgM&w=1200&h=630&q=buuter%20naan%27&ved=2ahUKEwi648nj7eb-AhUIi9gFHdseDRAQMygKegUIARCjAg'
  }

];

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to our shop! Here are the available commands:\n\n/list - Show the list of products\n/cart - Show your shopping cart\n/help - Show this help message');
});

// Handle the /help command
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Here are the available commands:\n\n/list - Show the list of products\n/cart - Show your shopping cart\n/help - Show this help message');
});

// Handle the /list command
bot.onText(/\/list/, (msg) => {
  let message = 'Here are the available products:\n\n';
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const photoUrl = product.photoUrl;
    const name = product.name;
    const price = product.price;

    message += `${i+1}. ${name} - ${price} USD\n`;

    // Send the photo with the product name, price, and an "Add to cart" button
    bot.sendPhoto(msg.chat.id, photoUrl, {
      caption: `${name} - ${price} USD\n\ntap add to cart to add item and to repeat again tap. use /cart to see your cart.`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Add to cart',
              callback_data: product.id
            }
          ]
        ]
      }
    });
  }
});

// Handle the /cart command
bot.onText(/\/cart/, (msg) => {
  let message = 'Your shopping cart:\n\n';

  if (Object.keys(shoppingCart).length === 0) {
    message += 'Your cart is empty!';
  } else {
    let total = 0;

    // Iterate through each item in the shopping cart
    for (const [productId, quantity] of Object.entries(shoppingCart)) {
      // Find the product with the matching ID
      const product = products.find(p => p.id === productId);

      if (product) {
        const name = product.name;
        const price = product.price;
        const subtotal = price * quantity;

        message += `${name} x${quantity} - ${price} USD each\n`;
        message += `Subtotal: ${subtotal} USD\n\n`;

        total += subtotal;
      }
    }

    message += `Total: ${total} USD \n\n use /placeorder command to place your order.`;
  }

  bot.sendMessage(msg.chat.id, message);
});

let userChatId;

// Handle the /placeorder command
bot.onText(/\/placeorder/, (msg) => {
  const chatId = msg.chat.id;

  // Send a message asking for the user's name
  bot.sendMessage(chatId, 'Please enter your name:').then(() => {
    // Wait for the user's response
    bot.once('message', (nameMsg) => {
      const name = nameMsg.text;

      // Send a message asking for the user's address
      bot.sendMessage(chatId, 'Please enter your address:').then(() => {
        // Wait for the user's response
        bot.once('message', (addressMsg) => {
          const address = addressMsg.text;

          // Send a message asking for the user's phone number
          bot.sendMessage(chatId, 'Please enter your phone number:').then(() => {
            // Wait for the user's response
            bot.once('message', (phoneMsg) => {
              const phone = phoneMsg.text;

              userChatId = chatId;

              // Create the order message
              let message = 'Your order has been placed! waiting for the confirmation, Thank you for shopping with us!\n\n';
              message += `Order details:\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\n\n`;
              


              // Add the shopping cart items and total to the message
              let total = 0;
              for (const [productId, quantity] of Object.entries(shoppingCart)) {
                const product = products.find(p => p.id === productId);
                if (product) {
                  const name = product.name;
                  const price = product.price;
                  const subtotal = price * quantity;
                  message += `${name} x${quantity} - ${price} USD each\nSubtotal: ${subtotal} USD\n\n`;
                  total += subtotal;
                }
              }
              message += `Total: ${total} USD`;

              // Send the message to the seller's chat ID with confirm and cancel buttons
              bot.sendMessage(5805230149, `new order from user ${chatId}:\n\n${message}`, {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: 'Confirm', callback_data: 'confirm' },
                      { text: 'Cancel', callback_data: 'cancel' }
                    ]
                  ]
                }
              });

              // Clear the shopping cart
              shoppingCart = {};

              // Send a confirmation message to the user
              bot.sendMessage(chatId, 'Your order has been placed! waiting for the seller confirmation. Thank you for shopping with us!');
            });
          });
        });
      });
    });
  });
});

// Handle the callback_query event
bot.on('callback_query', (query) => {
  
  const messageId = query.message.message_id;
  const data = query.data;

  if (data === 'confirm') {
    // Send a confirmation message to the user
    bot.sendMessage(userChatId, 'Your order has been confirmed! We will deliver your items as soon as possible. Thank you for shopping with us!');
  }

 
});




// Handle inline button clicks (i.e., "Add to cart" buttons)
bot.on('callback_query', (query) => {
  const productId = query.data;

  // Add the selected product to the shopping cart
  if (shoppingCart[productId]) {
    shoppingCart[productId] += 1;
  } else {
    shoppingCart[productId] = 1;
  }


  // Send a confirmation message to the user
  bot.answerCallbackQuery(query.id, { text: 'Product added to cart!' })
    .catch((error) => console.error(error));
});

  
 

