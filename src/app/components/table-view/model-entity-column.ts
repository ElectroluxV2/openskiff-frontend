import { ModelEntity } from "../../services/api.interface";

export interface ModelEntityColumnSource {
  columnDef: string;
  header: string;
  id?: boolean;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  controlsConfig?: {
    [key: string]: any;
  };
  cell?: (entity: {[prop: string]: any}) => string;
}

export class ModelEntityColumn<T extends ModelEntity> implements ModelEntityColumnSource {
  readonly columnDef: string;
  readonly header: string;
  readonly id: boolean = false;
  readonly required: boolean = false;
  readonly hint: string = '';
  readonly placeholder: string = '';
  readonly controlsConfig: [] = [];
  private readonly cellFunction?: (element: T) => string;

  constructor(source: ModelEntityColumnSource) {
    this.columnDef = source.columnDef;
    this.header = source.header;
    this.id = source.id ?? false;
    this.required = source.required ?? true;
    this.hint = source.hint ?? '';
    this.placeholder = source.placeholder ?? '';
    this.cellFunction = source.cell ?? undefined;
  }

  public cell(entity: {[prop: string]: any}): string {
    if (!!this.cellFunction) return this.cellFunction(entity as T);
    return `${entity[this.columnDef]}`;
  }
}

export function from<T extends ModelEntity>(source: ModelEntityColumnSource[]): ModelEntityColumn<T>[] {
  const output: ModelEntityColumn<T>[] = [];

  for (const row of source) {
    output.push(new ModelEntityColumn<T>(row));
  }

  return output;
}
