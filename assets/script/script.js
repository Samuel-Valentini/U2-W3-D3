console.log("script.js online");

const urlBookDatabase = "https://striveschool-api.herokuapp.com/books";
const cardsBox = document.getElementById("cards-box");

fetch(urlBookDatabase)
    .then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            throw new Error("Data getting error");
        }
    })

    .then((data) => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            cardsBox.innerHTML += `<div class="col " id="card-${i}">
<!-- card ${i + 1} start -->
    <div class="card">
        <img
            src="${data[i].img}"
            class="card-img-top"
            alt="${data[i].title}" />
        <div class="card-body ">
            <h5 class="card-title">${data[i].title}</h5>

            <div class="text-center">
                <p
                    class="text-center btn btn-outline-primary no-hover"
                    id="price">
                    ${data[i].price} €
                </p>
                <div>
                    <a href="#" class="btn btn-warning w-100" id="discard-${i}" >Discard</a>
                </div>
                <div>
                    <a href="#" class="btn btn-primary mt-1 w-100" id="buy-${i}">Buy Now</a>
                </div>
            </div>
        </div>
    </div>
    <!-- card ${i + 1} end -->
</div>`;
        }
    })
    .catch((Error) => ("error:", Error));
