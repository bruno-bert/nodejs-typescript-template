import { adaptRoute } from '@main/adapters'
import { makeLoadSharkDetailFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/shark/{id}:
   *   get:
   *     summary: Gets details of a Shark
   *     description: Get details of a Shark
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
   *         description: Returns the updated record of Shark
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
    '/shark/:id',
    adaptRoute(makeLoadSharkDetailFactory().makeController()),
  )
}
