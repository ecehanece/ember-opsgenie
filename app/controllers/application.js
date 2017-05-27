import Ember from 'ember';

export default Ember.Controller.extend({
    mainPage: function() {
        var currentPath = this.get('currentPath');
        return currentPath.split('.')[0] !== 'alerts';
    }.property('currentPath')
});
