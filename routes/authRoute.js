const express = require("express");
const router = express.Router();

const {
    createUser,
    loginUserCtrl,
    getallUsers,
    getUser,
    deleteUser,
    updatedUser
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUsers);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updatedUser);

module.exports = router;