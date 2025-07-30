// JSON com a ementa
const ementa = {
  "Ementa": {
    "Pratos": [
      {
        "nome": "Bacalhau",
        "preco": "10€",
        "imagem": "https://gastroportugal.com/wp-content/uploads/bacalhau-com-broa.jpg"
      },
      {
        "nome": "Cozido",
        "preco": "12€",
        "imagem": "https://asset-ng.skoiy.com/gta2554ejcwslaya/4lw30fjogvpm.jpg"
      }
    ],
    "Bebidas": [
      {
        "nome": "Coca-cola",
        "preco": "1€",
        "imagem": "https://loja.bbgourmet.pt/cdn/shop/files/Coca-Cola_Classica_33cl.jpg"
      },
      {
        "nome": "Água",
        "preco": "1€",
        "imagem": "https://static.staples.pt/resources/medias/shop/products/thumbnails/shop-image-2000/shop-607629--1.jpg"
      },
      {
        "nome": "Cerveja",
        "preco": "2€",
        "imagem": "https://www.gourmetencasa-tcm.com/15358-large_default/super-bock-33cl.jpg"
      }
    ],
     "Sobremesas": [
      {
        "nome": "Arroz doce",
        "preco": "2€",
        "imagem": "https://s2-receitas.glbimg.com/3khhu6FoquTDrN3So0LSTrgryRk=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2024/G/l/CrHzLASjyBZcftAjDkvQ/arroz-doce-da-ana-maria.jpg"
      },
      {
        "nome": "Mousse",
        "preco": "2€",
        "imagem": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Chocolate_coffee_mousse.jpg"
      }
    ]
  }
};

// Variáveis globais para elementos e total
const itensUl = document.getElementById("itens");
const totalDiv = document.getElementById("total");
const valorTotalSpan = totalDiv.querySelector(".valor-total");
const btnLimpar = document.getElementById("limparPedido");

let total = 0;

// Função para converter "10€" para número 10
function precoParaNumero(precoStr) {
  return Number(precoStr.replace("€", "").trim());
}

// Função para atualizar o total mostrado
function atualizarTotal() {
  valorTotalSpan.textContent = `${total}€`;
}

// Função para adicionar item ao pedido
function adicionarItem(item) {
  const li = document.createElement("li");

  const infoDiv = document.createElement("div");
  infoDiv.className = "item-info";

  const img = document.createElement("img");
  img.src = item.imagem;
  img.alt = item.nome;

  const nomeSpan = document.createElement("span");
  nomeSpan.textContent = item.nome;

  infoDiv.appendChild(img);
  infoDiv.appendChild(nomeSpan);

  const precoRemoverDiv = document.createElement("div");
  precoRemoverDiv.className = "item-preco-remover";

  const precoSpan = document.createElement("span");
  precoSpan.textContent = item.preco;

  const btnRemover = document.createElement("button");
  btnRemover.className = "remover-btn";
  btnRemover.textContent = "✕";
  btnRemover.title = "Remover item";

  btnRemover.addEventListener("click", () => {
    itensUl.removeChild(li);
    total -= precoParaNumero(item.preco);
    atualizarTotal();
  });

  precoRemoverDiv.appendChild(precoSpan);
  precoRemoverDiv.appendChild(btnRemover);

  li.appendChild(infoDiv);
  li.appendChild(precoRemoverDiv);


  itensUl.appendChild(li);

  total += precoParaNumero(item.preco);
  atualizarTotal();
}


// Função para criar os botões de items no menu
function criarMenu() {
  const menuDiv = document.getElementById("menu");
  const gridDiv = document.createElement("div");
  gridDiv.className = "menu-grid";

  for (const categoria in ementa.Ementa) {
    const catDiv = document.createElement("div");
    catDiv.className = "categoria";

    const titulo = document.createElement("h2");
    titulo.textContent = categoria;
    catDiv.appendChild(titulo);

    ementa.Ementa[categoria].forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      const img = document.createElement("img");
      img.src = item.imagem;
      img.alt = item.nome;
      itemDiv.appendChild(img);

      const nomePrecoP = document.createElement("p");
      nomePrecoP.textContent = `${item.nome} - ${item.preco}`;
      itemDiv.appendChild(nomePrecoP);

      // Ao clicar, adiciona ao pedido
      itemDiv.addEventListener("click", () => {
        adicionarItem(item);
      });

      catDiv.appendChild(itemDiv);
    });

    gridDiv.appendChild(catDiv);
  }

  menuDiv.appendChild(gridDiv);
}

// Função para limpar o pedido
function limparPedido() {
  itensUl.innerHTML = "";
  total = 0;
  atualizarTotal();
}

// Evento do botão limpar
btnLimpar.addEventListener("click", limparPedido);

// Inicializa menu ao carregar
window.addEventListener("DOMContentLoaded", criarMenu);
