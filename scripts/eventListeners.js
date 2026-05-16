document.addEventListener("DOMContentLoaded", () => {
  const button_block_suggested = document.querySelector(
    ".button_container.block_suggested",
  );

  button_block_suggested.addEventListener("click", async () => {
    console.log("Popup button clicked");

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!button_block_suggested.style.justifyContent) {
      chrome.tabs.sendMessage(tab.id, {
        type: "BLOCK_SUGGESTED",
      });
      button_block_suggested.style.justifyContent = "end";
      button_block_suggested.style.opacity = "1";
    } else {
      chrome.tabs.sendMessage(tab.id, {
        type: "UNBLOCK_SUGGESTED",
      });
      button_block_suggested.style.justifyContent = "";
      button_block_suggested.style.opacity = "0.8";
    }
  });

  const button_block_promoted = document.querySelector(
    ".button_container.block_promoted",
  );

  button_block_promoted.addEventListener("click", async () => {
    console.log("Popup button clicked");

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!button_block_promoted.style.justifyContent) {
      chrome.tabs.sendMessage(tab.id, {
        type: "BLOCK_PROMOTED",
      });
      button_block_promoted.style.justifyContent = "end";
      button_block_promoted.style.opacity = "1";
    } else {
      chrome.tabs.sendMessage(tab.id, {
        type: "UNBLOCK_PROMOTED",
      });
      button_block_promoted.style.justifyContent = "";
      button_block_promoted.style.opacity = "0.8";
    }
  });

  const button_block_commented = document.querySelector(
    ".button_container.block_commented",
  );

  button_block_commented.addEventListener("click", async () => {
    console.log("Popup button clicked");

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!button_block_commented.style.justifyContent) {
      chrome.tabs.sendMessage(tab.id, {
        type: "BLOCK_COMMENTED",
      });
      button_block_commented.style.justifyContent = "end";
      button_block_commented.style.opacity = "1";
    } else {
      chrome.tabs.sendMessage(tab.id, {
        type: "UNBLOCK_COMMENTED",
      });
      button_block_commented.style.justifyContent = "";
      button_block_commented.style.opacity = "0.8";
    }
  });
});
