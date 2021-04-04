/**user sends command "tictactoe"
 * reply with instance of the board, add reactions
 * internally store the message id
 * event listener for reaction add should search for message id in its list of active games messages
 * if found, update the message given the reaction type
 * if updated message concludes the game, remove message id from list of active games
 */

//need to take reaction objects, message, user id, and either in memory store messageids or use db, likely wont need db
