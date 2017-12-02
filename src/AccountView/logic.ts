import mobx, { observable, computed } from 'mobx';
import { TileProps } from './Tile';

const accountData: Array<TileProps> = [
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

export class ObservableAccountStore {
  @observable accounts: Array<TileProps> = accountData;
  @observable selectedAccount: string | null = null;

  constructor() {
    mobx.autorun(() => {
      console.log(this.accountsData);
    });
  }

	@computed get accountsData() {
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

  selectAccount(account: TileProps) {
    if (this.selectedAccount === account.id) {
      this.selectedAccount = null;
    } else {
      this.selectedAccount = account.id;
    }
  }
}