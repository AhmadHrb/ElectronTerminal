var dir = "/home/";

if (process.env['USER']) {
    document.getElementById("pc").innerHTML = process.env['USER'] + "@" + require("os").hostname();
}
document.body.addEventListener("click",function (event) {
event.preventDefault();
document.getElementById("cmd").focus();
})
window.addEventListener("click",function (event) {
event.preventDefault();
document.getElementById("cmd").focus()
})
document.getElementById("cmd").addEventListener("keydown",function (event) {

if (event.key == "Enter") {
    event.preventDefault();
    runCmd();
}
})
function runCmd() {
var cmd = document.getElementById("cmd").value;
    document.getElementById("cmd").value = "";
if (cmd.startsWith("cd")) {
 var newCmd = cmd.slice(3);
 if (!newCmd || newCmd == "") return;
 if (newCmd == "..") {
     var newDir = dir.slice(0,dir.lastIndexOf("/"));
     dir = newDir.slice(0,newDir.lastIndexOf("/")) + "/";

     return document.getElementById("dir").innerHTML = dir.replace("/home/","~");
 } else {
     require("fs").access(dir + newCmd + "/", function(err) {
         if (!err) {
             dir += newCmd + "/";
             return document.getElementById("dir").innerHTML = dir.replace("/home/","~");
         } else return alert("Couldn't find directory");
     });

 }
 return;

} else if (cmd.startsWith("clear")) return document.getElementById("history").innerHTML = "";
const { exec } = require("child_process");

exec(cmd, {cwd:dir},(error, stdout, stderr) => {
    if (error) return alert("Error before executing cmd: " + error);
    if (stderr) return addToHistory("Error: " + stderr);
    if (stdout && stdout != "") addToHistory(stdout);

})

}
function addToHistory(msg) {
    document.getElementById("history").innerHTML += msg + "<hr>";

}