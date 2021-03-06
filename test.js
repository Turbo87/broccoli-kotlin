'use strict';

const helpers = require('broccoli-test-helper');
const createBuilder = helpers.createBuilder;
const createTempDir = helpers.createTempDir;
const co = require('co');

const Kotlin2JS = require('.');

describe('Kotlin2JS', () => {
  let input, output;

  jest.setTimeout(10000);

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

  it('enables sourcemaps when `sourceMaps` option is used', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
      sourceMaps: true,
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(Object.keys(output.read())).toContain('sample-library.js.map');
  }));

  it('add metadata file when `metaInfo` option is used', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
      metaInfo: true,
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(output.read()).toMatchSnapshot();
  }));

  it('builds plain module when `moduleKind=plain` option is used', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
      moduleKind: 'plain',
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(output.read()).toMatchSnapshot();
  }));

  it('builds AMD module when `moduleKind=amd` option is used', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
      moduleKind: 'amd',
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(output.read()).toMatchSnapshot();
  }));

  it('builds CommonJS module when `moduleKind=commonjs` option is used', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
      moduleKind: 'commonjs',
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(output.read()).toMatchSnapshot();
  }));

  it('builds UMD module when `moduleKind=umd` option is used', co.wrap(function* () {
    output = createBuilder(new Kotlin2JS(input.path(), {
      outputFile: 'sample-library.js',
      moduleKind: 'umd',
    }));

    input.copy(`${__dirname}/fixtures/cli-example/`);

    yield output.build();

    expect(output.read()).toMatchSnapshot();
  }));
});
