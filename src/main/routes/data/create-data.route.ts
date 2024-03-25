import { adaptRoute } from '@main/adapters'
import { makeCreateDataFactory } from '@usecases'

import { Router } from 'express'

export default (router: Router): void => {
  /**
   * @openapi
   * /api/data:
   *   post:
   *     summary: Creates a data
   *     description: Creates a data
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *       description: body of the request
   *       required: true
   *       content:
   *         application/json:
   *          schema:
   *              type: object
   *              properties:
   *                  name:
   *                      type: string
   *                      description: The country's name.
   *     responses:
   *       200:
   *         description: Returns the created record of country
   *         content:
   *           application/json:
   *             schema:
   *                     type: object
   *                     properties:
   *                       name:
   *                         type: string
   *                         description: The country's name.
   *                       id:
   *                         type: string
   *                         description: The country's id.
   *                       createdat:
   *                         type: string
   *                         format: date-time
   *                         description: The country's createdat.
   *                       updatedat:
   *                         type: string
   *                         format: date-time
   *                         description: The country's updatedat.
   *                       createdBy:
   *                         type: string
   *                         description: The country's createdBy.
   *                       lastUpdatedBy:
   *                         type: string
   *                         description: The country's lastUpdatedBy.
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
  router.post('/data', adaptRoute(makeCreateDataFactory().makeController()))
}
