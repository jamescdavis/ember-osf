/*
  Extend the Ember-Simple-Auth adapter to provide cookie support (when necessary)

  This particularly applies to local development, as without it cookies are not sent from the ember app to the api domain
 */
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

import config from 'ember-get-config';

export default Ember.Mixin.create(DataAdapterMixin, {
    ajaxOptions() {
        var hash = this._super(...arguments);

        // TODO: This mechanism is quite ugly, and will require manual ajax requests (such as the file manager) to set fields separately;
        //  getting requests to send cookies without triggering cross-origin rules would be strongly preferable
        if (config['ember-simple-auth'].authenticator === 'authenticator:osf-cookie') {
            Ember.$.extend(hash, {
                xhrFields: {
                    withCredentials: true
                }
            });
        }
        return hash;
    }
});
