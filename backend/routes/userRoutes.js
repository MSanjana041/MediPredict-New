const express = require('express');
const router = express.Router();
const {
    getUsers,
    getCoaches,
    getUserById,
    updateUser,
    deleteUser,
    assignRole,
    getCoaches
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

<<<<<<< HEAD
router.route('/coaches')
    .get(getCoaches);
=======
// Public route - for player registration
router.get('/coaches', getCoaches);
>>>>>>> 6a9662355486dbcbfe7aa8d083879b66b9d5c4fe

router.route('/')
    .get(protect, restrictTo('Admin', 'Coach'), getUsers);

router.route('/:id')
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, restrictTo('Admin'), deleteUser);

router.route('/:id/role')
    .put(protect, restrictTo('Admin'), assignRole);

module.exports = router;
