import { DataTypes , Model} from "sequelize";
import brcypt from 'bcrypt'

import sequelize from "../utils/database.js"
import Movie from "../models/movieModel.js"

class User extends Model {
    isValidPassword(val){
        return brcypt.compareSync(val,this.getDataValue('password'))
    }
}

User.init({
    name : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    password :{
        type : DataTypes.STRING,
        allowNull : false,
        set(val){
            this.setDataValue('password',brcypt.hashSync(val,8)) //keep 12 in real application
        }
    },
    role : {
        type : DataTypes.STRING,
        defaultValue : 'customer',
        validate : {
            isIn : [['customer', 'admin']]
        }
    }
},
{
    sequelize,
    timestamps : false
})

//planetscale doesnt support foreign key constraints 
User.belongsToMany(Movie, {through : 'UserMovies',constraints : false})
Movie.belongsToMany(User, {through : 'UserMovies',constraints : false})

export default User


