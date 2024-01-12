const {roles, users} = require("../models")
module.exports = {
    getRoleId :  async (role) => {
        const roleId =  await roles.findOne({
            where:{role:role},
            attributes:['id']
        });
        return roleId.id;
    }

}