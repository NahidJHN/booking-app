const commonRights = [
  "getUser",
  "updateUser",
  "deleteUser"
]



const allRoles = {
  user: [...commonRights],
  admin: [...commonRights,
    "getHotels",
    "addHotels",
    "updateHotel",
    'deleteHotel',
    "getRooms",
    "addRooms",
    "updateRooms",
    "deleteRooms"],

  superAdmin: ["getAllHotels", "getAllRooms"]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

export { roleRights, roles }