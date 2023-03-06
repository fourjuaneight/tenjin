const compute = (data: any) => {
  postMessage(data);
};

onmessage = (evt) => {
  compute(evt.data);
};
