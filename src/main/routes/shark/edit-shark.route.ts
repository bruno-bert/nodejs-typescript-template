import { adaptRoute } from '@main/adapters'
import { makeEditSharkFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/shark/{id}:
   *   put:
   *     summary: Updates a Shark
   *     description: Updates a Shark
   *     parameters:
   *        - name: id
   *          in: path
   *          description: ID of the resource to be updated
   *          required: true
   *          schema:
   *            type: string
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
  router.put('/shark/:id', adaptRoute(makeEditSharkFactory().makeController()))
}
