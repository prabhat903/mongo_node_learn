var data = require("./Data");
var cluster = require("cluster");
var os = require("os");
if (cluster.isMaster) {
  fromMain();
  process.on("exit", () => {
    console.log(data);
    console.log("main Process Ending", process.pid);
  });
} else {
  processChild();
}
function fromMain() {
  console.log("Main Process Started", process.pid);
  let cpus = os.cpus().length;
  for (var i = 0; i < cpus; i++) {
    forkChild();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log("child Process Ending", worker.process.pid);
    forkChild();
    console.log(data);
  });
}
function forkChild() {
  let next = getNext();
  if (next) {
    next.status = "started";
    var child = cluster.fork();
    child.send({ data: next });
    child.on("message", ({ id }) => {
      data[id].status = "completed";
    });
    console.log("child Process Created", child.process.pid);
  }
}
function getNext() {
  var selectUser = null;
  for (var i = 0; i < data.length; i++) {
    if (data[i].status == "inQueue") {
      selectUser = data[i];
      break;
    }
  }
  return selectUser;
}
function processChild() {
  console.log("child Process Running", process.pid);
  process.on("message", async ({ data }) => {
    var state = await processMessage(data);
    if (state) {
      process.send({ id: data.user - 1 });
      process.exit();
    }
  });
}
function processMessage(data) {
  return new Promise((res, rej) => {
    console.log("messaging Started for", data.user, process.pid);
    setTimeout(() => {
      console.log("messaging Ended for", data.user, process.pid);
      res("done");
    }, Math.round(Math.random() * 100000));
  });
}
