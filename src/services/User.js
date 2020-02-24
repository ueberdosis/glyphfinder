***REMOVED***
import Setapp from './Setapp'

***REMOVED***

  get email() {
    return Store.get('verification.purchase.email', null)
***REMOVED***

  get isVerified() {
    if (Setapp.isActive) {
***REMOVED*** true
  ***REMOVED***

    const verification = Store.get('verification', null)

    return verification
      ? !!verification.success
      : false
***REMOVED***

***REMOVED***
