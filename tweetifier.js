;(function(root) {

  var document = root.document;

  var input = document.getElementById("input");
  var output = document.getElementById("output");

  function processText() {
    var value = input.value;
    var outValue = "";
    var len = value.length;
    var i = 0;
    var nextLine;
    var lastSpaceInLine, leftPadding;

    while(i < len) {

      var nextnl = value.indexOf('\n', i);
      console.log(nextnl);
      if(nextnl === i) {
        nextLine = "";
        i++;
      } else if(nextnl - i <= 140 && nextnl > -1) {
        nextLine = value.substring(i, nextnl).trim();
        i = nextnl;
      } else if(nextnl - i > 140) {
        nextLine = value.substr(i, 140);
        leftPadding = (/^\s+/g.exec(nextLine) || [""])[0].length;
        lastSpaceInLine = (/^.*\s+/g.exec(nextLine) || [""])[0].length;
        nextLine = nextLine.substr(0, lastSpaceInLine).trim();
        i += lastSpaceInLine;
      } else {
        nextLine = value.substr(i).trim();
        i = len;
      }

      nextLine = nextLine.trim();
      if(nextLine) {
        outValue += nextLine + "\n";
      }
    }
    output.value = outValue;
  }

  input.addEventListener("keyup", processText);
  input.addEventListener("change", processText);

  processText();
})(this);