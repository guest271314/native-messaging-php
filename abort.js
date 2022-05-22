(async()=>{
  try {
    console.log(await chrome.runtime.sendMessage('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'abort'));
    if (abortable) {
      abortable.abort();
    }
  } catch (e) {
    console.log(e);
  }
}
)().catch(console.error)
