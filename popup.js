const select = document.getElementById("gmgnChain");

async function init() {
  const { gmgnChain = "bsc" } = await chrome.storage.sync.get("gmgnChain");
  select.value = gmgnChain;
}

select.addEventListener("change", async () => {
  await chrome.storage.sync.set({ gmgnChain: select.value });
});

init();
