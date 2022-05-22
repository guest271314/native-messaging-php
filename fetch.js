fd = new FormData();
fd.append('command', 'parec -d @DEFAULT_MONITOR@');
abortable = new AbortController;
({signal} = abortable);
let init = {
  method: 'post',
  body: fd,
  signal
};
fetch('http://localhost:8000', init)
.then((response)=>response.body)
.then((body)=>body.pipeTo(new WritableStream({
  write(value) {
    console.log(value);
  }
}))).then(console.log, console.error);
