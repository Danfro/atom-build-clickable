'use babel';

const checkBuildError = (output) => {
  const dockerNonZero = /.*(returned non-zero exit status \d)/;

  // this is the list of error matches that atom-build will process
  const array = [];

  // iterate over the output by lines
  output.split(/\r?\n/).forEach(line => {
    // Check docker errors
    const docker_match = dockerNonZero.exec(line);

    if (docker_match) {
      array.push({
        file: 'clickable.json',
        line: '1',  // Linter support in Atom-build requires us to provide some reference
        col: '1',   // Linter support in Atom-build requires us to provide some reference
        message: line
      });
    }
  });

  return array;
};

export default { checkBuildError };
