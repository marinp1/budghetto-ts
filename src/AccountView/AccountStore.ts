import * as mobx from 'mobx';

const accountData: IAccount[] = [
  {
    id:'Nordea-Nordea',
    name: 'Nordea',
    bankName: 'Nordea',
    vCardName: null,
    colour: '#0000FF',
    startingBalance: 432,
    initiationDate: '2017-08-06',
    currencyType: 'EUR',
  },
  {
    id:'Osuuspankki-Säästötili',
    name: 'Säästötili',
    bankName: 'Osuuspankki',
    vCardName: null,
    colour: '#FF0000',
    startingBalance: 10222,
    initiationDate: '2017-08-06',
    currencyType: 'EUR',
  },
  {
    id:'Osuuspankki-Käyttötili',
    name: 'Käyttötili',
    bankName: 'Osuuspankki',
    vCardName: null,
    colour: '#FF0000',
    startingBalance: 200.43,
    initiationDate: '2017-08-06',
    currencyType: 'EUR',
  },
];

export interface IAccount {
  id: string;
  name: string;
  bankName: string;
  vCardName: string | null;
  colour: string;
  startingBalance: number;
  initiationDate: string;
  currencyType: string;
}

export class ObservableAccountStore {
  @mobx.observable accounts: IAccount[] = [];
  @mobx.observable selectedAccount: IAccount | undefined = undefined;

  constructor() {
    // TODO: Read data from database
    mobx.autorunAsync(() => {
      accountData.map((data: IAccount) => {
        this.accounts.push(data);
      });
    });
    console.log(this.accounts);
  }

  @mobx.computed get getAccounts(): IAccount[] {
    return this.accounts;
  }

  @mobx.computed get getSelectedAccount(): IAccount | undefined {
    return this.selectedAccount;
  }

  addNewAccount(data: IAccount) {
    // TODO: add account to database
  }

  selectAccount(account: IAccount | undefined) {
    if (account === undefined || (this.selectedAccount && this.selectedAccount.id === account.id)) {
      this.selectedAccount = undefined;
    } else {
      this.selectedAccount = account;
    }
  }

  editAccount(accountId: string, data: IAccount) {
    // TODO: Update database
  }

  deleteAccount(accountId: string): boolean {
    // TODO: Delete from database
    return true;
  }
}
