import { accounts } from './../database/db';
import * as mobx from 'mobx';

export interface IAccount {
  id: string;
  name: string;
  bankName: string;
  colour: string;
  startingBalance: number;
  initiationDate: string; // Should be a moment
  currencyType: string;
}

interface IAccountDB {
  id: string;
  name: string;
  bankName: string;
  colour: string;
  startingBalance: number;
  initiationDate: string;
  currencyType: string;
}

function parseDBToAccount(data: IAccountDB): IAccount {
  // TODO: Change string to moment
  return data;
}

function parseAccountToDB(data: IAccount): IAccountDB {
  // TODO: Change moment to string
  return data;
}

export class ObservableAccountStore {
  @mobx.observable accounts: IAccount[] = [];
  @mobx.observable selectedAccount: IAccount | undefined = undefined;

  constructor() {
    mobx.autorunAsync(() => {
      accounts.find().$.subscribe((data: IAccount[]) => {
        !data ? this.accounts = [] : this.accounts = data.map(_ => parseDBToAccount(_));
      });
    });
  }

  checkIfAlreadyExists(name: string, bankName: string): boolean {
    return this.accounts.find((e: IAccount) => {
      return e.bankName.toLowerCase() === bankName.toLowerCase()
      && e.name.toLowerCase() === name.toLowerCase();
    }) !== undefined;
  }

  @mobx.computed get getAccounts(): IAccount[] {
    return this.accounts;
  }

  @mobx.computed get getSelectedAccount(): IAccount | undefined {
    return this.selectedAccount;
  }

  addNewAccount(data: IAccount) {
    accounts.insert(parseAccountToDB(data)).then((data: IAccountDB) => {
      console.log(`Successfully added ${data.bankName}: ${data.name}`);
    });
  }

  selectAccount(account: IAccount | undefined) {
    if (account === undefined || (this.selectedAccount && this.selectedAccount.id === account.id)) {
      this.selectedAccount = undefined;
    } else {
      this.selectedAccount = account;
    }
  }

  editAccount(accountId: string, data: IAccount) {
    const newData: IAccountDB = parseAccountToDB(data);
    accounts.find().where('id').equals(accountId).update({
      $set: {
        name: newData.name,
        bankName: newData.bankName,
        colour: newData.colour,
        startingBalance: newData.startingBalance,
        initiationDate: newData.initiationDate,
        currencyType: newData.currencyType,
      },
    }).then((data: IAccountDB[]) => {
      console.log(`Successfully updated ${data[0].bankName}: ${data[0].name}`);
    }).catch((e) => {
      console.log(e);
    });
  }

  deleteAccount(accountId: string) {
    this.selectAccount(undefined);
    accounts.find().where('id').equals(accountId).remove().then((data: IAccountDB[]) => {
      console.log(`Successfully deleted ${data[0].bankName}: ${data[0].name}`);
    }).catch((e) => {
      console.log(e);
    });
  }
}
