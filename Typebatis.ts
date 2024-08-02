import { readFileSync } from 'fs';
import { DomParser } from './DomParser';
import DynamicQuery from './DynamicQuery';
import { QueryParamsType } from "./Types";

class Typebatis
{
  private document: Document;
  private dynamicQueryProcessor: DynamicQuery;

  constructor(xmlFilePath: string)
  {
    const xmlContent = readFileSync(xmlFilePath, 'utf8');
    const parser = new DomParser();

    this.document = parser.parseFromString(xmlContent, 'text/xml');
    this.dynamicQueryProcessor = new DynamicQuery();
  }

  public generateQuery(queryId: string, params: QueryParamsType): string | null
  {
    const queryNode = this.document.querySelector(`[id="${queryId}"]`);

    if (!queryNode)
    {
      return null;
    }

    return this.dynamicQueryProcessor.processElement(queryNode as Element, params).trim();
  }
}

export { Typebatis };
