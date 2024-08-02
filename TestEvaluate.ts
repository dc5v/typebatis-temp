class TestEvaluate
{
  private static isValidKey(key: string): boolean
  {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
  }

  private static getValue(params: any, path: string[]): any
  {
    let value = params;

    for (const key of path)
    {
      if (value && (typeof value === 'object' || Array.isArray(value)) && TestEvaluate.isValidKey(key))
      {
        value = value[key];
      }
      else
      {
        return undefined;
      }
    }

    return value;
  }

  private static escapeString(str: string): string
  {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/'/g, "\\'");
  }

  private static replaceVariables(expression: string, params: any): string
  {
    const sanitizedExpression = expression.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&gte;/g, '>=').replace(/&lte;/g, '<=').replace(/&eq;/g, '==');

    return sanitizedExpression.replace(/([a-zA-Z_$][a-zA-Z0-9_$.\[\]]*)/g, (match) =>
    {
      const path = match.split(/[\.\[\]]/).filter(Boolean);
      const value = TestEvaluate.getValue(params, path);

      if (typeof value === 'string')
      {
        return `"${TestEvaluate.escapeString(value)}"`;
      }
      else
      {
        return value;
      }
    });
  }

  public evaluateExpression(expression: string, params: any): boolean
  {
    const replacedExpression = TestEvaluate.replaceVariables(expression, params);

    try
    {
      return eval(replacedExpression);
    }
    catch (err)
    {
      console.log(err);
    }

    return false;
  }
}

export default TestEvaluate;
