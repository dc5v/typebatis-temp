export class DomParser
{
  private parser: DOMParser;

  constructor()
  {
    this.parser = new DOMParser();
  }

  public parseFromString(content: string, type: DOMParserSupportedType): Document
  {
    return this.parser.parseFromString(content, type);
  }
}
