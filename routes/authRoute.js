const express = require("express");
const router = express.Router();

const {
    createUser,
    loginUserCtrl,
    getallUsers,
    getUser,
    deleteUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutUser,
    updatePassword
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post('/register', createUser);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logoutUser);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);

router.put('/edit-user', authMiddleware, updatedUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);


module.exports = router;