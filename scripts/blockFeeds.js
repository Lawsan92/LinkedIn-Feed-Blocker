var count = 0;

const block_ads_script = () => {
  const feed = document.querySelectorAll("div");

  for (let el of feed) {
    if (el.textContent.includes("Suggested") && el.role == "listitem") {
      el.remove();
      count++;
    }
  }
  console.log("Blocked " + count + " suggested posts");
};

// block_ads();

const block_promoted_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;
  console.log("Blocked " + count + " promoted posts");

  for (el of feed) {
    if (el.textContent.includes("Promoted") && el.role == "listitem") {
      el.remove();
    }
  }
};

const block_commented_script = () => {
  const feed = document.querySelectorAll("div");
  let count = 0;

  for (el of feed) {
    if (
      (el.textContent.includes("commented") ||
        el.textContent.includes("loves")) &&
      el.role == "listitem"
    ) {
      el.remove();
    }
  }
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
      return block_ads_script;
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
