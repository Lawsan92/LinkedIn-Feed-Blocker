var count = 0;

const block_ads = () => {
  const feed = document.querySelectorAll("div");

  for (let el of feed) {
    if (el.textContent.includes("Suggested") && el.role == "listitem") {
      el.remove();
      count++;
    }
  }
};

block_ads();

const observer = new MutationObserver(block_ads);

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const blockFeed = () => {
  const feed = document.querySelectorAll("div");

  for (let el of feed) {
    if (el.componentKey) {
      el.remove();
    }
  }
};
