import * as mobx from 'mobx';

const accountData: AccountProps[] = [
  {
    id:'Nordea-Nordea',
    accountName: 'Nordea',
    bankName: 'Nordea',
    colour: '#0000FF',
    startingBalance: 432,
  },
  {
    id:'Osuuspankki-Säästötili',
    accountName: 'Säästötili',
    bankName: 'Osuuspankki',
    colour: '#FF0000',
    startingBalance: 10222,
  },
  {
    id:'Osuuspankki-Käyttötili',
    accountName: 'Käyttötili',
    bankName: 'Osuuspankki',
    colour: '#FF0000',
    startingBalance: 200.43,
  },
];

export interface AccountProps {
  id: string;
  accountName: string;
  bankName: string;
  colour: string;
  startingBalance: number;
  // TODO: Add creation date
}


export class Account implements AccountProps {

  id: string;
  accountName: string;
  bankName: string;
  colour: string;
  startingBalance: number;

  constructor(accountName: string, bankName: string, colour: string, startingBalance: number) {
    this.id = bankName + '-' + accountName,
    this.accountName = accountName;
    this.bankName = bankName;
    this.colour = colour;
    this.startingBalance = startingBalance;
  }
}

export class ObservableAccountStore {
  @mobx.observable accounts: Account[] = [];
  @mobx.observable selectedAccount: Account | null = null;

  constructor() {
    mobx.autorun(() => {
      accountData.map((data) => {
        this.addAccount(data.accountName, data.bankName, data.colour, data.startingBalance);
      });
    });
  }

  @mobx.computed get getAccounts() {
    return this.accounts;
  }

  @mobx.computed get getSelectedAccount() {
    return this.selectedAccount;
  }

  addAccount(accountName: string, bankName: string, colour: string, startingBalance: number) {
    this.accounts.push({
      accountName,
      bankName,
      colour,
      startingBalance,
      id: bankName + '-' + accountName,
    });
  }

  addNewAccount(account: Account) {
    account.id = account.bankName + '-' + account.accountName;
    this.accounts.push(account);
  }

  selectAccount(account: Account) {
    if (this.selectedAccount === account) {
      this.selectedAccount = null;
    } else {
      this.selectedAccount = account;
    }
  }

  editAccount(account: Account, newData: AccountProps) {
    account.bankName = newData.bankName;
    account.accountName = newData.accountName;
    account.colour = newData.colour;
    account.startingBalance = newData.startingBalance;
  }

  deleteAccount(account: Account): boolean {
    const accountIndex = this.accounts.indexOf(account);
    if (accountIndex === -1) {
      return false;
    }
    this.accounts.splice(accountIndex, 1);
    this.selectedAccount = null;
    return this.accounts.indexOf(account) === -1;
  }
}
