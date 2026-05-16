var count = 0;

// This file contains the content script that will be injected into the LinkedIn feed page. It listens for messages from the popup and executes the appropriate functions to block or unblock suggested, promoted, and commented posts.

/*SUGGESTED posts*/

const block_suggested_script = () => {
  const feed = document.querySelectorAll("div");

  for (let el of feed) {
    if (el.textContent.includes("Suggested") && el.role == "listitem") {
      el.style.display = "none";
      count++;
    }
  }
  console.log("Blocked " + count + " suggested posts");
};

const unblock_suggested_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;
  for (let el of feed) {
    if (el.textContent.includes("Suggested") && el.role == "listitem") {
      el.style.display = "";
      count++;
    }
  }
  console.log("Unblocked " + count + " suggested posts");
};

/*PROMOTED posts*/
const block_promoted_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;

  for (el of feed) {
    if (el.textContent.includes("Promoted") && el.role == "listitem") {
      el.style.display = "none";
      count++;
    }
    console.log("Blocked " + count + " promoted posts");
  }
};

const unblock_promoted_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;

  for (el of feed) {
    if (el.textContent.includes("Promoted") && el.role == "listitem") {
      el.style.display = "";
      count++;
    }
    console.log("Unblocked " + count + " promoted posts");
  }
};

/*COMMENTED posts*/
const block_commented_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;

  for (el of feed) {
    if (
      (el.textContent.includes("commented") ||
        el.textContent.includes("loves")) &&
      el.role == "listitem"
    ) {
      el.style.display = "none";
      count++;
    }
  }
  console.log("Blocked " + count + " commented posts");
};

const unblock_commented_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;

  for (el of feed) {
    if (
      (el.textContent.includes("commented") ||
        el.textContent.includes("loves")) &&
      el.role == "listitem"
    ) {
      el.style.display = "";
      count++;
    }
  }
  console.log("Unblocked " + count + " commented posts");
};

var port = chrome.runtime.connect();

window.addEventListener(
  "message",
  (event) => {
    // We only accept messages from ourselves
    if (event.source !== window) {
      return;
    }

    if (event.data.type && event.data.type === "FROM_PAGE") {
      console.log("Content script received: " + event.data.text);
      port.postMessage(event.data.text);
    }
  },
  false,
);

const script_callback = (message) => {
  switch (message) {
    case "BLOCK_PROMOTED":
      console.log("Received message to block promoted posts");
      return block_promoted_script;
    case "BLOCK_COMMENTED":
      console.log("Received message to block commented posts");
      return block_commented_script;
    case "BLOCK_SUGGESTED":
      console.log("Received message to block suggested posts");
      return block_suggested_script;
    case "UNBLOCK_SUGGESTED":
      console.log("Received message to unblock suggested posts");
      return unblock_suggested_script;
    case "UNBLOCK_PROMOTED":
      console.log("Received message to unblock promoted posts");
      return unblock_promoted_script;
    case "UNBLOCK_COMMENTED":
      console.log("Received message to unblock commented posts");
      return unblock_commented_script;
    default:
      return () => {
        console.log("No valid message received");
      };
  }
};

chrome.runtime.onMessage.addListener((message) => {
  console.log("Received message from popup:", message.type);

  const callback = script_callback(message.type);

  if (!callback) {
    console.log("No matching callback for:", message.type);
    return;
  }

  callback();

  const observer = new MutationObserver(() => {
    callback();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
