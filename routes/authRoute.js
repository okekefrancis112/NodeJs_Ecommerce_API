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
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAddress,
    userCart
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken );
router.put('/reset-password/:token', resetPassword );


router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post('/cart', authMiddleware, userCart);
router.post('/admin-login', loginAdmin);

router.get('/all-users', getallUsers);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logoutUser);
router.get('/wishlist', authMiddleware, getWishList);

router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);

router.put('/edit-user', authMiddleware, updatedUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);


module.exports = router;