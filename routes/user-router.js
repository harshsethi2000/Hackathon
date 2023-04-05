/**
 * @swagger
 * securityDefinitions:
 *      bearerAuth:
 *          type: apiKey
 *          schema: bearer
 *          name: Authorization
 *          bearerFormat: JWT
 *          in: "header"
 * security:
 *        - bearerAuth: []
 */


/**
 * @swagger
 * definitions:
 *    userRegistartionObject:
 *       properties:
 *          email_id:
 *             type: string
 *          username:
 *             type: string
 *          password:
 *             type: string
 *          confirm_password:
 *             type: string
 *          user_type :
 *             type: string
 */

/**
 * @swagger
 * /api/v1/registration:
 *   post:
 *     tags:
 *       - user-controller
 *     description: User user Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userDetails
 *         description: userDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/userRegistartionObject'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */


/**
 * @swagger
 * definitions:
 *   LoginDetails:
 *     properties:
 *       email_id:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - user-controller
 *     description: User Login Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: LoginDetails
 *         description: LoginDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/LoginDetails'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */



/**
 * @swagger
 * /api/v1/user-profile:
 *    get:
 *       security:
 *          - bearerAuth: []
 *       tags:
 *          - user-controller
 *       description: Get user profile
 *       produces:
 *          - application/json
 *       responses:
 *          200:
 *             description: Successfully created
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 */