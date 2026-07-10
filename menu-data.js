// menu-data.js

export const RESTAURANT = {
  name: "Lanchonete Avalanche",
  whatsappNumber: "5513997368362", // coloque o número correto
};

export const MENU_CATEGORIES = [
  {
    id: "hamburgueres",
    label: "Hambúrgueres",
  },
  {
    id: "combos",
    label: "Combos",
  },
  {
    id: "porcoes",
    label: "Porções de Batata",
  },
  {
    id: "bebidas",
    label: "Bebidas",
  },
  {
    id: "hot-dogs",
    label: "Hot Dog",
  },
];

export const MENU_ITEMS = [
  // =========================
  // HAMBÚRGUERES
  // =========================

  {
    id: "hb001",
    category: "hamburgueres",
    name: "X-Burguer",
    price: 1000,
    image: "assets/xburguer.png",
    ingredients:
      "pão, hambúrguer, queijo, presunto e maionese",
  },

  {
    id: "hb002",
    category: "hamburgueres",
    name: "X-Bacon",
    price: 1800,
    image: "assets/xbacon.png",
    ingredients:
    "Pão, hambúrguer, alface, tomate, bacon, queijo, presunto e maionese"
},

  {
    id: "hb003",
    category: "hamburgueres",
    name: "Triplo Bacon",
    price: 2500,
    image: "assets/triplebacon.png",
    ingredients:
      "Pão, três hambúrgueres, bacon, alface, tomate, queijo e presunto",
  },
  {
    id: "hb004",
    category: "hamburgueres",
    name: "Calabacon",
    price: 2000,
    image: "assets/calabacon.png",
    ingredients:
      "Pão, hambúrguer, bacon, calabresa, alface, tomate, queijo e presunto",
  },

  {
    id: "hb005",
    category: "hamburgueres",
    name: "X-Calabresa",
    price: 1800,
    image: "assets/xcalabresa.png",
    ingredients:
      "Pão, hambúrguer, alface, tomate, calabresa, queijo, presunto e maionese",
  },

  {
    id: "hb006",
    category: "hamburgueres",
    name: "X-Frango",
    price: 1800,
    image: "assets/xfrango.png",
    ingredients:
      "Pão, hambúrguer, frango desfiado, alface, tomate, queijo, presundo e maionese",
  },
  {
  
    id: "hb007",
    category: "hamburgueres",
    name: "X-Salada",
    price: 1200,
    image: "assets/xsalada.png",
    ingredients:
      "Pão, hambúrguer, alface, tomate, queijo, presunto e maionese",
  },
  {
    id: "hb008",
    category: "hamburgueres",
    name: "Duplo Salada",
    price: 1800,
    image: "assets/duplosalada.png",
    ingredients:
      "Pão, dois hambúrgueres, alface, tomate, queijo e presunto",
  },
  {
    id: "hb009",
    category: "hamburgueres",
    name: "Triplo Burguer",
    price: 2000,
    image: "assets/tripleburguer.png",
    ingredients:
      "Pão, três hambúrgueres, queijo e presunto",
  },
  {
    id: "hb010",
    category: "hamburgueres",
    name: "X-Tudo",
    price: 3500,
    image: "assets/xtudo.png",
    ingredients:
      "Pão, hambúrguer, alface, tomate, queijo, presunto,maionese, calabresa, bacon, ovo, salsicha, cheddar, catupiry e batata palha",
  },
  // =========================
  // HOT-DOG
  // =========================
  {
    id:"hd001",
    category:"hot-dogs",
    name:"Hot Dog",
    price:1300,
    image:"assets/hotdog.png",
    ingredients:"Pão, maionese, purê, salsicha, batata palha, molho de calabresa e vinagrete"
  },
  {
    id:"hd002",
    category:"hot-dogs",
    name:"Dogão",
    price:1600,
    image:"assets/dogao.png",
    ingredients:"Pão, maionese, purê, duas salsichas, batata palha, molho de calabresa e vinagrete"
  },
  {
    id:"hd003",
    category:"hot-dogs",
    name:"Dog Bacon",
    price:1800,
    image:"assets/dogbacon.png",
    ingredients:"Pão, maionese, purê, salsicha, bacon, batata palha, molho de calabresa e vinagrete"
  },
  {
    id:"hd004",
    category:"hot-dogs",
    name:"Dog Calabresa",
    price:1800,
    image:"assets/dogcalabresa.png",
    ingredients:"Pão, maionese, purê, salsicha, calabresa, batata palha, molho de calabresa e vinagrete"
  },
  {
    id:"hd005",
    category:"hot-dogs",
    name:"Dog Frango",
    price:1800,
    image:"assets/dogfrango.png",
    ingredients:"Pão, maionese, purê, salsicha, frango, catupiry, batata palha, molho de calabresa e vinagrete"
  },
  {
    id:"hd006",
    category:"hot-dogs",
    name:"Dog Especial",
    price:2500,
    image:"assets/dogespecial.png",
    ingredients:"Pão, maionese, purê, salsicha, bacon, calabresa, cheddar, catupiry, batata palha, molho de calabresa e vinagrete"
  },
  // =========================
  // COMBOS
  // =========================

  {
    id: "cb001",
    category: "combos",
    name: "2 X-Bacon e 1 Guaraná 1L",
    price: 4000,
    image: "assets/combo1.png",
    ingredients:
      "",
  },
  {
    id: "cb002",
    category: "combos",
    name: "Combo Salada Premium",
    price: 3500,
    image: "assets/combo2.png",
    ingredients:
      "1 X-Salada, 1 Porção P de Batata Frita e uma Lata de Coca Cola",
  },
  {
    id: "cb003",
    category: "combos",
    name: "Combo X-Bacon",
    price: 3000,
    image: "assets/combo3.png",
    ingredients:
      "1 X-Bacon, 1 Porção P de Batata Frita e uma Lata de Coca Cola",
  },
  {
    id: "cb004",
    category: "combos",
    name: "Combo 2 Hot Dog + Guaraná 1L",
    price: 3000,
    image: "assets/combo4.png",
    ingredients:
      "2 Hot Dog e 1 Guaraná 1L",
  },
  {
    id: "cb005",
    category: "combos",
    name: "Combo Hot Dog",
    price: 2500,
    image: "assets/combo5.png",
    ingredients:
      "1 Hot Dog, 1 Porção P de Batata Frita e uma Lata de Coca Cola",
  },

  // =========================
  // PORÇÕES
  // =========================

  {
    id: "pt001",
    category: "porcoes",
    name: "Batata Frita Pequena",
    price: 1000,
    image: "assets/porcao1p.png",
    ingredients: "Batata frita crocante (250g).",
  },

  {
    id: "pt002",
    category: "porcoes",
    name: "Batata Frita Média",
    price: 1500,
    image: "assets/porcao1m.png",
    ingredients: "Batata frita crocante (400g).",
  },
  {
    id: "pt003",
    category: "porcoes",
    name: "Batata Frita Grande",
    price: 2000,
    image: "assets/porcao1g.png",
    ingredients: "Batata frita crocante (500g).",
  },

  {
    id: "pt004",
    category: "porcoes",
    name: "Batata com Cheddar e Bacon Pequena",
    price: 2000,
    image: "assets/porcao2p.png",
    ingredients: "Batata frita crocante (250g), cheddar, bacon",
  },
  {
    id: "pt005",
    category: "porcoes",
    name: "Batata com Cheddar e Bacon Média",
    price: 2500,
    image: "assets/porcao2m.png",
    ingredients: "Batata frita crocante (400g), cheddar e bacon.",
  },

  {
    id: "pt006",
    category: "porcoes",
    name: "Batata com Cheddar e Bacon Grande",
    price: 3000,
    image: "assets/porcao2g.png",
    ingredients: "Batata frita crocante (500g), cheddar e bacon.",
  },

  // =========================
  // BEBIDAS
  // =========================

  {
    id: "bb001",
    category: "bebidas",
    name: "Coca-Cola Lata",
    price: 700,
    image: "assets/cocacola.png",
    ingredients: "350ml.",
  },

  {
    id: "bb002",
    category: "bebidas",
    name: "Guaraná Lata",
    price: 650,
    image: "assets/guarana.png",
    ingredients: "350ml.",
  },

  {
    id: "bb003",
    category: "bebidas",
    name: "Água Mineral",
    price: 400,
    image: "assets/agua.png",
    ingredients: "500ml.",
  },
];