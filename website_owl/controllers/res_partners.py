from odoo import http, fields
from odoo.http import request
import json
class ResUsers(http.Controller):
    @http.route(["""/get/partners"""],type="json",auth="public",website=True)
    def get_partners(self):
        Partner = request.env['res.partner']
        partners = Partner.sudo().search([])
        values = []
        for partner in partners:
            values.append({'name':partner.name,'id':partner.id,'city': partner.city})
        return json.dumps(values)
