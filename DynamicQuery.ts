import Foreach from './Foreach';
import TestEvaluate from './TestEvaluate';
import { QueryParamsType } from "./Types";

class DynamicQueryProcessor
{
  private testEvaluate: TestEvaluate;
  private foreachProcessor: Foreach;

  constructor()
  {
    this.testEvaluate = new TestEvaluate();
    this.foreachProcessor = new Foreach();
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
          result += this.foreachProcessor.processForeach(element, params);
        }
        else if (['where', 'set', 'select'].includes(element.tagName))
        {
          result += this.processElement(element, params);
        }
        else
        {
          result += this.processChildren(element, params);
        }
      }
      /* text */
      else if (child.nodeType === 3)
      {
        result += child.textContent;
      }
    });

    return result;
  }

  public processElement(node: Element, params: QueryParamsType): string
  {
    switch (node.tagName)
    {
      case 'where':
        return this.processWhere(node, params);

      case 'set':
        return this.processSet(node, params);

      case 'select':
        return this.processSelect(node, params);

      default:
        return this.processChildren(node, params);
    }
  }

  private processWhere(node: Element, params: QueryParamsType): string
  {
    const whereClause = this.processChildren(node, params).trim();

    if (whereClause)
    {
      return `WHERE ${whereClause}`;
    }

    return '';
  }

  private processSet(node: Element, params: QueryParamsType): string
  {
    const setClause = this.processChildren(node, params).trim();

    if (setClause)
    {
      return `SET ${setClause}`;
    }

    return '';
  }

  private processSelect(node: Element, params: QueryParamsType): string
  {
    return this.processChildren(node, params).trim();
  }
}

export default DynamicQueryProcessor;
