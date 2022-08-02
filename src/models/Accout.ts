export interface AccountTypes {
  id?: number;
  cost: number;
  inout: boolean | null;
  category: string;
  username?: string;
  regdate?: Date | number | null;
  updates?: Date | number | null;
}

export type AccountColumn =
  | "id"
  | "cost"
  | "inout"
  | "category"
  | "username"
  | "regdate"
  | "updates";

class Account {
  public id: number = 0;
  public cost: number = 0;
  public inout: boolean | null = null;
  public category: string = null;
  public username: string = null;
  public regdate: Date | number | null = null;
  public updates: Date | number | null = null;

  public set(
    key: AccountColumn,
    value: boolean | null | string | Date | number
  ) {
    switch (key) {
      case "id":
      case "cost":
        this[key] = value as number;
        break;
      case "category":
      case "username":
        this[key] = value as string;
        break;
      case "inout":
        this[key] = value as boolean | null;
        break;
      case "regdate":
      case "updates":
        this[key] = value as Date | number | null;
        break;
      default:
        break;
    }
  }

  public setObject(accountObj: AccountTypes) {
    Object.entries(accountObj).forEach(([key, value]) => {
      this.set(key as AccountColumn, value);
    });
  }
}

export default Account;
