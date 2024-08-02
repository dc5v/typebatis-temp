import Foreach from "./Foreach";
import TestEvaluate from './TestEvaluate';
import { QueryParamsType } from "./Types";

class Set
{
  private testEvaluate: TestEvaluate;

  constructor()
  {
    this.testEvaluate = new TestEvaluate();
  }

  public processSet(node: Element, params: QueryParamsType): string
  {
    const setClause = this.processChildren(node, params).trim();

    if (setClause)
    {
      return `SET ${setClause}`;
    }
    
    return '';
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
        } else if (element.tagName === 'foreach')
        {
          result += new Foreach().processForeach(element, params);
        } else
        {
          result += this.processChildren(element, params);
        }
      }
      else if (child.nodeType === 3)
      {
        result += child.textContent;
      }
    });

    return result;
  }
}

export default Set;
