import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT } from "./menu-data.js";
/* =========================================================
   ABERTURA DO SITE
========================================================= */

(() => {
  const intro = document.getElementById("siteIntro");

  if (!intro) {
    document.body.classList.add("site-ready");
    return;
  }

  const CONFIG = {
    // Tempo mínimo normal de exibição.
    minimumDuration: 1500,

    // Limite de segurança.
    maximumDuration: 2800,

    // Deve ser igual ou um pouco maior que o fade do CSS.
    fadeDuration: 470,

    // true: mostra uma vez por aba/sessão.
    // false: mostra em todo carregamento.
    showOncePerSession: true,
  };

  const SESSION_KEY = "avalanche-site-intro-shown";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const startedAt = performance.now();

  const minimumDuration = reducedMotion
    ? 0
    : CONFIG.minimumDuration;

  const maximumDuration = reducedMotion
    ? 300
    : CONFIG.maximumDuration;

  const fadeDuration = reducedMotion
    ? 0
    : CONFIG.fadeDuration;

  let isClosing = false;
  let safetyTimer;

  const wasShownInThisSession = () => {
    if (!CONFIG.showOncePerSession) {
      return false;
    }

    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  };

  const saveSessionState = () => {
    if (!CONFIG.showOncePerSession) {
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /*
       O site continua funcionando normalmente caso
       o navegador bloqueie o sessionStorage.
      */
    }
  };

  const removeIntro = () => {
    if (intro.isConnected) {
      intro.remove();
    }

    document.body.classList.remove("intro-active");
  };

  const closeIntro = () => {
    if (isClosing) {
      return;
    }

    isClosing = true;

    window.clearTimeout(safetyTimer);

    saveSessionState();

    /*
     Libera o conteúdo antes do fim do fade do overlay.
     Isso faz as duas animações acontecerem juntas.
    */
    document.body.classList.add("site-ready");

    intro.classList.add("site-intro--leaving");

    /*
     O conteúdo visual deixa de ser anunciado
     quando a abertura começa a desaparecer.
    */
    intro.setAttribute("aria-hidden", "true");

    window.setTimeout(
      removeIntro,
      fadeDuration + 50
    );
  };

  const closeRespectingMinimumDuration = () => {
    const elapsedTime =
      performance.now() - startedAt;

    const remainingTime = Math.max(
      0,
      minimumDuration - elapsedTime
    );

    window.setTimeout(
      closeIntro,
      remainingTime
    );
  };

  /*
   Se a abertura já apareceu nesta sessão,
   ela é removida imediatamente.
  */
  if (wasShownInThisSession()) {
    document.body.classList.add("site-ready");

    removeIntro();

    return;
  }

  document.body.classList.add("intro-active");

  /*
   A introdução normalmente termina após o evento load,
   respeitando o tempo mínimo.
  */
  if (document.readyState === "complete") {
    closeRespectingMinimumDuration();
  } else {
    window.addEventListener(
      "load",
      closeRespectingMinimumDuration,
      {
        once: true,
      }
    );
  }

  /*
   Limite de segurança:
   a abertura nunca fica presa esperando imagens,
   fontes ou outros arquivos.
  */
  safetyTimer = window.setTimeout(
    closeIntro,
    maximumDuration
  );
})();
const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const cart = new Map();

const paymentState = {
  type: "",
  deliveryMethod: "",
  cashChange: "",
};

const paymentLabels = {
  entrega: "Pagar na entrega",
  whatsapp: "Pix pelo WhatsApp",
};

const deliveryPaymentLabels = {
  debito: "Cartão de débito",
  credito: "Cartão de crédito",
  dinheiro: "Dinheiro",
};

const selectors = {
  menuGrid: "#menuGrid",
  tabs: ".tab",
  cartItems: "#cartItems",
  cartCount: "#cartCount",
  headerCount: "#headerCount",
  cartTotal: "#cartTotal",
  customerName: "#customerName",
  orderType: "#orderType",
  customerAddress: "#customerAddress",
  orderNotes: "#orderNotes",
  sendOrder: "#sendOrder",
  mobileCartTotal: "#mobileCartTotal",
  mobileCartCount: "#mobileCartCount",
  paymentTypeButtons: "[data-payment-type]",
  deliveryPaymentButtons: "[data-delivery-payment]",
  deliveryPaymentOptions: "#deliveryPaymentOptions",
  cashChangeOptions: "#cashChangeOptions",
  cashChangeButtons: "#cashChangeButtons",
  pixPaymentNote: "#pixPaymentNote",
};

const multipleElementKeys = new Set([
  "tabs",
  "paymentTypeButtons",
  "deliveryPaymentButtons",
]);

const elements = {};

function cacheElements() {
  Object.entries(selectors).forEach(([key, selector]) => {
    elements[key] = multipleElementKeys.has(key)
      ? document.querySelectorAll(selector)
      : document.querySelector(selector);
  });
}

function createElement(tagName, className = "", text = "") {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function formatCurrency(valueInCents) {
  return moneyFormatter.format(valueInCents / 100);
}

function getProductById(productId) {
  return MENU_ITEMS.find((item) => item.id === productId);
}

function getCartQuantity() {
  return Array.from(cart.values()).reduce(
    (total, item) => total + item.quantity,
    0,
  );
}

function getCartTotal() {
  return Array.from(cart.values()).reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}

function getProductDescription(product) {
  const descriptions = [];

  if (product.items) {
    descriptions.push(`Itens: ${product.items}`);
  }

  if (product.ingredients) {
    const label = product.items ? "Ingredientes do lanche" : "Ingredientes";
    descriptions.push(`${label}: ${product.ingredients}`);
  }

  return descriptions.join(". ");
}

function renderMenu(selectedCategory = "todos") {
  elements.menuGrid.innerHTML = "";

  const categories =
    selectedCategory === "todos"
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((category) => category.id === selectedCategory);

  categories.forEach((category) => {
    const categoryItems = MENU_ITEMS.filter((item) => item.category === category.id);

    if (!categoryItems.length) {
      return;
    }

    elements.menuGrid.append(createCategorySection(category, categoryItems));
  });
}

function createCategorySection(category, categoryItems) {
  const section = createElement("section", "menu-category-section");
  const heading = createElement("div", "menu-category-heading");
  const itemsGrid = createElement("div", "menu-grid-items");

  section.dataset.category = category.id;
  heading.append(
    createElement("h3", "", category.label),
    createElement("span", "", `${categoryItems.length} itens`),
  );

  categoryItems.forEach((item) => {
    itemsGrid.append(createMenuCard(item));
  });

  section.append(heading, itemsGrid);
  return section;
}

function createMenuCard(product) {
  const card = createElement("article", "menu-card");
  const image = createElement("img");
  const content = createElement("div", "menu-card-content");
  const header = createElement("div", "menu-card-top");
  const addButton = createElement("button", "add-button", "Adicionar");

  card.dataset.category = product.category;

  image.src = product.image;
  image.alt = `Imagem ilustrativa de ${product.name}`;
  image.loading = "lazy";
  image.decoding = "async";

  header.append(
    createElement("h3", "", product.name),
    createElement("span", "price", formatCurrency(product.price)),
  );

  addButton.type = "button";
  addButton.dataset.itemId = product.id;

  content.append(
    header,
    createElement("p", "description", getProductDescription(product)),
    addButton,
  );

  card.append(image, content);
  return card;
}

function setActiveCategory(categoryId) {
  elements.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === categoryId);
  });

  renderMenu(categoryId);
}

function addToCart(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  const currentItem = cart.get(productId);

  if (currentItem) {
    currentItem.quantity += 1;
  } else {
    cart.set(productId, { product, quantity: 1 });
  }

  renderCart();
}

function changeCartQuantity(productId, amount) {
  const currentItem = cart.get(productId);

  if (!currentItem) {
    return;
  }

  currentItem.quantity += amount;

  if (currentItem.quantity <= 0) {
    cart.delete(productId);
  }

  renderCart();
}

function renderCart() {
  const quantity = getCartQuantity();
  const total = getCartTotal();

  elements.cartItems.innerHTML = "";

  if (quantity === 0) {
    elements.cartItems.append(
      createElement("p", "empty-cart", "Seu pedido ainda está vazio."),
    );
  } else {
    cart.forEach((cartItem) => {
      elements.cartItems.append(createCartItem(cartItem));
    });
  }

  elements.cartCount.textContent = `${quantity} ${quantity === 1 ? "item" : "itens"}`;
  elements.headerCount.textContent = quantity;
  elements.cartTotal.textContent = formatCurrency(total);
  elements.mobileCartTotal.textContent = formatCurrency(total);
  elements.mobileCartCount.textContent = `${quantity} ${quantity === 1 ? "item" : "itens"}`;
  elements.sendOrder.disabled = quantity === 0;
  document.body.classList.toggle("has-cart-items", quantity > 0);

  if (paymentState.deliveryMethod === "dinheiro") {
    renderCashChangeOptions();
  }
}

function createCartItem({ product, quantity }) {
  const item = createElement("article", "cart-item");
  const info = createElement("div");
  const controls = createElement("div", "quantity-controls");
  const decreaseButton = createQuantityButton(product.id, "decrease", "-");
  const increaseButton = createQuantityButton(product.id, "increase", "+");

  info.append(
    createElement("strong", "", product.name),
    createElement(
      "small",
      "",
      `${quantity} x ${formatCurrency(product.price)} = ${formatCurrency(
        product.price * quantity,
      )}`,
    ),
  );

  controls.append(decreaseButton, createElement("span", "", quantity), increaseButton);
  item.append(info, controls);

  return item;
}

function createQuantityButton(productId, action, text) {
  const button = createElement("button", "quantity-button", text);

  button.type = "button";
  button.dataset.cartAction = action;
  button.dataset.itemId = productId;
  button.setAttribute(
    "aria-label",
    action === "increase" ? "Adicionar mais um item" : "Remover um item",
  );

  return button;
}

function getCashChangeOptions() {
  const total = getCartTotal();
  const roundedTotal = Math.ceil(Math.max(total, 1000) / 1000) * 1000;
  const suggestedValues = [
    roundedTotal,
    roundedTotal + 1000,
    roundedTotal + 2000,
    5000,
    10000,
    20000,
  ];

  const changeValues = suggestedValues
    .filter((value, index, list) => value > total && list.indexOf(value) === index)
    .sort((first, second) => first - second)
    .slice(0, 5);

  return [
    { value: "sem troco", label: "Sem troco" },
    ...changeValues.map((value) => ({
      value: `troco para ${formatCurrency(value)}`,
      label: `Troco para ${formatCurrency(value)}`,
    })),
  ];
}

function renderCashChangeOptions() {
  const options = getCashChangeOptions();
  const validValues = options.map((option) => option.value);

  if (paymentState.cashChange && !validValues.includes(paymentState.cashChange)) {
    paymentState.cashChange = "";
  }

  elements.cashChangeButtons.innerHTML = "";

  options.forEach((option) => {
    const button = createElement("button", "choice-button", option.label);
    button.type = "button";
    button.dataset.cashChange = option.value;
    button.classList.toggle("active", paymentState.cashChange === option.value);
    elements.cashChangeButtons.append(button);
  });
}

function updatePaymentVisibility() {
  const isDeliveryPayment = paymentState.type === "entrega";
  const isCashPayment =
    paymentState.type === "entrega" && paymentState.deliveryMethod === "dinheiro";
  const isPixPayment = paymentState.type === "whatsapp";

  elements.paymentTypeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.paymentType === paymentState.type);
  });

  elements.deliveryPaymentButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.deliveryPayment === paymentState.deliveryMethod,
    );
  });

  elements.deliveryPaymentOptions.classList.toggle("hidden", !isDeliveryPayment);
  elements.cashChangeOptions.classList.toggle("hidden", !isCashPayment);
  elements.pixPaymentNote.classList.toggle("hidden", !isPixPayment);

  if (isCashPayment) {
    renderCashChangeOptions();
  } else {
    paymentState.cashChange = "";
    elements.cashChangeButtons.innerHTML = "";
  }
}

function getPaymentSummary() {
  if (!paymentState.type) {
    return "";
  }

  if (paymentState.type === "whatsapp") {
    return paymentLabels.whatsapp;
  }

  const deliveryMethod = deliveryPaymentLabels[paymentState.deliveryMethod];

  if (!deliveryMethod) {
    return paymentLabels.entrega;
  }

  if (paymentState.deliveryMethod === "dinheiro" && paymentState.cashChange) {
    return `${deliveryMethod} na entrega (${paymentState.cashChange})`;
  }

  return `${deliveryMethod} na entrega`;
}

function validateOrder() {
  if (getCartQuantity() === 0) {
    alert("Adicione pelo menos um item ao pedido.");
    return false;
  }

  if (!paymentState.type) {
    alert("Escolha como vai pagar.");
    return false;
  }

  if (paymentState.type === "entrega" && !paymentState.deliveryMethod) {
    alert("Escolha a forma de pagamento na entrega.");
    return false;
  }

  if (
    paymentState.type === "entrega" &&
    paymentState.deliveryMethod === "dinheiro" &&
    !paymentState.cashChange
  ) {
    alert("Escolha se precisa de troco.");
    return false;
  }

  return true;
}

function buildWhatsAppMessage() {
  const message = [
    `Olá! Quero fazer um pedido na ${RESTAURANT.name}.`,
    "",
    "Itens:",
  ];

  cart.forEach(({ product, quantity }) => {
    message.push(
      `- ${quantity}x ${product.name} - ${formatCurrency(product.price * quantity)}`,
    );
  });

  message.push("", `Total: ${formatCurrency(getCartTotal())}`);
  message.push("", "Dados do cliente:");
  message.push(`Nome: ${elements.customerName.value.trim() || "Não informado"}`);
  message.push(`Tipo: ${elements.orderType.value}`);

  if (elements.orderType.value === "Entrega") {
    message.push(
      `Endereço: ${elements.customerAddress.value.trim() || "Não informado"}`,
    );
  }

  message.push(`Pagamento: ${getPaymentSummary()}`);

  const notes = elements.orderNotes.value.trim();

  if (notes) {
    message.push(`Observações: ${notes}`);
  }

  return message.join("\n");
}

function sendOrder() {
  if (!validateOrder()) {
    return;
  }

  const message = encodeURIComponent(buildWhatsAppMessage());
  const url = `https://wa.me/${RESTAURANT.whatsappNumber}?text=${message}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function handleMenuClick(event) {
  const addButton = event.target.closest("[data-item-id]");

  if (addButton) {
    addToCart(addButton.dataset.itemId);
  }
}

function handleCartClick(event) {
  const button = event.target.closest("[data-cart-action]");

  if (!button) {
    return;
  }

  const amount = button.dataset.cartAction === "increase" ? 1 : -1;
  changeCartQuantity(button.dataset.itemId, amount);
}

function handlePaymentTypeClick(event) {
  const button = event.currentTarget;

  paymentState.type = button.dataset.paymentType;
  paymentState.deliveryMethod = "";
  paymentState.cashChange = "";
  updatePaymentVisibility();
}

function handleDeliveryPaymentClick(event) {
  const button = event.currentTarget;

  paymentState.deliveryMethod = button.dataset.deliveryPayment;
  paymentState.cashChange = "";
  updatePaymentVisibility();
}

function handleCashChangeClick(event) {
  const button = event.target.closest("[data-cash-change]");

  if (!button) {
    return;
  }

  paymentState.cashChange = button.dataset.cashChange;
  renderCashChangeOptions();
}

function bindEvents() {
  elements.menuGrid.addEventListener("click", handleMenuClick);
  elements.cartItems.addEventListener("click", handleCartClick);
  elements.cashChangeButtons.addEventListener("click", handleCashChangeClick);
  elements.sendOrder.addEventListener("click", sendOrder);

  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveCategory(tab.dataset.category));
  });

  elements.paymentTypeButtons.forEach((button) => {
    button.addEventListener("click", handlePaymentTypeClick);
  });

  elements.deliveryPaymentButtons.forEach((button) => {
    button.addEventListener("click", handleDeliveryPaymentClick);
  });
}

function init() {
  cacheElements();
  bindEvents();
  renderMenu();
  renderCart();
  updatePaymentVisibility();
}

init();
