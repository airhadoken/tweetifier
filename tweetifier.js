;(function(root) {

  var document = root.document;

  var input = document.getElementById("input");
  var output = document.getElementById("output");

  var shortlines = document.getElementById("shortlines");

  function processText() {
    var value = input.value;
    var outValue = "";
    var len = value.length;
    var i = 0;
    var nextLine;
    var lastSpaceInLine, leftPadding;
    var lastSpaceRegex = shortlines.checked ? /^.*\s+/ : /^(?:.|\n)*\s+/m;

    while(i < len) {

      var nextnl = value.indexOf('\n', i);
      if(nextnl === i) {
        nextLine = "";
        i++;
      } else if(shortlines.checked && nextnl - i <= 140 && nextnl > -1) {
        nextLine = value.substring(i, nextnl).trim();
        i = nextnl;
      } else if(nextnl - i > 140 || !shortlines.checked) {
        nextLine = value.substr(i, 140);
        leftPadding = (/^\s+/g.exec(nextLine) || [""])[0].length;
        lastSpaceInLine = (lastSpaceRegex.exec(nextLine) || [""])[0].length;
        nextLine = nextLine.substr(0, lastSpaceInLine);
        nextLine = nextLine.replace(/ ?\n(\s*\n)* ?/mg, " ");
        nextLine = nextLine.trim();
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
  shortlines.addEventListener("change", processText);

  processText();
})(this);