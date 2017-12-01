'use strict';

const helpers = require('broccoli-test-helper');
const createBuilder = helpers.createBuilder;
const createTempDir = helpers.createTempDir;
const co = require('co');

const Kotlin2JS = require('.');

describe('Kotlin2JS', () => {
  let input, output;

  beforeEach(co.wrap(function* () {
    input = yield createTempDir();
  }));

  afterEach(co.wrap(function* () {
    yield input.dispose();
    yield output.dispose();
  }));

  it('should build', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(output.read()).toMatchSnapshot();
  }));
});
