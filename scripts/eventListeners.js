document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".button");
  button.addEventListener("click", () => {
    if (!button.style.justifyContent) {
      button.style.justifyContent = "end";
    } else {
      button.style.justifyContent = "";
    }
  });
});
