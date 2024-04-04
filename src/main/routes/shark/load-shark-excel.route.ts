import { adaptRoute } from '@main/adapters'
import { makeLoadExcelController } from '@main/decorators'
import { makeLoadSharkPagingFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/shark-csv:
   *   post:
   *     summary: Returns a list of Shark with pagination and sorting capabilities
   *     description: Returns a list of Shark with pagination and sorting capabilities
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns a list of records of Shark
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name: 
   *                     type: string 
   *                   date: 
   *                     type: string 
   *                     format: date 
   *                   welcomeMessage: 
   *                     type: string 

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
    '/shark-excel',
    adaptRoute(
      makeLoadExcelController(makeLoadSharkPagingFactory().makeController()),
    ),
  )
}
