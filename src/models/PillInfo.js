module.exports = function(sequelize, DataTypes) {
	var PillInfo = sequelize.define("PillInfo", {
		idx:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nickname:{
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '약'
		},
		time:{
			type:DataTypes.DATE,
		},
		pillNumber:{
			type: DataTypes.INTEGER,
			allowNull:false,
		},
		remainEat:{
			type: DataTypes.INTEGER,
			allowNull:false,
		},
		code:{
			type: DataTypes.STRING,
			allowNull: false,
		}
	});

	PillInfo.associate = function (models) {
		PillInfo.hasMany(models.PillHistories, {as: 'morning', foreignKey: 'morningPill'});
		PillInfo.hasMany(models.PillHistories, {as: 'lunch', foreignKey: 'lunchPill'});
		PillInfo.hasMany(models.PillHistories, {as: 'dinner', foreignKey: 'dinnerPill'});

		PillInfo.belongsTo(models.Users, {
			foreignKey: "code"
		});
	}

	return PillInfo;
  };