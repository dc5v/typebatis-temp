import { expect } from 'chai';
import TestEvaluate from './TestEvaluate';

describe('TestEvaluate', () =>
{
  const testEvaluate = new TestEvaluate();

  it('a === undefined', () =>
  {
    const expression = 'a === undefined';
    const params: any = { a: undefined };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });

  it('a !== undefined', () =>
  {
    const expression = 'a !== undefined';
    const params: any = { a: 'defined' };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });

  it('a === "test" && b > 10', () =>
  {
    const expression = 'a === "test" && b > 10';
    const params: any = { a: 'test', b: 15 };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });

  it('a.b.c === "test"', () =>
  {
    const expression = 'a.b.c === "test"';
    const params: any = { a: { b: { c: 'test' } } };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });

  it('a.b[1].c === "vv"', () =>
  {
    const expression = 'a.b[1].c === "vv"';
    const params: any = { a: { b: [{}, { c: 'vv' }] } };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;

  });

  it('(a.b[1].c === "vv" && d.e === 5) || (f.g === "test" && h > 10)', () =>
  {
    const expression = '(a.b[1].c === "vv" && d.e === 5) || (f.g === "test" && h > 10)';

    const params: any = {
      a: { b: [{}, { c: 'vv' }] },
      d: { e: 5 },
      f: { g: 'test' },
      h: 15
    };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });

  it('a > b && c <= d', () =>
  {
    const expression = 'a > b && c <= d';
    const params: any = { a: 5, b: 3, c: 10, d: 15 };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });

  it('a === null && b === undefined', () =>
  {
    const expression = 'a === null && b === undefined';
    const params: any = { a: null, b: undefined };
    const result = testEvaluate.evaluateExpression(expression, params);

    expect(result).to.be.true;
  });


});
