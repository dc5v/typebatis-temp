import TestEvaluate from './TestEvaluate';
import { QueryParamsType } from "./Types";

class Foreach
{
  private testEvaluate: TestEvaluate;

  constructor()
  {
    this.testEvaluate = new TestEvaluate();
  }

  public processForeach(node: Element, params: QueryParamsType): string
  {
    const item = node.getAttribute('item');
    const index = node.getAttribute('index');
    const collectionName = node.getAttribute('collection');
    const collection = params[collectionName];

    if (!Array.isArray(collection))
    {
      throw new Error(`${collectionName} is not an array`);
    }

    let result = '';

    collection.forEach((element, idx) =>
    {
      const itemParams = { ...params, [item]: element, [index]: idx };
      result += this.processChildren(node, itemParams);
    });

    return result;
  }

  private processChildren(node: Element, params: QueryParamsType): string
  {
    let result = '';

    node.childNodes.forEach(child =>
    {
      if (child.nodeType === 1)
      {
        const element = child as Element;

        if (element.tagName === 'if')
        {
          const test = element.getAttribute('test');

          if (test && this.testEvaluate.evaluateExpression(test, params))
          {
            result += this.processChildren(element, params);
          }
        }
        else if (element.tagName === 'foreach')
        {
          result += this.processForeach(element, params);
        }
        else
        {
          result += this.processChildren(element, params);
        }
      }
      /* plain text */
      else if (child.nodeType === 3)
      {
        result += child.textContent;
      }
    });

    return result;
  }
}

export default Foreach;
