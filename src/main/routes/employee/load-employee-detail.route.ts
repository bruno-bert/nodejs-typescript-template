import { adaptRoute } from '@main/adapters'
import { makeLoadEmployeeDetailFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/employee/{id}:
   *   get:
   *     summary: Gets details of a Employee
   *     description: Get details of a Employee
   *     parameters:
   *        - name: id
   *          in: path
   *          description: ID of the resource to search for
   *          required: true
   *          schema:
   *            type: string
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns the updated record of Employee
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
  router.get(
    '/employee/:id',
    adaptRoute(makeLoadEmployeeDetailFactory().makeController()),
  )
}
