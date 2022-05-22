(async()=>{
  try {
    console.log(await chrome.runtime.sendMessage('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', null, null));
  } catch (e) {
    console.log(e);
  }
}
)().catch(console.error);
