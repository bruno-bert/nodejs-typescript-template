import { adaptRoute } from '@main/adapters'
import { makeCreateSharkFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/shark:
   *   post:
   *     summary: Creates a Shark
   *     description: Creates a Shark
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
   *         description: Returns the created record of Shark
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
  router.post('/shark', adaptRoute(makeCreateSharkFactory().makeController()))
}
