const path = require('path');

const Plugin = require('broccoli-plugin');
const kotlinCompiler = require('@jetbrains/kotlinc-js-api');

class Kotlin2JS extends Plugin {
  constructor(inputNode, options) {
    super([inputNode], { needsCache: false });
    this.options = options;
  }

  build() {
    const { outputFile, sourceMaps } = this.options;

    if (!outputFile) {
      throw new Error('Please specify an `outputFile` option');
    }

    return kotlinCompiler.compile({
      output: path.join(this.outputPath, outputFile),
      sources: this.inputPaths,
      sourceMaps,
    });
  }
}

module.exports = Kotlin2JS;
