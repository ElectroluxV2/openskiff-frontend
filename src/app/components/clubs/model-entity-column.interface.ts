import { ModelEntity } from "../../services/api.interface";

export class ModelEntityColumn<T extends ModelEntity> {
  columnDef: string;
  header: string;
  cellFunction?: (element: T) => string;

  constructor(columnDef: string, header: string, cell?: (element: T) => string) {
    this.columnDef = columnDef;
    this.header = header;
    this.cellFunction = cell;
  }

  public cell(entity: {[prop: string]: any}): string {
    if (!!this.cellFunction) return this.cellFunction(entity as T);
    return `${entity[this.columnDef]}`;
  }
}

export function from<T extends ModelEntity>(source: {columnDef: string, header: string}[]): ModelEntityColumn<T>[] {
  const output: ModelEntityColumn<T>[] = [];

  for (const row of source) {
    output.push(new ModelEntityColumn<T>(row.columnDef, row.header));
  }

  return output;
}
