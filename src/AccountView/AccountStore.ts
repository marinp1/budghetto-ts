import mobx, { observable, computed } from 'mobx';

const accountData: Array<AccountProps> = [
  {
    id:'Nordea-Nordea',
    accountName: 'Nordea',
    bankName: 'Nordea',
    colour: '#0000FF',
    balance: 432,
  },
  {
    id:'Osuuspankki-Säästötili',
    accountName: 'Säästötili',
    bankName: 'Osuuspankki',
    colour: '#FF0000',
    balance: 10222,
  }
]

export interface AccountProps {
  id: string,
  accountName: string,
  bankName: string,
  colour: string,
  balance: number,
}


export class Account implements AccountProps {

  id: string;
  accountName: string;
  bankName: string;
  colour: string;
  balance: number;

  constructor(accountName: string, bankName: string, colour: string, balance: number) {
    this.id = bankName + '-' + accountName,
    this.accountName = accountName;
    this.bankName = bankName;
    this.colour = colour;
    this.balance = balance;
  }
}

export class ObservableAccountStore {
  @observable accounts: Array<Account> = [];
  @observable selectedAccount: Account | null = null;

  constructor() {
    mobx.autorun(() => {
      console.log(accountData.map((data) => {
        this.addAccount(data.accountName, data.bankName, data.colour, data.balance);
      }));
    });
  }

	@computed get getAccounts() {
    return this.accounts;
  }

	@computed get getSelectedAccount() {
    return this.selectedAccount;
  }

  addAccount(accountName: string, bankName: string, colour: string, balance: number) {
    this.accounts.push({
      id: bankName + '-' + accountName,
      accountName,
      bankName,
      colour,
      balance,
    });
  }

  selectAccount(account: Account) {
    if (this.selectedAccount === account) {
      this.selectedAccount = null;
    } else {
      this.selectedAccount = account;
    }
  }
}