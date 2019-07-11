module.exports = function(sequelize, DataTypes) {
    var PillHistories = sequelize.define("PillHistories", {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      morningPill:{
        type:DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      lunchPill:{
        type:DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      dinnerPill:{
        type:DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      isEatMorning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isEatLunch: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isEatDinner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time:{
        type:DataTypes.DATE,
        allowNull:false,
      }
      // name: { 
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // profilePictureUri: { 
      //   type: DataTypes.TEXT,
      //   defaultValue: '../../assets/default_profile.png' 
      // }
    });
    // 밥... 뇌에 과부하 걸려서 못하겠어요 ㅠㅠ
    // PillHistory의 morning, lunch, dinnerPill으로 Pillinfo의 row에
    // 접근할 수 있는데 그걸 어떻게 표현해야할지 감이 안 와요... 
    PillHistories.associate = function(models) {
      PillHistories.belongsTo(models.PillInfo, {
        as: 'morning', foreignKey: "morningPill"
      });
      PillHistories.belongsTo(models.PillInfo, {
        as: 'lunch', foreignKey: "lunchPill"
      });
      PillHistories.belongsTo(models.PillInfo, {
        as: 'dinner', foreignKey: "dinnerPill"
      });

      PillHistories.belongsTo(models.Users, {
        foreignKey: "code", targetKey: 'code'
      });
    }
    return PillHistories;
  };