(function (IO, undefined) {
  IO.fileHandler = function (files, fn) {
    /// <summary>handles the file from the input DOM.</summary>

    fn = fn || IO.defaultFn;
    var reader = new FileReader();
    reader.onloadend = function (e) {
      var requestText = e.target.result,
        lines;

      lines = requestText
        .replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        .split('\n')
        .map(function (line) {
          return line.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        });
      fn(lines);
    }
    reader.readAsText(files[0]);
  };

  IO.defaultFn = function () {
    console.log('IO.defaultFn is not implemented.')
  };
})(window.IO = window.IO || {});