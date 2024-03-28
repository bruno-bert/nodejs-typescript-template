import { adaptRoute } from '@main/adapters'
import { makeCreateEmployeeFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/employee:
   *   post:
   *     summary: Creates a Employee
   *     description: Creates a Employee
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *       description: body of the request
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name: 
   *                 type: string 
   *               date: 
   *                 type: string 
   *                 format: date 
   *               welcomeMessage: 
   *                 type: string 

   *     responses:
   *       200:
   *         description: Returns the created record of Employee
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 name: 
   *                   type: string 
   *                 date: 
   *                   type: string 
   *                   format: date 
   *                 welcomeMessage: 
   *                   type: string 

   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *                   type: object
   *                   properties:
   *                       error:
   *                         type: string
   *                         description: The error message
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *                   type: object
   *                   properties:
   *                       error:
   *                         type: string
   *                         description: The validation message
   *
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *                   type: object
   *                   properties:
   *                       error:
   *                         type: string
   *                         description: The error message
   */
  router.post(
    '/employee',
    adaptRoute(makeCreateEmployeeFactory().makeController()),
  )
}
