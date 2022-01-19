import { ModelEntityColumn } from "./model-entity-column";
import { ModelEntity } from "../../services/api.interface";

export class Table<T extends ModelEntity> {
  readonly modelEntityName: string;
  readonly label: string;

  readonly actions = {
    add: false,
    delete: false,
    edit: false
  };

  readonly columns: ModelEntityColumn<T>[] = [];

  constructor(modelEntityName: string, label: string, columns: ModelEntityColumn<T>[], actions?: { add: boolean; edit: boolean; delete: boolean }) {
    this.modelEntityName = modelEntityName;
    this.label = label;
    this.columns = columns;

    if (!!actions) this.actions = actions;
  }
}
