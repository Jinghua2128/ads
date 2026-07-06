const currency = document.querySelector("#currency");
const summaryTotal = document.querySelector("#summaryTotal");
const notice = document.querySelector("#notice");
const applyCoupon = document.querySelector("#applyCoupon");
const continueButton = document.querySelector("#continueButton");
const offers = Array.from(document.querySelectorAll(".offer-row"));

function selectedOffer() {
  return offers.find((offer) => offer.classList.contains("active")) || offers[0];
}

function renderTotal() {
  const code = currency.value;
  const price = Number(selectedOffer().dataset.price);
  const symbol = code === "USD" ? "$" : "";
  summaryTotal.textContent = code === "USD" ? `${symbol}${price} USD` : `${price} ${code}`;
}

offers.forEach((offer) => {
  offer.addEventListener("click", () => {
    offers.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-checked", "false");
    });
    offer.classList.add("active");
    offer.setAttribute("aria-checked", "true");
    notice.textContent = `${offer.dataset.sessions} session${offer.dataset.sessions === "1" ? "" : "s"} selected.`;
    notice.classList.add("is-active");
    renderTotal();
  });
});

currency.addEventListener("change", () => {
  if (currency.value !== "USD") {
    currency.value = "USD";
    notice.textContent = "This preview is set to USD for tutoring offers.";
    notice.classList.add("is-active");
  }
  renderTotal();
});

applyCoupon.addEventListener("click", () => {
  notice.textContent = "Coupon entry is disabled in this local preview.";
  notice.classList.add("is-active");
});

continueButton.addEventListener("click", () => {
  const offer = selectedOffer();
  notice.textContent = `${offer.dataset.sessions} session${offer.dataset.sessions === "1" ? "" : "s"} selected. Continue is disabled in this local preview.`;
  notice.classList.add("is-active");
});

renderTotal();
