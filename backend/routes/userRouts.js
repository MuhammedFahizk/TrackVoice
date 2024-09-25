import express from 'express'
import { login, signup, verify } from '../controllers/userController.js';
import { verifyUser } from '../middlewares/verifyUser.js';
import { likeTrack, unlikeTrack } from '../controllers/track.js';
import { addToPlayList, createPlaylist, deletePlaylist, getUserPlaylists } from '../controllers/playlist.js';
import { addFriend, getFriends, removeFriend } from '../controllers/friends.js';
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)

router.use(verifyUser)

router.get('/verify',verify )
router.get('/playlists', getUserPlaylists)
router.get('/getFriends', getFriends)

router.post('/like/:id', likeTrack);
router.post('/unLike/:id', unlikeTrack);
router.post('/createPlaylist',createPlaylist )
router.post('/addToPlayList', addToPlayList )
router.post('/addToFriend', addFriend )
router.post('/removeToFriend', removeFriend )

router.delete('/playlists/:playlistId',deletePlaylist )









export default router;
