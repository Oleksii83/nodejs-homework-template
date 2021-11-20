const express = require('express')

const { validation400 } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
const { contactJoiSchema } = require('../../model/contact')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getContactId)

router.post('/', validation400(contactJoiSchema), ctrl.postContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put(
  '/:contactId',
  validation400(contactJoiSchema),
  ctrl.selectedContact
)

router.patch('/:contactId/favorite', ctrl.putContact)

module.exports = router
