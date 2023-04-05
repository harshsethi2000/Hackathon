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
 *    JobObject:
 *       properties:
 *          email_id:
 *             type: string
 *          title:
 *             type: string
 *          description:
 *             type: string
 *          skils:
 *             type: array
 *             items:
 *                  type : string
 *          experience :
 *              type : object
 *              properties:
 *                  to:
 *                      type: string
 *                  from:
 *                      type: string

 */


/**
 * @swagger
 * /api/v1/post-job:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - job-controller
 *     description: job Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: jobDetails
 *         description: jobDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/JobObject'
 *     responses:
 *       200:
 *         description: Job created Successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */


/**
 * @swagger
 * /api/v1/job/{id}:
 *    get:
 *       security:
 *          - bearerAuth: []
 *       tags:
 *          - job-controller
 *       description: Get job
 *       parameters:
 *          - name: id
 *            description: job id
 *            in: path
 *            type: string
 *       produces:
 *          - application/json
 *       responses:
 *          200:
 *             description: Successfully
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 */



/**
 * @swagger
 * definitions:
 *    getJobObject:
 *       properties:
 *          size:
 *             type: string
 *          page:
 *             type: string
 *          skils:
 *             type: array
 *             items:
 *                  type : string
 *          experience :
 *              type : object
 *              properties:
 *                  to:
 *                      type: string
 *                  from:
 *                      type: string
 */



/**
 * @swagger
 * /api/v1/all-job:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - job-controller
 *     description: job Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: jobDetails
 *         description: jobDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/getJobObject'
 *     responses:
 *       200:
 *         description: Job  Successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */



/**
 * @swagger
 * definitions:
 *    ApplyJobObject:
 *       properties:
 *          job_id:
 *             type: string
 */


/**
 * @swagger
 * /api/v1/apply:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - job-controller
 *     description: ApplyJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ApplyJobObject
 *         description: ApplyJobObject object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ApplyJobObject'
 *     responses:
 *       200:
 *         description: Job created Successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */



