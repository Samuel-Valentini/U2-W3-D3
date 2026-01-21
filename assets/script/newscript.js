console.log("newscript.js online");

const urlBookDatabase = "https://striveschool-api.herokuapp.com/books";
let bookDatabase;

let cartList = [];

if (
    localStorage.getItem("cartList") &&
    localStorage.getItem("cartList") !== "[]"
) {
    cartList = JSON.parse(localStorage.getItem("cartList"));
    const tableCart = document.getElementById("table-cart");
    tableCart.classList.remove("d-none");
    const cartTbody = document.getElementById("cart");

    cartList.forEach((item) => {
        cartTbody.innerHTML += `<tr>
                        <td>${item.title}</td>
                        <td>${item.price.toString().replace(".", ",")} €</td>
                        <td>
                            <button class="btn btn-warning remove-btn" data-asin="${item.asin}">
                                Remove
                            </button>
                        </td>
                    </tr>
                    `;
    });
}

fetch(urlBookDatabase)
    .then((result) => {
        if (result.ok) {
            return result.json();
        } else {
            throw new Error("result.ok === false");
        }
    })
    .then((result) => {
        bookDatabase = result;

        document.getElementById("loading").remove();

        const cardsBox = document.getElementById("cards-box");

        for (i = 0; i < bookDatabase.length; i++) {
            cardsBox.innerHTML += `
<div class="col" data-asin="${bookDatabase[i].asin}">
    <!-- card ${i + 1} start -->
    <div class="card h-100">
        <img src="${bookDatabase[i].img}" class="card-img-top" alt="${bookDatabase[i].title}" />
        <div class="card-body card-layout">
            <h5 class="card-title">${bookDatabase[i].title}</h5>

            <div class="text-center">
                <p
                    class="text-center btn btn-outline-primary no-hover"
                    id="price">
                    ${bookDatabase[i].price.toString().replace(".", ",")} €
                </p>
                <div>
                    <a href="#" class="btn btn-warning w-100 discard-btn"
                        >Discard</a
                    >
                </div>
                <div>
                    <a
                        href="#"
                        class="btn btn-primary mt-1 w-100 buy-btn"
                        data-i="${i}"
                        >Buy Now</a
                    >
                </div>
            </div>
        </div>
    </div>
    <!-- card ${i + 1} end -->
</div>
`;
        }

        // fine ciclo for

        const buyBtn = document.querySelectorAll(".buy-btn");

        buyBtn.forEach((button) => {
            button.addEventListener("click", () => {
                const tableCart = document.getElementById("table-cart");
                tableCart.classList.remove("d-none");
                const cartTbody = document.getElementById("cart");
                let index = Number(button.dataset.i);

                cartTbody.innerHTML += `<tr>
                        <td>${bookDatabase[index].title}</td>
                        <td>${bookDatabase[index].price.toString().replace(".", ",")} €</td>
                        <td>
                            <button class="btn btn-warning remove-btn" data-asin="${bookDatabase[index].asin}">
                                Remove
                            </button>
                        </td>
                    </tr>
                    `;

                cartList.push(bookDatabase[index]);

                localStorage.setItem("cartList", JSON.stringify(cartList));

                const removeBtn = document.querySelectorAll(".remove-btn");

                removeBtn.forEach((button) => {
                    button.addEventListener("click", (event) => {
                        cartList = JSON.parse(localStorage.getItem("cartList"));
                        let asin = button.dataset.asin;

                        for (let i = 0; i < cartList.length; i++) {
                            if (cartList[i].asin === asin) {
                                cartList.splice(i, 1);
                                if (cartList.length === 0) {
                                    const tableCart =
                                        document.getElementById("table-cart");
                                    tableCart.classList.add("d-none");
                                }
                                localStorage.setItem(
                                    "cartList",
                                    JSON.stringify(cartList),
                                );
                                break;
                            }
                        }

                        button.closest("tr").remove();
                    });
                });
            });
        });

        // seleziono i bottoni discard, elimino il .col più vicino (la card)

        const discardBtn = document.querySelectorAll(".discard-btn");

        discardBtn.forEach((button) => {
            button.addEventListener("click", (event) => {
                button.closest(".col").remove();
            });
        });
    })
    .catch((Error) => {
        console.log("error:", Error);
    });

const removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
        cartList = JSON.parse(localStorage.getItem("cartList"));
        let asin = button.dataset.asin;

        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].asin === asin) {
                cartList.splice(i, 1);
                if (cartList.length === 0) {
                    const tableCart = document.getElementById("table-cart");
                    tableCart.classList.add("d-none");
                }
                localStorage.setItem("cartList", JSON.stringify(cartList));
                break;
            }
        }

        button.closest("tr").remove();
    });
});
