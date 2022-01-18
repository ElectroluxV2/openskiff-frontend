import { ModelEntity } from "../../services/api.interface";

export interface ModelEntityColumn<T extends ModelEntity> {
  columnDef: string;
  header: string;
  cell?: (element: T) => string;
}
