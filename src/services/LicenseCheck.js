import superagent from 'superagent'
import superagentJsonapify from 'superagent-jsonapify'
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

superagentJsonapify(superagent)

const masterKey = 'O2J7GGH2-3NGHUU9J-FHUEH7AW-ITU3UP15'

***REMOVED***

***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
    if (licenseKey === masterKey) {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
      ***REMOVED***,
  ***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED***

    superagent
      .post('https://api.gumroad.com/v2/licenses/verify')
      .send({
***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***
        const limit = parseInt(nestedValue(response, 'body.purchase.variants').replace(/\D/g, ''), 10) * 2
***REMOVED***
        const uses = nestedValue(response, 'body.uses')

***REMOVED***
***REMOVED***
    ***REMOVED***
      ***REMOVED***

        const refunded = nestedValue(response, 'body.purchase.refunded')

***REMOVED***
***REMOVED***
    ***REMOVED***
      ***REMOVED***

        const chargebacked = nestedValue(response, 'body.purchase.chargebacked')

***REMOVED***
***REMOVED***
    ***REMOVED***
      ***REMOVED***

        Store.set('verification', response.body)
  ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
      ***REMOVED*** else if (error.response.status && error.response.status >= 500) {
***REMOVED***
***REMOVED***
      ***REMOVED*** else {
***REMOVED***
***REMOVED***
      ***REMOVED***
  ***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
