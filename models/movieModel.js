import { DataTypes } from "sequelize";

import sequelize from "../utils/database.js"

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image : {
        type : DataTypes.STRING,
        validate : {
            isUrl : true
        }
    },
    releaseDate :{
        type : DataTypes.DATEONLY
    },
    rating : {
        type : DataTypes.FLOAT,
        validate : {
            max : 5,
            min : 0
        }
    }
});

export default Movie