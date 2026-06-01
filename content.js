const EVM_ADDRESS_REGEX = /\b0x[a-fA-F0-9]{40}\b/g;
const DEFAULT_CHAIN = "bsc";
const SUPPORTED_CHAINS = new Set(["eth", "bsc", "base"]);

async function getChain() {
  const { gmgnChain = DEFAULT_CHAIN } = await chrome.storage.sync.get("gmgnChain");
  return SUPPORTED_CHAINS.has(gmgnChain) ? gmgnChain : DEFAULT_CHAIN;
}

function buildGmgnUrl(chain, address) {
  return `https://gmgn.ai/${chain}/token/${address}`;
}

function stopTweetCardNavigation(event) {
  event.stopPropagation();
}

function makeAddressLink(chain, address) {
  const link = document.createElement("a");
  link.className = "ca-gmgn-link";
  link.href = buildGmgnUrl(chain, address);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = address;
  link.dataset.caGmgnLink = "1";
  link.addEventListener("click", stopTweetCardNavigation);
  link.addEventListener("mousedown", stopTweetCardNavigation);
  return link;
}

function shouldSkipNode(node) {
  const parent = node.parentElement;
  if (!parent) {
    return true;
  }

  const ignoredSelector = [
    "a",
    "button",
    "script",
    "style",
    "textarea",
    "input",
    "[contenteditable='true']",
    "[data-ca-processed='1']"
  ].join(",");

  return Boolean(parent.closest(ignoredSelector));
}

function processTextNode(node, chain) {
  const text = node.nodeValue;
  if (!text || !EVM_ADDRESS_REGEX.test(text) || shouldSkipNode(node)) {
    EVM_ADDRESS_REGEX.lastIndex = 0;
    return;
  }

  EVM_ADDRESS_REGEX.lastIndex = 0;
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  let match;

  while ((match = EVM_ADDRESS_REGEX.exec(text)) !== null) {
    const [address] = match;

    if (match.index > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    fragment.appendChild(makeAddressLink(chain, address));
    lastIndex = match.index + address.length;
  }

  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  const wrapper = document.createElement("span");
  wrapper.dataset.caProcessed = "1";
  wrapper.appendChild(fragment);
  node.parentNode.replaceChild(wrapper, node);
}

function scan(root, chain) {
  if (!root || root.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  for (const node of nodes) {
    processTextNode(node, chain);
  }
}

async function start() {
  let chain = await getChain();
  scan(document.body, chain);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          scan(node, chain);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes.gmgnChain) {
      window.location.reload();
    }
  });
}

start();
