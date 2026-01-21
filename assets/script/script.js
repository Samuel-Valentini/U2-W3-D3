console.log("script.js online");

const urlBookDatabase = "https://striveschool-api.herokuapp.com/books";
const cardsBox = document.getElementById("cards-box");
let books = [];
let cart = [];

fetch(urlBookDatabase)
    .then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            throw new Error("Data getting error");
        }
    })

    .then((data) => {
        books = data;

        for (let i = 0; i < data.length; i++) {
            cardsBox.innerHTML += `<div class="col " id="card-${i}">
<!-- card ${i + 1} start -->
    <div class="card h-100">
        <img
            src="${data[i].img}"
            class="card-img-top"
            alt="${data[i].title}" />
        <div class="card-body "
       style="
    display: flex;
    flex-direction: column;
    justify-content: space-between;
"
        >
            <h5 class="card-title">${data[i].title}</h5>

            <div class="text-center" >
                <p
                    class="text-center btn btn-outline-primary no-hover"
                    id="price">
                    ${data[i].price} €
                </p>
                <div>
                    <a href="#" class="btn btn-warning w-100 discard-btn"  >Discard</a>
                </div>
                <div>
                    <a href="#" class="btn btn-primary mt-1 w-100 buy-btn" data-i="${i}">Buy Now</a>
                </div>
            </div>
        </div>
    </div>
    <!-- card ${i + 1} end -->
</div>`;
        }
    })
    .catch((Error) => ("error:", Error));

cardsBox.addEventListener("click", (e) => {
    const discardBtn = e.target.closest(".discard-btn");
    if (!discardBtn) return;

    e.preventDefault();

    const cardCol = discardBtn.closest(".col");
    if (cardCol) cardCol.remove();
});

cardsBox.addEventListener("click", (e) => {
    const buyBtn = e.target.closest(".buy-btn");
    if (!buyBtn) return;

    e.preventDefault();

    const index = Number(buyBtn.dataset.i);
    const book = books[index];

    cart.push(book);

    const cartTable = document.getElementById("cart");

    cartTable.innerHTML += `<tr>
                        <td>${book.title}</td>
                        <td>${book.price.toString().replace(".", ",")} €</td>
                        <td>
                            <button class="btn btn-warning remove-btn">
                                Remove
                            </button>
                        </td>
                    </tr>
                    `;

    localStorage.setItem("cart", JSON.stringify(cart));
});

const cartRow = document.getElementById("cart");

cartRow.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-btn");
    if (!removeBtn) return;

    e.preventDefault();

    const cartTr = removeBtn.closest("tr");
    if (cartTr) cartTr.remove();
});
