const worker = new Worker("/worker.js");

const data: any[] = [];

const analyze = async (data: any) => {};

if (window.Worker) {
  worker.postMessage(data);

  worker.onmessage = (evt: MessageEvent<any>) => {
    analyze(evt.data);
  };
}
