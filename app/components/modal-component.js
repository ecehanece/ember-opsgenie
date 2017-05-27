import Ember from 'ember';
import UiModal from 'semantic-ui-ember/components/ui-modal';

export default UiModal.extend({
    notify: Ember.inject.service('notify'),
    name: 'Snooze Alert',
    classNames: [ 'ui modal alert' ],
    actions: {
        approveSnooze: function(snoozedAlert){
            if(typeof this.get('date') !== 'undefined'){
                Ember.set(snoozedAlert, 'snoozed', true);
                Ember.set(snoozedAlert, 'snoozedUntil', this.get('date'));
                this.get('notify').success('Alert #' + snoozedAlert.tinyId + ' snoozed successfully');
            }
        }
    }
});
