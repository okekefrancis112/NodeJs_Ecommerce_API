const express = require("express");
const router = express.Router();

const {
    createUser,
    loginUserCtrl,
    getallUsers,
    getUser,
    deleteUser
} = require("../controller/userCtrl");

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updatedUser);

module.exports = router;