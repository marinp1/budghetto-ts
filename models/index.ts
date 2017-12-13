import * as Sequelize from 'sequelize';

const force = true;

export interface IModels {
  models: {
    users: Sequelize.Model<{}, {}>;
    accounts: Sequelize.Model<{}, {}>;
  };
}

export function getModels(sequelize: Sequelize.Sequelize): IModels {

  const users = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  users.sync({ force });

  const accounts = sequelize.define('accounts', {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: users,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      unique: 'compositeIndex',
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    bankName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    vCardName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    colour: {
      type: Sequelize.CHAR(7),
      allowNull: false,
    },
    startingBalance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    initiationDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    currencyType: {
      type: Sequelize.CHAR(3),
      allowNull: false,
    },
  });

  accounts.sync({ force });

  // LINK MODELS

  users.hasMany(accounts);

  // resync
  sequelize.sync({ force });

  return {
    models: {
      users,
      accounts,
    },
  };
}
